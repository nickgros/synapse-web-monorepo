import { StyledComponent } from '@emotion/styled'
import {
  Box,
  BoxProps,
  styled,
  Typography,
  TypographyProps,
} from '@mui/material'
import { alpha } from '@mui/material/styles'

export const DialogSubsectionHeader: StyledComponent<TypographyProps> = styled(
  Typography,
  {
    label: 'DialogSubsectionHeader',
  },
)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  paddingBottom: theme.spacing(1),
  fontSize: '18px',
  fontWeight: 'bold',
  borderBottom: '1px solid',
  borderColor: theme.palette.grey['200'],
}))
DialogSubsectionHeader.defaultProps = {
  ...DialogSubsectionHeader.defaultProps,
  variant: 'h4',
}

export const InlineButtonContainer: StyledComponent<BoxProps> = styled(Box, {
  label: 'InlineButtonContainer',
})(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  margin: `${theme.spacing(1)} 0`,
}))

export const RequirementContainer: StyledComponent<BoxProps> = styled(Box, {
  label: 'RequirementContainer',
})(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  margin: '1rem 0 4rem',
  borderLeft: `1px solid ${theme.palette.grey[400]}`,
  borderImage: `linear-gradient(
    to bottom, ${alpha(theme.palette.grey[400], 0)} 40px, ${alpha(
    theme.palette.grey[400],
    1,
  )} 40px, ${alpha(theme.palette.grey[400], 1)} calc(100% - 20px),${alpha(
    theme.palette.grey[400],
    0,
  )} calc(100% - 20px))`,
  borderImageSlice: 1,
  marginLeft: '15px',
  paddingLeft: '35px',
  paddingBottom: '-20px',
}))
