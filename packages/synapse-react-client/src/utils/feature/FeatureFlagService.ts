import { FeatureFlagKey } from './FeatureFlagKey'
import { FeatureFlagDataStore } from './FeatureFlagDataStore'

export class FeatureFlagService {
  dataStoreChain: FeatureFlagDataStore[]

  /**
   * The set of data stores from which a configuration should be fetched. Chains listed earlier will override those listed later.
   * @param dataStoreChain
   */
  constructor(dataStoreChain: FeatureFlagDataStore[]) {
    this.dataStoreChain = dataStoreChain
  }

  getValue(key: FeatureFlagKey): boolean {
    let enabled = false
    for (const dataStore of this.dataStoreChain) {
      const enabledInDataStore = dataStore.getValue(key)
      if (enabledInDataStore != null) {
        enabled = enabledInDataStore
        break
      }
    }
    return enabled
  }

  /**
   * Writes the `enabled` status to the first writable data store found, if any were provided
   * @param key
   * @param enabled
   */
  setValue(key: FeatureFlagKey, enabled: boolean): void {
    const firstWritableDataStore = this.dataStoreChain.find(
      ds => ds.isWritableDataStore,
    )

    if (firstWritableDataStore) {
      firstWritableDataStore.setValue(key, enabled)
    }
  }
}
