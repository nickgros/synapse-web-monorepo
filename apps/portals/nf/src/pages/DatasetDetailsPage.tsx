import {
  DetailsPage,
  DetailsPageContent,
  DetailsPageContextConsumer,
  useGetPortalComponentSearchParams,
} from '@sage-bionetworks/synapse-portal-framework'
import { ColumnSingleValueFilterOperator } from '@sage-bionetworks/synapse-types'
import React from 'react'
import { datasetsSql } from '../config/resources'
import { columnAliases } from '../config/synapseConfigs/commonProps'
import {
  datasetCardConfiguration,
  datasetsRgbIndex,
} from '../config/synapseConfigs/datasets'
import {
  CardContainerLogic,
  DatasetJsonLdScript,
  ErrorPage,
  QueryWrapperPlotNav,
  SynapseErrorType,
} from 'synapse-react-client'

export default function DatasetDetailsPage() {
  const { id } = useGetPortalComponentSearchParams()

  if (!id) {
    return <ErrorPage type={SynapseErrorType.NOT_FOUND} gotoPlace={() => {}} />
  }

  return (
    <>
      <CardContainerLogic
        {...datasetCardConfiguration}
        sql={datasetsSql}
        isHeader
        columnAliases={columnAliases}
        searchParams={{ id }}
      />
      <DetailsPage
        sql={datasetsSql}
        sqlOperator={ColumnSingleValueFilterOperator.EQUAL}
        ContainerProps={{
          maxWidth: 'xl',
        }}
      >
        <DetailsPageContent
          content={[
            // {
            //   name: 'Markdown',
            //   columnName: 'datasetDescription',
            //   title: 'Description',
            //   props: {},
            // },
            // {
            //   name: 'Markdown',
            //   columnName: 'acknowledgmentStatement',
            //   title: 'Acknowledgment',
            //   props: {},
            // },
            {
              id: 'DatasetJsonLdScript',
              element: <DatasetJsonLdScript entityId={id} />,
            },
            {
              id: 'Files',
              element: (
                <DetailsPageContextConsumer>
                  {({ context }) => (
                    <QueryWrapperPlotNav
                      rgbIndex={datasetsRgbIndex}
                      sql={`SELECT * FROM ${id}${
                        context.rowData?.versionNumber
                          ? `.${context.rowData.versionNumber}`
                          : ''
                      }`}
                      visibleColumnCount={7}
                      tableConfiguration={{
                        showAccessColumn: true,
                        showDownloadColumn: true,
                      }}
                      shouldDeepLink={false}
                      columnAliases={columnAliases}
                      defaultShowPlots={false}
                      showExportToCavatica={true}
                      isRowSelectionVisible={true}
                      rowSelectionPrimaryKey={['id']}
                      fileIdColumnName="id"
                      fileNameColumnName="name"
                      fileVersionColumnName="currentVersion"
                    />
                  )}
                </DetailsPageContextConsumer>
              ),
            },
          ]}
        />
      </DetailsPage>
    </>
  )
}
