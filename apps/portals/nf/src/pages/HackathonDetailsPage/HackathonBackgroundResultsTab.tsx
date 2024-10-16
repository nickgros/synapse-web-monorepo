import React from 'react'
import { DetailsPageContent } from '@sage-bionetworks/synapse-portal-framework'
import { MarkdownSynapseFromColumnData } from '@sage-bionetworks/synapse-portal-framework'

export default function HackathonBackgroundResultsTab() {
  return (
    <DetailsPageContent
      content={[
        {
          id: 'wiki',
          element: (
            <MarkdownSynapseFromColumnData columnName="tab1wikipointer" />
          ),
        },
        {
          id: 'acknowledgementStatements',
          element: (
            <MarkdownSynapseFromColumnData
              columnName="acknowledgementStatements"
              injectMarkdown
            />
          ),
        },
      ]}
    />
  )
}
