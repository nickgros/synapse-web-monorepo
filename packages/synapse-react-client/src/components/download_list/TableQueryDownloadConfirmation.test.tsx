import React from 'react'
import { act, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as ToastMessage from '../ToastMessage/ToastMessage'
import {
  AddToDownloadListRequest,
  AddToDownloadListResponse,
  AsynchronousJobStatus,
  QueryBundleRequest,
  QueryResultBundle,
} from '@sage-bionetworks/synapse-types'
import * as DownloadConfirmationUIModule from './DownloadConfirmationUI'
import { TableQueryDownloadConfirmation } from './index'
import { SynapseClientError } from '../../index'
import {
  QueryVisualizationContextConsumer,
  QueryVisualizationContextType,
  QueryVisualizationWrapper,
} from '../QueryVisualizationWrapper/QueryVisualizationWrapper'
import { mockQueryBundleRequest } from '../../mocks/mockFileViewQuery'

import {
  getUseMutationMock,
  getUseQuerySuccessMock,
} from '../../testutils/ReactQueryMockUtils'
import QueryWrapper from '../QueryWrapper'
import { MOCK_USER_ID } from '../../mocks/user/mock_user_profile'
import { createWrapper } from '../../testutils/TestingLibraryUtils'
import { noop } from 'lodash-es'
import * as SynapseQueries from '../../synapse-queries'

const mockUseGetQueryResultBundle = vi.spyOn(
  SynapseQueries,
  'useGetQueryResultBundleWithAsyncStatus',
)
const mockUseAddQueryToDownloadList = vi.spyOn(
  SynapseQueries,
  'useAddQueryToDownloadList',
)
const ID_COLUMN_ID = 11112
const CURRENT_VERSION_COLUMN_ID = 11113
const DOWNLOAD_CONFIRMATION_UI_TEST_ID = 'DownloadConfirmationUI'
const mockDownloadConfirmationUi = vi
  .spyOn(DownloadConfirmationUIModule, 'DownloadConfirmationUI')
  .mockImplementation(() => (
    <div data-testid={DOWNLOAD_CONFIRMATION_UI_TEST_ID}></div>
  ))

const mockQueryWithSelectFileColumn = {
  ...mockQueryBundleRequest.query,
  selectFileColumn: ID_COLUMN_ID,
}
const mockQueryWithSelectFileAndVersionColumn = {
  ...mockQueryBundleRequest.query,
  selectFileColumn: ID_COLUMN_ID,
  selectFileVersionColumn: CURRENT_VERSION_COLUMN_ID,
}
const mockToastFn = vi
  .spyOn(ToastMessage, 'displayToast')
  .mockImplementation(() => noop)

const addFilesToDownloadListResponse: AddToDownloadListResponse = {
  concreteType:
    'org.sagebionetworks.repo.model.download.AddToDownloadListResponse',
  numberOfFilesAdded: 1,
}

let receivedQueryVisualizationContext: QueryVisualizationContextType | undefined

async function setUp(
  fileIdColumnName?: string,
  fileVersionColumnName?: string,
) {
  const user = userEvent.setup()
  let component
  act(() => {
    component = render(
      <QueryWrapper
        initQueryRequest={mockQueryBundleRequest}
        fileIdColumnName={fileIdColumnName}
        fileVersionColumnName={fileVersionColumnName}
      >
        <QueryVisualizationWrapper>
          <QueryVisualizationContextConsumer>
            {context => {
              receivedQueryVisualizationContext = context
              return <TableQueryDownloadConfirmation />
            }}
          </QueryVisualizationContextConsumer>
        </QueryVisualizationWrapper>
      </QueryWrapper>,
      {
        wrapper: createWrapper(),
      },
    )
  })

  await waitFor(() => expect(receivedQueryVisualizationContext).toBeDefined())

  act(() => {
    receivedQueryVisualizationContext!.setShowDownloadConfirmation(true)
  })

  await waitFor(() =>
    expect(receivedQueryVisualizationContext!.showDownloadConfirmation).toBe(
      true,
    ),
  )
  await screen.findByTestId(DOWNLOAD_CONFIRMATION_UI_TEST_ID)
  return { component, user }
}

describe('TableQueryDownloadConfirmation', () => {
  let mutationMockReturnValue: ReturnType<
    typeof getUseMutationMock<
      AddToDownloadListResponse,
      SynapseClientError,
      AddToDownloadListRequest
    >
  >
  beforeEach(() => {
    vi.clearAllMocks()

    mockUseGetQueryResultBundle.mockReturnValue(
      getUseQuerySuccessMock<
        AsynchronousJobStatus<QueryBundleRequest, QueryResultBundle>
      >({
        jobState: 'COMPLETE',
        jobCanceling: false,
        requestBody: mockQueryBundleRequest,
        startedOn: '2021-01-01T00:00:00.000Z',
        changedOn: '2021-01-01T00:00:00.000Z',
        runtimeMS: 1000,
        startedByUserId: MOCK_USER_ID,
        etag: '000',
        jobId: '123',
        responseBody: {
          concreteType:
            'org.sagebionetworks.repo.model.table.QueryResultBundle',
          queryCount: 100,
          sumFileSizes: {
            sumFileSizesBytes: 40128868,
            greaterThan: false,
          },
          columnModels: [
            {
              columnType: 'ENTITYID',
              name: 'id',
              id: ID_COLUMN_ID.toString(),
            },
            {
              columnType: 'INTEGER',
              name: 'currentVersion',
              id: CURRENT_VERSION_COLUMN_ID.toString(),
            },
          ],
        },
      }),
    )

    mutationMockReturnValue = getUseMutationMock<
      AddToDownloadListResponse,
      SynapseClientError,
      AddToDownloadListRequest
    >(addFilesToDownloadListResponse)

    mockUseAddQueryToDownloadList.mockReturnValue(mutationMockReturnValue)
  })

  it('passes the correct props to DownloadConfirmationUI', async () => {
    await setUp()
    expect(mockDownloadConfirmationUi).toHaveBeenCalled()
    const passedProps = mockDownloadConfirmationUi.mock.lastCall![0]
    expect(passedProps).toEqual({
      onAddToDownloadCart: expect.any(Function),
      onCancel: expect.any(Function),
      fileCount: 100,
      fileSize: 40128868,
      isAddingToDownloadCart: false,
      isLoadingStats: false,
    })
  })

  it('adds files to download list using a table query when invoked', async () => {
    await setUp()
    expect(mockDownloadConfirmationUi).toHaveBeenCalled()
    const passedProps = mockDownloadConfirmationUi.mock.lastCall![0]

    // Call under test
    act(() => {
      passedProps.onAddToDownloadCart()
    })

    expect(mutationMockReturnValue.mutate).toHaveBeenCalledTimes(1)
    expect(mutationMockReturnValue.mutate).toHaveBeenCalledWith({
      query: mockQueryWithSelectFileColumn,
      concreteType:
        'org.sagebionetworks.repo.model.download.AddToDownloadListRequest',
    })

    act(() => {
      mockUseAddQueryToDownloadList.mock.lastCall![0]!.onSuccess!(
        {
          concreteType:
            'org.sagebionetworks.repo.model.download.AddToDownloadListResponse',
          numberOfFilesAdded: 1,
        },
        {
          //'id' column discovered, so selectFileColumn is set
          query: mockQueryWithSelectFileColumn,
          concreteType:
            'org.sagebionetworks.repo.model.download.AddToDownloadListRequest',
        },
        undefined,
      )
    })

    await waitFor(() => {
      expect(mockToastFn).toHaveBeenCalledWith(
        expect.any(String),
        'success',
        expect.any(Object),
      )
      expect(receivedQueryVisualizationContext?.showDownloadConfirmation).toBe(
        false,
      )
    })
  })

  it('handles onCancel passed to DownloadConfirmationUI', async () => {
    await setUp()
    expect(mockDownloadConfirmationUi).toHaveBeenCalled()
    const passedProps = mockDownloadConfirmationUi.mock.lastCall![0]

    // Call under test
    act(() => {
      passedProps.onCancel()
    })

    expect(mutationMockReturnValue.mutate).not.toHaveBeenCalled()
    expect(receivedQueryVisualizationContext?.showDownloadConfirmation).toBe(
      false,
    )
  })

  it('handles case where adding files to the download list results in an error', async () => {
    await setUp()
    expect(mockDownloadConfirmationUi).toHaveBeenCalled()
    const passedProps = mockDownloadConfirmationUi.mock.lastCall![0]

    // Call under test
    act(() => {
      passedProps.onAddToDownloadCart()
    })

    expect(mutationMockReturnValue.mutate).toHaveBeenCalledTimes(1)
    expect(mutationMockReturnValue.mutate).toHaveBeenCalledWith({
      query: mockQueryWithSelectFileColumn,
      concreteType:
        'org.sagebionetworks.repo.model.download.AddToDownloadListRequest',
    })

    act(() => {
      mockUseAddQueryToDownloadList.mock.lastCall![0]!.onError!(
        new SynapseClientError(
          400,
          'some error message',
          expect.getState().currentTestName!,
        ),
        {
          query: mockQueryWithSelectFileColumn,
          concreteType:
            'org.sagebionetworks.repo.model.download.AddToDownloadListRequest',
        },
        undefined,
      )
    })
    expect(mockToastFn).toHaveBeenCalledWith(expect.any(String), 'danger')
    expect(receivedQueryVisualizationContext?.showDownloadConfirmation).toBe(
      false,
    )
  })
  it('setting the fileIdColumnName and fileVersionColumnName should update the AddToDownloadListRequest query if ColumnModels are available in the result', async () => {
    await setUp('id', 'currentVersion')
    expect(mockDownloadConfirmationUi).toHaveBeenCalled()
    const passedProps = mockDownloadConfirmationUi.mock.lastCall![0]

    // Call under test
    act(() => {
      passedProps.onAddToDownloadCart()
    })

    expect(mutationMockReturnValue.mutate).toHaveBeenCalledTimes(1)
    expect(mutationMockReturnValue.mutate).toHaveBeenCalledWith({
      query: mockQueryWithSelectFileAndVersionColumn,
      concreteType:
        'org.sagebionetworks.repo.model.download.AddToDownloadListRequest',
    })
  })
})
