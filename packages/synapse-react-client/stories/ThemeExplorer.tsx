import React from 'react'
import { useTheme } from '@mui/material'
import { ComplexJSONRenderer } from '../src/components/SynapseTable/SynapseTableCell/JSON/ComplexJSONRenderer'

/**
 * A simple component that can be used to inspect the MUI Theme
 * @constructor
 */
export default function ThemeExplorer() {
  const theme = useTheme()
  return <ComplexJSONRenderer value={theme} />
}
