import { Meta, StoryObj } from '@storybook/react'
import CreateTableWizard from './CreateTableWizard'

const meta = {
  title: 'Synapse/Create Table Wizard',
  component: CreateTableWizard,
  tags: ['autodocs'],
} satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Demo: Story = {
  name: 'Create Table Wizard',
  args: {
    parentId: 'syn23567475',
  },
}
