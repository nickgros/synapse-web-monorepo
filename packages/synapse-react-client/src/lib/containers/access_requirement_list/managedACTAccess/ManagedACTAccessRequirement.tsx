import React from 'react'
import {
  ManagedACTAccessRequirement,
  UserProfile,
} from '../../../utils/synapseTypes'
import RequestDataAccess from './RequestDataAccess'
import { ManagedACTAccessRequirementStatus } from '../../../utils/synapseTypes'
import { RequestDataStepCallbackArgs } from '../AccessRequirementList'
import { useGetAccessRequirementWikiPageKey } from '../../../utils/hooks/SynapseAPI'

export type ManagedACTAccessRequirementComponentProps = {
  entityId: string
  user: UserProfile | undefined
  accessRequirement: ManagedACTAccessRequirement
  accessRequirementStatus: ManagedACTAccessRequirementStatus
  onHide?: () => void
  requestDataStepCallback?: (props: RequestDataStepCallbackArgs) => void
}

const ManagedACTAccessRequirementComponent: React.FC<
  ManagedACTAccessRequirementComponentProps
> = props => {
  const {
    entityId,
    user,
    accessRequirement,
    accessRequirementStatus,
    onHide,
    requestDataStepCallback,
  } = props

  const { data: wikiPage } = useGetAccessRequirementWikiPageKey(
    accessRequirement.id.toString(),
  )

  return (
    <RequestDataAccess
      accessRequirement={accessRequirement}
      accessRequirementStatus={accessRequirementStatus}
      entityId={entityId}
      user={user}
      wikiPage={wikiPage}
      onHide={onHide}
      requestDataStepCallback={requestDataStepCallback}
    />
  )
}

export default ManagedACTAccessRequirementComponent
