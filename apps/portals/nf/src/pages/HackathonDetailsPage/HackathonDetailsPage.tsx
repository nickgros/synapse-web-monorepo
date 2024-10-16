import {
  DetailsPage,
  DetailsPageTabConfig,
  DetailsPageTabs,
  RedirectWithQuery,
  useGetPortalComponentSearchParams,
} from '@sage-bionetworks/synapse-portal-framework'
import { ColumnSingleValueFilterOperator } from '@sage-bionetworks/synapse-types'
import React from 'react'
import { Outlet } from 'react-router'
import { CardContainerLogic } from 'synapse-react-client'
import { hackathonsSql } from '../../config/resources'
import { columnAliases } from '../../config/synapseConfigs/commonProps'
import { hackathonCardConfiguration } from '../../config/synapseConfigs/hackathons'
import HackathonBackgroundResultsTab from './HackathonBackgroundResultsTab'
import HackathonMethodologyTab from './HackathonMethodologyTab'

const tabConfig: DetailsPageTabConfig[] = [
  {
    title: 'Background & Results',
    path: 'Background&Results',
    iconName: 'chart',
  },
  {
    title: 'Methodology',
    path: 'Methodology',
    iconName: 'database',
    iconClassName: 'tab-database',
  },
]

function HackathonDetailsPage() {
  const { id } = useGetPortalComponentSearchParams()
  return (
    <>
      <CardContainerLogic
        sqlOperator={ColumnSingleValueFilterOperator.EQUAL}
        isHeader={true}
        {...hackathonCardConfiguration}
        columnAliases={{ ...columnAliases, studyStatus: 'Status' }}
        secondaryLabelLimit={Infinity}
        sql={hackathonsSql}
        searchParams={{ id }}
      />
      <DetailsPage sql={hackathonsSql} ContainerProps={{ maxWidth: 'xl' }}>
        <DetailsPageTabs tabConfig={tabConfig} />
        <Outlet />
      </DetailsPage>
    </>
  )
}

export const hackathonDetailsPageRoutesConfig = {
  path: 'Explore/Hackathon/DetailsPage',
  element: <HackathonDetailsPage />,
  children: [
    {
      index: true,
      element: <RedirectWithQuery to={tabConfig[0].path} />,
    },
    {
      path: tabConfig[0].path,
      element: <HackathonBackgroundResultsTab />,
    },
    {
      path: tabConfig[1].path,
      element: <HackathonMethodologyTab />,
    },
  ],
}
