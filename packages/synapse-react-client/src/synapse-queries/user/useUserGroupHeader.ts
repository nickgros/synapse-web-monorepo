import { useQuery, useQueryClient, UseQueryOptions } from 'react-query'
import SynapseClient from '../../synapse-client'
import { SynapseClientError, useSynapseContext } from '../../utils'
import { TYPE_FILTER, UserGroupHeader } from '@sage-bionetworks/synapse-types'

export function useGetUserGroupHeader(
  principalId: string,
  options?: UseQueryOptions<UserGroupHeader, SynapseClientError>,
) {
  const { accessToken, keyFactory } = useSynapseContext()
  const queryKey = keyFactory.getUserGroupHeaderQueryKey(principalId)

  return useQuery<UserGroupHeader, SynapseClientError>(
    queryKey,
    async () => {
      const responsePage = await SynapseClient.getGroupHeadersBatch(
        [principalId],
        accessToken,
      )
      if (responsePage.children.length !== 1) {
        throw new Error(
          `Expected one response in useGetUserGroupHeader for id: ${principalId}, got ${responsePage.children.length}`,
        )
      }
      return responsePage.children[0]
    },
    options,
  )
}

export function useGetUserGroupHeaders(
  principalIds: string[],
  options?: UseQueryOptions<UserGroupHeader[], SynapseClientError>,
) {
  const { accessToken, keyFactory } = useSynapseContext()
  const queryClient = useQueryClient()
  const queryKey = keyFactory.getUserGroupHeaderBatchQueryKey(principalIds)

  const queryFn = async () => {
    const responsePage = await SynapseClient.getGroupHeadersBatch(
      principalIds,
      accessToken,
    )

    // Fill cache entries for individual query results
    responsePage.children.forEach((userGroupHeader, index) => {
      queryClient.setQueryData(
        keyFactory.getUserGroupHeaderQueryKey(principalIds[index]),
        userGroupHeader,
      )
    })

    return responsePage.children
  }

  return useQuery<UserGroupHeader[], SynapseClientError>(
    queryKey,
    queryFn,
    options,
  )
}

export function useSearchUserGroupHeaders(
  prefix: string,
  filter?: TYPE_FILTER,
  options?: UseQueryOptions<UserGroupHeader[], SynapseClientError>,
) {
  const { keyFactory } = useSynapseContext()
  const queryKey = keyFactory.getUserGroupHeaderSearchQueryKey(prefix, filter)

  return useQuery<UserGroupHeader[], SynapseClientError>(
    queryKey,
    async () => {
      const responsePage = await SynapseClient.getUserGroupHeaders(
        prefix,
        filter,
      )
      return responsePage.children
    },
    options,
  )
}

export function useGetUserGroupHeaderWithAlias(
  aliases: string[],
  options?: UseQueryOptions<UserGroupHeader[], SynapseClientError>,
) {
  const { keyFactory } = useSynapseContext()

  const queryKey = keyFactory.getUserGroupHeaderWithAliasQueryKey(aliases)

  return useQuery<UserGroupHeader[], SynapseClientError>(
    queryKey,
    async () => {
      const response = await SynapseClient.postUserGroupHeadersWithAlias(
        aliases,
      )
      return response.list
    },
    options,
  )
}
