import { createTheme, ThemeProvider } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { useMemo } from 'react'
import { CookiesProvider } from 'react-cookie'
import { defaultQueryClientConfig, SynapseTheme } from 'synapse-react-client'
import { LogInDialogContextProvider } from './components/LogInDialogContext'
import { PortalContextProvider } from './components/PortalContext'
import { PortalProps } from './components/PortalProps'

const queryClient = new QueryClient(defaultQueryClientConfig)

function Portal(props: PortalProps) {
  const { palette, children, ...context } = props
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
              {children}
            </QueryClientProvider>
          </ThemeProvider>
        </LogInDialogContextProvider>
      </CookiesProvider>
    </PortalContextProvider>
  )
}

export default Portal
