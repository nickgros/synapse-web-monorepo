import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { Outlet, useLocation } from 'react-router'
import Navbar from '@sage-bionetworks/synapse-portal-framework/components/navbar/Navbar'
import Footer from '@sage-bionetworks/synapse-portal-framework/components/Footer'
import { PortalConfig } from '../../types'

interface PreviewLayoutProps {
  config: PortalConfig
}

export function PreviewLayout({ config }: PreviewLayoutProps) {
  const location = useLocation()

  return (
    <Box sx={{ minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Use the actual Navbar component from synapse-portal-framework */}
      <Navbar />

      {/* Home Header (shown only on home page) */}
      {location.pathname === '/' && (
        <Box
          sx={{
            backgroundColor: 'primary.main',
            color: 'primary.contrastText',
            py: 6,
            px: 2,
            textAlign: config.headerConfig.centerText ? 'center' : 'left',
          }}
        >
          <Container maxWidth="md">
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              {config.headerConfig.title}
            </Typography>
            <Typography variant="body1">
              {config.headerConfig.summary}
            </Typography>
          </Container>
        </Box>
      )}

      {/* Main Content */}
      <Box component="main" className="main" sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>

      {/* Use the actual Footer component from synapse-portal-framework */}
      <Footer />
    </Box>
  )
}
