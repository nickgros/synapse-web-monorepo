import React from 'react'
import { FormGroup, Typography } from '@mui/material'
import {
  ENTITY_VIEW_TYPE_MASK_DATASET,
  ENTITY_VIEW_TYPE_MASK_FILE,
  ENTITY_VIEW_TYPE_MASK_FOLDER,
  ENTITY_VIEW_TYPE_MASK_TABLE,
} from '@sage-bionetworks/synapse-types'
import { Checkbox } from '../widgets/Checkbox'

type EntityViewMaskEditorProps = {
  value: number
  onChange: (mask: number) => void
}

const maskLabelPairs: [string, number][] = [
  ['Files', ENTITY_VIEW_TYPE_MASK_FILE],
  ['Folders', ENTITY_VIEW_TYPE_MASK_FOLDER],
  ['Tables', ENTITY_VIEW_TYPE_MASK_TABLE],
  ['Datasets', ENTITY_VIEW_TYPE_MASK_DATASET],
]

export default function EntityViewMaskEditor(props: EntityViewMaskEditorProps) {
  const { value, onChange } = props
  return (
    <>
      <Typography variant={'body1'} mt={2.5} mb={1.25} sx={{ fontWeight: 700 }}>
        Include in View
      </Typography>
      <FormGroup sx={{ gap: 1 }}>
        {maskLabelPairs.map(([label, mask]) => (
          <Checkbox
            key={label}
            label={label}
            checked={(value & mask) > 0}
            onChange={() => {
              // Toggle the clicked mask value with XOR
              onChange(value ^ mask)
            }}
          />
        ))}
      </FormGroup>
    </>
  )
}
