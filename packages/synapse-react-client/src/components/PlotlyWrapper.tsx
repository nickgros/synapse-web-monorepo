import type Plotly from 'plotly.js-basic-dist'
import React from 'react'
import Plot from './Plot/Plot'

export type PlotlyWrapperProps = {
  data: Plotly.Data[]
  layout?: Partial<Plotly.Layout>
  config?: Partial<Plotly.Config>
  useResizeHandler?: boolean
  className?: string
  containerWidth?: number
  plotStyle?: React.CSSProperties
}

const PlotlyWrapper: React.FC<PlotlyWrapperProps> = props => {
  const {
    data,
    layout,
    config,
    className,
    containerWidth,
    useResizeHandler,
    plotStyle,
  } = props
  const hasData = !!(data && data.length)

  return (
    <div className={className}>
      {!hasData && (
        <>
          <div className={'chart-nodata'} style={{ width: containerWidth }}>
            <span>Data Unavailable</span>
          </div>
        </>
      )}
      {hasData && (
        <Plot
          data={data}
          layout={layout ?? {}}
          config={config}
          useResizeHandler={useResizeHandler}
          style={plotStyle}
        />
      )}
    </div>
  )
}

export default PlotlyWrapper
