import { DetailsPageContent } from '@sage-bionetworks/synapse-portal-framework'
import { useDetailsPageContext } from '@sage-bionetworks/synapse-portal-framework'
import { ColumnSingleValueFilterOperator } from '@sage-bionetworks/synapse-types'
import React from 'react'
import { filesPlotNavProps } from '../../config/synapseConfigs/files'
import { QueryWrapperPlotNav } from 'synapse-react-client'

export default function StudyFilesTab() {
  const { value: studyId } = useDetailsPageContext('studyId')
  if (studyId == null) {
    return null
  }
  return (
    <DetailsPageContent
      content={[
        {
          id: 'Study Files',
          title: 'Study Files',
          element: (
            <QueryWrapperPlotNav
              {...filesPlotNavProps}
              rgbIndex={8}
              shouldDeepLink={false}
              sqlOperator={ColumnSingleValueFilterOperator.LIKE}
              lockedColumn={{ columnName: 'studyId', value: studyId }}
              searchParams={{ studyId }}
            />
          ),
        },
      ]}
    ></DetailsPageContent>
  )
}
