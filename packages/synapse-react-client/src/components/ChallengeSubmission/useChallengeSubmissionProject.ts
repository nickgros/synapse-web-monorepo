import { useEffect } from 'react'
import {
  ACCESS_TYPE,
  Challenge,
  Project,
  PROJECT_CONCRETE_TYPE_VALUE,
  ResourceAccess,
  Team,
} from '@sage-bionetworks/synapse-types'
import {
  getEntityAclQueryOptions,
  useCreateEntity,
  useGetEntityAlias,
  useUpdateEntityACL,
} from '../../synapse-queries'
import { useMutation, useQueryClient } from 'react-query'
import { useSynapseContext } from '../../utils'

type UseChallengeSubmissionProjectSharedOptions = {
  enabled?: boolean
  useErrorBoundary?: boolean
}

export const generateChallengeSubmissionProjectMetadata = (
  challenge: Challenge,
  submissionTeam: Team,
): Project => {
  const name = `Challenge Submission Project-${challenge.projectId}-${submissionTeam.id}`
  const alias = name.replace(/\s+/g, '_').replace(/-+/g, '_').toLowerCase()
  return {
    name,
    alias,
    concreteType: PROJECT_CONCRETE_TYPE_VALUE,
    description: `This Project was automatically created for Team "${submissionTeam.name}" for Challenge "${challenge.id}"`,
  }
}

/**
 * Mutation hook for creating a project for a challenge submission.
 *
 * The mutation will create a new Project entity and grant edit/delete permissions to the submission team
 */
export function useCreateNewChallengeSubmissionProject(
  options: UseChallengeSubmissionProjectSharedOptions,
) {
  const queryClient = useQueryClient()
  const { keyFactory, accessToken } = useSynapseContext()

  const { mutateAsync: createEntity } = useCreateEntity(options)
  const { mutateAsync: updateAcl } = useUpdateEntityACL(options)

  return useMutation({
    mutationFn: async (variables: {
      challenge: Challenge
      submissionTeam: Team
    }) => {
      let project: Project = generateChallengeSubmissionProjectMetadata(
        variables.challenge,
        variables.submissionTeam,
      )
      project = (await createEntity(project)) as Project

      const entityAclQueryOptions = getEntityAclQueryOptions(
        keyFactory,
        accessToken,
        project.id!,
      )
      const acl = await queryClient.fetchQuery(
        entityAclQueryOptions.queryKey,
        entityAclQueryOptions.queryFn,
      )

      const teamResourceAccess: ResourceAccess = {
        principalId: Number(variables.submissionTeam.id),
        accessType: [
          ACCESS_TYPE.CHANGE_PERMISSIONS,
          ACCESS_TYPE.CHANGE_SETTINGS,
          ACCESS_TYPE.CREATE,
          ACCESS_TYPE.DELETE,
          ACCESS_TYPE.DOWNLOAD,
          ACCESS_TYPE.MODERATE,
          ACCESS_TYPE.READ,
          ACCESS_TYPE.UPDATE,
        ],
      }

      await updateAcl({
        ...acl,
        resourceAccess: [...acl.resourceAccess, teamResourceAccess],
      })

      return project
    },
  })
}

/**
 * Hook will fetch the project created for this team to submit to this challenge, if it exists.
 *
 * If the project does not exist, a new one will be created.
 */
export default function useGetChallengeSubmissionProjectId(
  challenge?: Challenge,
  submissionTeam?: Team,
  options: UseChallengeSubmissionProjectSharedOptions = {},
) {
  options.enabled = Boolean(
    options.enabled !== false && challenge && submissionTeam,
  )
  const expectedAlias =
    challenge && submissionTeam
      ? generateChallengeSubmissionProjectMetadata(challenge, submissionTeam)
          .alias!
      : ''
  const {
    mutate: createChallengeSubmissionProject,
    isLoading: createChallengeSubmissionProjectIsPending,
    data: createdProject,
  } = useCreateNewChallengeSubmissionProject(options)
  const {
    data: existingProjectId,
    status: getExistingProjectStatus,
    isLoading: isLoadingExistingProject,
  } = useGetEntityAlias(expectedAlias, options)

  const challengeProjectId = existingProjectId?.id ?? createdProject?.id

  // If the project does not exist, create it
  useEffect(() => {
    if (
      getExistingProjectStatus === 'success' &&
      !challengeProjectId &&
      challenge &&
      submissionTeam &&
      createChallengeSubmissionProjectIsPending
    ) {
      createChallengeSubmissionProject({ challenge, submissionTeam })
    }
  }, [
    challenge,
    challengeProjectId,
    createChallengeSubmissionProject,
    createChallengeSubmissionProjectIsPending,
    existingProjectId,
    getExistingProjectStatus,
    submissionTeam,
  ])

  return {
    data: challengeProjectId,
    isLoading:
      isLoadingExistingProject || createChallengeSubmissionProjectIsPending,
  }
}
