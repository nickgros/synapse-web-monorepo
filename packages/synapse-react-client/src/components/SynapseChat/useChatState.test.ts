import { useSendChatMessageToAgent } from '@/synapse-queries/chat/useChat'
import { mockAgentSession } from '@/mocks/chat/mockChat'
import {
  FileHandleAssociateType,
  FileHandleAssociation,
} from '@sage-bionetworks/synapse-types'
import { act, renderHook } from '@testing-library/react'
import { useChatState } from './useChatState'

vi.mock('@/synapse-queries/chat/useChat', () => ({
  useSendChatMessageToAgent: vi.fn(),
}))

const mockUseSendChatMessageToAgent = vi.mocked(useSendChatMessageToAgent)
const mockSendChatMessageToAgent = vi.fn()

const mockAttachment: FileHandleAssociation = {
  fileHandleId: '9999999',
  associateObjectId: '9999999',
  associateObjectType: FileHandleAssociateType.MessageAttachment,
}

describe('useChatState', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // oxlint-disable-next-line @typescript-eslint/no-explicit-any
    mockUseSendChatMessageToAgent.mockReturnValue({
      mutate: mockSendChatMessageToAgent,
    } as any)
  })

  it('throws when there is no agent session', () => {
    const { result } = renderHook(() => useChatState(undefined))

    expect(() => result.current.sendChat('hello')).toThrow(
      'No agent session available to send chat message.',
    )
    expect(mockSendChatMessageToAgent).not.toHaveBeenCalled()
  })

  it('sends chatText/sessionId/enableTrace without an attachments field when no attachments are given', () => {
    const { result } = renderHook(() => useChatState(mockAgentSession))

    act(() => {
      result.current.sendChat('hello')
    })

    expect(mockSendChatMessageToAgent).toHaveBeenCalledExactlyOnceWith({
      chatText: 'hello',
      sessionId: mockAgentSession.sessionId,
      enableTrace: true,
    })
  })

  it('includes attachments on the request when provided', () => {
    const { result } = renderHook(() => useChatState(mockAgentSession))

    act(() => {
      result.current.sendChat('hello', [mockAttachment])
    })

    expect(mockSendChatMessageToAgent).toHaveBeenCalledExactlyOnceWith({
      chatText: 'hello',
      sessionId: mockAgentSession.sessionId,
      enableTrace: true,
      attachments: [mockAttachment],
    })
  })

  it('omits the attachments field when given an empty array', () => {
    const { result } = renderHook(() => useChatState(mockAgentSession))

    act(() => {
      result.current.sendChat('hello', [])
    })

    expect(mockSendChatMessageToAgent).toHaveBeenCalledExactlyOnceWith({
      chatText: 'hello',
      sessionId: mockAgentSession.sessionId,
      enableTrace: true,
    })
  })
})
