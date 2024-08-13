import '@testing-library/jest-dom'
import { act, render, screen } from '@testing-library/react'
import React from 'react'
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils'
import UserChallenges from './UserChallenges'
import { useGetUserChallengesInfinite } from '../../synapse-queries/user/useGetUserChallenges'
import { ChallengeWithProjectHeader } from '@sage-bionetworks/synapse-types'
import { SynapseTestContext } from '../../mocks/MockSynapseContext'
import {
  FetchPreviousPageOptions,
  InfiniteQueryObserverResult,
  RefetchOptions,
  QueryObserverResult,
} from '@tanstack/query-core'
import { SynapseClientError } from 'src/utils'

vi.mock('../../../src/synapse-queries/user/useGetUserChallenges', () => {
  return {
    useGetUserChallengesInfinite: vi.fn(),
  }
})

const mockFetchNextPage = vi.fn()
const mockUseGetUserChallengesInfinite = vi.mocked(useGetUserChallengesInfinite)
const userId = '10000'
const page1: Partial<ChallengeWithProjectHeader>[] = [
  {
    challenge: {
      id: '100',
      projectId: 'syn100',
      etag: '123456',
      participantTeamId: '1000',
    },
    projectHeader: {
      id: '100',
      name: 'The first',
      benefactorId: 1,
      createdBy: 'x',
      createdOn: 'today',
      modifiedBy: 'y',
      modifiedOn: 'today',
      type: 'org.sagebionetworks.repo.model.Project',
      isLatestVersion: true,
    },
  },
]

const page2: Partial<ChallengeWithProjectHeader>[] = [
  {
    challenge: {
      id: '101',
      projectId: 'syn101',
      etag: '123456',
      participantTeamId: '1000',
    },
    projectHeader: {
      id: '101',
      name: 'The second',
      benefactorId: 1,
      createdBy: 'x',
      createdOn: 'today',
      modifiedBy: 'y',
      modifiedOn: 'today',
      type: 'org.sagebionetworks.repo.model.Project',
      isLatestVersion: true,
    },
  },
]

mockUseGetUserChallengesInfinite.mockReturnValue({
  data: {
    pages: [
      {
        results: page1,
        totalNumberOfResults: 2,
      },
      {
        results: page2,
        totalNumberOfResults: 2,
      },
    ],
    pageParams: [],
  },
  fetchNextPage: mockFetchNextPage,
  hasNextPage: true,
  isLoading: false,
  isSuccess: true,
  error: null,
  isError: false,
  isPending: false,
  isLoadingError: false,
  isRefetchError: false,
  status: 'success',
  fetchPreviousPage: function (
    options?: FetchPreviousPageOptions,
  ): Promise<InfiniteQueryObserverResult<unknown, SynapseClientError>> {
    throw new Error('Function not implemented.')
  },
  hasPreviousPage: false,
  isFetchingNextPage: false,
  isFetchingPreviousPage: false,
  dataUpdatedAt: 0,
  errorUpdatedAt: 0,
  failureCount: 0,
  failureReason: null,
  errorUpdateCount: 0,
  isFetched: false,
  isFetchedAfterMount: false,
  isFetching: false,
  isInitialLoading: false,
  isPaused: false,
  isPlaceholderData: false,
  isRefetching: false,
  isStale: false,
  refetch: function (
    options?: RefetchOptions,
  ): Promise<QueryObserverResult<unknown, SynapseClientError>> {
    throw new Error('Function not implemented.')
  },
  fetchStatus: 'fetching',
})

function renderComponent() {
  return render(
    <SynapseTestContext>
      <UserChallenges userId={userId} />
    </SynapseTestContext>,
  )
}

describe('UserChallenges tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })
  it('loads more challenges when inView', async () => {
    renderComponent()
    const item1 = await screen.findAllByText('The first')
    expect(item1).toHaveLength(1)

    act(() => {
      mockAllIsIntersecting(true)
    })

    const item2 = await screen.findAllByText('The second')
    expect(item2).toHaveLength(1)
  })
})
