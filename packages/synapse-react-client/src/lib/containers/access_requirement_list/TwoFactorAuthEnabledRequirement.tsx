import React from 'react'
import AccessApprovalCheckMark from './AccessApprovalCheckMark'
import { Button, Typography } from '@mui/material'
import {
  BackendDestinationEnum,
  getEndpoint,
} from '../../utils/functions/getEndpoint'
import {
  InlineButtonContainer,
  RequirementContainer,
} from './DataAccessRequestStyledComponents'
import { useSynapseContext } from '../../utils/SynapseContext'
import { TWO_FACTOR_DOCS_LINK } from '../auth/TwoFactorEnrollmentForm'
import { useGetTwoFactorEnrollmentStatus } from '../../utils/hooks/SynapseAPI/auth/useTwoFactorEnrollment'

const TWO_FACTOR_ENROLLMENT_LINK = `${getEndpoint(
  BackendDestinationEnum.PORTAL_ENDPOINT,
)}#!TwoFactorAuth:Enroll`

/**
 * Displays a data access request requirement that prompts the user to enable two-factor authentication.
 */
export default function TwoFactorAuthEnabledRequirement() {
  const { accessToken } = useSynapseContext()

  const isSignedIn = !!accessToken

  const { data: twoFactorAuthStatus } = useGetTwoFactorEnrollmentStatus({
    enabled: isSignedIn,
    // If required, we send the user to a new tab to complete 2FA enrollment
    // Refetch on window focus so the enrollment state is immediately updated when they return to this tab
    refetchOnWindowFocus: true,
  })

  return (
    <RequirementContainer>
      <AccessApprovalCheckMark
        isCompleted={isSignedIn && twoFactorAuthStatus?.status === 'ENABLED'}
      />
      <div>
        <Typography variant={'body1'}>
          You must have Two-factor Authentication (2FA) active on your Sage
          account in order to download the requested files
        </Typography>

        {isSignedIn && twoFactorAuthStatus?.status === 'DISABLED' ? (
          <InlineButtonContainer>
            <Button
              variant={'outlined'}
              href={TWO_FACTOR_ENROLLMENT_LINK}
              target="_blank"
              rel="noopener noreferrer"
            >
              Activate 2FA
            </Button>
            <Button
              variant={'text'}
              href={TWO_FACTOR_DOCS_LINK}
              target="_blank"
              rel="noopener noreferrer"
            >
              2FA Documentation
            </Button>
          </InlineButtonContainer>
        ) : (
          <></>
        )}
      </div>
    </RequirementContainer>
  )
}
