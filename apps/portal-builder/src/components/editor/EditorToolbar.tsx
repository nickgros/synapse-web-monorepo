import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import DownloadIcon from '@mui/icons-material/Download'
import UploadIcon from '@mui/icons-material/Upload'
import RefreshIcon from '@mui/icons-material/Refresh'
import { usePortalConfig } from '../../state'
import { useRef } from 'react'
import { PortalConfigSchema } from '../../types'

export function EditorToolbar() {
  const { config, importConfig, exportConfig, resetConfig } = usePortalConfig()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleExport = () => {
    const json = JSON.stringify(exportConfig(), null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${config.metadata.name
      .toLowerCase()
      .replace(/\s+/g, '-')}-config.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = e => {
      try {
        const json = JSON.parse(e.target?.result as string)
        const validated = PortalConfigSchema.parse(json)
        importConfig(validated)
      } catch (error) {
        console.error('Failed to import config:', error)
        alert('Failed to import config. Please check the file format.')
      }
    }
    reader.readAsText(file)

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar variant="dense">
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 0, mr: 2, fontWeight: 'bold' }}
        >
          Portal Builder
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
          {config.metadata.name}
        </Typography>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleImport}
            style={{ display: 'none' }}
            id="import-config-input"
          />
          <Button size="small" startIcon={<UploadIcon />} variant="outlined">
            <label htmlFor="import-config-input" style={{ cursor: 'pointer' }}>
              Import
            </label>
          </Button>

          <Button
            size="small"
            startIcon={<DownloadIcon />}
            variant="outlined"
            onClick={handleExport}
          >
            Export
          </Button>

          <IconButton
            size="small"
            onClick={resetConfig}
            title="Reset to default"
          >
            <RefreshIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
