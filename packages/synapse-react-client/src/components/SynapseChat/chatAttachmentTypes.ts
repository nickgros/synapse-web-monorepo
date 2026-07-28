import {
  AgentChatRequest,
  AgentChatResponse,
  FileHandleAssociation,
} from '@sage-bionetworks/synapse-types'

// TODO(PLFM-9827): These types stand in for the Curie Attachments API, which does not exist yet
// in the OpenAPI spec/generated client. Once the backend ships, replace every usage of these
// types with the generated equivalents and delete this file. See the TDD:
// https://sagebionetworks.jira.com/wiki/spaces/PLFM/pages/4795465808/Technical+Design+Document+API+Design+for+Curie+Attachments

/** Whether an attachment was successfully staged for the agent, or failed. */
export type AgentChatAttachmentStatusType = 'STAGED' | 'FAILED'

/** Reason an attachment failed to be staged for the agent. */
export type AgentChatAttachmentFailureCode =
  | 'NOT_FOUND'
  | 'UNAUTHORIZED'
  | 'EXCEEDS_SIZE_LIMIT'
  | 'UNSUPPORTED_TYPE'
  | 'TOO_MANY_ATTACHMENTS'
  | 'UNKNOWN_ERROR'

/** The server-reported outcome of staging a single attachment, in request order. */
export type AgentChatAttachmentStatus = {
  fileHandleId: string
  status: AgentChatAttachmentStatusType
  failureCode?: AgentChatAttachmentFailureCode
  failureMessage?: string
}

/** AgentChatRequest, extended with the not-yet-generated `attachments` field. */
export type AgentChatRequestWithAttachments = AgentChatRequest & {
  attachments?: FileHandleAssociation[]
}

/** AgentChatResponse, extended with the not-yet-generated `attachmentStatuses` field. */
export type AgentChatResponseWithAttachmentStatuses = AgentChatResponse & {
  attachmentStatuses?: AgentChatAttachmentStatus[]
}

/**
 * A file the user has attached to an in-progress chat message, pending send. Only fully
 * uploaded files are represented here -- upload-in-progress state is shown by
 * BasicFileHandleUpload's own progress UI while the Add Files dialog is open (see decision to
 * render "completed uploads" as chips).
 */
export type ChatAttachment = {
  fileHandleId: string
  fileName: string
  contentType: string
  sizeBytes: number
}
