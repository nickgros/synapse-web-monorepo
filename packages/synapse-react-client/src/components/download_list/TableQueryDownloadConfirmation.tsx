import React, { useMemo } from 'react'
import { SynapseConstants, useSynapseContext } from '../../utils'
import {
  useAddQueryToDownloadList,
  useGetQueryResultBundleWithAsyncStatus,
} from '../../synapse-queries'
import { displayToast } from '../ToastMessage'
import { DownloadConfirmationUI } from './DownloadConfirmationUI'
import { useQueryContext } from '../QueryContext'
import { useQueryVisualizationContext } from '../QueryVisualizationWrapper'
import { displayFilesWereAddedToDownloadListSuccess } from './DownloadConfirmationUtils'
import { getPrimaryKeyINFilter } from '../../utils/functions/QueryFilterUtils'
import { getFileColumnModelId } from '../SynapseTable/SynapseTableUtils'
import { useAtomValue } from 'jotai'
import {
  hasSelectedRowsAtom,
  rowSelectionPrimaryKeyAtom,
  selectedRowsAtom,
} from '../QueryWrapper/TableRowSelectionState'
import {
  fileIdColumnNameAtom,
  fileVersionColumnNameAtom,
} from '../QueryWrapper/QueryWrapperAtoms'
import { useQuery } from '@tanstack/react-query'

export function TableQueryDownloadConfirmation() {
  const { getCurrentQueryRequest, queryMetadataQueryOptions } =
    useQueryContext()
  const { data: queryMetadata } = useQuery(queryMetadataQueryOptions)
  const hasSelectedRows = useAtomValue(hasSelectedRowsAtom)
  const selectedRows = useAtomValue(selectedRowsAtom)
  const rowSelectionPrimaryKey = useAtomValue(rowSelectionPrimaryKeyAtom)
  const { setShowDownloadConfirmation } = useQueryVisualizationContext()

  const fileIdColumnName = useAtomValue(fileIdColumnNameAtom)
  const fileVersionColumnName = useAtomValue(fileVersionColumnNameAtom)

  const queryBundleRequest = useMemo(() => {
    const requestCopy = getCurrentQueryRequest()
    requestCopy.partMask =
      SynapseConstants.BUNDLE_MASK_QUERY_COUNT |
      SynapseConstants.BUNDLE_MASK_SUM_FILES_SIZE_BYTES
    // set the query.selectFileColumn
    if (fileIdColumnName && fileVersionColumnName) {
      // find the column model ID and set the parameters
      const fileIdColumnModel = queryMetadata?.columnModels?.find(
        col => col.name == fileIdColumnName,
      )
      const fileVersionColumnModel = queryMetadata?.columnModels?.find(
        col => col.name == fileVersionColumnName,
      )

      requestCopy.query.selectFileColumn = fileIdColumnModel
        ? Number(fileIdColumnModel.id)
        : undefined
      requestCopy.query.selectFileVersionColumn = fileVersionColumnModel
        ? Number(fileVersionColumnModel.id)
        : undefined
    } else {
      const fileColumnId = getFileColumnModelId(queryMetadata?.columnModels)
      if (fileColumnId) {
        requestCopy.query.selectFileColumn = Number(fileColumnId)
      }
    }

    if (
      hasSelectedRows &&
      rowSelectionPrimaryKey &&
      queryMetadata?.selectColumns
    ) {
      const primaryKeyINFilter = getPrimaryKeyINFilter(
        rowSelectionPrimaryKey,
        selectedRows,
        queryMetadata.selectColumns,
      )
      requestCopy.query.additionalFilters = [
        ...(requestCopy.query.additionalFilters || []),
        primaryKeyINFilter,
      ]
    }
    return requestCopy
  }, [
    queryMetadata?.columnModels,
    queryMetadata?.selectColumns,
    getCurrentQueryRequest,
    hasSelectedRows,
    rowSelectionPrimaryKey,
    selectedRows,
    fileIdColumnName,
    fileVersionColumnName,
  ])

  const { downloadCartPageUrl } = useSynapseContext()

  function onClose() {
    setShowDownloadConfirmation(false)
  }

  const { mutate: addToDownloadList, isPending: isAddingToDownloadCart } =
    useAddQueryToDownloadList({
      onSuccess: () => {
        displayFilesWereAddedToDownloadListSuccess(downloadCartPageUrl)
        onClose()
      },
      onError: error => {
        displayToast(error.reason, 'danger')
        onClose()
      },
    })

  const { data: queryResultResponse, isLoading: isLoadingStats } =
    useGetQueryResultBundleWithAsyncStatus(queryBundleRequest)

  const fileCount = queryResultResponse?.responseBody?.queryCount ?? 0
  const fileSizeTotal = queryResultResponse?.responseBody?.sumFileSizes
    ?.greaterThan
    ? undefined
    : queryResultResponse?.responseBody?.sumFileSizes?.sumFileSizesBytes

  return (
    <DownloadConfirmationUI
      onAddToDownloadCart={() => {
        addToDownloadList({
          query: queryBundleRequest?.query,
          concreteType:
            'org.sagebionetworks.repo.model.download.AddToDownloadListRequest',
        })
      }}
      fileCount={fileCount}
      fileSize={fileSizeTotal}
      isAddingToDownloadCart={isAddingToDownloadCart}
      isLoadingStats={isLoadingStats}
      onCancel={onClose}
    />
  )
}
