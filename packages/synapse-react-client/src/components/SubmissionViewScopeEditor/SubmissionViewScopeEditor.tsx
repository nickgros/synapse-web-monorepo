import React, { useMemo } from 'react'
import { ACCESS_TYPE, ReferenceList } from '@sage-bionetworks/synapse-types'
import EvaluationFinder from '../EvaluationFinder/EvaluationFinder'
import { useGetEvaluations } from '../../synapse-queries/evaluation/useEvaluation'
import { Box } from '@mui/material'

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
      <>
        {evaluationIds.length > 0 &&
          evaluations &&
          evaluations.results.map(evaluation => (
            <Box key={evaluation.id} display={'flex'}>
              {evaluation.name}
            </Box>
          ))}
      </>
      <EvaluationFinder
        activeOnly={false}
        accessType={ACCESS_TYPE.READ_PRIVATE_SUBMISSION}
      />
    </>
  )
}
