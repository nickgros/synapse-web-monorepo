import React from 'react'
import { useGetCurrentUserProfile } from '../../utils/hooks/SynapseAPI'
import AccessApprovalCheckMark from './AccessApprovalCheckMark'
import { Typography } from '@mui/material'
import { PRODUCTION_ENDPOINT_CONFIG } from '../../utils/functions/getEndpoint'
import { RequirementContainer } from './DataAccessRequestStyledComponents'
import { SynapseConstants } from '../../utils'
import { useSynapseContext } from '../../utils/SynapseContext'

/**
 * Displays a data access request requirement prompts the user to authenticate if not already signed in.
 */
export default function AuthenticatedRequirement() {
  const { accessToken } = useSynapseContext()
  const { data: userProfile } = useGetCurrentUserProfile()

  const isSignedIn = !!accessToken

  return (
    <RequirementContainer>
      <AccessApprovalCheckMark isCompleted={isSignedIn} />
      <div>
        {!isSignedIn && (
          <>
            <Typography variant={'body1'}>
              <a className={`${SynapseConstants.SRC_SIGN_IN_CLASS} `}>
                Sign in&nbsp;
              </a>
              with a Sage Platform (Synapse) user account. If you do not have a
              Sage account, you can{' '}
              <a
                href={`${PRODUCTION_ENDPOINT_CONFIG.PORTAL}#!RegisterAccount:0`}
              >
                register for free.
              </a>
            </Typography>
          </>
        )}
        {isSignedIn && (
          <Typography variant={'body1'}>
            You have signed in with the Sage Platform (Synapse) user account{' '}
            <b>{userProfile?.userName}@synapse.org</b>
          </Typography>
        )}
      </div>
    </RequirementContainer>
  )
}
