import {
  createBrowserRouter,
  Outlet,
  RouteObject,
  RouterProvider,
  Routes,
} from 'react-router-dom'
import React from 'react'
import './App.scss'
import Footer from './Footer'
import AppInitializer from './AppInitializer'
import Navbar from './Navbar'
import { CookiesProvider } from 'react-cookie'
import {
  CookiesNotification,
  defaultQueryClientConfig,
  SynapseTheme,
  SynapseToastContainer,
} from 'synapse-react-client'
import { LogInDialogContextProvider } from './LogInDialogContext'
import { createTheme, ThemeProvider } from '@mui/material'
import palette from './config/paletteConfig'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import routesConfig from './config/routesConfig'
import sharedRouteConfig from './shared-config/sharedRoutes'

const theme = createTheme(SynapseTheme.mergeTheme({ palette }))
const queryClient = new QueryClient(defaultQueryClientConfig)

const routes: RouteObject[] = [
  {
    Component: Root,
    children: routesConfig,
  },
]
console.log(routes)

const router = createBrowserRouter(routes)

function Root() {
  return (
    <>
      <CookiesProvider>
        <LogInDialogContextProvider>
          <ThemeProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
              <AppInitializer>
                <SynapseToastContainer />
                <Navbar />
                <CookiesNotification />
                <main className="main">
                  <Outlet />
                </main>
                <Footer />
              </AppInitializer>
            </QueryClientProvider>
          </ThemeProvider>
        </LogInDialogContextProvider>
      </CookiesProvider>
    </>
  )
}

function App() {
  return <RouterProvider router={router} />
}

export default App
