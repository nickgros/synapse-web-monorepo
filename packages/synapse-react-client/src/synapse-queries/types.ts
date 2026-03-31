import type { KeyFactory } from './KeyFactory'
import type { SynapseClient } from '@sage-bionetworks/synapse-client'

/**
 * Context for all synapse-queries. Provides the synapse client and the key factory for generating query keys.
 */
export type SynapseQueriesContext = {
  keyFactory: KeyFactory
  synapseClient: SynapseClient
  /** @deprecated - Prefer to use `synapseClient` directly */
  accessToken: string | undefined
}
