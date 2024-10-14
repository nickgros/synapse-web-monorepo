import React, { PropsWithChildren } from 'react'
import { Outlet } from 'react-router-dom'
import {
  CookiesNotification,
  SynapseToastContainer,
} from 'synapse-react-client'
import AppInitializer from './components/AppInitializer'
import Footer from './components/Footer'
import Navbar from './components/Navbar'

export default function App(props: PropsWithChildren) {
  return (
    <AppInitializer>
      <SynapseToastContainer />
      <Navbar />
      <CookiesNotification />
      <main className="main">
        {props.children}
        <Outlet />
      </main>
      <Footer />
    </AppInitializer>
  )
}
