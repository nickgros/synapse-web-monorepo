import { Meta, StoryObj } from '@storybook/react'
import SubmissionViewScopeEditor from './SubmissionViewScopeEditor'
import mockProject from '../../mocks/entity/mockProject'
import { mockFolderEntity } from '../../mocks/entity/mockEntity'
import { Paper } from '@mui/material'
import React from 'react'
import EvaluationFinder from './EvaluationFinder'

const meta: Meta = {
  title: 'Synapse/Evaluation Finder',
  component: EvaluationFinder,
  decorators: [
    Story => (
      <Paper sx={{ mx: 'auto', p: 4, maxWidth: '720px' }}>
        <Story />
      </Paper>
    ),
  ],
} satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Empty: Story = {
  args: {
    scopeIds: [],
  },
}

export const HasItems: Story = {
  args: {
    scopeIds: [mockProject.id, mockFolderEntity.id!],
  },
}
