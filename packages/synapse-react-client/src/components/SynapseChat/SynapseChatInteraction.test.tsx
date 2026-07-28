import { createWrapper } from '@/testutils/TestingLibraryUtils'
import { render, screen } from '@testing-library/react'
import SynapseChatInteraction, {
  SynapseChatInteractionProps,
} from './SynapseChatInteraction'

const defaultProps: SynapseChatInteractionProps = {
  userMessage: 'hello world',
}

function renderComponent(props?: Partial<SynapseChatInteractionProps>) {
  render(<SynapseChatInteraction {...defaultProps} {...props} />, {
    wrapper: createWrapper(),
  })
}
describe('SynapseChatInteraction tests', () => {
  it('Chat response is rendered', async () => {
    renderComponent({
      chatResponseText: 'here is a response',
    })

    const text = await screen.findByText('here is a response')
    expect(text).toBeInTheDocument()
  })

  it('Custom LLM ML elements are removed, and tool_name content is deleted', async () => {
    renderComponent({
      chatResponseText:
        '<function_results>\n<result>\n<tool_name><REDACTED>tool-name</tool_name>\n<stdout>  Content is cleaned up \n</stdout>\n</result>\n',
    })

    const text = await screen.findByText('Content is cleaned up')
    expect(text).toBeInTheDocument()
    expect(screen.queryByText('tool-name')).not.toBeInTheDocument()
    // html should be removed in 2 ways (by the DOMParser cleanup in SynapseChatInteraction as well as the xss html sanitizer in MarkdownSynapse)
    expect(screen.queryByText('<result>')).not.toBeInTheDocument()
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('Error is shown in an alert', async () => {
    const errorMessage =
      'Sorry, AI has become uncontrollable and superintelligent leading to human existential risk'
    renderComponent({
      chatErrorReason: errorMessage,
    })

    const alertElement = await screen.findByRole('alert')
    expect(alertElement).toBeInTheDocument()
    expect(screen.queryByText(errorMessage)).toBeInTheDocument()
  })

  it('renders no attachment chips when attachments is omitted', () => {
    renderComponent()

    expect(screen.queryByText('PDF')).not.toBeInTheDocument()
  })

  it('renders a chip with the filename/type for a rich attachment', () => {
    renderComponent({
      attachments: [
        {
          fileHandleId: '9999999',
          fileName: 'report.pdf',
          contentType: 'application/pdf',
        },
      ],
    })

    expect(screen.getByText('report.pdf')).toBeInTheDocument()
    expect(screen.getByText('PDF')).toBeInTheDocument()
  })

  it('falls back to the fileHandleId as the label for a generic attachment', () => {
    renderComponent({
      attachments: [{ fileHandleId: '9999999' }],
    })

    expect(screen.getByText('9999999')).toBeInTheDocument()
  })

  it('shows a failed status for an attachment reported as FAILED', () => {
    renderComponent({
      attachments: [{ fileHandleId: '9999999', fileName: 'report.pdf' }],
      attachmentStatuses: [
        {
          fileHandleId: '9999999',
          status: 'FAILED',
          failureCode: 'NOT_FOUND',
          failureMessage: 'The file could not be found.',
        },
      ],
    })

    expect(screen.getByText('Failed')).toBeInTheDocument()
  })
})
