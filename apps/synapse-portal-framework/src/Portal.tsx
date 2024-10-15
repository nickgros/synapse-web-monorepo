import { createTheme, ThemeProvider } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { useMemo } from 'react'
import { CookiesProvider } from 'react-cookie'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { defaultQueryClientConfig, SynapseTheme } from 'synapse-react-client'
import { LogInDialogContextProvider } from './components/LogInDialogContext'
import { PortalContextProvider } from './components/PortalContext'
import { PortalProps } from './components/PortalProps'
import { persistQueryClient } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'

const queryClient = new QueryClient(defaultQueryClientConfig)
const localStoragePersister = createSyncStoragePersister({
  storage: window.localStorage,
})
persistQueryClient({
  queryClient,
  persister: localStoragePersister,
})

function Portal(props: PortalProps) {
  const { palette, ...context } = props
  const router = createBrowserRouter(props.routeConfig)
  const theme = useMemo(
    () => createTheme(SynapseTheme.mergeTheme({ palette })),
    [palette],
  )

  return (
    <PortalContextProvider value={context}>
      <CookiesProvider>
        <LogInDialogContextProvider>
          <ThemeProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
              <RouterProvider router={router} />
            </QueryClientProvider>
          </ThemeProvider>
        </LogInDialogContextProvider>
      </CookiesProvider>
    </PortalContextProvider>
  )
}

export default Portal
