import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { RouteNode, Resource } from '../../types'
import { getComponent } from '../registry'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

interface PreviewPageProps {
  route: RouteNode
  resources?: Resource[]
}

const EMPTY_RESOURCES: Resource[] = []

export function PreviewPage({
  route,
  resources = EMPTY_RESOURCES,
}: PreviewPageProps) {
  // Note: resources is available for future component use
  void resources
  const components = route.components ?? []

  if (components.length === 0) {
    return (
      <Container maxWidth="lg">
        <Paper
          sx={{
            p: 4,
            textAlign: 'center',
            backgroundColor: 'grey.50',
            border: '2px dashed',
            borderColor: 'grey.300',
          }}
        >
          <Typography variant="h6" color="text.secondary" gutterBottom>
            {route.displayName}
          </Typography>
          <Typography color="text.secondary">
            No components added to this page yet.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Add components in the Routes editor to see them here.
          </Typography>
        </Paper>
      </Container>
    )
  }

  return (
    <Box>
      {components.map(block => {
        const registeredComponent = getComponent(block.componentType)

        if (!registeredComponent) {
          return (
            <Container key={block.id} maxWidth="lg" sx={{ mb: 2 }}>
              <Paper sx={{ p: 2, backgroundColor: 'error.light' }}>
                <Typography color="error">
                  Unknown component: {block.componentType}
                </Typography>
              </Paper>
            </Container>
          )
        }

        const Component = registeredComponent.component

        // Component might be lazy-loaded and not yet available
        if (!Component) {
          return (
            <Container key={block.id} maxWidth="lg" sx={{ mb: 2 }}>
              <Paper sx={{ p: 2, backgroundColor: 'info.light' }}>
                <Typography color="info.main">
                  Component {block.componentType} is lazy-loaded. Use
                  configToRoutes for full lazy loading support.
                </Typography>
              </Paper>
            </Container>
          )
        }

        return (
          <Box key={block.id} sx={{ mb: 3 }}>
            <ErrorBoundary
              fallback={
                <Container maxWidth="lg">
                  <Paper sx={{ p: 2, backgroundColor: 'warning.light' }}>
                    <Typography>
                      Error rendering {block.componentType}. Check the component
                      configuration.
                    </Typography>
                  </Paper>
                </Container>
              }
            >
              <Suspense
                fallback={
                  <Container maxWidth="lg">
                    <Paper sx={{ p: 2 }}>
                      <Typography color="text.secondary">
                        Loading {block.componentType}...
                      </Typography>
                    </Paper>
                  </Container>
                }
              >
                <Component {...block.props} />
              </Suspense>
            </ErrorBoundary>
          </Box>
        )
      })}
    </Box>
  )
}
