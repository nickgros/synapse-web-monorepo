import { useSendChatMessageToAgent } from '@/synapse-queries/chat/useChat'
import {
  AgentChatRequest,
  AgentChatResponse,
  AgentSession,
  AsynchronousJobStatus,
  FileHandleAssociation,
} from '@sage-bionetworks/synapse-types'
import { useCallback, useMemo, useState } from 'react'
import { AgentChatRequestWithAttachments } from './chatAttachmentTypes'

export type ChatState = {
  sendChat: (message: string, attachments?: FileHandleAssociation[]) => void
  pendingMessage: string | null
  chatJobIds: string[]
}

export function useChatState(
  agentSession?: AgentSession,
  onChatResponse?: (responseText: string) => void,
): ChatState {
  const [chatJobIds, setChatJobIds] = useState<string[]>([])
  // Optimistic update state for latest unprocessed message
  const [pendingMessage, setPendingMessage] = useState<string | null>(null)

  const { mutate: sendChatMessageToAgent } = useSendChatMessageToAgent(
    {
      onMutate: (newChatMessage: AgentChatRequest) => {
        // set the pending message to the new chat message
        setPendingMessage(newChatMessage.chatText)
      },
      onSuccess: (response: AgentChatResponse) => {
        onChatResponse?.(response.responseText)
      },
    },
    (status: AsynchronousJobStatus<AgentChatRequest, AgentChatResponse>) => {
      if (!chatJobIds.includes(status.jobId)) {
        setPendingMessage(null)
        setChatJobIds(() => [...chatJobIds, status.jobId])
      }
    },
  )

  const sendChat = useCallback(
    (message: string, attachments?: FileHandleAssociation[]) => {
      if (!agentSession?.sessionId) {
        throw new Error('No agent session available to send chat message.')
      }
      const request: AgentChatRequestWithAttachments = {
        chatText: message,
        sessionId: agentSession.sessionId,
        enableTrace: true,
        ...(attachments && attachments.length > 0 ? { attachments } : {}),
      }
      // TODO(PLFM-9827): remove this cast once `attachments` is part of the generated
      // AgentChatRequest type.
      sendChatMessageToAgent(request as AgentChatRequest)
    },
    [agentSession?.sessionId, sendChatMessageToAgent],
  )

  return useMemo(
    () => ({ sendChat, pendingMessage, chatJobIds }),
    [sendChat, pendingMessage, chatJobIds],
  )
}
