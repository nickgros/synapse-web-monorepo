import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from 'react-query'
import SynapseClient, { deleteMemberFromTeam } from '../../synapse-client'
import { SynapseClientError } from '../../utils/SynapseClientError'
import { useSynapseContext } from '../../utils/context/SynapseContext'
import {
  CreateMembershipInvitationRequest,
  CreateMembershipRequestRequest,
  MembershipInvitation,
  MembershipRequest,
  PaginatedResults,
  TeamMember,
  TeamMembershipStatus,
} from '@sage-bionetworks/synapse-types'

export function useGetTeamMembers(
  teamId: string | number,
  options?: UseQueryOptions<PaginatedResults<TeamMember>, SynapseClientError>,
) {
  const { accessToken, keyFactory } = useSynapseContext()
  return useQuery(
    keyFactory.getTeamMembersQueryKey(String(teamId)),
    () => SynapseClient.getTeamMembers(accessToken, teamId, '', 50, 0),
    options,
  )
}

export function useGetIsUserMemberOfTeam(
  teamId: string,
  userId: string,
  options?: UseQueryOptions<TeamMember | null, SynapseClientError>,
) {
  const { accessToken, keyFactory } = useSynapseContext()

  return useQuery(
    keyFactory.getIsUserMemberOfTeamQueryKey(teamId, userId),
    () => SynapseClient.getIsUserMemberOfTeam(teamId, userId, accessToken),
    options,
  )
}

export function useGetMembershipStatus(
  teamId: string,
  userId: string,
  options?: UseQueryOptions<TeamMembershipStatus, SynapseClientError>,
) {
  const { accessToken, keyFactory } = useSynapseContext()

  return useQuery(
    keyFactory.getMembershipStatusQueryKey(teamId, userId),
    () => SynapseClient.getMembershipStatus(teamId, userId, accessToken),
    options,
  )
}

export function useGetAllOpenMembershipInvitations(
  userId: string,
  options?: UseQueryOptions<MembershipInvitation[] | null, SynapseClientError>,
) {
  const { accessToken, keyFactory } = useSynapseContext()
  return useQuery(
    keyFactory.getAllOpenMembershipInvitationsForUserQueryKey(userId),
    () =>
      SynapseClient.getAllOpenMembershipInvitationsForUser(
        userId,
        accessToken!,
      ),
    options,
  )
}

export function useInviteUserToTeam(
  options?: UseMutationOptions<
    MembershipInvitation,
    SynapseClientError,
    CreateMembershipInvitationRequest
  >,
) {
  const { accessToken } = useSynapseContext()

  return useMutation<
    MembershipInvitation,
    SynapseClientError,
    CreateMembershipInvitationRequest
  >({
    ...options,
    mutationFn: invitation =>
      SynapseClient.createMembershipInvitation(invitation, accessToken!),
    // TODO: Invalidate relevant queries when added
  })
}

export function useRequestToJoinTeam(
  options?: UseMutationOptions<
    MembershipRequest,
    SynapseClientError,
    CreateMembershipRequestRequest
  >,
) {
  const queryClient = useQueryClient()
  const { accessToken, keyFactory } = useSynapseContext()

  return useMutation<
    MembershipRequest,
    SynapseClientError,
    CreateMembershipRequestRequest
  >({
    ...options,
    mutationFn: request =>
      SynapseClient.createMembershipRequest(request, accessToken!),
    onSuccess: async (data, variables, ctx) => {
      await queryClient.invalidateQueries(
        keyFactory.getMembershipStatusQueryKey(
          variables.teamId,
          variables.userId,
        ),
      )
      if (options?.onSuccess) {
        return options.onSuccess(data, variables, ctx)
      }
      return
    },
  })
}

export function useAddMemberToTeam() {
  const queryClient = useQueryClient()
  const { accessToken, keyFactory } = useSynapseContext()

  return useMutation<
    void,
    SynapseClientError,
    { teamId: string; userId: string }
  >(
    ({ teamId, userId }) =>
      SynapseClient.addTeamMemberAsAuthenticatedUserOrAdmin(
        teamId,
        userId,
        accessToken!,
      ),
    {
      onSuccess: async (data, variables, ctx) => {
        await Promise.all([
          queryClient.invalidateQueries(
            keyFactory.getMembershipStatusQueryKey(
              variables.teamId,
              variables.userId,
            ),
          ),
          queryClient.invalidateQueries(
            keyFactory.getIsUserMemberOfTeamQueryKey(
              variables.teamId,
              variables.userId,
            ),
          ),
          queryClient.invalidateQueries(
            keyFactory.getTeamMembersQueryKey(variables.teamId),
          ),
          queryClient.invalidateQueries(
            keyFactory.getAllSubmissionTeamsQueryKeys(),
          ),
        ])
      },
    },
  )
}

export type TeamMembershipParam = {
  teamId: string
  userId: string
}

export function useDeleteTeamMembership(
  options?: UseMutationOptions<void, SynapseClientError, TeamMembershipParam>,
) {
  const queryClient = useQueryClient()
  const { accessToken, keyFactory } = useSynapseContext()

  return useMutation<void, SynapseClientError, TeamMembershipParam>({
    ...options,
    mutationFn: variables =>
      deleteMemberFromTeam(variables.teamId, variables.userId, accessToken),
    onSuccess: async (data, variables, ctx) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: keyFactory.getIsUserMemberOfTeamQueryKey(
            variables.teamId,
            variables.userId,
          ),
        }),
        queryClient.invalidateQueries({
          queryKey: keyFactory.getMembershipStatusQueryKey(
            variables.teamId,
            variables.userId,
          ),
        }),
      ])
      if (options?.onSuccess) {
        await options.onSuccess(data, variables, ctx)
      }
    },
  })
}
