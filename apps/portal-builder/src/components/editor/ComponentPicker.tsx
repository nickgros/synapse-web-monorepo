import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Typography from '@mui/material/Typography'
import { v4 as uuidv4 } from 'uuid'
import { ComponentBlock } from '../../types'
import {
  getComponentsByCategory,
  ComponentCategory,
  RegisteredComponent,
} from '../registry'

interface ComponentPickerProps {
  open: boolean
  onClose: () => void
  onSelect: (block: ComponentBlock) => void
}

const categoryLabels: Record<ComponentCategory, string> = {
  'data-display': 'Data Display',
  layout: 'Layout',
  content: 'Content',
  navigation: 'Navigation',
  user: 'User',
  custom: 'Custom',
}

const categoryOrder: ComponentCategory[] = [
  'data-display',
  'content',
  'layout',
  'user',
  'navigation',
  'custom',
]

export function ComponentPicker({
  open,
  onClose,
  onSelect,
}: ComponentPickerProps) {
  const handleSelect = (component: RegisteredComponent) => {
    const block: ComponentBlock = {
      id: uuidv4(),
      componentType: component.type,
      props: { ...component.defaultProps },
    }
    onSelect(block)
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Add Component</DialogTitle>
      <DialogContent>
        {categoryOrder.map(category => {
          const components = getComponentsByCategory(category)
          if (components.length === 0) return null

          return (
            <Box key={category} sx={{ mb: 3 }}>
              <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
                {categoryLabels[category]}
              </Typography>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: '1fr',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(3, 1fr)',
                  },
                  gap: 2,
                }}
              >
                {components.map(component => (
                  <Box key={component.type}>
                    <Card variant="outlined">
                      <CardActionArea onClick={() => handleSelect(component)}>
                        <CardContent>
                          <Typography variant="subtitle2" gutterBottom>
                            {component.displayName}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                            }}
                          >
                            {component.description}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Box>
                ))}
              </Box>
            </Box>
          )
        })}
      </DialogContent>
    </Dialog>
  )
}
