import { render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import StandaloneQueryWrapper, {
  StandaloneQueryWrapperProps,
} from '../../../src/components/StandaloneQueryWrapper/StandaloneQueryWrapper'
import { createWrapper } from '../../../src/testutils/TestingLibraryUtils'
import { SynapseContextType } from '../../../src/context/SynapseContext'
import { QueryResultBundle } from '@sage-bionetworks/synapse-types'
import syn20337467Json from '../../../src/mocks/query/syn20337467.json'
import SynapseClient from '../../../src/synapse-client'

vi.mock('../../../src/synapse-client', () => ({
  default: {
    getEntity: vi.fn(),
    getQueryTableAsyncJobResults: vi.fn(),
  },
}))

const mockGetEntity = vi.mocked(SynapseClient.getEntity)
const mockGetQueryTableAsyncJobResults = vi.mocked(
  SynapseClient.getQueryTableAsyncJobResults,
)

const defaultProps: StandaloneQueryWrapperProps = {
  sql: 'select * from syn123',
  rgbIndex: 7,
}

function renderComponent(
  propOverrides?: Partial<StandaloneQueryWrapperProps>,
  wrapperProps?: SynapseContextType,
) {
  return render(
    <StandaloneQueryWrapper {...defaultProps} {...propOverrides} />,
    {
      wrapper: createWrapper(wrapperProps),
    },
  )
}

describe('StandaloneQueryWrapper rendering tests', () => {
  it('renders a Synapse table', async () => {
    const data = syn20337467Json as QueryResultBundle
    mockGetEntity.mockResolvedValue({
      id: 'syn123',
      concreteType: 'org.sagebionetworks.repo.model.table.EntityView',
    })
    mockGetQueryTableAsyncJobResults.mockImplementation(queryBundleRequest => {
      return Promise.resolve({
        requestBody: queryBundleRequest,
        jobState: 'COMPLETE',
        responseBody: data,
      })
    })

    renderComponent({
      rgbIndex: 7,
      title: 'Tools',
      name: 'Tools',
      sql: 'SELECT * FROM syn20337467',
    })

    await waitFor(() => {
      expect(screen.getAllByTestId('SynapseTable').length).toBe(1)
      expect(screen.queryByTestId('TopLevelControls')).toBeNull()
    })
  })

  it('renders a Synapse table with top level controls', async () => {
    const data = syn20337467Json as QueryResultBundle
    mockGetEntity.mockResolvedValue({
      id: 'syn123',
      concreteType: 'org.sagebionetworks.repo.model.table.EntityView',
    })
    mockGetQueryTableAsyncJobResults.mockImplementation(queryBundleRequest => {
      return Promise.resolve({
        requestBody: queryBundleRequest,
        jobState: 'COMPLETE',
        responseBody: data,
      })
    })

    renderComponent({
      rgbIndex: 7,
      title: 'Tools',
      name: 'Tools',
      sql: 'SELECT * FROM syn20337467',
      showTopLevelControls: true,
    })

    await waitFor(() => {
      expect(screen.getAllByTestId('SynapseTable').length).toBe(1)
      expect(screen.getAllByTestId('TopLevelControls').length).toBe(1)
    })
  })
})
