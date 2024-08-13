import '@testing-library/jest-dom'
import { act, render, screen } from '@testing-library/react'
import React from 'react'
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils'
import UserProjects from './UserProjects'
import { ProjectHeader } from '@sage-bionetworks/synapse-types'
import { SynapseTestContext } from '../../mocks/MockSynapseContext'
import SynapseClient from '../../synapse-client'

const userId = '10000'
const page1: Partial<ProjectHeader>[] = [
  {
    id: 'syn1',
    lastActivity: 'today',
    modifiedBy: 10001,
    modifiedOn: 'yesterday',
    name: 'The first',
  },
]

const page2: Partial<ProjectHeader>[] = [
  {
    id: 'syn2',
    lastActivity: 'today',
    modifiedBy: 10001,
    modifiedOn: 'yesterday',
    name: 'The second',
  },
]

vi.spyOn(SynapseClient, 'getUserProjects').mockImplementation(
  (_userId, params, _accessToken) => {
    if (!params?.nextPageToken) {
      return Promise.resolve({
        results: page1 as ProjectHeader[],
        nextPageToken: 'fake-npt',
      })
    } else {
      return Promise.resolve({
        results: page2 as ProjectHeader[],
        nextPageToken: undefined,
      })
    }
  },
)

function renderComponent() {
  return render(
    <SynapseTestContext>
      <UserProjects userId={userId} />
    </SynapseTestContext>,
  )
}

describe('UserProjects tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })
  it('loads more available projects when inView', async () => {
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
