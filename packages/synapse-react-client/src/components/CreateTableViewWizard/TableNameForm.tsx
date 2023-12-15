import React from 'react'
import { TextField } from '@mui/material'

type TableNameFormProps = {
  name: string
  setName: React.Dispatch<React.SetStateAction<string>>
  description: string
  setDescription: React.Dispatch<React.SetStateAction<string>>
}

/**
 * React component for the first step of creating a new table or view.
 * Renders UI to provide the name and description of a table or view.
 *
 * If this is a view, the user can also select the scope of the view.
 */
export default function TableNameForm(props: TableNameFormProps) {
  const { name, setName, description, setDescription } = props

  return (
    <form>
      <TextField
        required
        label={'Name'}
        value={name}
        onChange={e => {
          setName(e.target.value)
        }}
        fullWidth
      />
      <TextField
        label={'Description'}
        value={description}
        onChange={e => {
          setDescription(e.target.value)
        }}
        fullWidth
        multiline
        rows={3}
        sx={{ my: 2 }}
      />
    </form>
  )
}
