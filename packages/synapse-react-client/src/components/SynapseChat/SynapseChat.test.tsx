import { useChatState } from '@/components/SynapseChat/useChatState'
import { mockAgentSession, mockChatAttachment } from '@/mocks/chat/mockChat'
import {
  useCreateAgentSession,
  useGetChatAgentTraceEvents,
  useUpdateAgentSession,
} from '@/synapse-queries/chat/useChat'
import { createWrapper } from '@/testutils/TestingLibraryUtils'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AddFilesDialog, AddFilesDialogProps } from './AddFilesDialog'
import { SynapseChat, SynapseChatProps } from './SynapseChat'

vi.mock('@/synapse-queries/chat/useChat')
vi.mock('@/components/SynapseChat/useChatState')
vi.mock('./AddFilesDialog', () => ({
  AddFilesDialog: vi.fn(),
  ALLOWED_FILE_TYPES_LABEL: 'pdf, csv, txt, json',
}))

const mockUseCreateAgentSession = vi.mocked(useCreateAgentSession)
const mockUseUpdateAgentSession = vi.mocked(useUpdateAgentSession)
const mockUseGetChatAgentTraceEvents = vi.mocked(useGetChatAgentTraceEvents)
const mockUseChatState = vi.mocked(useChatState)
const mockAddFilesDialog = vi.mocked(AddFilesDialog)

const mockSendChat = vi.fn()

const defaultMockChatState = {
  sendChat: mockSendChat,
  pendingMessage: null,
  chatJobIds: [],
}

const idleMutation = {
  mutate: vi.fn(),
  mutateAsync: vi.fn(),
  data: undefined,
  error: null,
  isError: false,
  isIdle: true,
  isPending: false,
  isSuccess: false,
  failureCount: 0,
  failureReason: null,
  isPaused: false,
  status: 'idle' as const,
  variables: undefined,
  submittedAt: 0,
  reset: vi.fn(),
  context: undefined,
}

const mockPrompts = [
  'Help me fill this out',
  'Help me understand this',
  'Find missing fields',
]

const defaultProps: SynapseChatProps = {
  externalSession: mockAgentSession,
  externalChatState: defaultMockChatState,
  showAccessLevelMenu: false,
}

function renderComponent(props?: Partial<SynapseChatProps>) {
  const user = userEvent.setup()
  render(<SynapseChat {...defaultProps} {...props} />, {
    wrapper: createWrapper(),
  })
  return { user }
}

describe('SynapseChat - suggestedPrompts', () => {
  beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = vi.fn()
  })

  beforeEach(() => {
    vi.clearAllMocks()
    // oxlint-disable-next-line @typescript-eslint/no-explicit-any
    mockUseCreateAgentSession.mockReturnValue(idleMutation as any)
    // oxlint-disable-next-line @typescript-eslint/no-explicit-any
    mockUseUpdateAgentSession.mockReturnValue(idleMutation as any)
    // oxlint-disable-next-line @typescript-eslint/no-explicit-any
    mockUseGetChatAgentTraceEvents.mockReturnValue({ data: undefined } as any)
    mockUseChatState.mockReturnValue(defaultMockChatState)
  })

  it('renders pill chips when suggestedPrompts are provided', () => {
    renderComponent({ suggestedPrompts: mockPrompts })

    mockPrompts.forEach(prompt => {
      expect(screen.getByRole('button', { name: prompt })).toBeInTheDocument()
    })
  })

  it('renders no pill chips when suggestedPrompts is omitted', () => {
    renderComponent({ suggestedPrompts: undefined })

    mockPrompts.forEach(prompt => {
      expect(
        screen.queryByRole('button', { name: prompt }),
      ).not.toBeInTheDocument()
    })
  })

  it('renders no pill chips when suggestedPrompts is an empty array', () => {
    renderComponent({ suggestedPrompts: [] })

    mockPrompts.forEach(prompt => {
      expect(
        screen.queryByRole('button', { name: prompt }),
      ).not.toBeInTheDocument()
    })
  })

  it('clicking a pill populates the text field without sending', async () => {
    const { user } = renderComponent({ suggestedPrompts: mockPrompts })

    await user.click(screen.getByRole('button', { name: mockPrompts[0] }))

    expect(screen.getByRole('textbox')).toHaveValue(mockPrompts[0])
    expect(mockSendChat).not.toHaveBeenCalled()
  })

  it('chips are disabled when no agent session exists', () => {
    renderComponent({
      suggestedPrompts: mockPrompts,
      externalSession: undefined,
    })

    mockPrompts.forEach(prompt => {
      expect(screen.getByRole('button', { name: prompt })).toHaveAttribute(
        'aria-disabled',
        'true',
      )
    })
  })

  it('chips are hidden while a message is pending', () => {
    const pendingChatState = {
      ...defaultMockChatState,
      pendingMessage: 'waiting...',
    }
    renderComponent({
      suggestedPrompts: mockPrompts,
      externalChatState: pendingChatState,
    })

    mockPrompts.forEach(prompt => {
      expect(
        screen.queryByRole('button', { name: prompt }),
      ).not.toBeInTheDocument()
    })
  })

  it('chips are hidden after a conversation has started', () => {
    const activeChatState = { ...defaultMockChatState, chatJobIds: ['job-1'] }
    renderComponent({
      suggestedPrompts: mockPrompts,
      externalChatState: activeChatState,
    })

    mockPrompts.forEach(prompt => {
      expect(
        screen.queryByRole('button', { name: prompt }),
      ).not.toBeInTheDocument()
    })
  })

  it('text input is present alongside pills', () => {
    renderComponent({ suggestedPrompts: mockPrompts })

    expect(screen.getByRole('textbox')).toBeInTheDocument()
    mockPrompts.forEach(prompt => {
      expect(screen.getByRole('button', { name: prompt })).toBeInTheDocument()
    })
  })
})

describe('SynapseChat - allowAttachments', () => {
  beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = vi.fn()
  })

  beforeEach(() => {
    vi.clearAllMocks()
    // oxlint-disable-next-line @typescript-eslint/no-explicit-any
    mockUseCreateAgentSession.mockReturnValue(idleMutation as any)
    // oxlint-disable-next-line @typescript-eslint/no-explicit-any
    mockUseUpdateAgentSession.mockReturnValue(idleMutation as any)
    // oxlint-disable-next-line @typescript-eslint/no-explicit-any
    mockUseGetChatAgentTraceEvents.mockReturnValue({ data: undefined } as any)
    mockUseChatState.mockReturnValue(defaultMockChatState)
    mockAddFilesDialog.mockImplementation(
      ({ open, onAttachmentUploaded }: AddFilesDialogProps) => (
        <>
          {open && (
            <div>
              <span>Add files dialog</span>
              <button
                onClick={() =>
                  onAttachmentUploaded(
                    mockChatAttachment({ fileName: 'report.pdf' }),
                  )
                }
              >
                Simulate attachment uploaded
              </button>
            </div>
          )}
        </>
      ),
    )
  })

  it('does not render the attach button when allowAttachments is false (default)', () => {
    renderComponent()

    expect(
      screen.queryByRole('button', { name: 'Add files' }),
    ).not.toBeInTheDocument()
  })

  it('renders an attach button when allowAttachments is true', () => {
    renderComponent({ allowAttachments: true })

    expect(
      screen.getByRole('button', { name: 'Add files' }),
    ).toBeInTheDocument()
  })

  it('opens the Add Files dialog when the attach button is clicked', async () => {
    const { user } = renderComponent({ allowAttachments: true })

    expect(screen.queryByText('Add files dialog')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Add files' }))

    expect(screen.getByText('Add files dialog')).toBeInTheDocument()
  })

  it('renders an attachment chip once a file finishes uploading, and allows removing it', async () => {
    const { user } = renderComponent({ allowAttachments: true })

    await user.click(screen.getByRole('button', { name: 'Add files' }))
    await user.click(
      screen.getByRole('button', { name: 'Simulate attachment uploaded' }),
    )

    expect(screen.getByText('report.pdf')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Remove report.pdf' }))

    expect(screen.queryByText('report.pdf')).not.toBeInTheDocument()
  })

  it('sends attachments alongside the message text, then clears both', async () => {
    const { user } = renderComponent({ allowAttachments: true })

    await user.click(screen.getByRole('button', { name: 'Add files' }))
    await user.click(
      screen.getByRole('button', { name: 'Simulate attachment uploaded' }),
    )
    await user.type(screen.getByRole('textbox'), 'hello')
    await user.click(screen.getByRole('button', { name: 'Send message' }))

    expect(mockSendChat).toHaveBeenCalledTimes(1)
    const [message, attachments] = mockSendChat.mock.calls[0]
    expect(message).toBe('hello')
    expect(attachments).toHaveLength(1)
    expect(attachments[0].associateObjectType).toBe('MessageAttachment')
    // The uploader's own bare file handle is referenced by id; see buildChatAttachmentAssociation.
    expect(attachments[0].associateObjectId).toBe(attachments[0].fileHandleId)
    expect(screen.getByRole('textbox')).toHaveValue('')
    expect(screen.queryByText('report.pdf')).not.toBeInTheDocument()
  })

  it('sends without an attachments argument when there are no pending attachments', async () => {
    const { user } = renderComponent({ allowAttachments: true })

    await user.type(screen.getByRole('textbox'), 'hello')
    await user.click(screen.getByRole('button', { name: 'Send message' }))

    expect(mockSendChat).toHaveBeenCalledExactlyOnceWith('hello', undefined)
  })
})
