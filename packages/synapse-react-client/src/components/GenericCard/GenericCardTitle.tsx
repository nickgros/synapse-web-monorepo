import { Link } from '@mui/material'
import { Link as RouterLink } from 'react-router'

type GenericCardTitleProps = {
  title: string
  target?: string
  href?: string
}

export function GenericCardTitle(props: GenericCardTitleProps) {
  const { target, title, href } = props

  if (href) {
    return (
      <Link component={RouterLink} target={target} to={href}>
        {title}
      </Link>
    )
  } else {
    return <span>{title}</span>
  }
}
