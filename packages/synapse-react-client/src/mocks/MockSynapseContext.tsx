import React from 'react'
import { SynapseContextType } from '../context/SynapseContext'
import FullContextProvider from '../context/FullContextProvider'
import { KeyFactory } from '../synapse-queries'

export const MOCK_ACCESS_TOKEN = 'mock-access-token'

export const MOCK_CONTEXT_VALUE: SynapseContextType = {
  accessToken: MOCK_ACCESS_TOKEN,
  utcTime: false,
  isInExperimentalMode: false,
  downloadCartPageUrl: '/DownloadCart',
  withErrorBoundary: false,
  keyFactory: new KeyFactory(MOCK_ACCESS_TOKEN),
}

export const MOCK_CONTEXT = React.createContext(MOCK_CONTEXT_VALUE)

/**
 * Full context object with default values for testing.
 *
 * If using @testing-library/react, see {@link TestingLibraryUtils#createWrapper}
 */
export const SynapseTestContext = vi.fn().mockImplementation(({ children }) => {
  return (
    <FullContextProvider synapseContext={MOCK_CONTEXT_VALUE}>
      {children}
    </FullContextProvider>
  )
})
