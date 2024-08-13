import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import SynapseClient from '../../synapse-client'
import { SynapseClientError } from '../../utils'
import { useSynapseContext } from '../../context'
import { ActionRequiredList } from '@sage-bionetworks/synapse-types'

export function useGetEntityActionsRequired(
  entityId: string,
  options?: Partial<UseQueryOptions<ActionRequiredList, SynapseClientError>>,
) {
  const { accessToken, keyFactory } = useSynapseContext()
  return useQuery({
    ...options,
    queryKey: keyFactory.getEntityActionsRequiredQueryKey(entityId),
    queryFn: () =>
      SynapseClient.getEntityDownloadActionsRequired(entityId, accessToken),
  })
}
