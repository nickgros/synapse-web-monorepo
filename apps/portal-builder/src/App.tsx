/**
 * Portal Builder Application
 *
 * This is the root component for the Portal Builder app. It sets up the
 * necessary providers for the application:
 *
 * - CookiesProvider: For cookie-based state (used by synapse-react-client)
 * - ThemeProvider: MUI theme with Synapse-inspired colors
 * - QueryClientProvider: React Query for Synapse API calls
 * - PortalConfigProvider: Main configuration state management
 * - ResourceEditorProvider: Tracks active resource for live preview
 *
 * The PortalBuilderLayout component contains the actual UI layout.
 */
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CookiesProvider } from 'react-cookie'
import { defaultQueryClientConfig } from 'synapse-react-client/utils/context/FullContextProvider'
import { PortalBuilderLayout } from './components/PortalBuilderLayout'
import { PortalConfigProvider } from './state/PortalConfigContext'
import { ResourceEditorProvider } from './state/CardEditorContext'

const queryClient = new QueryClient(defaultQueryClientConfig)

/** MUI theme matching the Synapse portal color scheme */
const theme = createTheme({
  palette: {
    primary: {
      main: '#395979',
    },
    secondary: {
      main: '#47337D',
    },
  },
  typography: {
    fontFamily: 'Lato, sans-serif',
  },
})

export default function App() {
  return (
    <CookiesProvider>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <PortalConfigProvider>
            <ResourceEditorProvider>
              <PortalBuilderLayout />
            </ResourceEditorProvider>
          </PortalConfigProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </CookiesProvider>
  )
}
