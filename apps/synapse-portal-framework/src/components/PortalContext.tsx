import React, { useContext } from 'react'
import {
  FooterConfig,
  HomePageHeaderConfig,
  LogoConfig,
} from '../types/portal-config'
import { NavbarConfig } from './navbar/Navbar'

export type PortalContextType = {
  portalName: string
  headerConfig: HomePageHeaderConfig
  footerConfig: FooterConfig
  logoHeaderConfig: LogoConfig
  logoFooterConfig: LogoConfig
  navbarConfig: NavbarConfig
}

export const PortalContext = React.createContext<PortalContextType | undefined>(
  undefined,
)

export type PortalContextProviderProps = React.PropsWithChildren<{
  value: PortalContextType
}>

export function PortalContextProvider(props: PortalContextProviderProps) {
  const { children, value } = props

  return (
    <PortalContext.Provider value={value}>{children}</PortalContext.Provider>
  )
}

export function usePortalContext(): PortalContextType {
  const context = useContext(PortalContext)
  if (context === undefined) {
    throw new Error(
      'usePortalContext must be used within a PortalContextProvider',
    )
  }
  return context
}
