import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import SynapseClient from '../../synapse-client'
import { SynapseClientError } from '../../utils'
import { FeatureFlags, FeatureFlagEnum } from '@sage-bionetworks/synapse-types'
import { useSynapseContext } from '../../context/SynapseContext'

export function useGetFeatureFlag(
  featureFlag: FeatureFlagEnum,
  options?: Partial<UseQueryOptions<FeatureFlags, SynapseClientError>>,
): boolean {
  const { keyFactory, isInExperimentalMode } = useSynapseContext()

  const { data: featureFlags } = useQuery<FeatureFlags, SynapseClientError>({
    staleTime: Infinity,
    ...options,
    queryKey: keyFactory.getFeatureFlagQueryKey(),
    queryFn: () => SynapseClient.getFeatureFlags(),
  })

  return isInExperimentalMode || !!featureFlags?.[featureFlag]
}
