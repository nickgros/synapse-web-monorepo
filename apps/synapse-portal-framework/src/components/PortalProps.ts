import { PaletteOptions } from '@mui/material'
import { PortalContextType } from './PortalContext'

export type PortalProps = React.PropsWithChildren<
  PortalContextType & {
    palette: PaletteOptions
  }
>
