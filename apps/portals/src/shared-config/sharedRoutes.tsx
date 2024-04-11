import React from 'react'
import { RouteObject } from 'react-router-dom'
import Header from '../portal-components/Header'
import RedirectWithQuery from '../portal-components/RedirectWithQuery'
import { DownloadCartPage } from 'synapse-react-client'

export const homeRoute: RouteObject = {
  path: '',
  // hideRouteFromNavbar: true,
  element: <Header />,
  // synapseConfigArray: [
  //   {
  //     name: 'Header',
  //     props: undefined,
  //     isOutsideContainer: true,
  //   },
  // ],
}

// Handles redirecting '/Home' to '/'
export const homeRedirectRoute: RouteObject = {
  path: '/Home',
  // hideRouteFromNavbar: true,
  element: <RedirectWithQuery to={'/'} />,
}

export const downloadCartRoute: RouteObject = {
  path: '/DownloadCart',
  // hideRouteFromNavbar: true,
  // displayName: 'Download Cart',
  element: (
    <DownloadCartPage
      onViewSharingSettingsClicked={(benefactorEntityId) => {
        window.open(
          `https://www.synapse.org/#!Synapse:${benefactorEntityId}`,
          '_blank',
        )
      }}
    />
  ),
  // synapseConfigArray: [
  //   {
  //     name: 'DownloadCartPage',
  //     props: {
  //
  //     },
  //     isOutsideContainer: true,
  //   },
  // ],
}

const routes: RouteObject[] = [homeRoute, homeRedirectRoute, downloadCartRoute]

export default routes
