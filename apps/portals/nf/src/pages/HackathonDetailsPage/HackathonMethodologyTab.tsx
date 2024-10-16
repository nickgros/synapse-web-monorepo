import { DetailsPageContent } from '@sage-bionetworks/synapse-portal-framework'
import { MarkdownSynapseFromColumnData } from '@sage-bionetworks/synapse-portal-framework'
import React from 'react'

export default function HackathonMethodologyTab() {
  return (
    <DetailsPageContent
      content={[
        {
          id: 'wiki',
          element: (
            <MarkdownSynapseFromColumnData columnName="tab2wikipointer" />
          ),
        },
      ]}
    />
  )
}
