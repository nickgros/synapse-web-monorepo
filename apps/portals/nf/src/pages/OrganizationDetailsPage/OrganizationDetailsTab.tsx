import { DetailsPageContent } from '@sage-bionetworks/synapse-portal-framework/components/DetailsPage/DetailsPageContentLayout'
import { useDetailsPageContext } from '@sage-bionetworks/synapse-portal-framework/components/DetailsPage/DetailsPageContext'
import { ColumnSingleValueFilterOperator } from '@sage-bionetworks/synapse-types'
import React from 'react'
import { publicationsSql, studiesSql } from 'src/config/resources'
import {
  columnAliases,
  searchConfiguration,
} from 'src/config/synapseConfigs/commonProps'
import { publicationsCardConfiguration } from 'src/config/synapseConfigs/publications'
import { studyCardConfiguration } from 'src/config/synapseConfigs/studies'
import {
  CardContainerLogic,
  MarkdownSynapse,
  QueryWrapperPlotNav,
} from 'synapse-react-client'

export default function OrganizationDetailsTab() {
  const { value: fundingAgency } = useDetailsPageContext('fundingAgency')

  if (fundingAgency == null) {
    return null
  }

  return (
    <DetailsPageContent
      content={[
        {
          id: 'Funded Studies',
          element: (
            <QueryWrapperPlotNav
              rgbIndex={8}
              shouldDeepLink={false}
              defaultShowPlots={false}
              sql={studiesSql}
              visibleColumnCount={7}
              sqlOperator={ColumnSingleValueFilterOperator.LIKE}
              initialLimit={2}
              cardConfiguration={studyCardConfiguration}
              name="Funded Studies"
              columnAliases={columnAliases}
              searchConfiguration={searchConfiguration}
              searchParams={{ fundingAgency }}
            />
          ),
        },
        {
          id: 'Publications',
          title: 'Publications',
          element: (
            <CardContainerLogic
              sql={publicationsSql}
              initialLimit={3}
              {...publicationsCardConfiguration}
              sqlOperator={ColumnSingleValueFilterOperator.LIKE}
              searchParams={{ fundingAgency }}
            />
          ),
        },
        {
          title: 'Funding Impact',
          id: 'Funding Impact',
          element: <MarkdownSynapse ownerId={'syn22272075'} wikiId="604853" />,
        },
      ]}
    ></DetailsPageContent>
  )
}
