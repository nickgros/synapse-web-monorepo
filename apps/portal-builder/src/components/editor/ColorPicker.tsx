import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'

interface ColorPickerProps {
  label: string
  value: string
  onChange: (value: string) => void
}

export function ColorPicker({ label, value, onChange }: ColorPickerProps) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <TextField
        label={label}
        value={value}
        onChange={e => onChange(e.target.value)}
        size="small"
        sx={{ flexGrow: 1 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <input
                type="color"
                value={value}
                onChange={e => onChange(e.target.value)}
                style={{
                  width: 24,
                  height: 24,
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                }}
              />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  )
}
