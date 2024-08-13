import '@testing-library/jest-dom'
import { act, render, screen } from '@testing-library/react'
import React from 'react'
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils'
import UserTeams from './UserTeams'
import { Team } from '@sage-bionetworks/synapse-types'
import { SynapseTestContext } from '../../mocks/MockSynapseContext'
import SynapseClient from '../../synapse-client'

const userId = '10000'
const page1: Partial<Team>[] = [
  {
    id: '100',
    name: 'The first',
  },
]

const page2: Partial<Team>[] = [
  {
    id: '101',
    name: 'The second',
  },
]

vi.spyOn(SynapseClient, 'getUserTeamList').mockImplementation(
  (_accessToken, _userId, offset, _limit) => {
    if (offset == 0 || offset == null) {
      return Promise.resolve({
        results: page1 as Team[],
        totalNumberOfResults: 2,
      })
    } else if (offset == 1) {
      return Promise.resolve({
        results: page2 as Team[],
        totalNumberOfResults: 2,
      })
    } else {
      throw new Error(
        `Mocked getUserTeamList received unexpected offset: ${offset}`,
      )
    }
  },
)

function renderComponent() {
  return render(
    <SynapseTestContext>
      <UserTeams userId={userId} />
    </SynapseTestContext>,
  )
}

describe('UserTeams tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })
  it('loads more teams when inView', async () => {
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
