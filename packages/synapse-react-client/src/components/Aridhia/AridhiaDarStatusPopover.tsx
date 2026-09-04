import {
  Popover,
  PopoverProps,
  Stack,
  Typography,
  Link as MuiLink,
} from '@mui/material'
import { RequestListItem } from '@sage-bionetworks/aridhia-client/generated/models'

const RDCA_DAP_URL = 'https://portal.rdca.c-path.org/'

export type AridhiaDarStatusPopoverProps = Pick<
  PopoverProps,
  'anchorEl' | 'open' | 'id' | 'onClose'
> & {
  request: RequestListItem
}

/**
 * Detail popover for a pending or denied DAR. Sourced entirely from the already-fetched
 * `findRequestForDataset` result — no extra query. `RequestListItem` (the list-response shape)
 * carries no workspace name/location, so — unlike the plan of record — this shows only the
 * fields the list response actually provides.
 */
export default function AridhiaDarStatusPopover(
  props: AridhiaDarStatusPopoverProps,
) {
  const { anchorEl, open, id, onClose, request } = props

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      transformOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Stack spacing={1} sx={{ p: 2, maxWidth: 320 }}>
        <Typography variant="subtitle2">
          {request.name ?? request.code}
        </Typography>
        <Typography variant="body2">Code: {request.code}</Typography>
        <Typography variant="body2">Status: {request.status}</Typography>
        {request.created_at && (
          <Typography variant="body2">
            Created: {new Date(request.created_at).toLocaleDateString()}
          </Typography>
        )}
        {request.updated_at && (
          <Typography variant="body2">
            Updated: {new Date(request.updated_at).toLocaleDateString()}
          </Typography>
        )}
        <MuiLink href={RDCA_DAP_URL} target="_blank" rel="noopener noreferrer">
          View on RDCA-DAP
        </MuiLink>
      </Stack>
    </Popover>
  )
}
