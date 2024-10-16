import React, { lazy, PropsWithChildren, Suspense } from 'react'
import { Outlet } from 'react-router'
import {
  CookiesNotification,
  SynapseToastContainer,
} from 'synapse-react-client'
import AppInitializer from './components/AppInitializer'
import Footer from './components/Footer'

let Navbar = lazy(async () => {
  const module = await import('./components/navbar/Navbar')

  return { default: module.default }
})

export default function App(props: PropsWithChildren) {
  return (
    <AppInitializer>
      <Suspense>
        <SynapseToastContainer />
        <Navbar />
        <CookiesNotification />
        <main className="main">
          <Suspense>
            {props.children}
            <Outlet />
          </Suspense>
        </main>
        <Footer />
      </Suspense>
    </AppInitializer>
  )
}
