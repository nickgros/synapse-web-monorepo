import { Meta, StoryObj } from '@storybook/react'
import ModalDownload from '../src/lib/containers/ModalDownload'

const meta = {
  title: 'UI/ModalDownload',
  component: ModalDownload,
} satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Demo: Story = {
  args: {
    queryBundleRequest: {
      concreteType: 'org.sagebionetworks.repo.model.table.QueryBundleRequest',
      entityId: '',
      // @ts-ignore
      partMask: undefined,
      query: { sql: 'SELECT * FROM syn26438037 LIMIT 5' },
    },
  },
}
