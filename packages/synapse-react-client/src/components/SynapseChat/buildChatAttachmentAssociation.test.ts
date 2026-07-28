import { FileHandleAssociateType } from '@sage-bionetworks/synapse-types'
import { buildChatAttachmentAssociation } from './buildChatAttachmentAssociation'

describe('buildChatAttachmentAssociation', () => {
  it('builds a FileHandleAssociation referencing the given fileHandleId', () => {
    const association = buildChatAttachmentAssociation('123')

    expect(association).toEqual({
      fileHandleId: '123',
      associateObjectId: '123',
      associateObjectType: FileHandleAssociateType.MessageAttachment,
    })
  })
})
