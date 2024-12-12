import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { SynapseClientError } from '@sage-bionetworks/synapse-client'
import { useSynapseContext } from '../../utils/context/SynapseContext'
import { UploadDestination } from '@sage-bionetworks/synapse-types'
import {
  getDefaultUploadDestination,
  getUploadDestinationForStorageLocation,
} from '../../synapse-client'

export function useGetDefaultUploadDestination(
  containerEntityId: string,
  options?: Partial<UseQueryOptions<UploadDestination, SynapseClientError>>,
) {
  const { accessToken, keyFactory } = useSynapseContext()
  return useQuery({
    ...options,
    queryKey: keyFactory.getDefaultUploadDestinationQueryKey(containerEntityId),
    queryFn: () => getDefaultUploadDestination(containerEntityId, accessToken),
  })
}

export function useGetUploadDestinationForStorageLocation(
  parentId: string,
  storageLocationId: number,
  options?: Partial<UseQueryOptions<UploadDestination, SynapseClientError>>,
) {
  const { accessToken, keyFactory } = useSynapseContext()
  return useQuery({
    ...options,
    queryKey: keyFactory.getUploadDestinationForStorageLocationQueryKey(
      parentId,
      storageLocationId,
    ),

    queryFn: () =>
      getUploadDestinationForStorageLocation(
        parentId,
        storageLocationId,
        accessToken,
      ),
  })
}
