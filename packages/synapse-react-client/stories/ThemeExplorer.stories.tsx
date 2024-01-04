import { Meta, StoryObj } from '@storybook/react'
import ThemeExplorer from './ThemeExplorer'

const meta = {
  title: 'MUI/Theme Explorer',
  component: ThemeExplorer,
  tags: ['autodocs'],
} satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Demo: Story = {
  name: 'Theme Explorer',
}
