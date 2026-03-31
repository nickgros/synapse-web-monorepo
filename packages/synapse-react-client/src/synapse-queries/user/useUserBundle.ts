import SynapseClient from '@/synapse-client'
import { useSynapseContext } from '@/utils/context/SynapseContext'
import {
  USER_BUNDLE_MASK_IS_ACT_MEMBER,
  USER_BUNDLE_MASK_IS_AR_REVIEWER,
  USER_BUNDLE_MASK_IS_CERTIFIED,
  USER_BUNDLE_MASK_IS_VERIFIED,
  USER_BUNDLE_MASK_ORCID,
  USER_BUNDLE_MASK_USER_PROFILE,
  USER_BUNDLE_MASK_VERIFICATION_SUBMISSION,
} from '@/utils/SynapseConstants'
import { SynapseClientError } from '@sage-bionetworks/synapse-client/util/SynapseClientError'
import {
  NotificationEmail,
  PrincipalAliasRequest,
  PrincipalAliasResponse,
  UserBundle,
  UserProfile,
} from '@sage-bionetworks/synapse-types'
import {
  queryOptions,
  useQuery,
  UseQueryOptions,
  useSuspenseQuery,
} from '@tanstack/react-query'
import type { SynapseQueriesContext } from '../types'

export function getNotificationEmailQuery(context: SynapseQueriesContext) {
  return queryOptions<NotificationEmail, SynapseClientError>({
    queryKey: context.keyFactory.getNotificationEmailQueryKey(),
    queryFn: () => SynapseClient.getNotificationEmail(context.accessToken),
  })
}

export function useGetNotificationEmail(
  options?: Partial<UseQueryOptions<NotificationEmail, SynapseClientError>>,
) {
  const context = useSynapseContext()
  return useQuery({
    ...options,
    ...getNotificationEmailQuery(context),
  })
}

export function getCurrentUserProfileQuery(context: SynapseQueriesContext) {
  return queryOptions<UserProfile, SynapseClientError>({
    queryKey: context.keyFactory.getCurrentUserProfileQueryKey(),
    queryFn: () => SynapseClient.getUserProfile(context.accessToken),
  })
}

export function useGetCurrentUserProfile(
  options?: Partial<UseQueryOptions<UserProfile, SynapseClientError>>,
) {
  const context = useSynapseContext()
  return useQuery({
    ...options,
    ...getCurrentUserProfileQuery(context),
  })
}

export function useSuspenseGetCurrentUserProfile(
  options?: Partial<UseQueryOptions<UserProfile, SynapseClientError>>,
) {
  const context = useSynapseContext()
  return useSuspenseQuery({
    ...options,
    ...getCurrentUserProfileQuery(context),
  })
}

const ALL_USER_BUNDLE_FIELDS =
  USER_BUNDLE_MASK_USER_PROFILE |
  USER_BUNDLE_MASK_ORCID |
  USER_BUNDLE_MASK_VERIFICATION_SUBMISSION |
  USER_BUNDLE_MASK_IS_CERTIFIED |
  USER_BUNDLE_MASK_IS_VERIFIED |
  USER_BUNDLE_MASK_IS_ACT_MEMBER |
  USER_BUNDLE_MASK_IS_AR_REVIEWER

export function getUserBundleQuery(
  userId: string,
  mask: number = ALL_USER_BUNDLE_FIELDS,
  context: SynapseQueriesContext,
) {
  return queryOptions<UserBundle, SynapseClientError>({
    queryKey: context.keyFactory.getUserBundleQueryKey(userId, mask),
    queryFn: () =>
      SynapseClient.getUserBundle(userId, mask, context.accessToken),
  })
}

export function useGetUserBundle(
  userId: string,
  mask: number = ALL_USER_BUNDLE_FIELDS,
  options?: Partial<UseQueryOptions<UserBundle, SynapseClientError>>,
) {
  const context = useSynapseContext()
  return useQuery({
    ...options,
    ...getUserBundleQuery(userId, mask, context),
  })
}

export function getCurrentUserBundleQuery(
  mask: number = ALL_USER_BUNDLE_FIELDS,
  context: SynapseQueriesContext,
) {
  return queryOptions<UserBundle, SynapseClientError>({
    queryKey: context.keyFactory.getUserBundleQueryKey('current', mask),
    queryFn: () => SynapseClient.getMyUserBundle(mask, context.accessToken),
  })
}

export function useGetCurrentUserBundle<TData = UserBundle>(
  mask: number = ALL_USER_BUNDLE_FIELDS,
  options?: Partial<UseQueryOptions<UserBundle, SynapseClientError, TData>>,
) {
  const context = useSynapseContext()
  return useQuery<UserBundle, SynapseClientError, TData>({
    ...options,
    ...getCurrentUserBundleQuery(mask, context),
  })
}

export function getUserProfileQuery(
  principalId: string,
  context: SynapseQueriesContext,
) {
  // We store the profile in a session storage cache used by SWC
  const sessionStorageCacheKey = `${principalId}_USER_PROFILE`
  const cachedValue = sessionStorage.getItem(sessionStorageCacheKey)

  return queryOptions<UserProfile, SynapseClientError>({
    queryKey: context.keyFactory.getUserProfileQueryKey(principalId),
    queryFn: async () => {
      const userProfile = await SynapseClient.getUserProfileById(
        principalId,
        context.accessToken,
      )
      // If the profile is re-fetched, save it to sessionStorage
      sessionStorage.setItem(
        sessionStorageCacheKey,
        JSON.stringify(userProfile),
      )
      return userProfile
    },
    // Use the sessionStorage cache to pre-populate profile data.
    placeholderData: cachedValue
      ? (JSON.parse(cachedValue) as UserProfile)
      : undefined,
  })
}

export function useGetUserProfile(
  principalId: string,
  options?: Partial<UseQueryOptions<UserProfile, SynapseClientError>>,
) {
  const context = useSynapseContext()
  return useQuery({
    ...options,
    ...getUserProfileQuery(principalId, context),
    // Allow callers to override placeholderData
    placeholderData:
      options?.placeholderData ??
      getUserProfileQuery(principalId, context).placeholderData,
  })
}

export function getPrincipalAliasQuery(
  request: PrincipalAliasRequest,
  context: SynapseQueriesContext,
) {
  return queryOptions<
    PrincipalAliasResponse['principalId'],
    SynapseClientError
  >({
    queryKey: context.keyFactory.getPrincipalAliasQueryKey(request),
    queryFn: async () =>
      (
        await SynapseClient.getPrincipalAliasRequest(
          context.accessToken,
          request,
        )
      ).principalId,
  })
}

export function useGetPrincipalIdForAlias(
  request: PrincipalAliasRequest,
  options?: Partial<
    UseQueryOptions<PrincipalAliasResponse['principalId'], SynapseClientError>
  >,
) {
  const context = useSynapseContext()
  return useQuery({
    ...options,
    ...getPrincipalAliasQuery(request, context),
  })
}

export function useIsCurrentUserACTMember() {
  return useGetCurrentUserBundle<boolean>(undefined, {
    select: data => data.isACTMember!,
  })
}
