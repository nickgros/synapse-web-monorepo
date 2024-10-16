import { DetailsPageContent } from '@sage-bionetworks/synapse-portal-framework'
import { useDetailsPageContext } from '@sage-bionetworks/synapse-portal-framework'
import { ColumnSingleValueFilterOperator } from '@sage-bionetworks/synapse-types'
import React from 'react'
import { datasetsSql } from '../../config/resources'
import { datasetCardConfiguration } from '../../config/synapseConfigs/datasets'
import { CardContainerLogic } from 'synapse-react-client'

export default function StudyDatasetsTab() {
  const { value: studyId } = useDetailsPageContext('studyId')
  if (studyId == null) {
    return null
  }
  return (
    <DetailsPageContent
      content={[
        {
          id: 'Study Datasets',
          title: 'Study Datasets',
          element: (
            <CardContainerLogic
              {...datasetCardConfiguration}
              sql={datasetsSql}
              sqlOperator={ColumnSingleValueFilterOperator.EQUAL}
              searchParams={{ studyId }}
            />
          ),
        },
      ]}
    ></DetailsPageContent>
  )
}
