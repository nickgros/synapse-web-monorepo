import { RouteConfig } from '@react-router/dev/routes'
import {
  ExploreWrapper,
  NFBrowseToolsPage,
  RedirectWithQuery,
  SectionLayout,
  sharedRoutes,
  sharePageLinkExplorePageButtonProps,
} from '@sage-bionetworks/synapse-portal-framework'
import React from 'react'
import { DynamicForm, SharePageLinkButton } from 'synapse-react-client'
import explorePageRoutes from './config/explorePageRoutes'
import { popularSearchesSql, toolsSql } from './config/resources'
import DatasetDetailsPage from './pages/DatasetDetailsPage'
import { hackathonDetailsPageRoutesConfig } from './pages/HackathonDetailsPage/HackathonDetailsPage'
import HomePage from './pages/HomePage'
import InitiativeDetailsPage from './pages/InitiativeDetailsPage'
import { organizationsDetailsPageRoute } from './pages/OrganizationDetailsPage/OrganizationDetailsPage'
import { studyDetailsPageRoute } from './pages/StudyDetailsPage/StudyDetailsPage'
import { toolDetailsPageRoutesConfig } from './pages/ToolDetailsPage/ToolDetailsPage'

export const routes: RouteConfig = [
  {
    path: '/',
    file: './layout/app.tsx',
    children: [
      // ...sharedRoutes,

      { index: true, file: './pages/HomePage.tsx' },
    ],
  },
]

const rest = [
  {
    children: [
      ...sharedRoutes,
      { index: true, element: <HomePage /> },
      {
        path: 'Research Tools Central',
        children: [
          {
            path: 'Browse Tools',
            element: (
              <NFBrowseToolsPage
                popularSearchesSql={popularSearchesSql}
                toolsSql={toolsSql}
              />
            ),
          },
          {
            path: 'Submit Animal Models',
            element: (
              <SectionLayout>
                <DynamicForm
                  schemaUrl="https://raw.githubusercontent.com/nf-osi/nf-research-tools-schema/refs/heads/additional-models/NF-Tools-Schemas/animal-model/submitAnimalModel.json"
                  uiSchemaUrl="https://raw.githubusercontent.com/nf-osi/nf-research-tools-schema/refs/heads/additional-models/NF-Tools-Schemas/animal-model/SubmitAnimalModelUiSchema.json"
                  postUrl="https://submit-form.com/KwZ46H4T"
                />
              </SectionLayout>
            ),
          },
          {
            path: 'Submit Observations',
            element: (
              <SectionLayout>
                <DynamicForm
                  schemaUrl="https://raw.githubusercontent.com/nf-osi/nf-research-tools-schema/refs/heads/additional-models/NF-Tools-Schemas/observations/SubmitObservationSchema.json"
                  uiSchemaUrl="https://raw.githubusercontent.com/nf-osi/nf-research-tools-schema/refs/heads/additional-models/NF-Tools-Schemas/observations/SubmitObservationUiSchema.json"
                  postUrl="https://submit-form.com/KwZ46H4T"
                />
              </SectionLayout>
            ),
          },
          {
            path: 'Submit Genetic Reagents',
            element: (
              <SectionLayout>
                <DynamicForm
                  schemaUrl="https://raw.githubusercontent.com/nf-osi/nf-research-tools-schema/refs/heads/additional-models/NF-Tools-Schemas/genetic-reagent/submitGeneticReagent.json"
                  uiSchemaUrl="https://raw.githubusercontent.com/nf-osi/nf-research-tools-schema/refs/heads/additional-models/NF-Tools-Schemas/genetic-reagent/submitGeneticReagentUiSchema.json"
                  postUrl="https://submit-form.com/KwZ46H4T"
                />
              </SectionLayout>
            ),
          },
        ],
      },
      {
        path: 'Explore',
        element: (
          <>
            <SharePageLinkButton {...sharePageLinkExplorePageButtonProps} />
            <ExploreWrapper explorePaths={explorePageRoutes} />
          </>
        ),
        children: explorePageRoutes,
      },
      {
        path: 'Explore/Initiatives/DetailsPage',
        element: <InitiativeDetailsPage />,
      },
      studyDetailsPageRoute,
      {
        path: 'Explore/Datasets/DetailsPage',
        element: <DatasetDetailsPage />,
      },
      toolDetailsPageRoutesConfig,
      hackathonDetailsPageRoutesConfig,
      {
        // PORTALS-2277 - Renamed "Hackathon Projects" to "Hackathon"
        path: 'Explore/Hackathon Projects',
        element: <RedirectWithQuery to="/Explore/Hackathon" />,
      },
      organizationsDetailsPageRoute,
    ],
  },
]

export default routes
