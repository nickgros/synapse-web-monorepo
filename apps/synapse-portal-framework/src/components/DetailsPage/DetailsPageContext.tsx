import { QueryResultBundle, Row } from '@sage-bionetworks/synapse-types'
import { isEmpty } from 'lodash-es'
import React, { useContext } from 'react'
import { getColumnIndex } from 'synapse-react-client'

type DetailsPageContextType = {
  queryResultBundle?: QueryResultBundle
  rowData?: Row
}

export const DetailsPageContext = React.createContext({})

/*
 * Stores global state for the "Sign in" dialog in the portals
 */
export function DetailsPageContextProvider(
  props: React.PropsWithChildren<{ value: DetailsPageContextType }>,
) {
  const { value, children } = props
  return (
    <DetailsPageContext.Provider value={value}>
      {children}
    </DetailsPageContext.Provider>
  )
}

function getValue(
  context: DetailsPageContextType,
  columnName: string | undefined,
) {
  let value: string | null | undefined = undefined
  if (context.queryResultBundle && context.rowData && columnName) {
    const columnIndex = getColumnIndex(
      columnName,
      context.queryResultBundle.selectColumns,
      undefined,
    )

    if (columnIndex != null) {
      const columnModel = context.queryResultBundle.selectColumns![columnIndex]
      value = context.rowData.values[columnIndex]
      // Note: searchParams expects comma-separated values
      // TODO: The downstream component has no idea if this is going to be comma-separated or not

      if (columnModel.columnType.endsWith('_LIST') && !isEmpty(value)) {
        value = (JSON.parse(value!) as string[]).join(',')
      }
    }
  }
  return value
}

export function useDetailsPageContext(columnName?: string): {
  context: DetailsPageContextType
  value: string | null | undefined
} {
  const context = useContext(DetailsPageContext)

  if (context === undefined) {
    throw new Error(
      'DetailsPageContext must be used within an DetailsPageContextProvider',
    )
  }

  return { context, value: getValue(context, columnName) }
}

type DetailsPageContextConsumerProps = {
  children: (value: {
    context: DetailsPageContextType
    value?: string | null
  }) => React.ReactNode
  columnName?: string
}

export function DetailsPageContextConsumer(
  props: DetailsPageContextConsumerProps,
) {
  const { columnName, children } = props
  return (
    <DetailsPageContext.Consumer>
      {(context: DetailsPageContextType) => {
        const value = getValue(context, columnName)
        console.log(context, value)
        return children({ context, value })
      }}
    </DetailsPageContext.Consumer>
  )
}
