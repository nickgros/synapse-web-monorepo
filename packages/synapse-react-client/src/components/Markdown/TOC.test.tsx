import { render, screen } from '@testing-library/react'
import React from 'react'
import MarkdownSynapse from './MarkdownSynapse'
import { createWrapper } from '../../testutils/TestingLibraryUtils'
import SynapseClient from '../../synapse-client'

describe('renders without crashing', () => {
  vi.spyOn(SynapseClient, 'getWikiAttachmentsFromEntity').mockResolvedValue({
    list: [],
  })
  const mockOwnerId = 'mock_owner_id'
  const mockWikiId = 'mock_wiki_id'

  it('renders a table of contents without crashing', async () => {
    vi.spyOn(SynapseClient, 'getEntityWiki').mockResolvedValue({
      markdown: '${toc}\n#Heading1',
      attachmentFileHandleIds: [],
      createdBy: '',
      createdOn: '',
      etag: '',
      id: '',
      modifiedBy: '',
      modifiedOn: '',
      title: '',
    })

    render(<MarkdownSynapse ownerId={mockOwnerId} wikiId={mockWikiId} />, {
      wrapper: createWrapper(),
    })

    // Render a link in the TOC that points to the corresponding heading element
    const tocLink = await screen.findByRole<HTMLAnchorElement>('link')
    await screen.findByRole<HTMLHeadingElement>('heading')
    expect(tocLink).toHaveClass('link toc-indent1')

    // TODO: Test that the link points to the header
  })

  it('renders a table of contents with a non-toc-header header', async () => {
    vi.spyOn(SynapseClient, 'getEntityWiki').mockResolvedValue({
      markdown: "${toc}\n#Heading1\n##! Don't show me!",
      attachmentFileHandleIds: [],
      createdBy: '',
      createdOn: '',
      etag: '',
      id: '',
      modifiedBy: '',
      modifiedOn: '',
      title: '',
    })
    render(<MarkdownSynapse ownerId={mockOwnerId} wikiId={mockWikiId} />, {
      wrapper: createWrapper(),
    })

    const tocLinks = await screen.findAllByRole<HTMLAnchorElement>('link')
    const headings = await screen.findAllByRole<HTMLHeadingElement>('heading')

    expect(tocLinks).toHaveLength(1)
    expect(headings).toHaveLength(2)
  })
})
