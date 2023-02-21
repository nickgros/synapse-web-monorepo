import * as React from 'react'
import { Button, ButtonProps } from '@mui/material'

type ButtonWithIconProps = {
  children: React.ReactNode // typically just a string, but we won't restrict it
  icon: React.ReactNode // ideally an SVG
}

/**
 * A button with center-aligned content (typically text) that displays a left-aligned icon.
 * @param param0
 */
const ButtonWithIcon: React.FunctionComponent<
  ButtonWithIconProps & ButtonProps
> = ({ children, icon, ...rest }: { children: any; icon?: any }) => {
  return (
    <Button className="ButtonWithIcon" {...rest} startIcon={icon}>
      {children}
    </Button>
  )
}

export default ButtonWithIcon
