import React from 'react'
import { Box } from '@mui/material'

export type WizardChoiceButtonGroupProps = React.PropsWithChildren<{}>

export default function WizardChoiceButtonGroup(
  props: WizardChoiceButtonGroupProps,
) {
  const { children } = props
  return (
    <Box
      sx={{
        '& > button': {
          '&:first-child': {
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          },
          '&:not(:first-child):not(:last-child)': {
            borderRadius: 0,
            borderTop: 'none',
          },
          '&:last-child': {
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            borderTop: 'none',
          },
        },
      }}
    >
      {children}
    </Box>
  )
}
