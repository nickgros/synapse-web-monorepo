import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from 'react-query'
import SynapseClient from '../../synapse-client'
import { SynapseClientError } from '../../utils/SynapseClientError'
import { useSynapseContext } from '../../utils/context/SynapseContext'
import { CreateTeamRequest, Team } from '@sage-bionetworks/synapse-types'

export function useGetTeam(
  teamId: string,
  options?: UseQueryOptions<Team, SynapseClientError>,
) {
  const { accessToken, keyFactory } = useSynapseContext()

  return useQuery<Team, SynapseClientError>(
    keyFactory.getTeamQueryKey(teamId),
    () => SynapseClient.getTeam(teamId, accessToken),
    options,
  )
}

export function useCreateTeam(
  options?: Partial<
    UseMutationOptions<Team, SynapseClientError, CreateTeamRequest>
  >,
) {
  const { accessToken } = useSynapseContext()
  return useMutation({
    ...options,
    mutationFn: team => SynapseClient.createTeam(team, accessToken),
  })
}
