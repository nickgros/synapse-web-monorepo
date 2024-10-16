import * as React from 'react'
import { hydrateRoot } from 'react-dom/client'
import { HydratedRouter } from 'react-router/dom'
import routes from './routes'

hydrateRoot(
  document,
  <React.StrictMode>
    <HydratedRouter routes={routes} />
  </React.StrictMode>,
)
