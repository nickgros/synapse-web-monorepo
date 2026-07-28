import {
  FileHandleAssociateType,
  FileHandleAssociation,
} from '@sage-bionetworks/synapse-types'

/**
 * Builds the FileHandleAssociation sent on AgentChatRequest.attachments for a bare fileHandleId
 * created by uploading a local file (see BasicFileHandleUpload/useUploadFiles).
 *
 * TODO(PLFM-9827): The backend short-circuits the FileHandleAssociation auth check for a user's
 * own uploaded file handle, so `associateObjectId`/`associateObjectType` are effectively unused
 * in this case. FileHandleAssociateType has no dedicated value for "the uploader's own bare file
 * handle" today, so this stubs `associateObjectId` to the fileHandleId itself and picks the
 * closest existing enum value. This is the single fix-point to update if/when the backend adds a
 * dedicated association type (e.g. a `UserOwned` type).
 */
export function buildChatAttachmentAssociation(
  fileHandleId: string,
): FileHandleAssociation {
  return {
    fileHandleId,
    associateObjectId: fileHandleId,
    associateObjectType: FileHandleAssociateType.MessageAttachment,
  }
}
