/**
 * Resource Column Fetching Hook
 *
 * This hook fetches column metadata from Synapse for a given SQL query.
 * It uses the BUNDLE_MASK_QUERY_SELECT_COLUMNS mask (0x4) to get the columns
 * from the SELECT clause rather than the table's column models.
 *
 * Why SELECT columns vs Column Models?
 * - Column Models: The full schema of the underlying table
 * - Select Columns: Only the columns actually returned by the query
 *
 * Using Select Columns is important because:
 * 1. Queries may use SELECT expressions that differ from table columns
 * 2. Queries may alias columns (SELECT name AS title)
 * 3. Queries may select from multiple tables (joins)
 * 4. We want to show what the user will actually see in their cards
 *
 * The hook also provides a validation utility to check if configured
 * column names actually exist in the query results.
 */
import { useMemo } from 'react'
import * as SynapseConstants from 'synapse-react-client/utils/SynapseConstants'
import { useGetQueryResultBundleWithAsyncStatus } from 'synapse-react-client/synapse-queries/entity/useGetQueryResultBundle'
import { parseEntityIdFromSqlStatement } from 'synapse-react-client/utils/functions/SqlFunctions'
import type { QueryBundleRequest } from '@sage-bionetworks/synapse-types'
import type { CachedSelectColumn } from '../types/portal-config-schema'

/**
 * Hook to fetch select columns for a Synapse table query.
 * Uses BUNDLE_MASK_QUERY_SELECT_COLUMNS to get the columns from the SELECT clause.
 *
 * @param sql - The SQL query string (e.g., "SELECT * FROM syn123")
 * @returns The select columns, loading state, and error if any
 */
export function useResourceColumns(sql: string | undefined) {
  const queryBundleRequest: QueryBundleRequest | undefined = useMemo(() => {
    if (!sql || !sql.trim()) {
      return undefined
    }

    const entityId = parseEntityIdFromSqlStatement(sql)
    if (!entityId) {
      return undefined
    }

    return {
      entityId,
      concreteType: 'org.sagebionetworks.repo.model.table.QueryBundleRequest',
      // Use select columns mask (0x4) - this gets columns from the SELECT clause
      partMask: SynapseConstants.BUNDLE_MASK_QUERY_SELECT_COLUMNS,
      query: {
        sql,
        // Only need column info, not actual data
        limit: 0,
      },
    }
  }, [sql])

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

  const selectColumns: CachedSelectColumn[] = useMemo(() => {
    const columns = asyncJobStatus?.responseBody?.selectColumns
    if (!columns) {
      return []
    }
    // Map to our cached schema format
    return columns.map(col => ({
      name: col.name,
      columnType: col.columnType,
      id: col.id,
    }))
  }, [asyncJobStatus?.responseBody?.selectColumns])

  const columnNames = useMemo(() => {
    return selectColumns.map(col => col.name)
  }, [selectColumns])

  return {
    selectColumns,
    columnNames,
    isLoading,
    isSuccess,
    error: error as Error | null,
  }
}

/**
 * Validates that all configured column names exist in the available columns
 * @param configuredColumns - Array of column names used in configuration
 * @param availableColumns - Array of available column names from the query
 * @returns Object with validation results
 */
export function validateColumnNames(
  configuredColumns: (string | undefined)[],
  availableColumns: string[],
): {
  isValid: boolean
  missingColumns: string[]
} {
  const missingColumns: string[] = []

  for (const col of configuredColumns) {
    if (col && !availableColumns.includes(col)) {
      missingColumns.push(col)
    }
  }

  return {
    isValid: missingColumns.length === 0,
    missingColumns,
  }
}
