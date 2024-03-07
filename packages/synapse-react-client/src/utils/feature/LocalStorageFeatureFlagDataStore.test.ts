import LocalStorageFeatureFlagDataStore, {
  LOCAL_STORAGE_FEATURE_FLAG_PREFIX,
} from './LocalStorageFeatureFlagDataStore'
import { FeatureFlagKey } from './FeatureFlagKey'
import SynapseClient from '../../synapse-client'

describe('LocalStorageFeatureFlagDataStore', () => {
  const localStorageFeatureFlagDataStore =
    new LocalStorageFeatureFlagDataStore()
  it('Is writable', () => {
    expect(localStorageFeatureFlagDataStore.isWritableDataStore).toBe(true)
  })
  it("Returns true if the flag is 'true' in localStorage", () => {
    localStorage.setItem(
      LOCAL_STORAGE_FEATURE_FLAG_PREFIX + FeatureFlagKey._TEST_FLAG_ONLY,
      'true',
    )

    expect(
      localStorageFeatureFlagDataStore.getValue(FeatureFlagKey._TEST_FLAG_ONLY),
    ).toBe(true)
  })
  it("Returns false if the flag is 'false' in localStorage", () => {
    localStorage.setItem(
      LOCAL_STORAGE_FEATURE_FLAG_PREFIX + FeatureFlagKey._TEST_FLAG_ONLY,
      'false',
    )

    expect(
      localStorageFeatureFlagDataStore.getValue(FeatureFlagKey._TEST_FLAG_ONLY),
    ).toBe(false)
  })
  it('Returns undefined if the flag is not found in localStorage', () => {
    localStorage.removeItem(
      LOCAL_STORAGE_FEATURE_FLAG_PREFIX + FeatureFlagKey._TEST_FLAG_ONLY,
    )

    expect(
      localStorageFeatureFlagDataStore.getValue(FeatureFlagKey._TEST_FLAG_ONLY),
    ).toBe(undefined)
  })
  it('Adds the key to localStorage when set to true', () => {
    localStorage.removeItem(
      LOCAL_STORAGE_FEATURE_FLAG_PREFIX + FeatureFlagKey._TEST_FLAG_ONLY,
    )

    localStorageFeatureFlagDataStore.setValue(
      FeatureFlagKey._TEST_FLAG_ONLY,
      true,
    )

    expect(
      localStorage.getItem(
        LOCAL_STORAGE_FEATURE_FLAG_PREFIX + FeatureFlagKey._TEST_FLAG_ONLY,
      ),
    ).toBe('true')
  })
  it('Deletes the key from localStorage when set to false', () => {
    localStorage.setItem(
      LOCAL_STORAGE_FEATURE_FLAG_PREFIX + FeatureFlagKey._TEST_FLAG_ONLY,
      'true',
    )

    localStorageFeatureFlagDataStore.setValue(
      FeatureFlagKey._TEST_FLAG_ONLY,
      false,
    )

    expect(
      localStorage.getItem(
        LOCAL_STORAGE_FEATURE_FLAG_PREFIX + FeatureFlagKey._TEST_FLAG_ONLY,
      ),
    ).toBe(null)
  })
  it('Returns true regardless of localStorage value when experimental mode is enabled', () => {
    jest
      .spyOn(SynapseClient, 'isInSynapseExperimentalMode')
      .mockReturnValue(true)

    // localStorage is 'true'
    localStorage.setItem(
      LOCAL_STORAGE_FEATURE_FLAG_PREFIX + FeatureFlagKey._TEST_FLAG_ONLY,
      'true',
    )
    expect(
      localStorageFeatureFlagDataStore.getValue(FeatureFlagKey._TEST_FLAG_ONLY),
    ).toBe(true)

    // localStorage is 'false'
    localStorage.setItem(
      LOCAL_STORAGE_FEATURE_FLAG_PREFIX + FeatureFlagKey._TEST_FLAG_ONLY,
      'false',
    )
    expect(
      localStorageFeatureFlagDataStore.getValue(FeatureFlagKey._TEST_FLAG_ONLY),
    ).toBe(true)

    // not in localStorage
    localStorage.removeItem(
      LOCAL_STORAGE_FEATURE_FLAG_PREFIX + FeatureFlagKey._TEST_FLAG_ONLY,
    )
    expect(
      localStorageFeatureFlagDataStore.getValue(FeatureFlagKey._TEST_FLAG_ONLY),
    ).toBe(true)
  })
})
