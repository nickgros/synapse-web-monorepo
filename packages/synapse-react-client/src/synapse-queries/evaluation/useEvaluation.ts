import {
  Evaluation,
  GetEvaluationParameters,
  PaginatedResults,
} from '@sage-bionetworks/synapse-types'
import { useQuery, UseQueryOptions } from 'react-query'
import { SynapseClientError, useSynapseContext } from '../../utils'
import SynapseClient from '../../synapse-client'

export function useGetEvaluations(
  request: GetEvaluationParameters = {},
  options?: UseQueryOptions<PaginatedResults<Evaluation>, SynapseClientError>,
) {
  const { accessToken, keyFactory } = useSynapseContext()
  return useQuery<PaginatedResults<Evaluation>, SynapseClientError>(
    keyFactory.getEvaluationsQueryKey(request),
    () => SynapseClient.getEvaluations(request, accessToken),
    options,
  )
}
