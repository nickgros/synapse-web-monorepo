import SynapseClient from '@/synapse-client'
import { SynapseClientError, useSynapseContext } from '@/utils'
import {
  ALL_ENTITY_BUNDLE_FIELDS,
  EntityBundle,
  EntityBundleRequest,
} from '@sage-bionetworks/synapse-types'
import {
  queryOptions,
  skipToken,
  useQuery,
  UseQueryOptions,
  useSuspenseQuery,
  UseSuspenseQueryOptions,
} from '@tanstack/react-query'
import type { SynapseQueriesContext } from '../types'

/**
 * Returns queryOptions for fetching an EntityBundle. entityId is optional; if absent, queryFn is
 * set to skipToken so the query is disabled.
 */
export function getEntityBundleQuery<
  T extends EntityBundleRequest = typeof ALL_ENTITY_BUNDLE_FIELDS,
>(
  entityId: string | undefined,
  version: number | undefined,
  bundleRequest: T = ALL_ENTITY_BUNDLE_FIELDS as T,
  context: SynapseQueriesContext,
) {
  return queryOptions<EntityBundle<T>, SynapseClientError>({
    queryKey: context.keyFactory.getEntityBundleQueryKey(
      entityId,
      version,
      bundleRequest,
    ),
    queryFn: entityId
      ? () =>
          SynapseClient.getEntityBundleV2<T>(
            entityId,
            bundleRequest,
            version,
            context.accessToken,
          )
      : skipToken,
    staleTime: 5 * 60 * 1000, // 5 minutes - data stays fresh longer
    gcTime: 10 * 60 * 1000, // 10 minutes - keep in cache longer
  })
}

/**
 * Returns queryOptions for fetching an EntityBundle, suitable for use with useSuspenseQuery.
 * entityId is required because suspense queries cannot use skipToken.
 */
export function getEntityBundleSuspenseQuery<
  T extends EntityBundleRequest = typeof ALL_ENTITY_BUNDLE_FIELDS,
>(
  entityId: string,
  version: number | undefined,
  bundleRequest: T = ALL_ENTITY_BUNDLE_FIELDS as T,
  context: SynapseQueriesContext,
) {
  return queryOptions<EntityBundle<T>, SynapseClientError>({
    queryKey: context.keyFactory.getEntityBundleQueryKey(
      entityId,
      version,
      bundleRequest,
    ),
    queryFn: () =>
      SynapseClient.getEntityBundleV2<T>(
        entityId,
        bundleRequest,
        version,
        context.accessToken,
      ),
    staleTime: 5 * 60 * 1000, // 5 minutes - data stays fresh longer
    gcTime: 10 * 60 * 1000, // 10 minutes - keep in cache longer
  })
}

/**
 * @deprecated Use {@link getEntityBundleQuery} instead, passing context from {@link useSynapseContext}.
 */
export function useGetEntityBundleQueryOptions<
  T extends EntityBundleRequest = typeof ALL_ENTITY_BUNDLE_FIELDS,
  TSelect = EntityBundle<T>,
>(
  entityId?: string,
  version?: number,
  bundleRequest: T = ALL_ENTITY_BUNDLE_FIELDS as T,
  select?: (data: EntityBundle<T>) => TSelect,
): UseQueryOptions<EntityBundle<T>, SynapseClientError, TSelect> {
  const { accessToken, keyFactory } = useSynapseContext()
  return {
    select,
    queryKey: keyFactory.getEntityBundleQueryKey(
      entityId,
      version,
      bundleRequest,
    ),
    queryFn: entityId
      ? () =>
          SynapseClient.getEntityBundleV2<T>(
            entityId,
            bundleRequest,
            version,
            accessToken,
          )
      : skipToken,
    staleTime: 5 * 60 * 1000, // 5 minutes - data stays fresh longer
    gcTime: 10 * 60 * 1000, // 10 minutes - keep in cache longer
  }
}

/**
 * @deprecated Use {@link getEntityBundleSuspenseQuery} instead, passing context from {@link useSynapseContext}.
 */
export function useGetEntityBundleSuspenseQueryOptions<
  T extends EntityBundleRequest = typeof ALL_ENTITY_BUNDLE_FIELDS,
  TSelect = EntityBundle<T>,
>(
  entityId: string,
  version?: number,
  bundleRequest: T = ALL_ENTITY_BUNDLE_FIELDS as T,
  select?: (data: EntityBundle<T>) => TSelect,
): UseSuspenseQueryOptions<EntityBundle<T>, SynapseClientError, TSelect> {
  const { accessToken } = useSynapseContext()
  const baseQueryOptions = useGetEntityBundleQueryOptions<T, TSelect>(
    entityId,
    version,
    bundleRequest,
    select,
  )
  return {
    ...baseQueryOptions,
    queryFn: () =>
      SynapseClient.getEntityBundleV2<T>(
        entityId,
        bundleRequest,
        version,
        accessToken,
      ),
  }
}

export function useGetEntityBundle<
  T extends EntityBundleRequest = typeof ALL_ENTITY_BUNDLE_FIELDS,
  TSelect = EntityBundle<T>,
>(
  entityId?: string,
  version?: number,
  bundleRequest: T = ALL_ENTITY_BUNDLE_FIELDS as T,
  options?: Partial<
    UseQueryOptions<EntityBundle<T>, SynapseClientError, TSelect>
  >,
) {
  const queryOptions = useGetEntityBundleQueryOptions<T, TSelect>(
    entityId,
    version,
    bundleRequest,
  )
  return useQuery<EntityBundle<T>, SynapseClientError, TSelect>({
    ...options,
    ...queryOptions,
  })
}

export function useSuspenseGetEntityBundle<
  T extends EntityBundleRequest = typeof ALL_ENTITY_BUNDLE_FIELDS,
  TSelect = EntityBundle<T>,
>(
  entityId: string,
  version?: number,
  bundleRequest: T = ALL_ENTITY_BUNDLE_FIELDS as T,
  options?: Partial<
    UseSuspenseQueryOptions<EntityBundle<T>, SynapseClientError, TSelect>
  >,
) {
  const queryOptions = useGetEntityBundleSuspenseQueryOptions<T, TSelect>(
    entityId,
    version,
    bundleRequest,
  )
  return useSuspenseQuery({
    ...options,
    ...queryOptions,
  })
}

export default useGetEntityBundle
