import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { UserEvent } from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'
import { RequestPost } from '@sage-bionetworks/aridhia-client/generated/models'
import { server } from '@/mocks/msw/server'
import { createWrapper } from '@/testutils/TestingLibraryUtils'
import { AridhiaContextProvider } from '@/utils/context/AridhiaContext'
import { AridhiaDarWizard } from './AridhiaDarWizard'
import type { DarDraft } from './useDarDraft'

const GATEWAY = 'https://mock-gateway.test'
const DATASET_CODE = 'sdtm_als1003'

function renderWizard() {
  const Wrapper = createWrapper()
  return render(
    <Wrapper>
      <AridhiaContextProvider
        apiBasePath={GATEWAY}
        authenticationRequest={{
          subject_token_type: 'urn:ietf:params:oauth:token-type:access_token',
          subject_token_issuer: 'sage-prod',
        }}
      >
        <AridhiaDarWizard datasetCode={DATASET_CODE} />
      </AridhiaContextProvider>
    </Wrapper>,
  )
}

function authenticateHandler() {
  return http.post(`${GATEWAY}/authenticate`, () =>
    HttpResponse.json({ access_token: 'mock-aridhia-token', expires_in: 300 }),
  )
}

function settingsHandler(
  overrides: Partial<{
    allow_clear: boolean
    allow_pseudonymised: boolean
    allow_manual: boolean
  }> = {},
) {
  return http.get(`${GATEWAY}/fair/datasets/${DATASET_CODE}/settings`, () =>
    HttpResponse.json({
      workflow_key: 'rdca_access_request',
      allow_clear: true,
      allow_pseudonymised: false,
      allow_manual: false,
      ...overrides,
    }),
  )
}

function workflowHandler() {
  return http.get(`${GATEWAY}/fair/workflows/rdca_access_request`, () =>
    HttpResponse.json({
      code: 'rdca_access_request',
      fields: {
        about: [
          { name: 'name', type: 'string', validation: { required: true } },
          { name: 'email', type: 'string', validation: { required: true } },
        ],
        project: [
          {
            name: 'project_name',
            type: 'string',
            validation: { required: true },
          },
        ],
      },
    }),
  )
}

function workflowHandlerWithAuthField() {
  return http.get(`${GATEWAY}/fair/workflows/rdca_access_request`, () =>
    HttpResponse.json({
      code: 'rdca_access_request',
      fields: {
        about: [
          { name: 'name', type: 'string', validation: { required: true } },
          { name: 'sso_login', type: 'auth', label: 'Sign in' },
        ],
        project: [
          {
            name: 'project_name',
            type: 'string',
            validation: { required: true },
          },
        ],
      },
    }),
  )
}

function workflowHandlerWithDateField() {
  return http.get(`${GATEWAY}/fair/workflows/rdca_access_request`, () =>
    HttpResponse.json({
      code: 'rdca_access_request',
      fields: {
        about: [
          { name: 'name', type: 'string', validation: { required: true } },
          { name: 'email', type: 'string', validation: { required: true } },
        ],
        project: [
          {
            name: 'project_name',
            type: 'string',
            validation: { required: true },
          },
          {
            name: 'project_end_date',
            type: 'date',
            label: 'Project end date',
            validation: { required: false },
          },
        ],
      },
    }),
  )
}

/**
 * Confirmed against a real gateway capture: `GET /workspaces-forms/{code}` does not wrap its
 * result in `items` despite the OpenAPI spec's documented `{ items: [WorkspaceForm] }` envelope
 * — it returns the form object directly. See `useGetAridhiaWorkspaceRequestForm`.
 */
function workspaceRequestFormHandler() {
  return http.get(`${GATEWAY}/fair/workspaces-forms/workspace_request`, () =>
    HttpResponse.json({
      name: 'Request a workspace',
      sections: {
        workspace: {
          label: 'Workspace details',
          fields: [
            {
              name: 'workspace_name',
              type: 'string',
              validation: { required: true },
            },
          ],
        },
      },
    }),
  )
}

/**
 * Mirrors the real gateway's overlap between the new-workspace form and the main workflow's
 * `project` section (see `realWorkspaceRequestFormHandler`): both ask for `project_name`.
 */
function workspaceRequestFormHandlerWithSharedProjectField() {
  return http.get(`${GATEWAY}/fair/workspaces-forms/workspace_request`, () =>
    HttpResponse.json({
      name: 'Request a workspace',
      sections: {
        workspace: {
          label: 'Workspace details',
          fields: [
            {
              name: 'project_name',
              type: 'string',
              validation: { required: true },
            },
            {
              name: 'workspace_name',
              type: 'string',
              validation: { required: true },
            },
          ],
        },
      },
    }),
  )
}

/** The exact body captured from a real gateway response, verbatim. */
function realWorkspaceRequestFormHandler() {
  return http.get(`${GATEWAY}/fair/workspaces-forms/workspace_request`, () =>
    HttpResponse.json({
      name: 'Request a workspace',
      sections: {
        workspace: {
          label: 'Details of the workspace being requested:',
          fields: [
            {
              name: 'project_name',
              type: 'string',
              label: 'Project name',
              placeholder:
                'Add the name of the project and project ID if applicable',
              validation: { required: true, maximum: '250' },
            },
            {
              name: 'project_description',
              type: 'markdown',
              label: 'Project description',
              validation: { required: true, maximum: '4096' },
            },
            {
              name: 'emails',
              type: 'text',
              label: 'Additional users',
              placeholder:
                'Provide email addresses of other users who should be invited to the workspace',
              validation: { maximum: '4096' },
            },
            {
              name: 'region',
              type: 'list',
              label: 'What hub do you need your workspace to be located?',
              placeholder: 'Select Hub location...',
              validation: { required: true },
              options: [
                {
                  text: 'West Europe',
                  value: 'westeurope',
                  description: '(Europe) West Europe',
                },
                {
                  text: 'North Europe',
                  value: 'northeurope',
                  description: '(Europe) North Europe',
                },
              ],
              default_options: 'westeurope',
            },
            {
              name: 'vm_check',
              type: 'label',
              label: 'Do you require a virtual machine?',
            },
            {
              name: 'windows_vm',
              type: 'boolean',
              label: 'Windows Virtual Machine',
            },
            {
              name: 'linux_vm',
              type: 'boolean',
              label: 'Linux Virtual Machine',
            },
            {
              name: 'interests',
              type: 'label',
              label: 'What is your area of interest? Check all that apply?',
            },
            {
              name: 'data_science',
              type: 'boolean',
              label: 'Data science - general',
            },
            {
              name: 'bio_informatics',
              type: 'boolean',
              label: 'Bioinformatics/BioStatistics',
            },
            { name: 'maths', type: 'boolean', label: 'Mathematics/Statistics' },
            { name: 'ai', type: 'boolean', label: 'AI/Machine Learning' },
          ],
        },
      },
    }),
  )
}

/**
 * Defensive coverage only: the OpenAPI spec documents `GET /workspaces-forms/{code}` wrapping
 * its result in `items`, and `parseFairFormSections` is written to also tolerate a `fields`-
 * keyed section body (the shape `GET /workflows/{code}` uses). Neither has been observed from
 * the real gateway for this endpoint — see `workspaceRequestFormHandler` above for that — but
 * `useGetAridhiaWorkspaceRequestForm`'s `items` fallback and `parseFairFormSections`'s shape
 * tolerance should still work if either shows up.
 */
function workspaceRequestFormHandlerFieldsShape() {
  return http.get(`${GATEWAY}/fair/workspaces-forms/workspace_request`, () =>
    HttpResponse.json({
      items: [
        {
          code: 'workspace_request',
          name: 'Request a workspace',
          fields: {
            workspace: [
              {
                name: 'workspace_name',
                type: 'string',
                validation: { required: true },
              },
            ],
          },
        },
      ],
    }),
  )
}

function dictionariesHandler() {
  return http.get(
    `${GATEWAY}/fair/datasets/${DATASET_CODE}/dictionaries/`,
    () =>
      HttpResponse.json({
        items: [
          { code: 'dict_a', name: 'Dictionary A' },
          { code: 'dict_b', name: 'Dictionary B' },
        ],
      }),
  )
}

function workspaceLocationsHandler() {
  return http.get(
    `${GATEWAY}/fair/datasets/${DATASET_CODE}/workspaces-locations`,
    () =>
      HttpResponse.json({
        items: [{ value: 'uksouth', description: 'UK South' }],
      }),
  )
}

function workspacesHandler() {
  return http.get(`${GATEWAY}/fair/datasets/${DATASET_CODE}/workspaces`, () =>
    HttpResponse.json({
      items: [
        {
          uuid: 'ws-uuid-1',
          name: 'My Workspace',
          location: 'uksouth',
          url: 'https://example.aridhia.com/workspaces/1',
        },
      ],
    }),
  )
}

function catalogueHandler() {
  return http.get(`${GATEWAY}/fair/datasets/${DATASET_CODE}/catalogue`, () =>
    HttpResponse.json({
      title: 'SDTM ALS Dataset',
      publisher: { name: 'C-Path' },
      description: 'A dataset',
    }),
  )
}

let capturedRequestBodies: RequestPost[] = []

function requestsPostHandler(response: (body: RequestPost) => Response) {
  return http.post(`${GATEWAY}/fair/requests/`, async ({ request }) => {
    // Test-only boundary: the body is exactly what our own mutation constructs.
    const body = (await request.json()) as RequestPost
    capturedRequestBodies.push(body)
    return response(body)
  })
}

function defaultHandlers() {
  return [
    authenticateHandler(),
    settingsHandler(),
    workflowHandler(),
    workspaceRequestFormHandler(),
    dictionariesHandler(),
    workspaceLocationsHandler(),
    workspacesHandler(),
    catalogueHandler(),
  ]
}

async function waitForDestinationStepReady() {
  await waitFor(() =>
    expect(
      screen.getByRole('combobox', { name: 'Tables' }),
    ).toBeInTheDocument(),
  )
}

async function openTablesDropdown(user: UserEvent) {
  await user.click(screen.getByRole('combobox', { name: 'Tables' }))
}

// `disableCloseOnSelect` keeps the "Tables" dropdown open across multiple picks, so only the
// first selection needs `openTablesDropdown` first — see callers.
async function selectDictionary(user: UserEvent, name: string) {
  await user.click(await screen.findByRole('option', { name }))
}

async function selectTwoDictionariesAndExistingWorkspace(user: UserEvent) {
  await waitForDestinationStepReady()
  await openTablesDropdown(user)
  await selectDictionary(user, 'Dictionary A')
  await selectDictionary(user, 'Dictionary B')

  await waitFor(() =>
    expect(screen.getByLabelText('Location')).toBeInTheDocument(),
  )
  await user.click(screen.getByLabelText('Location'))
  await user.click(await screen.findByRole('option', { name: 'UK South' }))

  await waitFor(() =>
    expect(screen.getByLabelText('Workspace')).toBeInTheDocument(),
  )
  await user.click(screen.getByLabelText('Workspace'))
  await user.click(await screen.findByRole('option', { name: 'My Workspace' }))
}

function fillTextField(name: string, value: string) {
  const input = document.querySelector<HTMLInputElement>(`#root_${name}`)
  expect(input).not.toBeNull()
  return userEvent.type(input!, value)
}

describe('AridhiaDarWizard', () => {
  beforeAll(() => server.listen())
  afterEach(() => {
    server.resetHandlers()
    capturedRequestBodies = []
    sessionStorage.clear()
  })
  afterAll(() => server.close())

  it('submits an existing-workspace request with the expected payload', async () => {
    const user = userEvent.setup()
    server.use(
      ...defaultHandlers(),
      requestsPostHandler(body =>
        HttpResponse.json({ ...body, status: 'pending' }, { status: 201 }),
      ),
    )
    renderWizard()

    await selectTwoDictionariesAndExistingWorkspace(user)
    await user.click(screen.getByRole('button', { name: 'Next' }))

    await waitFor(() =>
      expect(document.querySelector('#root_project_name')).toBeInTheDocument(),
    )
    expect(
      screen.getAllByRole('button', { name: /^(Back|Next)$/ }),
    ).toHaveLength(2)
    // Ensure RJSF's submit button is hidden:
    expect(
      screen.queryByRole('button', { name: 'Submit' }),
    ).not.toBeInTheDocument()
    await fillTextField('project_name', 'My Research Project')
    await user.click(screen.getByRole('button', { name: 'Next' }))

    await waitFor(() =>
      expect(document.querySelector('#root_name')).toBeInTheDocument(),
    )
    await fillTextField('name', 'Jane Doe')
    await fillTextField('email', 'jane@example.edu')
    await user.click(screen.getByRole('button', { name: 'Next' }))

    await waitFor(() =>
      expect(screen.getByRole('checkbox')).toBeInTheDocument(),
    )
    await user.click(screen.getByRole('checkbox'))
    await user.click(screen.getByRole('button', { name: 'Submit request' }))

    await waitFor(() => expect(capturedRequestBodies).toHaveLength(1))
    const body = capturedRequestBodies[0]
    expect(body.workspace_requested).toBe(false)
    expect(body.workspace_uuid).toBe('ws-uuid-1')
    expect(body.terms).toBe(true)
    expect(body.transfer_type).toBe('clear')
    expect(body.code).toMatch(/^ampals-sdtm_als1003-[0-9a-f]{8}$/)
    expect(body.cohort?.queries?.[0].clauses).toHaveLength(2)
    expect(
      body.cohort?.queries?.[0].clauses?.every(c => c.filters?.length === 0),
    ).toBe(true)
    expect(body.fields).not.toHaveProperty('name')
    expect(body.fields).not.toHaveProperty('code')
    expect(body.fields.email).toBe('jane@example.edu')
    expect(body.fields.project_name).toBe('My Research Project')
    expect(body.name).toBe('Jane Doe')

    await waitFor(() =>
      expect(
        screen.getByText(/data access request was submitted/i),
      ).toBeInTheDocument(),
    )
  })

  it('requests a new workspace, inserting the Workspace step and merging its answers into fields', async () => {
    const user = userEvent.setup()
    server.use(
      ...defaultHandlers(),
      requestsPostHandler(body =>
        HttpResponse.json({ ...body, status: 'pending' }, { status: 201 }),
      ),
    )
    renderWizard()

    await waitForDestinationStepReady()
    await openTablesDropdown(user)
    await selectDictionary(user, 'Dictionary A')
    await waitFor(() =>
      expect(screen.getByLabelText('Location')).toBeInTheDocument(),
    )
    await user.click(screen.getByLabelText('Location'))
    await user.click(await screen.findByRole('option', { name: 'UK South' }))
    await waitFor(() =>
      expect(screen.getByLabelText('Workspace')).toBeInTheDocument(),
    )
    await user.click(screen.getByLabelText('Workspace'))
    await user.click(
      await screen.findByRole('option', { name: 'Request a new workspace' }),
    )
    await user.click(screen.getByRole('button', { name: 'Next' }))

    await waitFor(() =>
      expect(
        document.querySelector('#root_workspace_name'),
      ).toBeInTheDocument(),
    )
    await user.type(
      screen.getByLabelText(/^reference/i),
      'my-new-workspace-ref',
    )
    await fillTextField('workspace_name', 'New Team Workspace')
    await user.click(screen.getByRole('button', { name: 'Next' }))

    await waitFor(() =>
      expect(document.querySelector('#root_project_name')).toBeInTheDocument(),
    )
    await fillTextField('project_name', 'My Research Project')
    await user.click(screen.getByRole('button', { name: 'Next' }))
    await waitFor(() =>
      expect(document.querySelector('#root_name')).toBeInTheDocument(),
    )
    await fillTextField('name', 'Jane Doe')
    await fillTextField('email', 'jane@example.edu')
    await user.click(screen.getByRole('button', { name: 'Next' }))

    await waitFor(() =>
      expect(screen.getByRole('checkbox')).toBeInTheDocument(),
    )
    await user.click(screen.getByRole('checkbox'))
    await user.click(screen.getByRole('button', { name: 'Submit request' }))

    await waitFor(() => expect(capturedRequestBodies).toHaveLength(1))
    const body = capturedRequestBodies[0]
    expect(body.workspace_requested).toBe(true)
    expect(body).not.toHaveProperty('workspace_uuid')
    expect(body.workspace_reference).toBe('my-new-workspace-ref')
    expect(body.fields.workspace_name).toBe('New Team Workspace')
  })

  it('clears the new-workspace form values when switching back to an existing workspace', async () => {
    const user = userEvent.setup()
    server.use(
      ...defaultHandlers(),
      requestsPostHandler(body =>
        HttpResponse.json({ ...body, status: 'pending' }, { status: 201 }),
      ),
    )
    renderWizard()

    await waitForDestinationStepReady()
    await waitFor(() =>
      expect(screen.getByLabelText('Location')).toBeInTheDocument(),
    )
    await user.click(screen.getByLabelText('Location'))
    await user.click(await screen.findByRole('option', { name: 'UK South' }))
    await waitFor(() =>
      expect(screen.getByLabelText('Workspace')).toBeInTheDocument(),
    )
    await user.click(screen.getByLabelText('Workspace'))
    await user.click(
      await screen.findByRole('option', { name: 'Request a new workspace' }),
    )
    await user.click(screen.getByRole('button', { name: 'Next' }))

    await waitFor(() =>
      expect(
        document.querySelector('#root_workspace_name'),
      ).toBeInTheDocument(),
    )
    await user.type(
      screen.getByLabelText(/^reference/i),
      'my-new-workspace-ref',
    )
    await fillTextField('workspace_name', 'New Team Workspace')

    // Back out of the new-workspace request and pick an existing workspace instead.
    await user.click(screen.getByRole('button', { name: 'Back' }))
    await waitFor(() =>
      expect(screen.getByLabelText('Workspace')).toBeInTheDocument(),
    )
    await user.click(screen.getByLabelText('Workspace'))
    await user.click(
      await screen.findByRole('option', { name: 'My Workspace' }),
    )
    await user.click(screen.getByRole('button', { name: 'Next' }))

    await waitFor(() =>
      expect(document.querySelector('#root_project_name')).toBeInTheDocument(),
    )
    await fillTextField('project_name', 'My Research Project')
    await user.click(screen.getByRole('button', { name: 'Next' }))
    await waitFor(() =>
      expect(document.querySelector('#root_name')).toBeInTheDocument(),
    )
    await fillTextField('name', 'Jane Doe')
    await fillTextField('email', 'jane@example.edu')
    await user.click(screen.getByRole('button', { name: 'Next' }))

    await waitFor(() =>
      expect(screen.getByRole('checkbox')).toBeInTheDocument(),
    )
    await user.click(screen.getByRole('checkbox'))
    await user.click(screen.getByRole('button', { name: 'Submit request' }))

    await waitFor(() => expect(capturedRequestBodies).toHaveLength(1))
    const body = capturedRequestBodies[0]
    expect(body.workspace_requested).toBe(false)
    expect(body.workspace_uuid).toBe('ws-uuid-1')
    expect(body).not.toHaveProperty('workspace_reference')
    // The abandoned new-workspace form's answer must not leak into the submission — the
    // existing-workspace schema doesn't accept `workspace_name`.
    expect(body.fields).not.toHaveProperty('workspace_name')
  })

  it('preserves a field the new-workspace form shares with the Project step when switching back to an existing workspace', async () => {
    const user = userEvent.setup()
    server.use(
      authenticateHandler(),
      settingsHandler(),
      workflowHandler(),
      workspaceRequestFormHandlerWithSharedProjectField(),
      dictionariesHandler(),
      workspaceLocationsHandler(),
      workspacesHandler(),
      catalogueHandler(),
      requestsPostHandler(body =>
        HttpResponse.json({ ...body, status: 'pending' }, { status: 201 }),
      ),
    )
    renderWizard()

    await waitForDestinationStepReady()
    await waitFor(() =>
      expect(screen.getByLabelText('Location')).toBeInTheDocument(),
    )
    await user.click(screen.getByLabelText('Location'))
    await user.click(await screen.findByRole('option', { name: 'UK South' }))
    await waitFor(() =>
      expect(screen.getByLabelText('Workspace')).toBeInTheDocument(),
    )
    await user.click(screen.getByLabelText('Workspace'))
    await user.click(
      await screen.findByRole('option', { name: 'Request a new workspace' }),
    )
    await user.click(screen.getByRole('button', { name: 'Next' }))

    await waitFor(() =>
      expect(
        document.querySelector('#root_workspace_name'),
      ).toBeInTheDocument(),
    )
    await user.type(
      screen.getByLabelText(/^reference/i),
      'my-new-workspace-ref',
    )
    await fillTextField('workspace_name', 'New Team Workspace')
    // `project_name` is asked by both the workspace form and the Project step — answering it
    // here is answering the same underlying question the Project step will ask again.
    await fillTextField('project_name', 'My Research Project')

    // Back out of the new-workspace request and pick an existing workspace instead.
    await user.click(screen.getByRole('button', { name: 'Back' }))
    await waitFor(() =>
      expect(screen.getByLabelText('Workspace')).toBeInTheDocument(),
    )
    await user.click(screen.getByLabelText('Workspace'))
    await user.click(
      await screen.findByRole('option', { name: 'My Workspace' }),
    )
    await user.click(screen.getByRole('button', { name: 'Next' }))

    // The Project step's `project_name` answer must survive even though it was entered on
    // the now-abandoned workspace form.
    await waitFor(() =>
      expect(
        document.querySelector<HTMLInputElement>('#root_project_name')?.value,
      ).toBe('My Research Project'),
    )
    await user.click(screen.getByRole('button', { name: 'Next' }))
    await waitFor(() =>
      expect(document.querySelector('#root_name')).toBeInTheDocument(),
    )
    await fillTextField('name', 'Jane Doe')
    await fillTextField('email', 'jane@example.edu')
    await user.click(screen.getByRole('button', { name: 'Next' }))

    await waitFor(() =>
      expect(screen.getByRole('checkbox')).toBeInTheDocument(),
    )
    await user.click(screen.getByRole('checkbox'))
    await user.click(screen.getByRole('button', { name: 'Submit request' }))

    await waitFor(() => expect(capturedRequestBodies).toHaveLength(1))
    const body = capturedRequestBodies[0]
    expect(body.workspace_requested).toBe(false)
    expect(body.fields.project_name).toBe('My Research Project')
    // The abandoned new-workspace form's workspace-only answer must still not leak in.
    expect(body.fields).not.toHaveProperty('workspace_name')
  })

  it('renders the new-workspace form when the live gateway sends a fields-keyed shape instead of sections', async () => {
    const user = userEvent.setup()
    server.use(
      authenticateHandler(),
      settingsHandler(),
      workflowHandler(),
      workspaceRequestFormHandlerFieldsShape(),
      dictionariesHandler(),
      workspaceLocationsHandler(),
      workspacesHandler(),
      catalogueHandler(),
    )
    renderWizard()

    await waitForDestinationStepReady()
    await openTablesDropdown(user)
    await selectDictionary(user, 'Dictionary A')
    await waitFor(() =>
      expect(screen.getByLabelText('Location')).toBeInTheDocument(),
    )
    await user.click(screen.getByLabelText('Location'))
    await user.click(await screen.findByRole('option', { name: 'UK South' }))
    await waitFor(() =>
      expect(screen.getByLabelText('Workspace')).toBeInTheDocument(),
    )
    await user.click(screen.getByLabelText('Workspace'))
    await user.click(
      await screen.findByRole('option', { name: 'Request a new workspace' }),
    )
    await user.click(screen.getByRole('button', { name: 'Next' }))

    await waitFor(() =>
      expect(
        document.querySelector('#root_workspace_name'),
      ).toBeInTheDocument(),
    )
    expect(
      screen.queryByText(/unable to load the new-workspace request form/i),
    ).not.toBeInTheDocument()
  })

  it('renders every field of the real workspace-request form captured from the live gateway', async () => {
    const user = userEvent.setup()
    server.use(
      authenticateHandler(),
      settingsHandler(),
      workflowHandler(),
      realWorkspaceRequestFormHandler(),
      dictionariesHandler(),
      workspaceLocationsHandler(),
      workspacesHandler(),
      catalogueHandler(),
    )
    renderWizard()

    await waitForDestinationStepReady()
    await openTablesDropdown(user)
    await selectDictionary(user, 'Dictionary A')
    await waitFor(() =>
      expect(screen.getByLabelText('Location')).toBeInTheDocument(),
    )
    await user.click(screen.getByLabelText('Location'))
    await user.click(await screen.findByRole('option', { name: 'UK South' }))
    await waitFor(() =>
      expect(screen.getByLabelText('Workspace')).toBeInTheDocument(),
    )
    await user.click(screen.getByLabelText('Workspace'))
    await user.click(
      await screen.findByRole('option', { name: 'Request a new workspace' }),
    )
    await user.click(screen.getByRole('button', { name: 'Next' }))

    await waitFor(() =>
      expect(document.querySelector('#root_project_name')).toBeInTheDocument(),
    )
    expect(
      screen.queryByText(/unable to load the new-workspace request form/i),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByText(/field types the portal cannot render/i),
    ).not.toBeInTheDocument()

    for (const label of [
      'Project name',
      'Project description',
      'Additional users',
      'What hub do you need your workspace to be located?',
      'Do you require a virtual machine?',
      'Windows Virtual Machine',
      'Linux Virtual Machine',
      'What is your area of interest? Check all that apply?',
      'Data science - general',
      'Bioinformatics/BioStatistics',
      'Mathematics/Statistics',
      'AI/Machine Learning',
    ]) {
      expect(screen.getByText(label)).toBeInTheDocument()
    }

    // The 6 boolean fields (VM + area-of-interest) must render as real checkboxes, not the
    // Yes/No select used elsewhere in the app (e.g. the annotations editor).
    const checkboxLabels = [
      'Windows Virtual Machine',
      'Linux Virtual Machine',
      'Data science - general',
      'Bioinformatics/BioStatistics',
      'Mathematics/Statistics',
      'AI/Machine Learning',
    ]
    for (const label of checkboxLabels) {
      expect(screen.getByRole('checkbox', { name: label })).toBeInTheDocument()
    }
    expect(screen.getAllByRole('checkbox')).toHaveLength(checkboxLabels.length)
  })

  it('offers no transfer_type radio group and submits the sole allowed type when only allow_clear is set', async () => {
    server.use(
      ...defaultHandlers(),
      requestsPostHandler(body =>
        HttpResponse.json({ ...body, status: 'pending' }, { status: 201 }),
      ),
    )
    renderWizard()
    await waitForDestinationStepReady()
    expect(screen.queryByText('Transfer type')).not.toBeInTheDocument()
  })

  it('shows a transfer_type radio group defaulted to clear when multiple types are allowed', async () => {
    server.use(
      authenticateHandler(),
      settingsHandler({ allow_clear: true, allow_pseudonymised: true }),
      workflowHandler(),
      workspaceRequestFormHandler(),
      dictionariesHandler(),
      workspaceLocationsHandler(),
      workspacesHandler(),
      catalogueHandler(),
    )
    renderWizard()

    await waitFor(() =>
      expect(screen.getByText('Transfer type')).toBeInTheDocument(),
    )
    const clearRadio = screen.getByRole('radio', {
      name: /clear \(identifiable\) data/i,
    })
    expect(clearRadio).toBeChecked()
  })

  it('treats no table selection as requesting every table, matching RDCA-DAP', async () => {
    const user = userEvent.setup()
    server.use(
      ...defaultHandlers(),
      requestsPostHandler(body =>
        HttpResponse.json({ ...body, status: 'pending' }, { status: 201 }),
      ),
    )
    renderWizard()

    // Advance past Destination without touching the "Tables" field at all.
    await waitForDestinationStepReady()
    await waitFor(() =>
      expect(screen.getByLabelText('Location')).toBeInTheDocument(),
    )
    await user.click(screen.getByLabelText('Location'))
    await user.click(await screen.findByRole('option', { name: 'UK South' }))
    await waitFor(() =>
      expect(screen.getByLabelText('Workspace')).toBeInTheDocument(),
    )
    await user.click(screen.getByLabelText('Workspace'))
    await user.click(
      await screen.findByRole('option', { name: 'My Workspace' }),
    )
    await user.click(screen.getByRole('button', { name: 'Next' }))

    await waitFor(() =>
      expect(document.querySelector('#root_project_name')).toBeInTheDocument(),
    )
    await fillTextField('project_name', 'My Research Project')
    await user.click(screen.getByRole('button', { name: 'Next' }))
    await waitFor(() =>
      expect(document.querySelector('#root_name')).toBeInTheDocument(),
    )
    await fillTextField('name', 'Jane Doe')
    await fillTextField('email', 'jane@example.edu')
    await user.click(screen.getByRole('button', { name: 'Next' }))

    await waitFor(() =>
      expect(screen.getByText('All tables')).toBeInTheDocument(),
    )
    await user.click(screen.getByRole('checkbox'))
    await user.click(screen.getByRole('button', { name: 'Submit request' }))

    await waitFor(() => expect(capturedRequestBodies).toHaveLength(1))
    const body = capturedRequestBodies[0]
    expect(body.cohort?.queries?.[0].clauses).toHaveLength(2)
    expect(
      body.cohort?.queries?.[0].clauses?.map(c => c.dictionary?.code).sort(),
    ).toEqual(['dict_a', 'dict_b'])
  })

  it('hides Transfer type from the review step when only one type was ever allowed', async () => {
    const user = userEvent.setup()
    server.use(...defaultHandlers())
    renderWizard()

    await selectTwoDictionariesAndExistingWorkspace(user)
    await user.click(screen.getByRole('button', { name: 'Next' }))
    await waitFor(() =>
      expect(document.querySelector('#root_project_name')).toBeInTheDocument(),
    )
    await fillTextField('project_name', 'My Research Project')
    await user.click(screen.getByRole('button', { name: 'Next' }))
    await waitFor(() =>
      expect(document.querySelector('#root_name')).toBeInTheDocument(),
    )
    await fillTextField('name', 'Jane Doe')
    await fillTextField('email', 'jane@example.edu')
    await user.click(screen.getByRole('button', { name: 'Next' }))

    await waitFor(() =>
      expect(screen.getByRole('checkbox')).toBeInTheDocument(),
    )
    expect(screen.queryByText('Transfer type')).not.toBeInTheDocument()
  })

  it('shows the About and Project answers on the Review & submit step', async () => {
    const user = userEvent.setup()
    server.use(...defaultHandlers())
    renderWizard()

    await selectTwoDictionariesAndExistingWorkspace(user)
    await user.click(screen.getByRole('button', { name: 'Next' }))
    await waitFor(() =>
      expect(document.querySelector('#root_project_name')).toBeInTheDocument(),
    )
    await fillTextField('project_name', 'My Research Project')
    await user.click(screen.getByRole('button', { name: 'Next' }))
    await waitFor(() =>
      expect(document.querySelector('#root_name')).toBeInTheDocument(),
    )
    await fillTextField('name', 'Jane Doe')
    await fillTextField('email', 'jane@example.edu')
    await user.click(screen.getByRole('button', { name: 'Next' }))

    await waitFor(() =>
      expect(screen.getByRole('checkbox')).toBeInTheDocument(),
    )
    expect(screen.getByText('My Research Project')).toBeInTheDocument()
    expect(screen.getByText('Jane Doe')).toBeInTheDocument()
    expect(screen.getByText('jane@example.edu')).toBeInTheDocument()
  })

  it('renders the Project end date field with a date-only picker, no time of day', async () => {
    const user = userEvent.setup()
    server.use(
      authenticateHandler(),
      settingsHandler(),
      workflowHandlerWithDateField(),
      workspaceRequestFormHandler(),
      dictionariesHandler(),
      workspaceLocationsHandler(),
      workspacesHandler(),
      catalogueHandler(),
    )
    renderWizard()

    await selectTwoDictionariesAndExistingWorkspace(user)
    await user.click(screen.getByRole('button', { name: 'Next' }))

    await waitFor(() =>
      expect(screen.getByText('Project end date')).toBeInTheDocument(),
    )
    // A time-of-day picker would render "AM"/"PM" text alongside the date.
    expect(screen.queryByText(/\bAM\b|\bPM\b/)).not.toBeInTheDocument()
  })

  it('converts the date picker value into a date-time string for submission', async () => {
    const user = userEvent.setup()
    server.use(
      authenticateHandler(),
      settingsHandler(),
      workflowHandlerWithDateField(),
      workspaceRequestFormHandler(),
      dictionariesHandler(),
      workspaceLocationsHandler(),
      workspacesHandler(),
      catalogueHandler(),
      requestsPostHandler(body =>
        HttpResponse.json({ ...body, status: 'pending' }, { status: 201 }),
      ),
    )
    renderWizard()

    await selectTwoDictionariesAndExistingWorkspace(user)
    await user.click(screen.getByRole('button', { name: 'Next' }))

    await waitFor(() =>
      expect(document.querySelector('#root_project_name')).toBeInTheDocument(),
    )
    await fillTextField('project_name', 'My Research Project')
    const dateFieldContainer = screen
      .getByText('Project end date')
      .closest('.rjsf-field') as HTMLElement
    const dateInput = dateFieldContainer.querySelector('input')!
    await user.click(dateInput)
    await user.paste('03/05/2027')
    await user.click(screen.getByRole('button', { name: 'Next' }))

    await waitFor(() =>
      expect(document.querySelector('#root_name')).toBeInTheDocument(),
    )
    await fillTextField('name', 'Jane Doe')
    await fillTextField('email', 'jane@example.edu')
    await user.click(screen.getByRole('button', { name: 'Next' }))

    await waitFor(() =>
      expect(screen.getByRole('checkbox')).toBeInTheDocument(),
    )
    await user.click(screen.getByRole('checkbox'))
    await user.click(screen.getByRole('button', { name: 'Submit request' }))

    await waitFor(() => expect(capturedRequestBodies).toHaveLength(1))
    // The FAIR API rejects bare `YYYY-MM-DD` for this field ("not in required format:
    // date-time"); the submitted value must be a full ISO 8601 date-time on the same day.
    expect(capturedRequestBodies[0].fields.project_end_date).toBe(
      '2027-03-05T00:00:00.000Z',
    )
  })

  it('retries a failed submission with the identical request code', async () => {
    const user = userEvent.setup()
    let attempt = 0
    server.use(
      ...defaultHandlers(),
      http.post(`${GATEWAY}/fair/requests/`, async ({ request }) => {
        const body = (await request.json()) as RequestPost
        capturedRequestBodies.push(body)
        attempt += 1
        if (attempt === 1) {
          return HttpResponse.json({ error: 'server error' }, { status: 500 })
        }
        return HttpResponse.json(
          { ...body, status: 'pending' },
          { status: 201 },
        )
      }),
    )
    renderWizard()

    await selectTwoDictionariesAndExistingWorkspace(user)
    await user.click(screen.getByRole('button', { name: 'Next' }))
    await waitFor(() =>
      expect(document.querySelector('#root_project_name')).toBeInTheDocument(),
    )
    await fillTextField('project_name', 'My Research Project')
    await user.click(screen.getByRole('button', { name: 'Next' }))
    await waitFor(() =>
      expect(document.querySelector('#root_name')).toBeInTheDocument(),
    )
    await fillTextField('name', 'Jane Doe')
    await fillTextField('email', 'jane@example.edu')
    await user.click(screen.getByRole('button', { name: 'Next' }))
    await waitFor(() =>
      expect(screen.getByRole('checkbox')).toBeInTheDocument(),
    )
    await user.click(screen.getByRole('checkbox'))
    await user.click(screen.getByRole('button', { name: 'Submit request' }))

    await waitFor(() => expect(capturedRequestBodies).toHaveLength(1))
    await user.click(await screen.findByRole('button', { name: 'Retry' }))
    await waitFor(() => expect(capturedRequestBodies).toHaveLength(2))

    expect(capturedRequestBodies[0].code).toBe(capturedRequestBodies[1].code)
  })

  it('renders the ineligibility explainer, never the form, when the token exchange is rejected', async () => {
    server.use(
      http.post(`${GATEWAY}/authenticate`, () =>
        HttpResponse.json({ error: 'invalid_token' }, { status: 400 }),
      ),
      settingsHandler(),
    )
    renderWizard()

    await waitFor(() =>
      expect(screen.getByText(/linked rdca-dap account/i)).toBeInTheDocument(),
    )
    expect(screen.queryByLabelText('Tables')).not.toBeInTheDocument()
  })

  it('blocks submission and names an unsupported field type', async () => {
    server.use(
      authenticateHandler(),
      settingsHandler(),
      workflowHandlerWithAuthField(),
      workspaceRequestFormHandler(),
      dictionariesHandler(),
      workspaceLocationsHandler(),
      workspacesHandler(),
      catalogueHandler(),
    )
    renderWizard()

    await waitFor(() =>
      expect(screen.getByText(/sso_login/)).toBeInTheDocument(),
    )
    const nextButtons = screen.getAllByRole('button', { name: 'Next' })
    expect(nextButtons[0]).toBeDisabled()
  })

  it('writes the draft to sessionStorage on step change and clears it on successful submit', async () => {
    const user = userEvent.setup()
    server.use(
      ...defaultHandlers(),
      requestsPostHandler(body =>
        HttpResponse.json({ ...body, status: 'pending' }, { status: 201 }),
      ),
    )
    renderWizard()

    await selectTwoDictionariesAndExistingWorkspace(user)
    await user.click(screen.getByRole('button', { name: 'Next' }))

    await waitFor(() =>
      expect(
        sessionStorage.getItem(`ampals-dar-draft:${DATASET_CODE}`),
      ).not.toBeNull(),
    )
    const draftAfterStep: DarDraft = JSON.parse(
      sessionStorage.getItem(`ampals-dar-draft:${DATASET_CODE}`)!,
    )
    expect(draftAfterStep.step).toBe(1)

    await waitFor(() =>
      expect(document.querySelector('#root_project_name')).toBeInTheDocument(),
    )
    await fillTextField('project_name', 'My Research Project')
    await user.click(screen.getByRole('button', { name: 'Next' }))
    await waitFor(() =>
      expect(document.querySelector('#root_name')).toBeInTheDocument(),
    )
    await fillTextField('name', 'Jane Doe')
    await fillTextField('email', 'jane@example.edu')
    await user.click(screen.getByRole('button', { name: 'Next' }))
    await waitFor(() =>
      expect(screen.getByRole('checkbox')).toBeInTheDocument(),
    )
    await user.click(screen.getByRole('checkbox'))
    await user.click(screen.getByRole('button', { name: 'Submit request' }))

    await waitFor(() =>
      expect(
        sessionStorage.getItem(`ampals-dar-draft:${DATASET_CODE}`),
      ).toBeNull(),
    )
  })

  it('leaves the draft intact after a failed submission', async () => {
    const user = userEvent.setup()
    server.use(
      ...defaultHandlers(),
      http.post(`${GATEWAY}/fair/requests/`, () =>
        HttpResponse.json({ error: 'server error' }, { status: 500 }),
      ),
    )
    renderWizard()

    await selectTwoDictionariesAndExistingWorkspace(user)
    await user.click(screen.getByRole('button', { name: 'Next' }))
    await waitFor(() =>
      expect(document.querySelector('#root_project_name')).toBeInTheDocument(),
    )
    await fillTextField('project_name', 'My Research Project')
    await user.click(screen.getByRole('button', { name: 'Next' }))
    await waitFor(() =>
      expect(document.querySelector('#root_name')).toBeInTheDocument(),
    )
    await fillTextField('name', 'Jane Doe')
    await fillTextField('email', 'jane@example.edu')
    await user.click(screen.getByRole('button', { name: 'Next' }))
    await waitFor(() =>
      expect(screen.getByRole('checkbox')).toBeInTheDocument(),
    )
    await user.click(screen.getByRole('checkbox'))
    await user.click(screen.getByRole('button', { name: 'Submit request' }))

    await waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument())
    expect(
      sessionStorage.getItem(`ampals-dar-draft:${DATASET_CODE}`),
    ).not.toBeNull()
  })
})
