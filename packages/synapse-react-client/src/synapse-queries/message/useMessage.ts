import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { MessageToUser } from '@sage-bionetworks/synapse-types'
import { SynapseClientError } from '@sage-bionetworks/synapse-client'
import { useSynapseContext } from '../../utils/context/SynapseContext'
import SynapseClient from '../../synapse-client'

type SendMessageRequest = {
  recipients: string[]
  subject: string
  body: string
}

export function useSendMessage(
  options?: Partial<
    UseMutationOptions<MessageToUser, SynapseClientError, SendMessageRequest>
  >,
) {
  const { accessToken } = useSynapseContext()

  return useMutation<MessageToUser, SynapseClientError, SendMessageRequest>({
    ...options,
    mutationFn: (request: SendMessageRequest) =>
      SynapseClient.sendMessage(
        request.recipients,
        request.subject,
        request.body,
        accessToken!,
      ),
  })
}

type SendMessageToEntityOwnerRequest = {
  entityId: string
  subject: string
  body: string
}

export function useSendMessageToEntityOwner(
  options?: Partial<
    UseMutationOptions<
      MessageToUser,
      SynapseClientError,
      SendMessageToEntityOwnerRequest
    >
  >,
) {
  const { accessToken } = useSynapseContext()

  return useMutation<
    MessageToUser,
    SynapseClientError,
    SendMessageToEntityOwnerRequest
  >({
    ...options,
    mutationFn: (request: SendMessageToEntityOwnerRequest) =>
      SynapseClient.sendMessageToEntityOwner(
        request.entityId,
        request.subject,
        request.body,
        accessToken!,
      ),
  })
}
