import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import dayjs from 'dayjs'
import React from 'react'
import { OAuthManagement } from './OAuthManagement'
import { createWrapper } from '../../testutils/TestingLibraryUtils'
import { formatDate } from '../../utils/functions/DateFormatter'
import { server } from '../../mocks/msw/server'
import { mockClientList1, mockClientList2 } from '../../mocks/oauth/MockClient'

const renderComponent = () => {
  render(<OAuthManagement />, {
    wrapper: createWrapper(),
  })
}

describe('OAuth Client Management tests', () => {
  beforeAll(() => {
    server.listen()
  })
  afterEach(() => {
    server.restoreHandlers()
    vi.clearAllMocks()
  })
  afterAll(() => server.close())

  it('Renders all headers and a row of data', async () => {
    renderComponent()

    // Check column header
    await screen.findByText('Created')
    await screen.findByText('Modified')
    await screen.findByText('Client')
    await screen.findByText('Verified')
    await screen.findByText('App Secret')
    await screen.findByText('Actions')

    // Check first row of data
    screen.findAllByText(
      formatDate(dayjs(mockClientList1.results[0].createdOn)),
    )
    screen.findAllByText(
      formatDate(dayjs(mockClientList1.results[0].modifiedOn)),
    )
    screen.findByText(mockClientList1.results[0].client_name)

    await screen.findByText('Yes')
    await screen.findAllByRole('button', { name: 'Edit' })
    await screen.findAllByRole('button', { name: 'Generate Secret' })
  })

  it('Handles pagination', async () => {
    renderComponent()

    const loadButton = await screen.findByRole('button', { name: 'Load more' })

    await userEvent.click(loadButton)

    await waitFor(() =>
      expect(screen.getAllByRole('row')).toHaveLength(
        mockClientList1.results.length + mockClientList2.results.length + 1,
      ),
    )
  })
})
