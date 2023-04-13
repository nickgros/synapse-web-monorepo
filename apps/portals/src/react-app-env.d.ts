/// <reference types="react-scripts" />
declare var pluralize: any

declare module 'plotly.js-basic-dist' {
  import PlotlyTyped from 'plotly.js'
  export default PlotlyTyped
}

declare module '*.svg' {
  import * as React from 'react'

  export const ReactComponent: React.ComponentType<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >
  export default string
}

declare module '*.png' {
  export default string
}
