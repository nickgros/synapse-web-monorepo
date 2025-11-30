import { useMemo } from 'react'
import DetailsPage from '@sage-bionetworks/synapse-portal-framework/components/DetailsPage'
import { MarkdownSynapseFromColumnData } from '@sage-bionetworks/synapse-portal-framework/components/DetailsPage/markdown/MarkdownSynapseFromColumnData'
import { DetailsPageContent } from '@sage-bionetworks/synapse-portal-framework/components/DetailsPage/DetailsPageContentLayout'
import {
  DetailsPageTabs,
  DetailsPageTabConfig,
} from '@sage-bionetworks/synapse-portal-framework/components/DetailsPage/DetailsPageTabs'
import { DetailsPageSectionLayoutType } from '@sage-bionetworks/synapse-portal-framework/components/DetailsPage/DetailsPageSectionLayout'
import { DetailsPageContextConsumer } from '@sage-bionetworks/synapse-portal-framework/components/DetailsPage/DetailsPageContext'
import { EntityResolver } from '@sage-bionetworks/synapse-portal-framework/components/DetailsPage/EntityResolver'
import { useGetPortalComponentSearchParams } from '@sage-bionetworks/synapse-portal-framework/utils/UseGetPortalComponentSearchParams'
import CardContainerLogic from 'synapse-react-client/components/CardContainerLogic'
import * as SynapseConstants from 'synapse-react-client/utils/SynapseConstants'
import QueryWrapperPlotNav from 'synapse-react-client/components/QueryWrapperPlotNav'
import {
  ColumnSingleValueFilterOperator,
  ColumnMultiValueFunction,
} from '@sage-bionetworks/synapse-types'
import { useLocation } from 'react-router'
import {
  DetailsPageConfig,
  DetailsPageSection,
  Resource,
  SqlOperator,
} from '../../types'

interface DetailsPagePreviewRendererProps {
  resource: Resource
  detailsPage: DetailsPageConfig
  /** All resources (for resolving related-resource sections) */
  allResources: Resource[]
}

/**
 * Convert our SqlOperator to synapse-types operator.
 * Returns either ColumnSingleValueFilterOperator or ColumnMultiValueFunction.
 */
function toSynapseOperator(
  op?: SqlOperator,
): ColumnSingleValueFilterOperator | ColumnMultiValueFunction {
  switch (op) {
    case 'LIKE':
      return ColumnSingleValueFilterOperator.LIKE
    case 'EQUAL':
      return ColumnSingleValueFilterOperator.EQUAL
    case 'IN':
      return ColumnSingleValueFilterOperator.IN
    case 'HAS':
      return ColumnMultiValueFunction.HAS
    default:
      return ColumnSingleValueFilterOperator.LIKE
  }
}

/**
 * Renders a live preview of a detail page using the portal framework's DetailsPage component.
 * Converts our DetailsPageConfig to the props the framework expects.
 */
export function DetailsPagePreviewRenderer({
  resource,
  detailsPage,
  allResources,
}: DetailsPagePreviewRendererProps) {
  // Get search params from the URL to filter the header card to the correct row
  const searchParams = useGetPortalComponentSearchParams()

  // Build header card from resource's card display configuration
  const headerElement = useMemo(() => {
    const cardDisplay = resource.cardDisplay
    if (!cardDisplay) {
      return undefined
    }

    return (
      <CardContainerLogic
        sql={resource.sql}
        columnAliases={resource.columnAliases}
        cardConfiguration={{
          type: SynapseConstants.GENERIC_CARD,
          genericCardSchema: cardDisplay.genericCardSchema
            ? {
                type: cardDisplay.genericCardSchema.type || 'GENERIC_CARD',
                title: cardDisplay.genericCardSchema.title,
                subTitle: cardDisplay.genericCardSchema.subTitle,
                description: cardDisplay.genericCardSchema.description,
                icon: cardDisplay.genericCardSchema.icon,
                secondaryLabels: cardDisplay.genericCardSchema.secondaryLabels,
              }
            : { type: 'GENERIC_CARD', title: 'name' },
          secondaryLabelLimit: Infinity,
          isHeader: true,
        }}
        isAlignToLeftNav={true}
        searchParams={searchParams}
      />
    )
  }, [resource.sql, resource.cardDisplay, resource.columnAliases, searchParams])

  // Build the tab config for navigation (if tabs are used)
  const tabConfig: DetailsPageTabConfig[] | null = useMemo(() => {
    if (!detailsPage.tabs || detailsPage.tabs.length === 0) {
      return null
    }
    return detailsPage.tabs.map(tab => ({
      title: tab.title,
      path: tab.path,
      iconName: tab.iconName,
      tooltip: tab.tooltip,
      hideIfColumnValueNull: tab.hideIfColumnValueNull,
    }))
  }, [detailsPage.tabs])

  // Use location to determine which tab is active
  const location = useLocation()

  // Find the active tab based on the current path
  const activeTab = useMemo(() => {
    if (!detailsPage.tabs || detailsPage.tabs.length === 0) {
      return null
    }
    // Check if current path ends with any tab path
    const matchingTab = detailsPage.tabs.find(tab =>
      location.pathname.endsWith(tab.path),
    )
    // Default to first tab if no match
    return matchingTab ?? detailsPage.tabs[0]
  }, [detailsPage.tabs, location.pathname])

  // Build content for the active tab or non-tabbed sections
  const pageContent = useMemo(() => {
    // If we have tabs, render the active tab's content
    if (activeTab) {
      return (
        <DetailsPageContent
          content={activeTab.sections.map(section =>
            buildSectionLayout(section, allResources),
          )}
        />
      )
    }
    // No tabs - render top-level sections
    const sections = detailsPage.sections ?? []
    return (
      <DetailsPageContent
        content={sections.map(section =>
          buildSectionLayout(section, allResources),
        )}
      />
    )
  }, [activeTab, detailsPage.sections, allResources])

  return (
    <DetailsPage
      sql={resource.sql}
      sqlOperator={toSynapseOperator(detailsPage.sqlOperator)}
      resourcePrimaryKey={resource.primaryKeyColumns}
      header={headerElement}
    >
      {tabConfig && <DetailsPageTabs tabConfig={tabConfig} />}
      {pageContent}
    </DetailsPage>
  )
}

/**
 * Builds a section layout configuration from our DetailsPageSection type
 */
function buildSectionLayout(
  section: DetailsPageSection,
  allResources: Resource[],
): DetailsPageSectionLayoutType {
  const baseLayout = {
    id: section.id,
    title: section.title,
    helpText: section.helpText,
    hideTitle: section.hideTitle,
  }

  const config = section.config

  if (config.type === 'markdown-from-column') {
    return {
      ...baseLayout,
      element: (
        <MarkdownSynapseFromColumnData
          columnName={config.columnName}
          showEntityTitle={config.showEntityTitle}
          isRawMarkdown={config.isRawMarkdown}
        />
      ),
    }
  }

  if (config.type === 'related-resource') {
    // Find the source resource to get its SQL and display config
    const sourceResource = allResources.find(
      r => r.id === config.sourceResourceId,
    )
    if (!sourceResource) {
      return {
        ...baseLayout,
        element: (
          <div style={{ color: 'red', padding: '1rem' }}>
            Source resource not found: {config.sourceResourceId}
          </div>
        ),
      }
    }

    const displayAs = config.displayAs ?? 'cards'
    const sqlOperator = toSynapseOperator(
      config.sqlOperator ?? (displayAs === 'table' ? 'HAS' : 'IN'),
    )

    // Build the inner content that receives the filter value
    const buildContent = (filterValue: string) => {
      if (displayAs === 'table') {
        // Render as QueryWrapperPlotNav (table display)
        const tableConfig = sourceResource.tableDisplay
        return (
          <QueryWrapperPlotNav
            sql={sourceResource.sql}
            sqlOperator={sqlOperator}
            columnAliases={sourceResource.columnAliases}
            tableConfiguration={{
              showAccessColumn: tableConfig?.showAccessColumn,
              showDownloadColumn: tableConfig?.showDownloadColumn,
            }}
            showColumnSelection={tableConfig?.showColumnSelection}
            visibleColumnCount={tableConfig?.visibleColumnCount}
            availableFacets={tableConfig?.availableFacets}
            defaultShowPlots={tableConfig?.defaultShowPlots}
            hideQueryCount={tableConfig?.hideQueryCount}
            shouldDeepLink={false}
            searchParams={{
              [config.filterColumnName]: filterValue,
            }}
            lockedColumn={{
              columnName: config.filterColumnName,
              value: filterValue,
            }}
          />
        )
      } else {
        // Render as cards (CardContainerLogic)
        return (
          <CardContainerLogic
            sqlOperator={sqlOperator}
            sql={sourceResource.sql}
            columnAliases={sourceResource.columnAliases}
            cardConfiguration={{
              type: SynapseConstants.GENERIC_CARD,
              genericCardSchema: sourceResource.cardDisplay?.genericCardSchema
                ? {
                    type:
                      sourceResource.cardDisplay.genericCardSchema.type ||
                      'GENERIC_CARD',
                    title: sourceResource.cardDisplay.genericCardSchema.title,
                    subTitle:
                      sourceResource.cardDisplay.genericCardSchema.subTitle,
                    description:
                      sourceResource.cardDisplay.genericCardSchema.description,
                    icon: sourceResource.cardDisplay.genericCardSchema.icon,
                    secondaryLabels:
                      sourceResource.cardDisplay.genericCardSchema
                        .secondaryLabels,
                  }
                : { type: 'GENERIC_CARD', title: 'name' },
            }}
            searchParams={{
              [config.filterColumnName]: filterValue,
            }}
          />
        )
      }
    }

    // If resolveEntityName is true, wrap with EntityResolver
    if (config.resolveEntityName) {
      return {
        ...baseLayout,
        element: (
          <DetailsPageContextConsumer columnName={config.sourceColumnName}>
            {({ value: entityId }) => {
              if (!entityId) {
                return null
              }
              return (
                <EntityResolver entityId={entityId}>
                  {entityHeader => buildContent(entityHeader.name)}
                </EntityResolver>
              )
            }}
          </DetailsPageContextConsumer>
        ),
      }
    }

    // Standard case: use the column value directly as the filter
    return {
      ...baseLayout,
      element: (
        <DetailsPageContextConsumer columnName={config.sourceColumnName}>
          {({ value }) => {
            if (!value) {
              return null
            }
            return buildContent(value)
          }}
        </DetailsPageContextConsumer>
      ),
    }
  }

  if (config.type === 'query-wrapper') {
    // Use DetailsPageContextConsumer to get the value from the current row
    // and filter the query results
    return {
      ...baseLayout,
      element: (
        <DetailsPageContextConsumer columnName={config.sourceColumnName}>
          {({ value }) => {
            if (!value) {
              return null
            }
            return (
              <CardContainerLogic
                sql={config.sql}
                sqlOperator={toSynapseOperator(config.sqlOperator)}
                cardConfiguration={{
                  type: SynapseConstants.GENERIC_CARD,
                  genericCardSchema: { type: 'GENERIC_CARD', title: 'name' },
                }}
                searchParams={{
                  [config.filterColumnName]: value,
                }}
              />
            )
          }}
        </DetailsPageContextConsumer>
      ),
    }
  }

  return {
    ...baseLayout,
    element: <div>Unknown section type</div>,
  }
}

export default DetailsPagePreviewRenderer
