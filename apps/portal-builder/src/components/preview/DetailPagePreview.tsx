import { useMemo } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { useLocation } from 'react-router'
import { PortalConfig, DetailsPageConfig, RouteNode } from '../../types'
import { DetailsPagePreviewRenderer } from './DetailsPagePreviewRenderer'

interface DetailPagePreviewProps {
  config: PortalConfig
}

/**
 * Helper function to find a matching route in the routes tree
 */
function findMatchingRoute(
  routes: RouteNode[],
  pathname: string,
  parentPath = '',
): RouteNode | null {
  for (const route of routes) {
    const fullPath = route.path.startsWith('/')
      ? route.path
      : `${parentPath}/${route.path}`

    // Check if this route matches and has detailsConfig
    if (route.displayAs === 'details' && route.detailsConfig) {
      // Details routes often have params like /Studies/:studyId or /Studies/DetailsPage
      // Check if the pathname starts with the base path (before params)
      const basePath = fullPath.replace(/\/:[^/]+/g, '').replace(/\/$/, '')
      if (
        pathname.startsWith(basePath) ||
        pathname === basePath ||
        pathname.startsWith(fullPath.replace(/\/$/, ''))
      ) {
        return route
      }
    }

    // Recurse into children
    if (route.children?.length) {
      const childMatch = findMatchingRoute(route.children, pathname, fullPath)
      if (childMatch) return childMatch
    }
  }
  return null
}

/**
 * Preview component for detail pages in the portal builder.
 * Matches the current path to a configured resource with a detail page
 * and renders it using the DetailsPagePreviewRenderer.
 *
 * Supports two configuration sources:
 * 1. Resource.detailsPage - legacy resource-based configuration
 * 2. RouteNode.detailsConfig - route-based configuration (references a resourceId)
 */
export function DetailPagePreview({ config }: DetailPagePreviewProps) {
  const location = useLocation()

  // First, try to find a route with detailsConfig that matches the path
  const matchedRoute = useMemo(() => {
    if (!config.routes) return null
    return findMatchingRoute(config.routes, location.pathname)
  }, [location.pathname, config.routes])

  // If we found a route with detailsConfig, get the resource and build detailsPage config
  if (matchedRoute?.detailsConfig) {
    const resource = config.resources?.find(
      r => r.id === matchedRoute.detailsConfig?.resourceId,
    )
    if (resource) {
      // Convert detailsConfig to DetailsPageConfig format
      // Use type assertion since we're manually providing defaults
      const detailsPage = {
        path: matchedRoute.path,
        sqlOperator: matchedRoute.detailsConfig.sqlOperator ?? 'LIKE',
        showHeaderCard: matchedRoute.detailsConfig.showHeaderCard ?? true,
        doiResourceType: matchedRoute.detailsConfig.doiResourceType,
        tabs: matchedRoute.detailsConfig.tabs,
        sections: matchedRoute.detailsConfig.sections,
      } satisfies DetailsPageConfig
      return (
        <DetailsPagePreviewRenderer
          resource={resource}
          detailsPage={detailsPage}
          allResources={config.resources || []}
        />
      )
    }
  }

  // Fallback: Try to find a resource that matches this path (legacy approach)
  const matchedResource = useMemo(() => {
    // Parse the path to find matching resource
    const pathSegments = location.pathname.split('/').filter(Boolean)
    if (pathSegments.length < 1) {
      return null
    }

    // Try to match based on the first path segment (resource path)
    const resourcePath = '/' + pathSegments[0]

    return config.resources?.find(resource => {
      if (!resource.detailsPage) return false
      const detailPath = resource.detailsPage.path
      return (
        location.pathname.startsWith(detailPath.replace(/\/:[^/]+/g, '')) ||
        location.pathname.startsWith(resourcePath)
      )
    })
  }, [location.pathname, config.resources])

  // If we found a matching resource with a detail page, render it
  if (matchedResource?.detailsPage) {
    return (
      <DetailsPagePreviewRenderer
        resource={matchedResource}
        detailsPage={matchedResource.detailsPage}
        allResources={config.resources || []}
      />
    )
  }

  // Fallback to showing the path info if no match is found
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper
        sx={{
          p: 4,
          textAlign: 'center',
          backgroundColor: 'info.lighter',
          border: '2px dashed',
          borderColor: 'info.main',
        }}
      >
        <Typography variant="h5" color="info.main" gutterBottom>
          Detail Page Preview
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          No matching detail page configuration found for:
        </Typography>
        <Box
          sx={{
            backgroundColor: 'background.paper',
            p: 2,
            borderRadius: 1,
            fontFamily: 'monospace',
            fontSize: '0.875rem',
            wordBreak: 'break-all',
          }}
        >
          <Typography
            component="span"
            sx={{ fontFamily: 'monospace', fontWeight: 'bold' }}
          >
            {location.pathname}
          </Typography>
          {location.search && (
            <Typography
              component="span"
              sx={{ fontFamily: 'monospace', color: 'text.secondary' }}
            >
              {location.search}
            </Typography>
          )}
        </Box>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 3, fontStyle: 'italic' }}
        >
          Configure a detail page for a resource to preview it here.
        </Typography>
      </Paper>
    </Container>
  )
}
