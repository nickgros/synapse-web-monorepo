import { useGetChatAgentTraceEvents } from '@/synapse-queries/chat/useChat'
import usePollAsynchronousJob from '@/synapse-queries/asynchronous/usePollAsynchronousJob'
import { getUseQuerySuccessMock } from '@/testutils/ReactQueryMockUtils'
import { createWrapper } from '@/testutils/TestingLibraryUtils'
import { render, screen } from '@testing-library/react'
import SynapseChatMessage from './SynapseChatMessage'

vi.mock('@/synapse-queries/asynchronous/usePollAsynchronousJob', () => ({
  default: vi.fn(),
}))
vi.mock('@/synapse-queries/chat/useChat', () => ({
  useGetChatAgentTraceEvents: vi.fn(),
}))

const mockUsePollAsynchronousJob = vi.mocked(usePollAsynchronousJob)
const mockUseGetChatAgentTraceEvents = vi.mocked(useGetChatAgentTraceEvents)

function renderComponent(chatJobId = 'job-1') {
  render(<SynapseChatMessage chatJobId={chatJobId} />, {
    wrapper: createWrapper(),
  })
}

describe('SynapseChatMessage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // oxlint-disable-next-line @typescript-eslint/no-explicit-any
    mockUseGetChatAgentTraceEvents.mockReturnValue({ data: undefined } as any)
  })

  it('renders no attachment chips when the request has no attachments', () => {
    mockUsePollAsynchronousJob.mockReturnValue(
      getUseQuerySuccessMock({
        jobState: 'COMPLETE',
        requestBody: { chatText: 'hello', sessionId: 'session-1' },
        responseBody: { sessionId: 'session-1', responseText: 'hi there' },
        // oxlint-disable-next-line @typescript-eslint/no-explicit-any
      }) as any,
    )

    renderComponent()

    expect(screen.queryByText('FILE')).not.toBeInTheDocument()
  })

  it('renders a generic attachment chip (labeled by fileHandleId) for a restored/polled turn', () => {
    mockUsePollAsynchronousJob.mockReturnValue(
      getUseQuerySuccessMock({
        jobState: 'COMPLETE',
        requestBody: {
          chatText: 'hello',
          sessionId: 'session-1',
          attachments: [
            {
              fileHandleId: '9999999',
              associateObjectId: '9999999',
              associateObjectType: 'MessageAttachment',
            },
          ],
        },
        responseBody: { sessionId: 'session-1', responseText: 'hi there' },
        // oxlint-disable-next-line @typescript-eslint/no-explicit-any
      }) as any,
    )

    renderComponent()

    expect(screen.getByText('9999999')).toBeInTheDocument()
  })

  it('shows a failed status when the response reports a FAILED attachmentStatus', () => {
    mockUsePollAsynchronousJob.mockReturnValue(
      getUseQuerySuccessMock({
        jobState: 'COMPLETE',
        requestBody: {
          chatText: 'hello',
          sessionId: 'session-1',
          attachments: [
            {
              fileHandleId: '9999999',
              associateObjectId: '9999999',
              associateObjectType: 'MessageAttachment',
            },
          ],
        },
        responseBody: {
          sessionId: 'session-1',
          responseText: 'hi there',
          attachmentStatuses: [
            {
              fileHandleId: '9999999',
              status: 'FAILED',
              failureCode: 'NOT_FOUND',
              failureMessage: 'The file could not be found.',
            },
          ],
        },
        // oxlint-disable-next-line @typescript-eslint/no-explicit-any
      }) as any,
    )

    renderComponent()

    expect(screen.getByText('Failed')).toBeInTheDocument()
  })
})
