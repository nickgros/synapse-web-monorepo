import React, { useState } from 'react'
import { RouteControl, RouteControlProps } from '../RouteControl'
import { useHistory, useLocation } from 'react-router-dom'
import { SynapseComponent } from '../SynapseComponent'
import { SynapseConfig } from '../types/portal-config'
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material'
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material'
import { RESPONSIVE_SIDE_PADDING } from '../utils'

export type RouteControlWrapperProps = {
  synapseConfig?: SynapseConfig
  // we have to pass in all the custom routes because unlike the home page the explore buttons configs aren't held in state
  customRoutes: string[]
  searchParams?: any
}

/**
 * RouteControl is the set of controls used on the /Explore page to navigate the
 * different keys.
 */
export default function RouteControlWrapper(props: RouteControlWrapperProps) {
  const { synapseConfig, customRoutes = [], searchParams } = props
  const location = useLocation()
  const history = useHistory()
  const pathname = location.pathname
  const subPath = pathname.substring('/Explore/'.length)
  const handleChangesFn = (val: string, _index: number) => {
    history.push(`/Explore/${val}`)
  }
  const routeControlProps: RouteControlProps = {
    customRoutes,
    handleChanges: handleChangesFn,
    isSelected: (name: string) => name === subPath,
  }
  const selectedTab = subPath
  const [showSubNav, setShowSubNav] = useState<boolean>(false)
  const theme = useTheme()
  const isDesktopView = useMediaQuery(theme.breakpoints.up('sm'))

  return (
    <>
      <Box
        sx={{
          ...RESPONSIVE_SIDE_PADDING,
          backgroundColor: 'grey.100',
          pt: 5,
          borderBottom: '1px solid',
          borderBottomColor: 'grey.400',
        }}
      >
        <Typography variant={'headline1'} sx={{ mb: 1 }}>
          Explore
        </Typography>
        <Box
          className={'mobile-explore-nav-selected'}
          sx={{
            display: { sm: 'none' },
            '&:hover': {
              backgroundColor: 'grey.200',
            },
            cursor: 'pointer',
          }}
          onClick={() => setShowSubNav((showSubNav) => !showSubNav)}
        >
          {selectedTab}
          {showSubNav ? (
            <ArrowDropDown fontSize={'large'} />
          ) : (
            <ArrowDropUp fontSize={'large'} />
          )}
        </Box>
        {(showSubNav || isDesktopView) && (
          <RouteControl {...routeControlProps} />
        )}
      </Box>
      <Box sx={RESPONSIVE_SIDE_PADDING}>
        {synapseConfig && (
          <SynapseComponent
            synapseConfig={synapseConfig}
            searchParams={searchParams}
          />
        )}
      </Box>
    </>
  )
}
