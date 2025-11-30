import { useMemo } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { useLocation } from 'react-router'
import { PortalConfig } from '../../types'
import { DetailsPagePreviewRenderer } from './DetailsPagePreviewRenderer'

interface DetailPagePreviewProps {
  config: PortalConfig
}

/**
 * Preview component for detail pages in the portal builder.
 * Matches the current path to a configured resource with a detail page
 * and renders it using the DetailsPagePreviewRenderer.
 */
export function DetailPagePreview({ config }: DetailPagePreviewProps) {
  const location = useLocation()

  // Find the resource that matches this path
  const matchedResource = useMemo(() => {
    // Parse the path to find matching resource
    // Detail page paths are typically /{resourcePath}/{id} or /{resourcePath}/DetailsPage?{column}={value}
    const pathSegments = location.pathname.split('/').filter(Boolean)
    if (pathSegments.length < 1) {
      return null
    }

    // Try to match based on the first path segment (resource path)
    const resourcePath = '/' + pathSegments[0]

    return config.resources?.find(resource => {
      if (!resource.detailsPage) return false
      // Match by the resource's detail page path
      const detailPath = resource.detailsPage.path
      // The path could be like '/Explore/Studies/DetailsPage' or '/Studies/:studyId'
      // We need to check if the current location pathname starts with the base path
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
