import { FeatureFlagKey } from './FeatureFlagKey'

export interface FeatureFlagDataStore {
  /* Returns the value of the flag in the data store */
  getValue: (key: FeatureFlagKey) => boolean | undefined
  setValue: (key: FeatureFlagKey, value: boolean) => void
  isWritableDataStore: boolean
}
