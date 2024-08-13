import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { MessageToUser } from '@sage-bionetworks/synapse-types'
import { SynapseClientError } from '../../utils'
import { useSynapseContext } from '../../context'
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
