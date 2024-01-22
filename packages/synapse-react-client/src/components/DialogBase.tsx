import CloseIcon from '@mui/icons-material/Close'
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentProps,
  DialogProps,
  DialogTitle,
  IconButton,
  Stack,
  SxProps,
} from '@mui/material'
import React from 'react'
import { HelpPopover, HelpPopoverProps } from './HelpPopover/HelpPopover'

export type CloseButtonProps = {
  sx?: SxProps
  onClick?: () => void
}

export const CLOSE_BUTTON_LABEL = 'close'

export const CloseButton: React.FC<CloseButtonProps> = ({
  sx = { color: 'grey.700' },
  onClick,
}) => {
  return (
    <IconButton sx={sx} onClick={onClick} aria-label={CLOSE_BUTTON_LABEL}>
      <CloseIcon />
    </IconButton>
  )
}

export type DialogBaseProps = Omit<DialogProps, 'title'> & {
  title: React.ReactNode
  content: React.ReactNode
  actions?: React.ReactNode
  onCancel: () => void
  hasCloseButton?: boolean
  titleHelpPopoverProps?: HelpPopoverProps
  fullWidth?: boolean
  contentProps?: DialogContentProps
}

/**
 * A dialog built using MUI components.
 */
export const DialogBase = ({
  title,
  content,
  actions,
  onCancel,
  hasCloseButton = true,
  titleHelpPopoverProps,
  maxWidth = 'sm',
  fullWidth = true,
  contentProps = {},
  ...dialogProps
}: DialogBaseProps) => {
  return (
    <Dialog
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      onClose={() => onCancel()}
      {...dialogProps}
    >
      <DialogTitle>
        <Stack direction="row" alignItems={'center'} gap={'5px'}>
          {title}
          {titleHelpPopoverProps && <HelpPopover {...titleHelpPopoverProps} />}
          <Box sx={{ flexGrow: 1 }} />
          {hasCloseButton && <CloseButton onClick={() => onCancel()} />}
        </Stack>
      </DialogTitle>
      <DialogContent {...contentProps}>{content}</DialogContent>
      {actions && <DialogActions>{actions}</DialogActions>}
    </Dialog>
  )
}
