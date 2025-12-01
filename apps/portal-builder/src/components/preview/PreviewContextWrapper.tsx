/**
 * PreviewContextWrapper
 *
 * Provides shared context setup for all preview components.
 * This includes the router context, session context, and theme provider
 * that SRC components require to function properly.
 */

import { createTheme, ThemeProvider } from '@mui/material/styles'
import { PropsWithChildren, useMemo } from 'react'
import { createMemoryRouter, RouterProvider } from 'react-router'
import { mergeTheme } from 'synapse-react-client/theme/mergeTheme'
import { ApplicationSessionContextProvider } from 'synapse-react-client/utils/AppUtils/session/ApplicationSessionContext'

interface PreviewContextWrapperProps {
  palette?: { primary: string; secondary: string }
}

/**
 * Mock session context for preview - user is not logged in.
 * Exported so PreviewRenderer can reuse it.
 */
export const mockSessionContext = {
  token: undefined,
  termsOfServiceStatus: undefined,
  twoFactorStatus: undefined,
  hasInitializedSession: true,
  refreshSession: async () => {},
  twoFactorAuthSSOErrorResponse: undefined,
  clearSession: async () => {},
  isLoadingSSO: false,
}

/**
 * Wraps children with all the context providers that SRC components need:
 * - ThemeProvider (MUI theming)
 * - ApplicationSessionContextProvider (auth/session state)
 * - RouterProvider (react-router context for Link components)
 *
 * Use this wrapper for standalone preview components that use SRC components
 * but don't need full portal routing.
 */
export function PreviewContextWrapper({
  children,
  palette,
}: PropsWithChildren<PreviewContextWrapperProps>) {
  const theme = useMemo(
    () =>
      createTheme(
        mergeTheme({
          palette: palette
            ? {
                primary: { main: palette.primary },
                secondary: { main: palette.secondary },
              }
            : undefined,
        }),
      ),
    [palette],
  )

  // Create a router that renders the children as its element
  const router = useMemo(
    () =>
      createMemoryRouter(
        [
          {
            path: '*',
            element: children,
          },
        ],
        { initialEntries: ['/'] },
      ),
    [children],
  )

  return (
    <ThemeProvider theme={theme}>
      <ApplicationSessionContextProvider context={mockSessionContext}>
        <RouterProvider router={router} />
      </ApplicationSessionContextProvider>
    </ThemeProvider>
  )
}
