import React from 'react'
import userEvent from '@testing-library/user-event'
import { act, render, screen, waitFor, within } from '@testing-library/react'
import { SubscriptionPage, SynapseClient } from '../../../src'
import { createWrapper } from '../../testutils/TestingLibraryUtils'
import { server } from '../../../mocks/msw/server'
import { SubscriptionObjectType } from '@sage-bionetworks/synapse-types'

async function setUp() {
  const user = userEvent.setup()
  let component
  await act(() => {
    component = render(<SubscriptionPage />, { wrapper: createWrapper() })
  })
  const forumsTab = screen.getByRole('tab', { name: 'Project Forums' })
  const threadsTab = screen.getByRole('tab', { name: 'Threads' })
  const sortMenuButton = screen.getByRole('button', {
    name: /(Date Posted)|(Most Recent)/,
  })
  return { user, component, forumsTab, threadsTab, sortMenuButton }
}

describe('SubscriptionPage', () => {
  beforeAll(() => server.listen())
  afterEach(() => server.restoreHandlers())
  afterAll(() => server.close())

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('Fetches forum subscriptions', async () => {
    const getSubscriptionsSpy = jest.spyOn(SynapseClient, 'getAllSubscriptions')

    const { user, forumsTab, threadsTab } = await setUp()

    expect(forumsTab).toHaveAttribute('aria-selected', 'true')
    expect(threadsTab).toHaveAttribute('aria-selected', 'false')

    await screen.findAllByRole('button', {
      name: 'Unfollow',
    })

    expect(getSubscriptionsSpy).toHaveBeenLastCalledWith(
      expect.anything(),
      expect.anything(),
      undefined,
      expect.objectContaining({
        objectType: SubscriptionObjectType.FORUM,
      }),
    )
  })

  it('Fetches thread subscriptions', async () => {
    const getSubscriptionsSpy = jest.spyOn(SynapseClient, 'getAllSubscriptions')

    const { user, forumsTab, threadsTab } = await setUp()

    await user.click(threadsTab)

    expect(forumsTab).toHaveAttribute('aria-selected', 'false')
    expect(threadsTab).toHaveAttribute('aria-selected', 'true')

    await screen.findAllByRole('button', {
      name: 'Unfollow',
    })

    expect(getSubscriptionsSpy).toHaveBeenLastCalledWith(
      expect.anything(),
      expect.anything(),
      undefined,
      expect.objectContaining({
        objectType: SubscriptionObjectType.THREAD,
      }),
    )
  })

  it('Loads more on click', async () => {
    const getSubscriptionsSpy = jest.spyOn(SynapseClient, 'getAllSubscriptions')

    const { user, forumsTab, threadsTab } = await setUp()

    expect(forumsTab).toHaveAttribute('aria-selected', 'true')
    expect(threadsTab).toHaveAttribute('aria-selected', 'false')

    const unfollowButtonsPage1 = await screen.findAllByRole('button', {
      name: 'Unfollow',
    })

    expect(getSubscriptionsSpy).toHaveBeenLastCalledWith(
      expect.anything(),
      expect.anything(),
      undefined,
      expect.objectContaining({
        objectType: SubscriptionObjectType.FORUM,
      }),
    )

    const loadMoreButton = await screen.findByRole('button', {
      name: 'Load More',
    })
    await user.click(loadMoreButton)

    await waitFor(async () => {
      // Verify more data was loaded
      expect(
        (
          await screen.findAllByRole('button', {
            name: 'Unfollow',
          })
        ).length,
      ).toBeGreaterThan(unfollowButtonsPage1.length)
      // Verify API client was called with offset
      expect(getSubscriptionsSpy).toHaveBeenLastCalledWith(
        expect.anything(),
        expect.anything(),
        unfollowButtonsPage1.length,
        expect.objectContaining({
          objectType: SubscriptionObjectType.FORUM,
        }),
      )
    })
  })

  it('Handles changing the sort', async () => {
    const getSubscriptionsSpy = jest.spyOn(SynapseClient, 'getAllSubscriptions')

    const { user, sortMenuButton } = await setUp()

    // Default sort is "ASC" a.k.a. "Date Posted"
    within(sortMenuButton).getByText('Date Posted')

    await waitFor(() => {
      expect(getSubscriptionsSpy).toHaveBeenLastCalledWith(
        expect.anything(),
        expect.anything(),
        undefined,
        expect.objectContaining({
          objectType: SubscriptionObjectType.FORUM,
          sortDirection: 'ASC',
        }),
      )
    })

    // Change sort to "DESC" a.k.a. "Most Recent"
    await user.click(sortMenuButton)
    const sortOptionMenu = await screen.findByRole('menu')
    const descOption = within(sortOptionMenu).getByRole('menuitem', {
      name: 'Most Recent',
    })
    await user.click(descOption)

    await waitFor(async () => {
      expect(getSubscriptionsSpy).toHaveBeenLastCalledWith(
        expect.anything(),
        expect.anything(),
        undefined,
        expect.objectContaining({
          objectType: SubscriptionObjectType.FORUM,
          sortDirection: 'DESC',
        }),
      )
    })
  })

  it('Handles unsubscribing from a thread', async () => {
    const deleteSubscriptionSpy = jest.spyOn(
      SynapseClient,
      'deleteSubscription',
    )

    const { user } = await setUp()

    const unfollowButtons = await screen.findAllByRole('button', {
      name: 'Unfollow',
    })

    // Unsubscribe to the first item
    expect(deleteSubscriptionSpy).not.toHaveBeenCalled()
    await user.click(unfollowButtons[0])
    // update mock to return unsubscribed
    expect(deleteSubscriptionSpy).toHaveBeenCalled()
  })
})
