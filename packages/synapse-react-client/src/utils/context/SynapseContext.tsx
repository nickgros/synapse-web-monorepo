import React, { useContext, useMemo } from 'react'
import { SynapseErrorBoundary } from '../../components/error/ErrorBanner'
import { KeyFactory } from '../../synapse-queries/KeyFactory'
import { FeatureFlagService } from '../feature/FeatureFlagService'
import LocalStorageFeatureFlagDataStore from '../feature/LocalStorageFeatureFlagDataStore'
import { SynapseTableFeatureFlagDataStore } from '../feature/SynapseTableFeatureFlagDataStore'

export type SynapseContextType = {
  /** The user's access token. If undefined, the user is not logged in */
  accessToken: string | undefined
  /** If the user has enabled experimental mode */
  isInExperimentalMode: boolean
  /** If the user prefers time to be displayed in UTC format */
  utcTime: boolean
  /** Whether to wrap all children of this context in an error boundary. Useful if this context wraps just one component. */
  withErrorBoundary: boolean
  /** The URL of the download cart page in the current app. Used to properly link components */
  downloadCartPageUrl: string
  /** The key factory to use for react-query. Generated automatically. */
  keyFactory: KeyFactory
  /** Service used to check the status of feature flags */
  featureFlagService: FeatureFlagService
}

const defaultContext = {
  accessToken: undefined,
  isInExperimentalMode: false,
  utcTime: false,
  withErrorBoundary: false,
  keyFactory: new KeyFactory(undefined),
  downloadCartPageUrl: '/DownloadCart',
  featureFlagService: new FeatureFlagService([]),
} satisfies SynapseContextType

/**
 * This must be exported to use the context in class components.
 */
export const SynapseContext =
  React.createContext<SynapseContextType>(defaultContext)

export type SynapseContextProviderProps = React.PropsWithChildren<{
  synapseContext: Partial<SynapseContextType>
}>

/**
 * Provides context necessary for most components in SRC.
 *
 * The SynapseContextProvider must be wrapped in a react-query QueryClientProvider.
 * @param param0
 * @returns
 */
export function SynapseContextProvider(props: SynapseContextProviderProps) {
  const { children, synapseContext: providedContext } = props
  const queryKeyFactory = useMemo(
    () => new KeyFactory(providedContext.accessToken),
    [providedContext.accessToken],
  )

  const featureFlagService = useMemo(
    () =>
      new FeatureFlagService([
        new LocalStorageFeatureFlagDataStore(),
        new SynapseTableFeatureFlagDataStore(
          'syn53917743', // TODO: synapse ID should be provided to context
          providedContext.accessToken,
        ),
      ]),
    [providedContext.accessToken],
  )

  const synapseContext: SynapseContextType = useMemo(
    () => ({
      accessToken: providedContext.accessToken,
      isInExperimentalMode: providedContext.isInExperimentalMode ?? false,
      utcTime: providedContext.utcTime ?? false,
      withErrorBoundary: providedContext.withErrorBoundary ?? false,
      downloadCartPageUrl:
        providedContext.downloadCartPageUrl ?? '/DownloadCart',
      keyFactory: providedContext.keyFactory ?? queryKeyFactory,
      featureFlagService:
        providedContext.featureFlagService ?? featureFlagService,
    }),
    [
      providedContext.accessToken,
      providedContext.downloadCartPageUrl,
      providedContext.featureFlagService,
      providedContext.isInExperimentalMode,
      providedContext.keyFactory,
      providedContext.utcTime,
      providedContext.withErrorBoundary,
      queryKeyFactory,
      featureFlagService,
    ],
  )

  return (
    <SynapseContext.Provider value={synapseContext}>
      {synapseContext?.withErrorBoundary ? (
        <SynapseErrorBoundary>{children}</SynapseErrorBoundary>
      ) : (
        children
      )}
    </SynapseContext.Provider>
  )
}

export const SynapseContextConsumer = SynapseContext.Consumer

export function useSynapseContext(): SynapseContextType {
  const context = useContext(SynapseContext)
  if (context === undefined) {
    throw new Error(
      'useSynapseContext must be used within a SynapseContextProvider',
    )
  }
  return context
}
