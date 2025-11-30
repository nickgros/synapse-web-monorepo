import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Typography from '@mui/material/Typography'
import DesktopIcon from '@mui/icons-material/DesktopWindows'
import TabletIcon from '@mui/icons-material/TabletMac'
import PhoneIcon from '@mui/icons-material/PhoneIphone'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useState, useEffect, useRef } from 'react'
import { usePortalConfig, useResourceEditor } from '../../state'

type DeviceSize = 'desktop' | 'tablet' | 'phone'

const deviceWidths: Record<DeviceSize, string> = {
  desktop: '100%',
  tablet: '768px',
  phone: '375px',
}

interface PreviewReadyMessage {
  type: 'PREVIEW_READY'
}

function isPreviewReadyMessage(data: unknown): data is PreviewReadyMessage {
  return (
    typeof data === 'object' &&
    data !== null &&
    'type' in data &&
    (data as PreviewReadyMessage).type === 'PREVIEW_READY'
  )
}

export function PreviewPanel() {
  const [deviceSize, setDeviceSize] = useState<DeviceSize>('desktop')
  const { config } = usePortalConfig()
  const {
    activeResource,
    setActiveResource,
    isEditingResource,
    previewPath,
    setPreviewPath,
  } = useResourceEditor()

  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [isPreviewReady, setIsPreviewReady] = useState(false)

  // Listen for PREVIEW_READY message from the iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (isPreviewReadyMessage(event.data)) {
        setIsPreviewReady(true)
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  // Send updates to the preview iframe based on current mode
  useEffect(() => {
    if (!isPreviewReady || !iframeRef.current?.contentWindow) return

    if (isEditingResource && activeResource) {
      // Resource preview mode
      iframeRef.current.contentWindow.postMessage(
        {
          type: 'RESOURCE_PREVIEW',
          resource: activeResource,
          palette: config.palette,
        },
        '*',
      )
    } else {
      // Portal preview mode
      iframeRef.current.contentWindow.postMessage(
        {
          type: 'CONFIG_UPDATE',
          config,
          path: previewPath,
        },
        '*',
      )
    }
  }, [config, previewPath, isPreviewReady, isEditingResource, activeResource])

  const handleBackToPortal = () => {
    setActiveResource(null)
    setPreviewPath(null)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: 'grey.100',
      }}
    >
      {/* Preview Toolbar */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          p: 1,
          borderBottom: 1,
          borderColor: 'divider',
          backgroundColor: 'background.paper',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {(isEditingResource || previewPath) && (
            <Button
              size="small"
              startIcon={<ArrowBackIcon />}
              onClick={handleBackToPortal}
            >
              Back to Portal
            </Button>
          )}
          <Typography variant="body2" color="text.secondary">
            {previewPath
              ? `Preview: /${previewPath}`
              : isEditingResource
              ? 'Resource Preview'
              : 'Portal Preview'}
          </Typography>
        </Box>
        <ToggleButtonGroup
          value={deviceSize}
          exclusive
          onChange={(_, value: DeviceSize | null) => {
            if (value) setDeviceSize(value)
          }}
          size="small"
        >
          <ToggleButton value="phone" title="Phone">
            <PhoneIcon fontSize="small" />
          </ToggleButton>
          <ToggleButton value="tablet" title="Tablet">
            <TabletIcon fontSize="small" />
          </ToggleButton>
          <ToggleButton value="desktop" title="Desktop">
            <DesktopIcon fontSize="small" />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Preview Content */}
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          p: 2,
          overflow: 'auto',
        }}
      >
        <Box
          sx={{
            width: deviceWidths[deviceSize],
            maxWidth: '100%',
            height: '100%',
            backgroundColor: 'background.paper',
            boxShadow: deviceSize !== 'desktop' ? 3 : 0,
            borderRadius: deviceSize !== 'desktop' ? 1 : 0,
            overflow: 'hidden',
          }}
        >
          <iframe
            ref={iframeRef}
            src="/preview.html"
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              display: 'block',
            }}
            title="Portal Preview"
          />
        </Box>
      </Box>
    </Box>
  )
}
