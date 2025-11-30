import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { ComponentBlock } from '../../types'
import { getComponent } from '../registry'

interface ComponentBlockEditorProps {
  block: ComponentBlock
  onUpdate: (updates: Partial<ComponentBlock>) => void
}

export function ComponentBlockEditor({
  block,
  onUpdate,
}: ComponentBlockEditorProps) {
  const registeredComponent = getComponent(block.componentType)

  if (!registeredComponent) {
    return (
      <Typography color="error">
        Unknown component type: {block.componentType}
      </Typography>
    )
  }

  const schema = registeredComponent.propsSchema
  const shape = schema.shape

  const updateProp = (key: string, value: unknown) => {
    onUpdate({
      props: {
        ...block.props,
        [key]: value,
      },
    })
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {Object.entries(shape).map(([key, zodType]) => {
        const fieldSchema = zodType as any
        const description = fieldSchema.description || key
        const currentValue = block.props[key]

        // Determine field type from Zod schema
        const typeName = fieldSchema._def?.typeName

        if (typeName === 'ZodBoolean') {
          return (
            <FormControlLabel
              key={key}
              control={
                <Checkbox
                  checked={Boolean(currentValue)}
                  onChange={e => updateProp(key, e.target.checked)}
                />
              }
              label={description}
            />
          )
        }

        if (typeName === 'ZodNumber') {
          return (
            <TextField
              key={key}
              label={description}
              type="number"
              value={currentValue ?? ''}
              onChange={e =>
                updateProp(
                  key,
                  e.target.value === '' ? undefined : Number(e.target.value),
                )
              }
              size="small"
              fullWidth
            />
          )
        }

        if (typeName === 'ZodArray') {
          // For arrays, show as a comma-separated text field for now
          const arrayValue = Array.isArray(currentValue)
            ? currentValue.join(', ')
            : ''
          return (
            <TextField
              key={key}
              label={`${description} (comma-separated)`}
              value={arrayValue}
              onChange={e => {
                const values = e.target.value
                  .split(',')
                  .map(s => s.trim())
                  .filter(Boolean)
                updateProp(key, values)
              }}
              size="small"
              fullWidth
              multiline={arrayValue.length > 50 ? true : undefined}
            />
          )
        }

        // Default to string input
        return (
          <TextField
            key={key}
            label={description}
            value={currentValue ?? ''}
            onChange={e => updateProp(key, e.target.value || undefined)}
            size="small"
            fullWidth
            multiline={
              key === 'sql' ||
              (currentValue && String(currentValue).length > 50)
                ? true
                : undefined
            }
            rows={key === 'sql' ? 3 : undefined}
          />
        )
      })}
    </Box>
  )
}
