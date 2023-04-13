import * as React from 'react'
import { useState, useEffect } from 'react'
import MarkdownSynapse from '../markdown/MarkdownSynapse'
import {
  WikiPageKey,
  AccessRequirementStatus,
  AccessRequirement,
  UserProfile,
  TermsOfUseAccessRequirement,
  SelfSignAccessRequirement,
  ManagedACTAccessRequirement,
  AccessApproval,
  ApprovalState,
  ACTAccessRequirement,
} from '../../utils/synapseTypes/'
import { SynapseClient } from '../../utils'
import AccessApprovalCheckMark from './AccessApprovalCheckMark'
import { SUPPORTED_ACCESS_REQUIREMENTS } from './AccessRequirementList'
import { useSynapseContext } from '../../utils/SynapseContext'
import { PRODUCTION_ENDPOINT_CONFIG } from '../../utils/functions/getEndpoint'
import { Typography, Button } from '@mui/material'
import {
  InlineButtonContainer,
  RequirementContainer,
} from './DataAccessRequestStyledComponents'
import { useGetAccessRequirementWikiPageKey } from '../../utils/hooks/SynapseAPI'

export type AcceptedRequirementsProps = {
  user: UserProfile | undefined
  entityId: string
  accessRequirement:
    | AccessRequirement
    | TermsOfUseAccessRequirement
    | SelfSignAccessRequirement
    | ManagedACTAccessRequirement
  accessRequirementStatus: AccessRequirementStatus | undefined
  onHide?: () => void
}

// TODO: Seems like this should be AR type-agnostic and have "primaryAction", "secondaryBUtton", something like that

export default function AcceptedRequirements({
  user,
  accessRequirement,
  accessRequirementStatus,
  entityId,
  onHide,
}: AcceptedRequirementsProps) {
  const { accessToken } = useSynapseContext()
  const { data: wikiPage } = useGetAccessRequirementWikiPageKey(
    accessRequirement.id.toString(),
  )

  const [isHide, setIsHide] = useState<boolean>(true)
  const propsIsApproved = accessRequirementStatus?.isApproved
  const [isApproved, setIsApproved] = useState<boolean | undefined>(
    propsIsApproved,
  )

  let acceptButtonText = ''
  if (
    accessRequirement.concreteType ===
      SUPPORTED_ACCESS_REQUIREMENTS.ManagedACTAccessRequirement ||
    accessRequirement.concreteType ===
      SUPPORTED_ACCESS_REQUIREMENTS.ACTAccessRequirement
  ) {
    if (
      window.location.hostname === 'www.synapse.org' ||
      window.location.hostname === 'staging.synapse.org'
    ) {
      acceptButtonText = 'Request access'
    } else {
      acceptButtonText = 'Request access via Synapse.org'
    }
  } else {
    acceptButtonText = 'I Accept Terms of Use'
  }

  useEffect(() => {
    setIsApproved(propsIsApproved)
  }, [propsIsApproved])

  const gotoSynapseAccessRequirementPage = () => {
    window.open(
      `${PRODUCTION_ENDPOINT_CONFIG.PORTAL}#!AccessRequirement:AR_ID=${accessRequirement.id}&TYPE=ENTITY&ID=${entityId}`,
    )
  }
  const onAcceptClicked = () => {
    if (
      accessRequirement.concreteType ===
        SUPPORTED_ACCESS_REQUIREMENTS.ManagedACTAccessRequirement ||
      accessRequirement.concreteType ===
        SUPPORTED_ACCESS_REQUIREMENTS.ACTAccessRequirement
    ) {
      gotoSynapseAccessRequirementPage()
      // PORTALS-1483: and close the dialog.
      if (onHide) {
        onHide()
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
        <MarkdownSynapse
          wikiId={wikiPage?.wikiPageId}
          ownerId={wikiPage?.ownerObjectId}
          objectType={wikiPage?.ownerObjectType}
        />
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
      <RequirementContainer data-testid="AcceptedRequirements">
        <AccessApprovalCheckMark isCompleted={isApproved} />
        <div className="terms-of-use-content">
          {isApproved ? (
            <>
              <Typography variant={'body1'}>{approvedText}</Typography>
              <InlineButtonContainer>
                {isManagedActAr && (
                  <Button
                    variant={'outlined'}
                    onClick={() => {
                      gotoSynapseAccessRequirementPage()
                    }}
                  >
                    Update Request
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
            </>
          ) : (
            markdown
          )}
          {accessToken && !isApproved && (
            <InlineButtonContainer>
              <Button variant={'outlined'} onClick={onAcceptClicked}>
                {acceptButtonText}
              </Button>

              <Button variant={'text'} onClick={onHide}>
                I do not accept
              </Button>
            </InlineButtonContainer>
          )}
        </div>
      </RequirementContainer>
    </>
  )
}
