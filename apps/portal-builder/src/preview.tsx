/**
 * Preview Entry Point
 *
 * This is a separate entry point for the portal preview that runs in its own iframe.
 * It receives configuration from the parent window via postMessage and renders
 * the portal preview in complete isolation.
 *
 * Supports two modes:
 * 1. Portal Preview - Full portal with routes and navigation
 * 2. Resource Preview - Single resource card preview
 */

import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CookiesProvider } from 'react-cookie'
import { defaultQueryClientConfig } from 'synapse-react-client/utils/context/FullContextProvider'

// Import portal styles - these will only apply to this document
import '@sage-bionetworks/synapse-portal-framework/style/App.scss'
import 'synapse-react-client/style/main.scss'

import { PortalConfig, Resource } from './types'
import { PreviewRenderer } from './components/preview/PreviewRenderer'
import { ResourcePreviewRenderer } from './components/preview/ResourcePreviewRenderer'
import { registerAllComponents } from './components/registry'

// Register all components before rendering
registerAllComponents()

const queryClient = new QueryClient(defaultQueryClientConfig)

/** Message types for parent-iframe communication */
interface ConfigUpdateMessage {
  type: 'CONFIG_UPDATE'
  config: PortalConfig
  path?: string | null
}

interface ResourcePreviewMessage {
  type: 'RESOURCE_PREVIEW'
  resource: Resource
  palette: { primary: string; secondary: string }
}

interface PreviewReadyMessage {
  type: 'PREVIEW_READY'
}

type PreviewMessage = ConfigUpdateMessage | ResourcePreviewMessage

function isConfigUpdateMessage(data: unknown): data is ConfigUpdateMessage {
  return (
    typeof data === 'object' &&
    data !== null &&
    'type' in data &&
    (data as { type: string }).type === 'CONFIG_UPDATE' &&
    'config' in data
  )
}

function isResourcePreviewMessage(
  data: unknown,
): data is ResourcePreviewMessage {
  return (
    typeof data === 'object' &&
    data !== null &&
    'type' in data &&
    (data as { type: string }).type === 'RESOURCE_PREVIEW' &&
    'resource' in data
  )
}

type PreviewMode =
  | { type: 'portal'; config: PortalConfig; path: string | null }
  | {
      type: 'resource'
      resource: Resource
      palette: { primary: string; secondary: string }
    }
  | null

function PreviewApp() {
  const [previewMode, setPreviewMode] = useState<PreviewMode>(null)

  useEffect(() => {
    const handleMessage = (event: MessageEvent<PreviewMessage>) => {
      // In production, you might want to verify event.origin
      if (isConfigUpdateMessage(event.data)) {
        setPreviewMode({
          type: 'portal',
          config: event.data.config,
          path: event.data.path ?? null,
        })
      } else if (isResourcePreviewMessage(event.data)) {
        setPreviewMode({
          type: 'resource',
          resource: event.data.resource,
          palette: event.data.palette,
        })
      }
    }

    window.addEventListener('message', handleMessage)

    // Tell parent we're ready to receive config
    const readyMessage: PreviewReadyMessage = { type: 'PREVIEW_READY' }
    window.parent.postMessage(readyMessage, '*')

    return () => window.removeEventListener('message', handleMessage)
  }, [])

  if (!previewMode) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          fontFamily: 'Lato, sans-serif',
          color: '#666',
        }}
      >
        Loading preview...
      </div>
    )
  }

  return (
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        {previewMode.type === 'portal' ? (
          <PreviewRenderer
            config={previewMode.config}
            initialPath={previewMode.path}
          />
        ) : (
          <ResourcePreviewRenderer
            resource={previewMode.resource}
            palette={previewMode.palette}
          />
        )}
      </QueryClientProvider>
    </CookiesProvider>
  )
}

const container = document.getElementById('root')
if (container) {
  const root = createRoot(container)
  root.render(
    <StrictMode>
      <PreviewApp />
    </StrictMode>,
  )
}
