/**
 * Hook to fetch sample data from a resource for preview purposes
 *
 * This hook fetches the first row from a resource's SQL query
 * to enable previewing detail pages with real data.
 */
import { useMemo } from 'react'
import * as SynapseConstants from 'synapse-react-client/utils/SynapseConstants'
import { useGetQueryResultBundleWithAsyncStatus } from 'synapse-react-client/synapse-queries/entity/useGetQueryResultBundle'
import { parseEntityIdFromSqlStatement } from 'synapse-react-client/utils/functions/SqlFunctions'
import type { QueryBundleRequest, Row } from '@sage-bionetworks/synapse-types'
import type { CachedSelectColumn } from '../types/portal-config-schema'

export interface SampleRowData {
  /** The raw row data */
  row: Row | undefined
  /** Column name to value mapping */
  values: Record<string, string | null>
  /** The select columns from the query */
  selectColumns: CachedSelectColumn[]
}

/**
 * Hook to fetch the first row of data from a Synapse table query.
 * Useful for previewing detail pages with sample data.
 *
 * @param sql - The SQL query string (e.g., "SELECT * FROM syn123")
 * @param enabled - Whether to enable the query (default: false)
 * @returns The first row's data, loading state, and error if any
 */
export function useSampleRowData(sql: string | undefined, enabled = false) {
  const queryBundleRequest: QueryBundleRequest | undefined = useMemo(() => {
    if (!sql || !sql.trim() || !enabled) {
      return undefined
    }

    const entityId = parseEntityIdFromSqlStatement(sql)
    if (!entityId) {
      return undefined
    }

    return {
      entityId,
      concreteType: 'org.sagebionetworks.repo.model.table.QueryBundleRequest',
      // Get both query results and select columns
      partMask:
        SynapseConstants.BUNDLE_MASK_QUERY_RESULTS |
        SynapseConstants.BUNDLE_MASK_QUERY_SELECT_COLUMNS,
      query: {
        sql,
        // Only fetch the first row
        limit: 1,
      },
    }
  }, [sql, enabled])

  // Default request used when query is disabled (to satisfy type requirements)
  const defaultRequest: QueryBundleRequest = useMemo(
    () => ({
      entityId: 'syn0',
      concreteType: 'org.sagebionetworks.repo.model.table.QueryBundleRequest',
      partMask: 0,
      query: { sql: '' },
    }),
    [],
  )

  const {
    data: asyncJobStatus,
    isLoading,
    isSuccess,
    error,
  } = useGetQueryResultBundleWithAsyncStatus(
    queryBundleRequest ?? defaultRequest,
    { enabled: !!queryBundleRequest },
  )

  const result: SampleRowData = useMemo(() => {
    const queryResult = asyncJobStatus?.responseBody?.queryResult?.queryResults
    const columns = asyncJobStatus?.responseBody?.selectColumns ?? []

    const row = queryResult?.rows?.[0]
    const headers = queryResult?.headers ?? []

    // Build a column name to value mapping
    const values: Record<string, string | null> = {}
    if (row && headers.length > 0) {
      headers.forEach((header, index) => {
        values[header.name] = row.values[index] ?? null
      })
    }

    return {
      row,
      values,
      selectColumns: columns.map(col => ({
        name: col.name,
        columnType: col.columnType,
        id: col.id,
      })),
    }
  }, [asyncJobStatus?.responseBody])

  return {
    ...result,
    isLoading,
    isSuccess,
    error: error as Error | null,
  }
}

/**
 * Build search params for a detail page preview from sample row data
 * @param primaryKeyColumns - The primary key column names
 * @param rowValues - Column name to value mapping
 * @returns URLSearchParams string
 */
export function buildPreviewSearchParams(
  primaryKeyColumns: string[],
  rowValues: Record<string, string | null>,
): string {
  const params = new URLSearchParams()
  for (const column of primaryKeyColumns) {
    const value = rowValues[column]
    if (value != null) {
      params.set(column, value)
    }
  }
  return params.toString()
}
