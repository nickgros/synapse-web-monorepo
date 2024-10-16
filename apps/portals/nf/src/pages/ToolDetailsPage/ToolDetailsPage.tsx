import {
  DetailsPage,
  DetailsPageTabConfig,
  DetailsPageTabs,
  RedirectWithQuery,
  sharePageLinkButtonDetailPageProps,
  useGetPortalComponentSearchParams,
} from '@sage-bionetworks/synapse-portal-framework'
import { ColumnSingleValueFilterOperator } from '@sage-bionetworks/synapse-types'
import React from 'react'
import { Outlet, RouteObject } from 'react-router'
import { toolsSql } from '../../config/resources'
import { toolsSchema } from '../../config/synapseConfigs/tools'
import {
  CardContainerLogic,
  ErrorPage,
  SharePageLinkButton,
  SynapseConstants,
  SynapseErrorType,
} from 'synapse-react-client'
import { toolDetailsPageDataTabRouteConfig } from './ToolDetailsPageDataTab'
import ToolDetailsPageDetailsTab from './ToolDetailsPageDetailsTab'
import ToolDetailsPageObservationsTab from './ToolDetailsPageObservationsTab'

export const toolDetailsPageTabConfig: DetailsPageTabConfig[] = [
  {
    title: 'Details',
    path: 'Details',
  },
  {
    title: 'Observations',
    path: 'Observations',
  },
  {
    title: 'Data',
    path: 'Data',
  },
] satisfies DetailsPageTabConfig[]

export default function ToolDetailsPage() {
  const { resourceId } = useGetPortalComponentSearchParams()

  if (!resourceId) {
    return <ErrorPage type={SynapseErrorType.NOT_FOUND} gotoPlace={() => {}} />
  }

  return (
    <>
      <SharePageLinkButton {...sharePageLinkButtonDetailPageProps} />
      <CardContainerLogic
        sql={toolsSql}
        type={SynapseConstants.GENERIC_CARD}
        genericCardSchema={toolsSchema}
        secondaryLabelLimit={6}
        isHeader={true}
        labelLinkConfig={[
          {
            isMarkdown: true,
            matchColumnName: 'investigatorWebsite',
          },
        ]}
        searchParams={{ resourceId }}
      />
      <DetailsPage
        sql={toolsSql}
        ContainerProps={{ maxWidth: 'xl' }}
        sqlOperator={ColumnSingleValueFilterOperator.EQUAL}
      >
        <DetailsPageTabs tabConfig={toolDetailsPageTabConfig} />
        <Outlet />
      </DetailsPage>
    </>
  )
}

export const toolDetailsPageRoutesConfig: RouteObject = {
  path: 'Explore/Tools/DetailsPage',
  element: <ToolDetailsPage />,
  children: [
    {
      index: true,
      element: <RedirectWithQuery to={'Details'} />,
    },
    {
      path: 'Details',
      element: <ToolDetailsPageDetailsTab />,
    },
    {
      path: 'Observations',
      element: <ToolDetailsPageObservationsTab />,
    },
    toolDetailsPageDataTabRouteConfig,
  ],
}
