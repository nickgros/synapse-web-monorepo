import React from 'react'
import { Goals, SynapseConstants } from 'synapse-react-client'
import {
  newStudiesSql,
  studiesDetailPage,
  studyCardConfiguration,
  studyHeaderIconOptions,
} from './synapseConfigs/studies'
import {
  hackathonCardConfiguration,
  hackathonsDetailPage,
} from './synapseConfigs/hackathons'

import initiatives, {
  initiativeCardConfiguration,
  initiativeDetailsPageConfiguration,
} from './synapseConfigs/initiatives'
import routeControlWrapperProps from './routeControlWrapperProps'
import { columnAliases } from './synapseConfigs/commonProps'
import {
  organizationCardSchema,
  organizationDetailsPage,
  organizationDetailsPageLinkConfig,
} from './synapseConfigs/organizations'
import {
  fundersSql,
  hackathonsSql,
  initiativesSql,
  peopleSql,
  studiesSql,
} from './resources'
import { toolsDetailsPage } from './synapseConfigs/tools'
import { ColumnSingleValueFilterOperator } from '@sage-bionetworks/synapse-types'
import { datasetsDetailsPage } from './synapseConfigs/datasets'
import { RouteObject } from 'react-router-dom'
import NFSurveyToast from '../portal-components/nf/NFSurveyToast'
import { ComponentRenderer } from '../portal-components/ComponentRenderer'
import {
  downloadCartRoute,
  homeRedirectRoute,
  homeRoute,
} from '../shared-config/sharedRoutes'
import {
  datasets,
  files,
  hackathons,
  publications,
  studies,
  tools,
} from './synapseConfigs'

const limit = 3

const routes: RouteObject[] = [
  // homeRoute,
  homeRedirectRoute,
  downloadCartRoute,
  {
    path: '*',
    Component: NFSurveyToast,
    // synapseConfigArray: [
    //   {
    //     name: 'NFSurveyToast',
    //     centerTitle: true,
    //     props: undefined,
    //   },
    // ],
  },
  {
    path: '',
    // exact: true,
    element: (
      <>
        <ComponentRenderer
          config={{
            name: 'Header',
            props: undefined,
            isOutsideContainer: true,
          }}
        />
        <ComponentRenderer
          config={{
            name: 'Goals',
            title: 'Portal Programs and Goals',
            centerTitle: true,
            outsideContainerClassName: 'home-spacer',
            props: {
              entityId: 'syn23516796',
            },
          }}
        />
        <ComponentRenderer
          config={{
            name: 'CardContainerLogic',
            title: 'New Studies',
            centerTitle: true,
            outsideContainerClassName: 'home-spacer home-bg-dark',
            link: '/Explore/Studies',
            props: {
              initialLimit: limit,
              columnAliases,
              sql: newStudiesSql,
              ...studyCardConfiguration,
            },
          }}
        />
        <ComponentRenderer
          config={{
            name: 'UserCardListRotate',
            title: 'Data Contributor Spotlight',
            outsideContainerClassName: 'home-spacer',
            centerTitle: true,
            props: {
              sql: `${peopleSql} where isFeatured=true`,
              count: 3,
              size: SynapseConstants.LARGE_USER_CARD,
              useQueryResultUserData: true,
              // summaryLink: 'Explore/People',
              // summaryLinkText: 'Explore All People',
            },
          }}
        />
        <ComponentRenderer
          config={{
            name: 'CardContainerLogic',
            title: 'Our Partners',
            outsideContainerClassName: 'home-spacer',
            centerTitle: true,
            props: {
              columnAliases,
              sql: fundersSql,
              type: SynapseConstants.GENERIC_CARD,
              titleLinkConfig: organizationDetailsPageLinkConfig,
              genericCardSchema: {
                ...organizationCardSchema,
                imageFileHandleColumnName: 'cardLogo',
              },
              descriptionConfig: {
                showFullDescriptionByDefault: true,
              },
              ctaLinkConfig: {
                text: 'Visit Website',
                link: 'website',
              },
            },
          }}
        />
        <ComponentRenderer
          config={{
            name: 'RssFeedCards',
            title: "What's New",
            centerTitle: true,
            outsideContainerClassName: 'home-spacer home-bg-dark',
            props: {
              url: 'https://news.nfdataportal.org',
              itemsToShow: 3,
              allowCategories: [
                'Newsletter',
                'Hackathon',
                'Publication',
                'Funding',
              ],
              // mailChimpListName: 'NF quarterly newsletter',
              // mailChimpUrl:'https://sagebase.us7.list-manage.com/subscribe/post?u=abcdefghi...',
              lockedColumn: {
                value: 'featured',
              },
            },
          }}
        />
      </>
    ),
  },
  {
    path: '/Browse Tools',
    // exact: true,
    element: (
      <ComponentRenderer
        config={{
          name: 'BrowseToolsPage',
          props: undefined,
          isOutsideContainer: true,
        }}
      />
    ),
  },
  {
    path: '/Explore',
    children: [
      {
        // hideRouteFromNavbar: true,
        // exact: true,
        element: (
          <ComponentRenderer
            config={{
              name: 'RouteControlWrapper',
              isOutsideContainer: true,
              props: routeControlWrapperProps,
            }}
          />
        ),
        children: [
          {
            path: 'Initiatives',
            children: [
              {
                path: '',
                element: (
                  <ComponentRenderer
                    config={{ ...initiatives, isOutsideContainer: true }}
                  />
                ),
              },
              {
                path: 'DetailsPage',
                // exact: true,
                element: (
                  <>
                    <ComponentRenderer
                      config={{
                        name: 'CardContainerLogic',
                        isOutsideContainer: true,
                        props: {
                          sqlOperator: ColumnSingleValueFilterOperator.EQUAL,
                          isHeader: true,

                          ...initiativeCardConfiguration,
                          columnAliases,
                          sql: initiativesSql,
                        },
                      }}
                    />
                    <ComponentRenderer
                      config={{
                        name: 'DetailsPage',
                        isOutsideContainer: false,
                        props: initiativeDetailsPageConfiguration,
                        containerClassName: 'container-full-width',
                      }}
                    />
                  </>
                ),
              },
            ],
          },
          {
            path: 'Studies',
            children: [
              {
                path: '',
                element: (
                  <ComponentRenderer
                    config={{ ...studies, isOutsideContainer: true }}
                  />
                ),
              },
              {
                path: 'DetailsPage',
                element: (
                  <>
                    <ComponentRenderer
                      config={{
                        name: 'CardContainerLogic',
                        isOutsideContainer: true,
                        props: {
                          sqlOperator: ColumnSingleValueFilterOperator.EQUAL,
                          isHeader: true,

                          ...studyCardConfiguration,
                          columnAliases,
                          iconOptions: studyHeaderIconOptions,
                          secondaryLabelLimit: Infinity,
                          sql: studiesSql,
                        },
                      }}
                    />

                    <ComponentRenderer
                      config={{
                        name: 'DetailsPage',
                        isOutsideContainer: false,
                        props: studiesDetailPage,
                        containerClassName: 'container-full-width',
                      }}
                    />
                  </>
                ),
              },
            ],
          },
          {
            path: 'Datasets',
            children: [
              {
                path: '',
                element: (
                  <ComponentRenderer
                    config={{ ...datasets, isOutsideContainer: true }}
                  />
                ),
              },
              {
                path: 'DetailsPage',
                // exact: true,
                element: (
                  <>
                    {datasetsDetailsPage.map((config, index) => (
                      <ComponentRenderer key={index} config={config} />
                    ))}
                  </>
                ),
              },
            ],
          },
          {
            path: 'Files',
            children: [
              {
                path: '',
                element: (
                  <ComponentRenderer
                    config={{ ...files, isOutsideContainer: true }}
                  />
                ),
              },
            ],
          },
          {
            path: 'Publications',
            children: [
              {
                path: '',
                element: (
                  <ComponentRenderer
                    config={{ ...publications, isOutsideContainer: true }}
                  />
                ),
              },
            ],
          },
          {
            path: 'Tools',
            children: [
              {
                path: '',
                element: (
                  <ComponentRenderer
                    config={{ ...tools, isOutsideContainer: true }}
                  />
                ),
              },
              {
                path: 'DetailsPage',
                // exact: true,
                element: (
                  <>
                    {toolsDetailsPage.map((config, index) => (
                      <ComponentRenderer key={index} config={config} />
                    ))}
                  </>
                ),
              },
            ],
          },
          {
            path: 'Hackathon',
            //       displayName: 'Hackathon Projects',
            children: [
              {
                path: '',
                element: (
                  <ComponentRenderer
                    config={{ ...hackathons, isOutsideContainer: true }}
                  />
                ),
              },
              {
                path: 'DetailsPage',
                // exact: true,
                element: (
                  <>
                    <ComponentRenderer
                      config={{
                        name: 'CardContainerLogic',
                        isOutsideContainer: true,
                        props: {
                          sqlOperator: ColumnSingleValueFilterOperator.EQUAL,
                          isHeader: true,
                          ...hackathonCardConfiguration,
                          columnAliases: {
                            ...columnAliases,
                            studyStatus: 'Status',
                          },
                          secondaryLabelLimit: Infinity,
                          sql: hackathonsSql,
                        },
                      }}
                    />
                    <ComponentRenderer
                      config={{
                        name: 'DetailsPage',
                        isOutsideContainer: false,
                        props: hackathonsDetailPage,
                        containerClassName: 'container-full-width',
                      }}
                    />
                  </>
                ),
              },
            ],
          },
          {
            path: 'Hackathon Projects',
            // hideRouteFromNavbar: true,
            element: (
              <ComponentRenderer
                config={
                  // PORTALS-2277 - Renamed "Hackathon Projects" to "Hackathon"
                  {
                    name: 'RedirectWithQuery',
                    props: {
                      // exact: false,
                      // strict: false,
                      // from: 'Hackathon Projects',
                      to: 'Hackathon',
                    },
                  }
                }
              />
            ),
          },
        ],
      },
    ],
  },
  {
    path: 'Organizations',
    children: [
      {
        // hideRouteFromNavbar: true,
        path: 'DetailsPage',
        element: (
          <>
            {organizationDetailsPage.map((config, index) => (
              <ComponentRenderer key={index} config={config} />
            ))}
          </>
        ),
      },
      // TODO: These are all for the navbar
      // {
      //   displayName: 'CTF',
      //   path: 'DetailsPage?abbreviation=CTF',
      // },
      // {
      //   displayName: 'NTAP',
      //   path: 'DetailsPage?abbreviation=NTAP',
      // },
      // {
      //   displayName: 'GFF',
      //   path: 'DetailsPage?abbreviation=GFF',
      // },
      // {
      //   displayName: 'NCI DHART SPORE',
      //   path: 'DetailsPage?fundingAgency=NIH-NCI',
      // },
      // {
      //   displayName: 'CDMRP NFRP',
      //   path: 'DetailsPage?abbreviation=CDMRP',
      // },
      // {
      //   displayName: 'NFRI',
      //   path: 'DetailsPage?abbreviation=NFRI',
      // },
    ],
  },

  {
    path: 'About',
    children: [
      {
        path: 'NF-OSI',
        element: (
          <ComponentRenderer
            config={{
              name: 'Markdown',
              title: 'About',
              props: {
                ownerId: 'syn26451327',
                wikiId: '614265',
                loadingSkeletonRowCount: 20,
              },
            }}
          />
        ),
      },
      // TODO: This is navbar only
      // {
      //   displayName: 'Data Standards',
      //   hideRouteFromNavbar: false,
      //   path: undefined,
      //   target: '_blank',
      //   link: 'https://nf-osi.github.io/nf-metadata-dictionary/',
      //   synapseConfigArray: [],
      // },
    ],
  },
  // TODO: the rest are navbar only
  // {
  //   exact: true,
  //   displayName: 'Contribute Data',
  //   path: undefined,
  //   target: '_blank',
  //   link: 'https://help.nf.synapse.org/NFdocs/How-to-Share-Data-(an-Overview).1994489966.html',
  //   synapseConfigArray: [],
  // },
  // {
  //   exact: true,
  //   displayName: 'News',
  //   path: undefined,
  //   target: '_blank',
  //   link: 'https://news.nfdataportal.org/',
  //   synapseConfigArray: [],
  // },
  // {
  //   exact: true,
  //   displayName: 'Help',
  //   path: undefined,
  //   target: '_blank',
  //   link: 'https://help.nf.synapse.org/',
  //   synapseConfigArray: [],
  // },
]

export default routes
