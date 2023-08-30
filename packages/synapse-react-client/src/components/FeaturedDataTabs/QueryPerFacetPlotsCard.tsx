import React from 'react'
import { QueryBundleRequest } from '@sage-bionetworks/synapse-types'
import { SynapseConstants } from '../../utils'
import { parseEntityIdFromSqlStatement } from '../../utils/functions'
import { DEFAULT_PAGE_SIZE } from '../../utils/SynapseConstants'
import {
  QueryVisualizationContextType,
  QueryVisualizationWrapper,
} from '../QueryVisualizationWrapper'
import { QueryWrapper } from '../QueryWrapper'
import { QueryWrapperErrorBanner } from '../QueryWrapperErrorBanner'
import FacetPlotsCard from './FacetPlotsCard'

export type QueryPerFacetPlotsCardProps = {
  title?: string
  description?: string
  rgbIndex?: number
  facetsToPlot?: string[]
  selectFacetColumnName: string
  selectFacetColumnValue: string
  sql?: string
  detailsPagePath: string
} & Pick<QueryVisualizationContextType, 'unitDescription'>

export function getQueryRequest(
  sql: string,
  selectFacetColumnName: string,
  selectFacetColumnValue: string,
): QueryBundleRequest {
  const entityId = parseEntityIdFromSqlStatement(sql)
  return {
    entityId,
    concreteType: 'org.sagebionetworks.repo.model.table.QueryBundleRequest',
    partMask:
      SynapseConstants.BUNDLE_MASK_QUERY_COLUMN_MODELS |
      SynapseConstants.BUNDLE_MASK_QUERY_FACETS,
    query: {
      sql,
      offset: 0,
      limit: DEFAULT_PAGE_SIZE,
      selectedFacets: [
        {
          columnName: selectFacetColumnName,
          facetValues: [selectFacetColumnValue],
          concreteType:
            'org.sagebionetworks.repo.model.table.FacetColumnValuesRequest',
        },
      ],
    },
  }
}
const QueryPerFacetPlotsCard: React.FunctionComponent<
  QueryPerFacetPlotsCardProps
> = props => {
  const {
    title,
    description,
    sql,
    facetsToPlot,
    rgbIndex,
    selectFacetColumnName,
    selectFacetColumnValue,
    detailsPagePath,
    ...rest
  } = props
  const initQueryRequest: QueryBundleRequest = getQueryRequest(
    sql!,
    selectFacetColumnName,
    selectFacetColumnValue,
  )
  return (
    <QueryWrapper {...rest} initQueryRequest={initQueryRequest}>
      <QueryVisualizationWrapper rgbIndex={rgbIndex} {...rest}>
        <QueryWrapperErrorBanner />
        <FacetPlotsCard
          title={title}
          description={description}
          facetsToPlot={facetsToPlot}
          detailsPagePath={detailsPagePath}
        />
      </QueryVisualizationWrapper>
    </QueryWrapper>
  )
}

export default QueryPerFacetPlotsCard
