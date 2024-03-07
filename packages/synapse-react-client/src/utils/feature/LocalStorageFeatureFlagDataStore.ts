import { FeatureFlagDataStore } from './FeatureFlagDataStore'
import { FeatureFlagKey } from './FeatureFlagKey'
import { isInSynapseExperimentalMode } from '../../synapse-client'

export const LOCAL_STORAGE_FEATURE_FLAG_PREFIX =
  'org.sagebionetworks.web.client.feature.'

export default class LocalStorageFeatureFlagDataStore
  implements FeatureFlagDataStore
{
  isWritableDataStore = true
  private getLocalStorageKey(key: FeatureFlagKey): string {
    return LOCAL_STORAGE_FEATURE_FLAG_PREFIX + key
  }

  getValue(key: FeatureFlagKey): boolean | undefined {
    // If experimental mode is enabled, all features will be used
    if (isInSynapseExperimentalMode()) {
      return true
    }

    // Otherwise, check per-feature enabled status
    const localStorageValue = localStorage.getItem(this.getLocalStorageKey(key))
    if (localStorageValue === 'true') {
      return true
    } else if (localStorageValue === 'false') {
      return false
    } else {
      return undefined
    }
  }

  setValue(key: FeatureFlagKey, value: boolean): Promise<void> {
    if (value) {
      localStorage.setItem(this.getLocalStorageKey(key), 'true')
    } else {
      // TODO: Delete the experimental mode cookie?
      // We delete the value instead of setting it to 'false' because we want to fall back to other data stores
      localStorage.removeItem(this.getLocalStorageKey(key))
    }
    return Promise.resolve()
  }
}
