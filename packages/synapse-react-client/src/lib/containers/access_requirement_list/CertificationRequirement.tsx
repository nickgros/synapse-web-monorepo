import React from 'react'
import { useGetCurrentUserBundle } from '../../utils/hooks/SynapseAPI'
import AccessApprovalCheckMark from './AccessApprovalCheckMark'
import { Typography } from '@mui/material'
import { PRODUCTION_ENDPOINT_CONFIG } from '../../utils/functions/getEndpoint'
import { RequirementContainer } from './DataAccessRequestStyledComponents'

/**
 * When creating requests for access requirements on a particular file, one or more access requirements may require that the
 * user is certified.
 *
 * This component checks if the user is certified, and if not, provides a link on how to begin certification.
 */
export default function CertificationRequirement() {
  const { data: userBundle, isLoading } = useGetCurrentUserBundle()

  return (
    <RequirementContainer>
      <AccessApprovalCheckMark
        isCompleted={userBundle?.isCertified}
        isLoading={isLoading}
      />
      <div>
        <Typography variant="body1">
          You must first become a
          <a
            className="self-sign-access-certified bold-text"
            href={`${PRODUCTION_ENDPOINT_CONFIG.PORTAL}#!Quiz:`}
          >
            &nbsp;certified user
          </a>
        </Typography>
        {isLoading && <span className="spinner" />}
        {userBundle?.isCertified && (
          <Typography variant={'body1'}>You are a certified user</Typography>
        )}
      </div>
    </RequirementContainer>
  )
}
