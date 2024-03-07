import React from 'react'
import { SynapseContextType } from '../utils/context/SynapseContext'
import FullContextProvider from '../utils/context/FullContextProvider'
import { KeyFactory } from '../synapse-queries'
import { FeatureFlagService } from '../utils/feature/FeatureFlagService'

export const MOCK_ACCESS_TOKEN = 'mock-access-token'

export const MOCK_CONTEXT_VALUE: SynapseContextType = {
  accessToken: MOCK_ACCESS_TOKEN,
  utcTime: false,
  isInExperimentalMode: false,
  downloadCartPageUrl: '/DownloadCart',
  withErrorBoundary: false,
  keyFactory: new KeyFactory(MOCK_ACCESS_TOKEN),
  featureFlagService: new FeatureFlagService([]),
}

export const MOCK_CONTEXT = React.createContext(MOCK_CONTEXT_VALUE)

/**
 * Full context object with default values for testing.
 *
 * If using @testing-library/react, see {@link TestingLibraryUtils#createWrapper}
 */
export const SynapseTestContext = jest
  .fn()
  .mockImplementation(({ children }) => {
    return (
      <FullContextProvider synapseContext={MOCK_CONTEXT_VALUE}>
        {children}
      </FullContextProvider>
    )
  })
