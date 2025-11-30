import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { usePortalConfig } from '../../state'
import { ColorPicker } from './ColorPicker'

export function GeneralSettingsEditor() {
  const {
    config,
    setMetadata,
    setPalette,
    setHeaderConfig,
    setFooterConfig,
    setLogoHeaderConfig,
    setLogoFooterConfig,
  } = usePortalConfig()

  return (
    <Box>
      {/* Metadata Section */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight="medium">Portal Metadata</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Portal Name"
              value={config.metadata.name}
              onChange={e =>
                setMetadata({ ...config.metadata, name: e.target.value })
              }
              fullWidth
              size="small"
            />
            <TextField
              label="Description"
              value={config.metadata.description || ''}
              onChange={e =>
                setMetadata({
                  ...config.metadata,
                  description: e.target.value,
                })
              }
              fullWidth
              size="small"
              multiline
              rows={2}
            />
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* Palette Section */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight="medium">Color Palette</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <ColorPicker
              label="Primary Color"
              value={config.palette.primary}
              onChange={value =>
                setPalette({ ...config.palette, primary: value })
              }
            />
            <ColorPicker
              label="Secondary Color"
              value={config.palette.secondary}
              onChange={value =>
                setPalette({ ...config.palette, secondary: value })
              }
            />
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* Header Section */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight="medium">Home Page Header</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Title"
              value={config.headerConfig.title}
              onChange={e =>
                setHeaderConfig({
                  ...config.headerConfig,
                  title: e.target.value,
                })
              }
              fullWidth
              size="small"
            />
            <TextField
              label="Summary"
              value={config.headerConfig.summary}
              onChange={e =>
                setHeaderConfig({
                  ...config.headerConfig,
                  summary: e.target.value,
                })
              }
              fullWidth
              size="small"
              multiline
              rows={3}
            />
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* Logo Section */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight="medium">Logos</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Header Logo URL"
              value={config.logoHeaderConfig.icon || ''}
              onChange={e =>
                setLogoHeaderConfig({
                  ...config.logoHeaderConfig,
                  icon: e.target.value,
                })
              }
              fullWidth
              size="small"
              placeholder="https://example.com/logo.svg"
            />
            <TextField
              label="Header Logo Text"
              value={config.logoHeaderConfig.name || ''}
              onChange={e =>
                setLogoHeaderConfig({
                  ...config.logoHeaderConfig,
                  name: e.target.value,
                })
              }
              fullWidth
              size="small"
            />
            <TextField
              label="Footer Logo URL"
              value={config.logoFooterConfig.icon || ''}
              onChange={e =>
                setLogoFooterConfig({
                  ...config.logoFooterConfig,
                  icon: e.target.value,
                })
              }
              fullWidth
              size="small"
              placeholder="https://example.com/footer-logo.svg"
            />
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* Footer Section */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight="medium">Footer</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Contact Us URL"
              value={config.footerConfig.contactUs || ''}
              onChange={e =>
                setFooterConfig({
                  ...config.footerConfig,
                  contactUs: e.target.value,
                })
              }
              fullWidth
              size="small"
            />
            <TextField
              label="Help URL"
              value={config.footerConfig.help || ''}
              onChange={e =>
                setFooterConfig({
                  ...config.footerConfig,
                  help: e.target.value,
                })
              }
              fullWidth
              size="small"
            />
            <TextField
              label="Terms of Service URL"
              value={config.footerConfig.termsOfService || ''}
              onChange={e =>
                setFooterConfig({
                  ...config.footerConfig,
                  termsOfService: e.target.value,
                })
              }
              fullWidth
              size="small"
            />
            <TextField
              label="Forum URL"
              value={config.footerConfig.forum || ''}
              onChange={e =>
                setFooterConfig({
                  ...config.footerConfig,
                  forum: e.target.value,
                })
              }
              fullWidth
              size="small"
            />
            <TextField
              label="About URL"
              value={config.footerConfig.about || ''}
              onChange={e =>
                setFooterConfig({
                  ...config.footerConfig,
                  about: e.target.value,
                })
              }
              fullWidth
              size="small"
            />
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}
