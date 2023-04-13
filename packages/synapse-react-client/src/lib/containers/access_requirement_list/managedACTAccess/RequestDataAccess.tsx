import * as React from 'react'
import { useEffect, useState } from 'react'
import MarkdownSynapse from '../../markdown/MarkdownSynapse'
import {
  AccessApproval,
  AccessRequirement,
  ACTAccessRequirement,
  ACTSubmissionStatus,
  ApprovalState,
  ManagedACTAccessRequirement,
  SelfSignAccessRequirement,
  SubmissionState,
  TermsOfUseAccessRequirement,
  UserProfile,
  WikiPageKey,
} from '../../../utils/synapseTypes/'
import { SynapseClient } from '../../../utils'
import AccessApprovalCheckMark from '../AccessApprovalCheckMark'
import {
  RequestDataStepCallbackArgs,
  SUPPORTED_ACCESS_REQUIREMENTS,
} from '../AccessRequirementList'
import { ManagedACTAccessRequirementStatus } from '../../../utils/synapseTypes/AccessRequirement/ManagedACTAccessRequirementStatus'
import { cancelDataAccessRequest } from '../../../utils/SynapseClient'
import { AlertProps } from './RequestDataAccessStep2'
import { Alert } from 'react-bootstrap'
import { useSynapseContext } from '../../../utils/SynapseContext'
import { Button, Typography } from '@mui/material'
import { InlineButtonContainer } from '../DataAccessRequestStyledComponents'

export type RequestDataAccessProps = {
  user: UserProfile | undefined
  wikiPage: WikiPageKey | undefined
  entityId: string
  accessRequirement:
    | AccessRequirement
    | TermsOfUseAccessRequirement
    | SelfSignAccessRequirement
    | ManagedACTAccessRequirement
  accessRequirementStatus?: ManagedACTAccessRequirementStatus
  showButton?: boolean
  onHide?: () => void
  requestDataStepCallback?: (args: RequestDataStepCallbackArgs) => void
}

const RequestDataAccess: React.FC<RequestDataAccessProps> = props => {
  const {
    user,
    wikiPage,
    accessRequirementStatus,
    accessRequirement,
    showButton = true,
    onHide,
    requestDataStepCallback,
  } = props
  const { accessToken } = useSynapseContext()
  const [isHide, setIsHide] = useState<boolean>(true)
  const propsIsApproved = accessRequirementStatus?.isApproved
  const [isApproved, setIsApproved] = useState<boolean | undefined>(
    propsIsApproved,
  )
  const [submissionState, setSubmissionState] = useState<SubmissionState>()
  const [alert, setAlert] = useState<AlertProps | undefined>()
  const [isSubmissionCanceled, setIsSubmissionCanceled] =
    useState<boolean>(false)

  useEffect(() => {
    setIsApproved(propsIsApproved)
    if (accessRequirementStatus?.currentSubmissionStatus) {
      setSubmissionState(accessRequirementStatus.currentSubmissionStatus.state)
      showSubmissionStatusAlert(accessRequirementStatus.currentSubmissionStatus)
    }
  }, [propsIsApproved])

  const showRequestAccess = (
    accessRequirement: ManagedACTAccessRequirement,
  ) => {
    requestDataStepCallback?.({
      managedACTAccessRequirement: accessRequirement,
      step: 1,
    })
  }

  const onAcceptClicked = async () => {
    if (
      accessRequirement.concreteType ===
      'org.sagebionetworks.repo.model.ManagedACTAccessRequirement'
    ) {
      if (accessToken) {
        // !isSubmissionCanceled: if the submission has already been canceled, don't cancel again
        if (
          submissionState === SubmissionState.SUBMITTED &&
          !isSubmissionCanceled
        ) {
          const errAlert = {
            key: 'danger',
            message: (
              <>
                <strong>Error canceling your data access request.</strong>
                <br />
                Please try again later.
              </>
            ),
          }
          try {
            const resp: ACTSubmissionStatus | any =
              await cancelDataAccessRequest(
                accessRequirementStatus?.currentSubmissionStatus!.submissionId!,
                accessToken,
              )
            if (resp.state === SubmissionState.CANCELLED) {
              // successfully cancelled
              setAlert({
                key: 'success',
                message: (
                  <strong>Your data access request has been canceled.</strong>
                ),
              })
              setIsSubmissionCanceled(true)
            } else {
              setAlert(errAlert)
            }
          } catch (e) {
            console.log(
              'RequestDataAccess: error canceling data access request:',
              e,
            )
            setAlert(errAlert)
          }
        } else {
          showRequestAccess(accessRequirement)
        }
      } else {
        requestDataStepCallback?.({
          managedACTAccessRequirement: accessRequirement,
          step: 4,
        })
      }
    } else {
      if (!isApproved) {
        const accessApprovalRequest: AccessApproval = {
          requirementId: accessRequirement?.id,
          submitterId: user?.ownerId!,
          accessorId: user?.ownerId!,
          state: ApprovalState.APPROVED,
        }

        SynapseClient.postAccessApproval(accessToken, accessApprovalRequest)
          .then(_ => {
            setIsApproved(true)
          })
          .catch(err => console.error('Error on post access approval: ', err))
      }
    }
  }

  const getAcceptButtonText = () => {
    if (
      accessRequirement.concreteType ===
        SUPPORTED_ACCESS_REQUIREMENTS.ManagedACTAccessRequirement ||
      accessRequirement.concreteType ===
        SUPPORTED_ACCESS_REQUIREMENTS.ACTAccessRequirement
    ) {
      if (submissionState) {
        let btnActionText
        switch (submissionState) {
          case SubmissionState.SUBMITTED:
            btnActionText = isSubmissionCanceled
              ? 'Update Request'
              : `Cancel Request`
            break
          case SubmissionState.APPROVED:
          case SubmissionState.REJECTED:
          case SubmissionState.CANCELLED:
            btnActionText = 'Update Request'
        }
        return btnActionText
      } else {
        return 'Request access'
      }
    } else {
      return 'I Accept Terms of Use'
    }
  }

  const showSubmissionStatusAlert = (submissionStatus: ACTSubmissionStatus) => {
    switch (submissionStatus.state) {
      case SubmissionState.SUBMITTED:
        setAlert({
          key: 'primary',
          message: <strong>You have submitted a data access request.</strong>,
        })
        break
      case SubmissionState.APPROVED:
        setAlert({
          key: 'success',
          message: <strong>Your data access request has been approved.</strong>,
        })
        break
      case SubmissionState.REJECTED:
        setAlert({
          key: 'danger',
          message: (
            <>
              <strong>Your data access request has been rejected.</strong>
              <br />
              {submissionStatus.rejectedReason || ''}
            </>
          ),
        })
        break
    }
    return <></>
  }

  const termsOfUse = (accessRequirement as TermsOfUseAccessRequirement)
    .termsOfUse

  const actContactInfo = (accessRequirement as ACTAccessRequirement)
    .actContactInfo

  const isTermsOfUse =
    accessRequirement.concreteType ===
    SUPPORTED_ACCESS_REQUIREMENTS.TermsOfUseAccessRequirement
  const isActContactInfo =
    accessRequirement.concreteType ===
    SUPPORTED_ACCESS_REQUIREMENTS.ACTAccessRequirement

  const isActOrTermsOfUse =
    (isTermsOfUse && termsOfUse) || (isActContactInfo && actContactInfo)

  let markdown = <></>

  if (wikiPage) {
    markdown = (
      <div className="AcceptRequirementsMarkdown">
        {wikiPage && (
          <MarkdownSynapse // remove React mount/unmount error
            wikiId={wikiPage?.wikiPageId}
            ownerId={wikiPage?.ownerObjectId}
            objectType={wikiPage?.ownerObjectType}
          />
        )}
        {
          /* Alert message */
          alert && (
            <Alert
              className={'access-requirement-list-alert'}
              variant={alert.key}
              transition={false}
            >
              {alert.message}
            </Alert>
          )
        }
      </div>
    )
  } else if (isActOrTermsOfUse) {
    markdown = (
      <MarkdownSynapse markdown={isTermsOfUse ? termsOfUse : actContactInfo} />
    )
  }

  const isManagedActAr =
    accessRequirement.concreteType ===
    SUPPORTED_ACCESS_REQUIREMENTS.ManagedACTAccessRequirement
  const approvedText = isManagedActAr
    ? 'Your data access request has been approved.'
    : 'You have accepted the terms of use.'
  return (
    <>
      <div data-testid="RequestDataAccess" className="requirement-container">
        <AccessApprovalCheckMark isCompleted={isApproved} />
        <div className="terms-of-use-content">
          {/*  If not approved, show the terms */}
          {!isApproved && <>{markdown}</>}
          {isApproved && (
            <div>
              <Typography variant={'body1'}>{approvedText}</Typography>
              <InlineButtonContainer>
                {isManagedActAr && (
                  <Button
                    variant={'outlined'}
                    onClick={() => {
                      showRequestAccess(accessRequirement)
                    }}
                  >
                    {getAcceptButtonText()}
                  </Button>
                )}
                <Button
                  variant={'text'}
                  onClick={() => {
                    setIsHide(!isHide)
                  }}
                >
                  {isHide ? 'View' : 'Hide'} Terms
                </Button>
              </InlineButtonContainer>
              <div className={`view-terms ${isHide ? 'hidden' : 'show'}`}>
                {markdown}
              </div>
            </div>
          )}

          {showButton &&
            !isApproved && ( // This will show when the access is not approved
              <InlineButtonContainer>
                <Button
                  variant={'outlined'}
                  onClick={() => {
                    onAcceptClicked()
                  }}
                >
                  {getAcceptButtonText()}
                </Button>

                <Button variant={'text'} onClick={onHide}>
                  I do not accept
                </Button>
              </InlineButtonContainer>
            )}
        </div>
      </div>
    </>
  )
}

export default RequestDataAccess
