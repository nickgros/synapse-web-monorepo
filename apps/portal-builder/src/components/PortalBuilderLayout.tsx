import Box from '@mui/material/Box'
import { useState } from 'react'
import { ConfigEditorPanel } from './editor/ConfigEditorPanel'
import { PreviewPanel } from './preview/PreviewPanel'
import { EditorToolbar } from './editor/EditorToolbar'
import { registerAllComponents } from './registry'

// Register components on load
registerAllComponents()

export function PortalBuilderLayout() {
  const [previewWidth, setPreviewWidth] = useState(50) // percentage

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <EditorToolbar />
      <Box
        sx={{
          display: 'flex',
          flexGrow: 1,
          overflow: 'hidden',
        }}
      >
        {/* Editor Panel */}
        <Box
          sx={{
            width: `${100 - previewWidth}%`,
            display: 'flex',
            flexDirection: 'column',
            borderRight: '1px solid',
            borderColor: 'divider',
            overflow: 'hidden',
          }}
        >
          <ConfigEditorPanel />
        </Box>

        {/* Resizer */}
        <Box
          sx={{
            width: 4,
            backgroundColor: 'grey.200',
            cursor: 'col-resize',
            '&:hover': {
              backgroundColor: 'primary.main',
            },
          }}
          onMouseDown={e => {
            e.preventDefault()
            const startX = e.clientX
            const startWidth = previewWidth

            const onMouseMove = (moveEvent: MouseEvent) => {
              const delta = startX - moveEvent.clientX
              const newWidth = Math.min(
                80,
                Math.max(20, startWidth + (delta / window.innerWidth) * 100),
              )
              setPreviewWidth(newWidth)
            }

            const onMouseUp = () => {
              document.removeEventListener('mousemove', onMouseMove)
              document.removeEventListener('mouseup', onMouseUp)
            }

            document.addEventListener('mousemove', onMouseMove)
            document.addEventListener('mouseup', onMouseUp)
          }}
        />

        {/* Preview Panel */}
        <Box
          sx={{
            width: `${previewWidth}%`,
            overflow: 'hidden',
          }}
        >
          <PreviewPanel />
        </Box>
      </Box>
    </Box>
  )
}
