import * as SynapseComponents from './components'
import { displayToast } from './components'
import * as SynapseTheme from './theme'
import Palettes from './theme/palette/Palettes'
import {
  SynapseClientError,
  SynapseConstants,
  SynapseUtilityFunctions,
} from './utils'
import {
  SynapseContextConsumer,
  SynapseContextProvider,
  useSynapseContext,
} from './context'
import FullContextProvider, {
  defaultQueryClientConfig,
} from './context/FullContextProvider'
import * as AppUtils from './utils/AppUtils'
import * as RegularExpressions from './utils/functions/RegularExpressions'
import SynapseClient, { HttpClient } from './synapse-client'
import * as SynapseQueries from './synapse-queries'

export * from './components'
export * from './utils'

const SynapseContextUtils = {
  SynapseContextProvider,
  SynapseContextConsumer,
  useSynapseContext,
  FullContextProvider,
  defaultQueryClientConfig,
}

export {
  HttpClient,
  SynapseClient,
  SynapseClientError,
  SynapseConstants,
  SynapseComponents,
  SynapseContextUtils,
  SynapseTheme,
  SynapseQueries,
  SynapseUtilityFunctions,
  Palettes,
  AppUtils,
  RegularExpressions,
  displayToast,
}
