import React from 'react'
import { NavLink, Route, Routes, useLocation, useMatch } from 'react-router-dom'
import { BarLoader } from 'react-spinners'
import { QueryResultBundle } from '@sage-bionetworks/synapse-types'
import { Tooltip } from '@mui/material'
import { DetailsPageTabProps } from '../../types/portal-util-types'
import RedirectWithQuery from '../RedirectWithQuery'
import { DetailsPageSynapseConfigArray } from './DetailsPage'
import { SynapseComponents } from 'synapse-react-client'

export type DetailsPageTabsProps = {
  tabConfigs: DetailsPageTabProps[]
  loading: boolean
  showMenu: boolean
  queryResultBundle?: QueryResultBundle
}

const DetailsPageTabs: React.FunctionComponent<DetailsPageTabsProps> = (
  props,
) => {
  const { tabConfigs, loading, queryResultBundle, showMenu } = props
  const match = useMatch('*')
  const rowValues = queryResultBundle?.queryResult?.queryResults.rows[0].values
  const headers = queryResultBundle?.queryResult?.queryResults.headers
  const { search } = useLocation()

  if (!match) {
    return <></>
  }

  const urlWithTrailingSlash = `${match.pathname}${
    match.pathname.endsWith('/') ? '' : '/'
  }`
  return (
    <>
      <Routes>
        <RedirectWithQuery
          // exact={true}
          // from={urlWithTrailingSlash}
          to={`${urlWithTrailingSlash}${tabConfigs[0].uriValue}`}
        />
      </Routes>
      <div className="tab-groups">
        {tabConfigs.map((tab, index) => {
          if (tab.hideIfColumnValueNull) {
            if (rowValues && headers) {
              const colIndex = headers.findIndex(
                (h) => h.name == tab.hideIfColumnValueNull,
              )
              if (!rowValues[colIndex]) {
                return <></>
              }
            } else {
              return <></>
            }
          }
          return (
            <Tooltip
              key={tab.uriValue}
              title={tab.toolTip ?? ''}
              placement="top"
            >
              <NavLink
                to={`${urlWithTrailingSlash}${tab.uriValue + search}`}
                key={`detailPage-tab-${index}`}
                className={'tab-item ignoreLink'}
                aria-current="true"
              >
                {tab.iconName && (
                  <SynapseComponents.Icon
                    type={tab.iconName}
                  ></SynapseComponents.Icon>
                )}
                {tab.title}
              </NavLink>
            </Tooltip>
          )
        })}
      </div>
      {loading ? (
        <BarLoader color="#878787" loading={true} height={5} />
      ) : (
        <div className="tab-content-group">
          <div className="tab-content">
            <Routes>
              {tabConfigs.map((tabConfig, index) => {
                return (
                  <Route
                    key={tabConfig.uriValue}
                    path={`${urlWithTrailingSlash}${tabConfig.uriValue}`}
                  >
                    {'tabLayout' in tabConfig && tabConfig.tabLayout && (
                      <DetailsPageTabs
                        tabConfigs={tabConfig.tabLayout}
                        loading={loading}
                        queryResultBundle={queryResultBundle}
                        showMenu={showMenu}
                      ></DetailsPageTabs>
                    )}
                    {'synapseConfigArray' in tabConfig &&
                      tabConfig.synapseConfigArray && (
                        <DetailsPageSynapseConfigArray
                          showMenu={showMenu}
                          synapseConfigArray={tabConfig.synapseConfigArray}
                          queryResultBundle={queryResultBundle}
                        />
                      )}
                  </Route>
                )
              })}
            </Routes>
          </div>
        </div>
      )}
    </>
  )
}

export default DetailsPageTabs
