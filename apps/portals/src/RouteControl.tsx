import React, { useLayoutEffect, useRef } from 'react'
import {
  Tab,
  Tabs,
  TabScrollButton,
  useMediaQuery,
  useTheme,
} from '@mui/material'

export type RouteControlProps = {
  handleChanges: (text: string, index: number) => void
  isSelected: (name: string) => boolean
  customRoutes: string[]
}

export const RouteControl: React.FunctionComponent<RouteControlProps> = ({
  handleChanges,
  isSelected,
  customRoutes,
}) => {
  const theme = useTheme()
  const isMobileView = useMediaQuery(theme.breakpoints.down('sm'))

  const selectedRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    // setTimeout is necessary or else it only scrolls to reveal half of the button
    setTimeout(() => {
      selectedRef.current?.scrollIntoView(false)
    }, 100)
  }, [])

  const CustomScrollButton = (props) => {
    if (props.disabled) {
      return <></>
    }
    return (
      <TabScrollButton
        {...props}
        sx={{
          svg: {
            color: 'secondary.main',
            fontSize: '26px',
          },
        }}
      />
    )
  }

  /**
   * In the desktop view, we use Material UI tabs
   */
  return (
    <Tabs
      value={customRoutes.find((name) => isSelected(name))}
      variant="scrollable"
      orientation={isMobileView ? 'vertical' : 'horizontal'}
      scrollButtons="auto"
      ScrollButtonComponent={CustomScrollButton}
      aria-label="Explore Sections"
      sx={{
        '.MuiTabs-flexContainer': {
          gap: 5,
          alignItems: 'center',
        },
      }}
      TabIndicatorProps={{
        style: { background: 'transparent' },
      }}
    >
      {customRoutes.map((name, index) => {
        return (
          <Tab
            value={name}
            ref={isSelected(name) ? selectedRef : undefined}
            key={name}
            label={name}
            disableRipple={true}
            disableTouchRipple
            onClick={() => handleChanges(name, index)}
            sx={{
              fontSize: '16px',
              fontWeight: 700,
              color: 'grey.700',
              minWidth: { xs: '100%', sm: 'unset' },
              py: 1,
              px: 0,
              borderBottom: '4px solid',
              borderBottomColor: 'transparent',
              '&.Mui-selected': {
                borderBottomColor: 'secondary.main',
              },
              '&:hover:not(.Mui-selected)': {
                color: 'grey.800',
              },
            }}
          />
        )
      })}
    </Tabs>
  )
}
