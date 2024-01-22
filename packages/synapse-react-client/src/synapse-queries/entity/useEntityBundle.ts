import { useQuery, useQueryClient, UseQueryOptions } from 'react-query'
import SynapseClient from '../../synapse-client'
import { SynapseClientError } from '../../utils/SynapseClientError'
import { useSynapseContext } from '../../utils/context/SynapseContext'
import {
  ALL_ENTITY_BUNDLE_FIELDS,
  EntityBundle,
  EntityBundleRequest,
} from '@sage-bionetworks/synapse-types'

export function useGetEntityBundle<
  T extends EntityBundleRequest = typeof ALL_ENTITY_BUNDLE_FIELDS,
>(
  entityId: string,
  version?: number,
  bundleRequest: T = ALL_ENTITY_BUNDLE_FIELDS as T,
  options?: UseQueryOptions<EntityBundle<T>, SynapseClientError>,
) {
  const { accessToken, keyFactory } = useSynapseContext()
  const queryClient = useQueryClient()
  return useQuery<EntityBundle<T>, SynapseClientError>(
    keyFactory.getEntityBundleQueryKey(entityId, version, bundleRequest),
    () =>
      SynapseClient.getEntityBundleV2<T>(
        entityId,
        bundleRequest,
        version,
        accessToken,
      ),
    {
      ...options,
      onSuccess: data => {
        if (data.entity) {
          queryClient.setQueryData(
            keyFactory.getEntityVersionQueryKey(entityId, version),
            data.entity,
          )
        }

        if (options?.onSuccess) {
          options.onSuccess(data)
        }
      },
    },
  )
}

export default useGetEntityBundle
