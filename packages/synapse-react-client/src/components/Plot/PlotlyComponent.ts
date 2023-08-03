import { lazy } from 'react'
import Plotly from 'plotly.js-basic-dist'

const PlotlyComponent = lazy(async () => {
  const createPlotlyComponent = (await import('react-plotly.js/factory'))
    .default
  return { default: createPlotlyComponent(Plotly) }
})

export default PlotlyComponent
