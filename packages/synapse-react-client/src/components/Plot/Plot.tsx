import { lazy } from 'react'
import { PlotParams } from 'react-plotly.js'

const Plot: React.ComponentType<PlotParams> = lazy(async () => {
  const plotlyModule = await import('plotly.js-basic-dist')
  const reactPlotlyFactoryModule = await import('react-plotly.js/factory')

  let createPlotlyComponent = reactPlotlyFactoryModule.default

  return { default: createPlotlyComponent(plotlyModule) }
})

export default Plot
