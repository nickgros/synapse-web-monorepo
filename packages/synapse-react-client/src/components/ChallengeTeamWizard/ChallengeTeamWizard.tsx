import React, { useCallback, useMemo, useRef, useState } from 'react'
import StepperDialog, { Step } from '../StepperDialog/StepperDialog'
import {
  CreateChallengeTeam,
  CreateChallengeTeamHandle,
} from './CreateChallengeTeam'
import { SelectChallengeTeam } from './SelectChallengeTeam'
import { RegistrationSuccessful } from './RegistrationSuccessful'
import { JoinRequestForm } from './JoinRequestForm'
import { useSynapseContext } from '../../utils'
import {
  useAddMemberToTeam,
  useGetCurrentUserProfile,
  useGetEntityChallenge,
  useGetMembershipStatus,
  useGetUserSubmissionTeams,
  useRequestToJoinTeam,
} from '../../synapse-queries'
import { Alert, Box, Button, Typography } from '@mui/material'
import { useQueryClient } from '@tanstack/react-query'
import { SignInPrompt, SynapseErrorBoundary } from '../error/ErrorBanner'
import { noop } from 'lodash-es'
import { DialogBase } from '../DialogBase'
import { SynapseSpinner } from '../LoadingScreen/LoadingScreen'

enum ChallengeTeamWizardStep {
  SELECT_YOUR_CHALLENGE_TEAM = 'SELECT_YOUR_CHALLENGE_TEAM',
  ACCEPT_INVITATION = 'ACCEPT_INVITATION',
  JOIN_REQUEST_FORM = 'JOIN_REQUEST_FORM',
  JOIN_REQUEST_SENT = 'JOIN_REQUEST_SENT',
  CREATE_NEW_TEAM = 'CREATE_NEW_TEAM',
  REGISTRATION_SUCCESSFUL = 'REGISTRATION_SUCCESSFUL',
}

function getStepDialogTitle(step: ChallengeTeamWizardStep) {
  switch (step) {
    case ChallengeTeamWizardStep.SELECT_YOUR_CHALLENGE_TEAM:
      return 'Select Your Challenge Team'
    case ChallengeTeamWizardStep.ACCEPT_INVITATION:
      return 'Accept Invitation'
    case ChallengeTeamWizardStep.JOIN_REQUEST_FORM:
      return 'Request Team Membership'
    case ChallengeTeamWizardStep.JOIN_REQUEST_SENT:
      return 'Request Sent'
    case ChallengeTeamWizardStep.CREATE_NEW_TEAM:
      return 'Create Team'
    case ChallengeTeamWizardStep.REGISTRATION_SUCCESSFUL:
      return 'Registration Successful!'
  }
}

export type ChallengeTeamWizardProps = {
  projectId: string
  isShowingModal?: boolean
  onClose: () => void
}

/**
 * The ChallengeTeamWizard is used to guide a user through the process of joining or creating a team for a challenge.
 *
 * A required precondition is that the user is NOT on any registered submission team for the challenge.
 */
function ChallengeTeamWizard(props: ChallengeTeamWizardProps) {
  const { projectId, isShowingModal = false, onClose } = props
  const { accessToken } = useSynapseContext()
  const isLoggedIn = !!accessToken

  const [step, setStep] = useState<ChallengeTeamWizardStep>(
    ChallengeTeamWizardStep.SELECT_YOUR_CHALLENGE_TEAM,
  )
  const [selectedTeamId, setSelectedTeamId] = useState<string | undefined>()
  const [createdNewTeam, setCreatedNewTeam] = useState<boolean>(false)
  const [joinMessage, setJoinMessage] = useState<string>('')

  // Tracks if the form to create a new team is valid, so the wizard can control the `disabled` status of the confirm button
  const [canCreateNewTeam, setCanCreateNewTeam] = useState(false)

  // If the user selected a team to which they were invited, the corresponding invitation will be stored in state here.
  // const [selectedMembershipInvitation, setSelectedMembershipInvitation] =
  //   useState<MembershipInvitation | undefined>()

  const createTeamRef = useRef<CreateChallengeTeamHandle>(null)

  // Use the existing accessToken if present to get the current user's profile / userId
  const { data: userProfile, isLoading: isLoadingUserProfile } =
    useGetCurrentUserProfile({
      enabled: isLoggedIn,
    })
  // Retrieve the challenge associated with the projectId passed through props
  const { data: challenge, isLoading: isLoadingChallenge } =
    useGetEntityChallenge(projectId)

  const {
    mutate: addTeamMember,
    // isPending: addUserToTeamIsPending,
    error: addUserToTeamError,
  } = useAddMemberToTeam()

  // Determine whether the given user belongs to any submission teams
  const { data: userSubmissionTeams, error: userSubmissionTeamError } =
    useGetUserSubmissionTeams(challenge?.id!, 1, 0, {
      enabled: Boolean(isLoggedIn && challenge),
    })

  const isMemberOfSubmissionTeam =
    userSubmissionTeams && userSubmissionTeams.results.length > 0

  const {
    data: selectedTeamMembershipStatus,
    isLoading: selectedTeamMembershipStatusIsLoading,
    error: selectedTeamMembershipStatusError,
  } = useGetMembershipStatus(selectedTeamId!, String(userProfile?.ownerId), {
    enabled: isLoggedIn && !!selectedTeamId && !!userProfile,
  })

  const addUserToTeam = useCallback((): void => {
    if (!selectedTeamId || !userProfile) return
    console.log('addTeamMember', selectedTeamId, userProfile.ownerId)
    addTeamMember({
      teamId: selectedTeamId,
      userId: userProfile.ownerId,
    })
    setStep(ChallengeTeamWizardStep.REGISTRATION_SUCCESSFUL)
  }, [addTeamMember, setStep, selectedTeamId, userProfile])

  const { mutate: requestToJoinTeam } = useRequestToJoinTeam({
    onSuccess: () => {
      setStep(ChallengeTeamWizardStep.JOIN_REQUEST_SENT)
    },
  })

  // JOIN_REQUEST_FORM: User is requesting to join an existing non-public challenge team
  const handleRequestMembership = useCallback(() => {
    if (userProfile && selectedTeamId) {
      requestToJoinTeam({
        teamId: selectedTeamId,
        userId: userProfile.ownerId,
        message: joinMessage,
        expiresOn: undefined,
      })
    }
  }, [joinMessage, requestToJoinTeam, selectedTeamId, userProfile])

  const hide = useCallback(() => {
    setCreatedNewTeam(false)
    setSelectedTeamId(undefined)
    onClose()
  }, [onClose])

  const isLoading = isLoadingUserProfile || isLoadingChallenge

  // Determine modal content based on step.id
  const { actions = <></>, content = <></> } = useMemo(() => {
    if (!isLoggedIn) {
      return {
        content: (
          <Alert severity={'error'}>
            <SignInPrompt />
          </Alert>
        ),
      }
    }

    if (isMemberOfSubmissionTeam) {
      return {
        content: (
          <Alert severity={'error'}>
            <Typography>
              You are already a member of a registered submission team for this
              Challenge.
            </Typography>
          </Alert>
        ),
      }
    }

    switch (step) {
      case ChallengeTeamWizardStep.SELECT_YOUR_CHALLENGE_TEAM: {
        let buttonText = 'Join Team'
        let disableJoiningSelectedTeam = false
        let buttonOnClickBehavior: () => void = noop
        if (
          selectedTeamMembershipStatus &&
          selectedTeamMembershipStatus.hasOpenInvitation
        ) {
          buttonText = 'Accept Invitation to Join Team'
          // TODO: buttonOnClickBehavior = mutate to join team
        } else if (
          selectedTeamMembershipStatus &&
          selectedTeamMembershipStatus.hasOpenRequest
        ) {
          // User already has an open request to join this team, disable button to avoid request spamming
          buttonText = 'Join Request Pending'
          disableJoiningSelectedTeam = true
        } else if (
          selectedTeamMembershipStatus &&
          selectedTeamMembershipStatus.membershipApprovalRequired
        ) {
          buttonText = 'Request to Join Team'
          buttonOnClickBehavior = () => {
            setStep(ChallengeTeamWizardStep.JOIN_REQUEST_FORM)
          }
        } else if (
          selectedTeamMembershipStatus &&
          selectedTeamMembershipStatus.canJoin
        ) {
          buttonText = 'Join Team'
          buttonOnClickBehavior = addUserToTeam
        }
        return {
          content: challenge && !isMemberOfSubmissionTeam && (
            <SelectChallengeTeam
              challengeId={challenge.id}
              onCreateTeam={() =>
                setStep(ChallengeTeamWizardStep.CREATE_NEW_TEAM)
              }
              selectedTeamId={selectedTeamId}
              onSelectTeam={teamId => setSelectedTeamId(teamId)}
            />
          ),
          actions: (
            <>
              <Button
                onClick={buttonOnClickBehavior}
                disabled={
                  !selectedTeamId ||
                  selectedTeamMembershipStatusIsLoading ||
                  disableJoiningSelectedTeam
                }
                variant={'contained'}
              >
                {buttonText}
              </Button>
            </>
          ),
        }
      }
      case ChallengeTeamWizardStep.ACCEPT_INVITATION:
        // return <AcceptInvitation membershipInvitation={membershipInvitation} />
        return { content: <></> }
      case ChallengeTeamWizardStep.JOIN_REQUEST_FORM:
        return {
          content: (
            <JoinRequestForm
              teamId={selectedTeamId}
              joinMessageChange={setJoinMessage}
            />
          ),
          actions: (
            <Button variant={'contained'} onClick={handleRequestMembership}>
              Send Request
            </Button>
          ),
        }

      case ChallengeTeamWizardStep.JOIN_REQUEST_SENT:
        return {
          content: (
            <Typography variant="body1" sx={{ lineHeight: '20px' }}>
              Team Manager(s) have received your request. Check your Synapse
              email address for status of your request.
            </Typography>
          ),
          actions: (
            <Button
              onClick={() => {
                hide()
              }}
            ></Button>
          ),
        }
      case ChallengeTeamWizardStep.REGISTRATION_SUCCESSFUL:
        return {
          content: (
            <RegistrationSuccessful
              createdNewTeam={createdNewTeam}
              teamId={selectedTeamId}
            />
          ),
        }
      case ChallengeTeamWizardStep.CREATE_NEW_TEAM: {
        return {
          content: (
            <CreateChallengeTeam
              ref={createTeamRef}
              challengeId={challenge?.id!}
              onCanSubmitChange={canSubmit => setCanCreateNewTeam(canSubmit)}
              onFinished={teamId => {
                setCreatedNewTeam(true)
                setSelectedTeamId(teamId)
                setStep(ChallengeTeamWizardStep.REGISTRATION_SUCCESSFUL)
              }}
            />
          ),
          actions: (
            <>
              <Button
                variant={'contained'}
                disabled={!canCreateNewTeam}
                onClick={() => {
                  createTeamRef?.current?.submit()
                }}
              >
                Create Team
              </Button>
            </>
          ),
        }
      }
      default:
        console.error(`No content was found for the given step.id ${step}`)
        return { content: <></> }
    }
  }, [
    addUserToTeam,
    challenge,
    createdNewTeam,
    handleRequestMembership,
    hide,
    isLoggedIn,
    isMemberOfSubmissionTeam,
    selectedTeamId,
    selectedTeamMembershipStatus,
    selectedTeamMembershipStatusIsLoading,
    step,
    canCreateNewTeam,
  ])

  const errorMessage =
    addUserToTeamError?.message ||
    selectedTeamMembershipStatusError?.message ||
    userSubmissionTeamError?.message

  return (
    <DialogBase
      onCancel={hide}
      open={isShowingModal}
      actions={actions}
      title={getStepDialogTitle(step)}
      content={
        <SynapseErrorBoundary>
          <Box display="flex" flexDirection="column" gap={1}>
            {isLoading ? (
              <SynapseSpinner size={40} />
            ) : (
              <>
                {content}
                {errorMessage && (
                  <Alert severity={'error'}>{errorMessage}</Alert>
                )}
              </>
            )}
          </Box>
        </SynapseErrorBoundary>
      }
    />
  )
}

export default ChallengeTeamWizard
