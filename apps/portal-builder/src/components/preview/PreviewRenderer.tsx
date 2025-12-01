/**
 * PreviewRenderer
 *
 * Renders the portal preview. This component is designed to run in its own
 * iframe/document, so it doesn't need any special iframe document handling.
 * Styles are imported by the preview.tsx entry point.
 */

import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useEffect, useMemo, useRef } from 'react'
import { createMemoryRouter, RouterProvider } from 'react-router'
import { mergeTheme } from 'synapse-react-client/theme/mergeTheme'
import { PortalContextProvider } from '@sage-bionetworks/synapse-portal-framework/components/PortalContext'
import { ApplicationSessionContextProvider } from 'synapse-react-client/utils/AppUtils/session/ApplicationSessionContext'
import { PortalConfig, RouteNode } from '../../types'
import { PreviewLayout } from './PreviewLayout'
import { configToRouteObjects } from '../../utils/configToRoutes'
import { mockSessionContext } from './PreviewContextWrapper'

interface PreviewRendererProps {
  config: PortalConfig
  /** Optional initial path to navigate to in the preview */
  initialPath?: string | null
}

/**
 * Derive navbar config from routes tree
 * Filters to routes with showInNavbar !== false and internal linkType
 */
function deriveNavbarConfig(routes: RouteNode[]): {
  name: string
  path: string
  children?: { name: string; path: string }[]
}[] {
  return routes
    .filter(route => route.showInNavbar !== false)
    .map(route => {
      const parentPath =
        route.linkType === 'external'
          ? route.externalUrl ?? route.path
          : route.path

      return {
        name: route.displayName,
        path: parentPath,
        children: route.children
          ?.filter(child => child.showInNavbar !== false)
          .map(child => {
            // Build absolute path for child routes
            const childPath = child.path.startsWith('/')
              ? child.path
              : `${parentPath.replace(/\/$/, '')}/${child.path}`
            return {
              name: child.displayName,
              path: childPath,
            }
          }),
      }
    })
}

export function PreviewRenderer({ config, initialPath }: PreviewRendererProps) {
  const theme = useMemo(
    () =>
      createTheme(
        mergeTheme({
          palette: {
            primary: { main: config.palette.primary },
            secondary: { main: config.palette.secondary },
          },
        }),
      ),
    [config.palette],
  )

  // Build navbar config from routes tree
  const navbarConfig = useMemo(
    () => ({
      routes: deriveNavbarConfig(config.routes ?? []),
      isPortalsDropdownEnabled: config.isPortalsDropdownEnabled ?? true,
    }),
    [config.routes, config.isPortalsDropdownEnabled],
  )

  // Build portal context
  const portalContext = useMemo(
    () => ({
      portalName: config.metadata.name,
      routeConfig: [],
      headerConfig: config.headerConfig,
      footerConfig: config.footerConfig,
      logoHeaderConfig: config.logoHeaderConfig,
      logoFooterConfig: config.logoFooterConfig,
      navbarConfig: navbarConfig,
    }),
    [config, navbarConfig],
  )

  // Build routes using configToRouteObjects and create memory router
  // The router is only recreated when config changes, not when path changes
  const router = useMemo(() => {
    const routes = configToRouteObjects(config, {
      LayoutComponent: PreviewLayout,
    })
    return createMemoryRouter(routes, {
      initialEntries: ['/'],
    })
  }, [config])

  // Store router in ref for navigation effect
  const routerRef = useRef(router)
  routerRef.current = router

  // Navigate when initialPath changes (controlled navigation)
  useEffect(() => {
    const targetPath = initialPath?.startsWith('/')
      ? initialPath
      : `/${initialPath ?? ''}`

    // Only navigate if the current path is different
    if (routerRef.current.state.location.pathname !== targetPath) {
      routerRef.current.navigate(targetPath)
    }
  }, [initialPath])

  return (
    <ThemeProvider theme={theme}>
      <ApplicationSessionContextProvider context={mockSessionContext}>
        <PortalContextProvider value={portalContext}>
          <RouterProvider router={router} />
        </PortalContextProvider>
      </ApplicationSessionContextProvider>
    </ThemeProvider>
  )
}
