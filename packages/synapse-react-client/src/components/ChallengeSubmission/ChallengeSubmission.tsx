import React, { useState } from 'react'
import {
  useGetCurrentUserProfile,
  useGetEntityChallenge,
  useGetEntityPermissions,
  useGetTeam,
  useGetUserSubmissionTeams,
} from '../../synapse-queries'
import { useSynapseContext } from '../../utils'
import { Entity, EntityType } from '@sage-bionetworks/synapse-types'
import { SynapseErrorBoundary } from '../error/ErrorBanner'
import SubmissionDirectoryList from './SubmissionDirectoryList'
import ChallengeSubmissionStepper from './ChallengeSubmissionStepper'
import useGetChallengeSubmissionProjectId from './useChallengeSubmissionProject'

export type EntityItem = Entity & {
  repositoryName?: string
  versionNumber?: number
}

export type ChallengeSubmissionProps = {
  entityType: EntityType.DOCKER_REPO | EntityType.FILE
  pageSize: number
  /* The ID of the project that contains the challenge evaluation */
  projectId: string
}

export function ChallengeSubmission({
  entityType,
  projectId,
  pageSize = 10,
}: ChallengeSubmissionProps) {
  const { accessToken } = useSynapseContext()
  const isLoggedIn = Boolean(accessToken)
  const [selectedEntity, setSelectedEntity] = useState<EntityItem>()
  const [isShowingModal, setIsShowingModal] = useState<boolean>(false)

  // Use the existing accessToken if present to get the current user's profile / userId
  const { data: userProfile, isLoading: isProfileLoading } =
    useGetCurrentUserProfile({
      enabled: isLoggedIn,
      useErrorBoundary: true,
    })

  // Retrieve the challenge associated with the projectId passed through props
  const { data: challenge, isLoading: isChallengeLoading } =
    useGetEntityChallenge(projectId, {
      enabled: isLoggedIn && !!projectId,
      useErrorBoundary: true,
    })

  // Determine whether the current user belongs to any submission teams
  const { data: userSubmissionTeams } = useGetUserSubmissionTeams(
    challenge?.id!,
    2,
    0,
    {
      enabled: Boolean(challenge),
      useErrorBoundary: true,
    },
  )

  const hasOneSubmissionTeam = userSubmissionTeams?.results.length === 1
  const submissionTeamId = hasOneSubmissionTeam
    ? userSubmissionTeams.results[0]
    : undefined

  const { data: submissionTeam } = useGetTeam(submissionTeamId!, {
    enabled: !!submissionTeamId,
    useErrorBoundary: true,
  })

  const { data: challengeProjectId, isLoading: isLoadingChallengeProjectId } =
    useGetChallengeSubmissionProjectId(challenge, submissionTeam, {
      enabled: Boolean(challenge && submissionTeam),
      useErrorBoundary: true,
    })

  const { data: entityPermissions, isLoading: isPermissionsLoading } =
    useGetEntityPermissions(challengeProjectId!, {
      enabled: !!challengeProjectId,
      useErrorBoundary: true,
    })

  const canSubmit = Boolean(
    entityPermissions &&
      entityPermissions.canView &&
      entityPermissions.canAddChild,
  )

  const itemSelectedHandler = (entity: EntityItem) => {
    setSelectedEntity(entity)
    setIsShowingModal(true)
  }

  const onModalClose = () => {
    setIsShowingModal(false)
  }

  const loading =
    isProfileLoading ||
    isChallengeLoading ||
    isLoadingChallengeProjectId ||
    isPermissionsLoading

  return (
    <SynapseErrorBoundary>
      {loading && (
        <span data-testid="SpinnerButton-spinner" className="spinner" />
      )}
      {canSubmit && (
        <>
          <SubmissionDirectoryList
            entityType={entityType}
            pageSize={pageSize}
            challengeProjectId={challengeProjectId!}
            onItemSelected={itemSelectedHandler}
          />
          {userProfile && selectedEntity && (
            <ChallengeSubmissionStepper
              projectId={projectId}
              userId={userProfile?.ownerId}
              teamId={submissionTeamId!}
              entity={selectedEntity}
              entityType={entityType}
              isShowingModal={isShowingModal}
              onClose={onModalClose}
            />
          )}
        </>
      )}
    </SynapseErrorBoundary>
  )
}

export default ChallengeSubmission
