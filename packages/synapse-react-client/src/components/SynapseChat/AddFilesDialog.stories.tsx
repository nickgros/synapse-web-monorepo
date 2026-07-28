import { Meta, StoryObj } from '@storybook/react-vite'
import { fn, userEvent } from 'storybook/test'
import { AddFilesDialog } from './AddFilesDialog'
import { MAX_ATTACHMENT_FILE_SIZE_BYTES } from './chatAttachmentConstants'

const meta = {
  title: 'Synapse/Chat/AddFilesDialog',
  component: AddFilesDialog,
  args: {
    open: true,
    currentAttachmentCount: 0,
    onClose: fn(),
    onAttachmentUploaded: fn(),
    onUploadStateChange: fn(),
  },
  parameters: {
    requireLogin: true,
  },
} satisfies Meta<typeof AddFilesDialog>
export default meta
type Story = StoryObj<typeof meta>

export const Empty: Story = {}

export const AtAttachmentLimit: Story = {
  args: {
    currentAttachmentCount: 20,
  },
}

export const ClientValidationError: Story = {
  play: async ({ canvasElement }) => {
    const fileInput = canvasElement.querySelector<HTMLInputElement>(
      'input[type="file"][id=filesToUpload]',
    )!
    const oversizedFile = new File(
      [new Uint8Array(MAX_ATTACHMENT_FILE_SIZE_BYTES + 1)],
      'huge-file.txt',
      { type: 'text/plain' },
    )
    await userEvent.upload(fileInput, oversizedFile)
  },
}
