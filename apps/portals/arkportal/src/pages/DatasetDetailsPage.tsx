import { DetailsPageContent } from '@sage-bionetworks/synapse-portal-framework/components/DetailsPage/DetailsPageContentLayout'
import DetailsPage from '@sage-bionetworks/synapse-portal-framework/components/DetailsPage/index'
import { useGetPortalComponentSearchParams } from '@sage-bionetworks/synapse-portal-framework/utils/UseGetPortalComponentSearchParams'
import { ColumnSingleValueFilterOperator } from '@sage-bionetworks/synapse-types'
import React from 'react'
import { CardContainerLogic, DatasetJsonLdScript } from 'synapse-react-client'
import { datasetsSql } from '../config/resources'
import {
  datasetCardConfiguration,
  detailsPageContent,
} from '../config/synapseConfigs/datasets'

export function DatasetDetailsPage() {
  const searchParams = useGetPortalComponentSearchParams()
  return (
    <>
      <CardContainerLogic
        {...datasetCardConfiguration}
        sql={datasetsSql}
        isHeader
        searchParams={searchParams}
      />
      <DetailsPage
        sql={datasetsSql}
        sqlOperator={ColumnSingleValueFilterOperator.EQUAL}
        ContainerProps={{
          maxWidth: 'xl',
        }}
      >
        <DatasetJsonLdScript entityId={searchParams.id} />
        <DetailsPageContent content={detailsPageContent} />
      </DetailsPage>
    </>
  )
}
