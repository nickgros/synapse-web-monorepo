import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'
import { MemoryRouter } from 'react-router'
import { server } from '@/mocks/msw/server'
import { createWrapper } from '@/testutils/TestingLibraryUtils'
import { AridhiaContextProvider } from '@/utils/context/AridhiaContext'
import AridhiaAccessStatus from './AridhiaAccessStatus'

const GATEWAY = 'https://mock-gateway.test'
const DATASET_CODE = 'sdtm_als1003'

function renderStatus(url?: string) {
  const Wrapper = createWrapper()
  return render(
    <MemoryRouter>
      <Wrapper>
        <AridhiaContextProvider
          apiBasePath={GATEWAY}
          authenticationRequest={{
            subject_token_type: 'urn:ietf:params:oauth:token-type:access_token',
            subject_token_issuer: 'sage-prod',
          }}
        >
          <AridhiaAccessStatus datasetCode={DATASET_CODE} url={url} />
        </AridhiaContextProvider>
      </Wrapper>
    </MemoryRouter>,
  )
}

function authenticateHandler() {
  return http.post(`${GATEWAY}/authenticate`, () =>
    HttpResponse.json({ access_token: 'mock-aridhia-token', expires_in: 300 }),
  )
}

function requestsHandler(items: unknown[]) {
  return http.get(`${GATEWAY}/fair/requests/`, () =>
    HttpResponse.json({
      items,
      paging: { page: 1, pageSize: 100, total: items.length },
    }),
  )
}

function settingsHandler() {
  return http.get(`${GATEWAY}/fair/datasets/${DATASET_CODE}/settings`, () =>
    HttpResponse.json({
      workflow_key: 'rdca_access_request',
      allow_clear: true,
      allow_pseudonymised: false,
      allow_manual: false,
    }),
  )
}

function workflowHandler() {
  return http.get(`${GATEWAY}/fair/workflows/rdca_access_request`, () =>
    HttpResponse.json({
      code: 'rdca_access_request',
      fields: {
        about: [{ name: 'name', type: 'string', validation: {} }],
        project: [{ name: 'project_name', type: 'string', validation: {} }],
      },
    }),
  )
}

function dictionariesHandler() {
  return http.get(
    `${GATEWAY}/fair/datasets/${DATASET_CODE}/dictionaries/`,
    () =>
      HttpResponse.json({
        items: [{ code: 'dict1', name: 'Dictionary 1' }],
      }),
  )
}

function workspaceLocationsHandler() {
  return http.get(
    `${GATEWAY}/fair/datasets/${DATASET_CODE}/workspaces-locations`,
    () => HttpResponse.json({ items: [{ value: 'uksouth' }] }),
  )
}

function workspacesHandler() {
  return http.get(`${GATEWAY}/fair/datasets/${DATASET_CODE}/workspaces`, () =>
    HttpResponse.json({
      items: [{ uuid: 'ws1', name: 'Workspace 1', location: 'uksouth' }],
    }),
  )
}

function catalogueHandler() {
  return http.get(`${GATEWAY}/fair/datasets/${DATASET_CODE}/catalogue`, () =>
    HttpResponse.json({ title: 'SDTM ALS Dataset' }),
  )
}

describe('AridhiaAccessStatus', () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  it('opens the request wizard in a dialog when no request exists for this dataset', async () => {
    const user = userEvent.setup()
    server.use(authenticateHandler(), requestsHandler([]))
    renderStatus()

    await waitFor(() =>
      expect(document.querySelector('#icon-accessClosed')).toBeInTheDocument(),
    )
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

    await user.click(
      screen.getByRole('button', { name: 'Request data access' }),
    )

    expect(
      screen.getByRole('heading', { name: 'Request Data Access' }),
    ).toBeInTheDocument()
  })

  it('links out to RDCA-DAP when the request is approved', async () => {
    server.use(
      authenticateHandler(),
      requestsHandler([
        {
          code: 'ampals-sdtm_als1003-abc12345',
          status: 'approved',
          datasets: { code: DATASET_CODE },
        },
      ]),
    )
    renderStatus('https://portal.rdca.c-path.org/datasets/sdtm_als1003')

    await waitFor(() =>
      expect(document.querySelector('#icon-accessOpen')).toBeInTheDocument(),
    )
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute(
      'href',
      'https://portal.rdca.c-path.org/datasets/sdtm_als1003',
    )
  })

  it('renders the wizard navigation buttons in a DialogActions footer, not inside the scrollable content', async () => {
    const user = userEvent.setup()
    server.use(
      authenticateHandler(),
      requestsHandler([]),
      settingsHandler(),
      workflowHandler(),
      dictionariesHandler(),
      workspaceLocationsHandler(),
      workspacesHandler(),
      catalogueHandler(),
    )
    renderStatus()

    await waitFor(() =>
      expect(document.querySelector('#icon-accessClosed')).toBeInTheDocument(),
    )
    await user.click(
      screen.getByRole('button', { name: 'Request data access' }),
    )

    const backButton = await screen.findByRole('button', { name: 'Back' })
    const nextButton = screen.getByRole('button', { name: 'Next' })
    const dialogActions = document.querySelector('.MuiDialogActions-root')
    const dialogContent = document.querySelector('.MuiDialogContent-root')

    expect(dialogActions).toContainElement(backButton)
    expect(dialogActions).toContainElement(nextButton)
    expect(dialogContent).not.toContainElement(backButton)
    expect(dialogContent).not.toContainElement(nextButton)
  })

  it('shows a Close action on the submitted confirmation screen that closes the dialog', async () => {
    const user = userEvent.setup()
    server.use(
      authenticateHandler(),
      requestsHandler([]),
      settingsHandler(),
      workflowHandler(),
      dictionariesHandler(),
      workspaceLocationsHandler(),
      workspacesHandler(),
      catalogueHandler(),
      http.post(`${GATEWAY}/fair/requests/`, async ({ request }) => {
        const body = (await request.json()) as Record<string, unknown>
        return HttpResponse.json(
          { ...body, status: 'pending' },
          { status: 201 },
        )
      }),
    )
    renderStatus()

    await waitFor(() =>
      expect(document.querySelector('#icon-accessClosed')).toBeInTheDocument(),
    )
    await user.click(
      screen.getByRole('button', { name: 'Request data access' }),
    )

    await waitFor(() =>
      expect(screen.getByLabelText('Location')).toBeInTheDocument(),
    )
    await user.click(screen.getByLabelText('Location'))
    await user.click(await screen.findByRole('option', { name: 'uksouth' }))
    await waitFor(() =>
      expect(screen.getByLabelText('Workspace')).toBeInTheDocument(),
    )
    await user.click(screen.getByLabelText('Workspace'))
    await user.click(await screen.findByRole('option', { name: 'Workspace 1' }))
    await user.click(screen.getByRole('button', { name: 'Next' }))

    const projectNameInput = await waitFor(() => {
      const input =
        document.querySelector<HTMLInputElement>('#root_project_name')
      expect(input).not.toBeNull()
      return input!
    })
    await user.type(projectNameInput, 'My Research Project')
    await user.click(screen.getByRole('button', { name: 'Next' }))

    const nameInput = await waitFor(() => {
      const input = document.querySelector<HTMLInputElement>('#root_name')
      expect(input).not.toBeNull()
      return input!
    })
    await user.type(nameInput, 'Jane Doe')
    await user.click(screen.getByRole('button', { name: 'Next' }))

    await user.click(await screen.findByRole('checkbox'))
    await user.click(screen.getByRole('button', { name: 'Submit request' }))

    const closeButton = await screen.findByRole('button', { name: 'Close' })
    const dialogActions = document.querySelector('.MuiDialogActions-root')
    expect(dialogActions).toContainElement(closeButton)

    await user.click(closeButton)
    await waitFor(() =>
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument(),
    )
  })
})
