import React from 'react'
import { CheckTwoTone, LockTwoTone } from '@mui/icons-material'
import Skeleton from '@mui/material/Skeleton'
import ConditionalWrapper from '../utils/ConditionalWrapper'
import { Box } from '@mui/material'

export type CheckMarkProps = {
  isCompleted?: boolean
  isLoading?: boolean
}

export default function AccessApprovalCheckMark({
  isCompleted = false,
  isLoading = false,
}: CheckMarkProps) {
  return (
    <Box
      data-testid={`AccessApprovalCheckMark-${isCompleted}`}
      sx={{
        backgroundColor: isLoading
          ? undefined
          : isCompleted
          ? 'rgb(39, 167, 69)'
          : 'orange',
        position: 'absolute',
        left: '-15px',
        color: 'white',
        borderRadius: '50%',
        padding: '15px',
        height: '15px',
        width: '15px',
        display: 'flex',
        alignSelf: 'baseline',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
      }}
    >
      <ConditionalWrapper
        condition={isLoading}
        wrapper={Skeleton}
        wrapperProps={{
          variant: 'circular',
          sx: {
            minHeight: '30px',
            minWidth: '30px',
          },
        }}
      >
        {isCompleted ? <CheckTwoTone /> : <LockTwoTone />}
      </ConditionalWrapper>
    </Box>
  )
}
