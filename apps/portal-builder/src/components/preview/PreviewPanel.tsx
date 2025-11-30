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
import { PortalPreviewRenderer } from './PortalPreviewRenderer'
import { ResourcePreviewRenderer } from './ResourcePreviewRenderer'
import { IframePreview } from './IframePreview'

type DeviceSize = 'desktop' | 'tablet' | 'phone'

const deviceWidths: Record<DeviceSize, string> = {
  desktop: '100%',
  tablet: '768px',
  phone: '375px',
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

  // Track when we switch from resource editing to portal preview
  // This key forces the iframe to remount when switching back to portal view
  const [iframeKey, setIframeKey] = useState(0)
  const wasEditingResource = useRef(isEditingResource)

  useEffect(() => {
    // When switching from resource editing to portal preview, increment key
    if (wasEditingResource.current && !isEditingResource) {
      setIframeKey(k => k + 1)
    }
    wasEditingResource.current = isEditingResource
  }, [isEditingResource])

  const handleBackToPortal = () => {
    setActiveResource(null)
    setPreviewPath(null)
  }

  // Determine if we should show resource preview
  const showResourcePreview = isEditingResource && activeResource !== null

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
          onChange={(_, value) => value && setDeviceSize(value)}
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
          {showResourcePreview ? (
            <ResourcePreviewRenderer resource={activeResource} />
          ) : (
            <IframePreview key={iframeKey} width="100%" height="100%">
              <PortalPreviewRenderer
                config={config}
                initialPath={previewPath}
              />
            </IframePreview>
          )}
        </Box>
      </Box>
    </Box>
  )
}
