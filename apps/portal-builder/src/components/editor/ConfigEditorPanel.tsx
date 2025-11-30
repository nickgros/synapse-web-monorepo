import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import { useState } from 'react'
import { ResourcesEditor } from './ResourcesEditor'
import { GeneralSettingsEditor } from './GeneralSettingsEditor'
import { RouteTreeEditor } from './RouteTreeEditor'

export function ConfigEditorPanel() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Tabs
        value={activeTab}
        onChange={(_, newValue) => setActiveTab(newValue)}
        sx={{ borderBottom: 1, borderColor: 'divider' }}
      >
        <Tab label="General" />
        <Tab label="Routes" />
        <Tab label="Resources" />
      </Tabs>

      <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
        {activeTab === 0 && <GeneralSettingsEditor />}
        {activeTab === 1 && <RouteTreeEditor />}
        {activeTab === 2 && <ResourcesEditor />}
      </Box>
    </Box>
  )
}
