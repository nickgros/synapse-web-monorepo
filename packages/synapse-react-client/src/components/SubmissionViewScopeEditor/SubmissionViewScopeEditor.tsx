import React from 'react'
import { ACCESS_TYPE } from '@sage-bionetworks/synapse-types'
import EvaluationFinder from '../EvaluationFinder/EvaluationFinder'
import { useGetEvaluations } from '../../synapse-queries/evaluation/useEvaluation'
import { Box, Typography } from '@mui/material'

export type SubmissionViewScopeEditorProps = {
  evaluationIds: string[]
  onChange: (evaluationIds: string[]) => void
}

export default function SubmissionViewScopeEditor(
  props: SubmissionViewScopeEditorProps,
) {
  const { evaluationIds = [], onChange } = props

  const { data: evaluations } = useGetEvaluations(
    {
      evaluationIds,
    },
    {
      keepPreviousData: true,
      enabled: evaluationIds.length > 0,
    },
  )

  return (
    <>
      <EvaluationFinder
        activeOnly={false}
        accessType={ACCESS_TYPE.READ_PRIVATE_SUBMISSION}
        selectedIds={evaluationIds}
        onChange={onChange}
      />
      <Box
        sx={{ border: '1px solid', borderColor: 'grey.300' }}
        p={2.5}
        mb={2.5}
      >
        <Typography variant={'smallText1'} sx={{ fontWeight: 700 }} mb={1}>
          Selected
        </Typography>
        <Box display={'flex'} flexDirection={'column'} gap={1}>
          {evaluationIds.length > 0 &&
            evaluations &&
            evaluations.results.map(evaluation => (
              <Typography key={evaluation.id} variant={'smallText1'}>
                {evaluation.name}
              </Typography>
            ))}
        </Box>
      </Box>
    </>
  )
}
