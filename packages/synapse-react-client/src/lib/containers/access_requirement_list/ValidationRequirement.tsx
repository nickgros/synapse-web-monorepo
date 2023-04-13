import React from 'react'
import { useGetCurrentUserBundle } from '../../utils/hooks/SynapseAPI'
import AccessApprovalCheckMark from './AccessApprovalCheckMark'
import { Typography } from '@mui/material'
import { PRODUCTION_ENDPOINT_CONFIG } from '../../utils/functions/getEndpoint'
import { RequirementContainer } from './DataAccessRequestStyledComponents'

/**
 * When creating requests for access requirements on a particular file, one or more access requirements may require that the
 * user has a validated profile.
 *
 * This component checks if the user has a validated profile, and if not, provides a link on how to begin profile validation.
 */
export default function ValidationRequirement() {
  const { data: userBundle, isLoading } = useGetCurrentUserBundle()

  // TODO, probably update this and cert to look like the 2fa with button links that appear only when you haven't done it

  return (
    <RequirementContainer>
      <AccessApprovalCheckMark
        isCompleted={userBundle?.isVerified}
        isLoading={isLoading}
      />
      <div>
        <Typography variant={'body1'}>
          You must first apply to have your
          <a href={`${PRODUCTION_ENDPOINT_CONFIG.PORTAL}#!Profile:v/settings`}>
            &nbsp;user profile validated
          </a>
        </Typography>
        {isLoading && <span className="spinner" />}
        {userBundle?.isVerified && (
          <Typography variant={'body1'}>
            Your user profile is validated.
          </Typography>
        )}
      </div>
    </RequirementContainer>
  )
}
