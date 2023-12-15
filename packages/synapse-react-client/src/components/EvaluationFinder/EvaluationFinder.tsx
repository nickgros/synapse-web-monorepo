import React, { useState } from 'react'
import { useGetEvaluations } from '../../synapse-queries/evaluation/useEvaluation'
import { HelpPopover } from '../HelpPopover/HelpPopover'
import {
  Box,
  Button,
  FormControl,
  LinearProgress,
  Typography,
} from '@mui/material'
import { RadioGroup } from '../widgets/RadioGroup'
import { GetEvaluationParameters } from '@sage-bionetworks/synapse-types'

export type EvaluationFinderProps = Pick<
  GetEvaluationParameters,
  'accessType' | 'activeOnly'
>

export default function EvaluationFinder(props: EvaluationFinderProps) {
  const { accessType, activeOnly } = props
  const [currentPage, setCurrentPage] = useState(0)
  const LIMIT = 20
  const { data, isLoading, isFetching, isPreviousData } = useGetEvaluations(
    {
      accessType,
      activeOnly,
      offset: currentPage * LIMIT,
      limit: LIMIT,
    },
    { keepPreviousData: true },
  )
  const hasNextPage =
    data?.totalNumberOfResults &&
    data?.totalNumberOfResults > (currentPage + 1) * LIMIT
  const [value, setValue] = useState<string | undefined>(undefined)

  if (!data && isLoading) {
    return <LinearProgress />
  }
  if (!data) {
    return <>oh no</>
  }

  console.log(data)
  return (
    <>
      <FormControl>
        <RadioGroup<string>
          value={value}
          onChange={value => setValue(value)}
          disabled={isFetching && isPreviousData}
          options={data.results.map(evaluation => {
            return {
              label: (
                <Box display={'flex'} key={evaluation.id} gap={1}>
                  <Typography variant={'smallText1'}>
                    {evaluation.name}
                  </Typography>
                  {evaluation.submissionInstructionsMessage &&
                    evaluation.submissionInstructionsMessage.length > 0 && (
                      <HelpPopover
                        markdownText={evaluation.submissionInstructionsMessage}
                        placement={'right'}
                      />
                    )}
                </Box>
              ),
              value: evaluation.id!,
            }
          })}
        />
      </FormControl>
      <Box display={'flex'} my={2} gap={1}>
        {currentPage > 0 && (
          <Button
            variant={'outlined'}
            onClick={() => setCurrentPage(page => page - 1)}
          >
            Previous
          </Button>
        )}
        <Button
          variant={'outlined'}
          disabled={!hasNextPage}
          onClick={() => {
            setCurrentPage(page => page + 1)
          }}
        >
          Next
        </Button>
      </Box>
    </>
  )
}
