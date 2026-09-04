import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material'

const RDCA_DAP_URL = 'https://portal.rdca.c-path.org/'

/**
 * Explains why the user can't use the RDCA-DAP API yet. A one-time RDCA-DAP sign-in links
 * the Synapse account. The RDCA-DAP/FAIR services account itself must also be approved by
 * C-Path (3–5 business days).
 */
export function RdcaDapEligibilityExplainer() {
  return (
    <Stack spacing={2}>
      <Typography>
        You need a linked RDCA-DAP account before you can request access to this
        dataset.
      </Typography>
      <Typography>
        If you already have an account, sign in to RDCA-DAP once to link it to
        your Synapse account.
      </Typography>
      <Typography>
        If you don&apos;t have one yet, create an RDCA-DAP account. New accounts
        typically take 3-5 business days for C-Path to approve.
      </Typography>
    </Stack>
  )
}

export type RdcaDapEligibilityDialogProps = {
  open: boolean
  onClose: () => void
}

export default function RdcaDapEligibilityDialog(
  props: RdcaDapEligibilityDialogProps,
) {
  const { open, onClose } = props
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Link your RDCA-DAP account</DialogTitle>
      <DialogContent>
        <RdcaDapEligibilityExplainer />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button
          variant="contained"
          href={RDCA_DAP_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Go to RDCA-DAP
        </Button>
      </DialogActions>
    </Dialog>
  )
}
