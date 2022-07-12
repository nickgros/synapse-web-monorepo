import * as React from 'react'
import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon'

const DatasetCollection = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props}>
      <rect
        opacity="0.3"
        x="6.78241"
        y="2.90228"
        width="14.0782"
        height="14.1589"
        fill={props.fill}
      />
      <path
        d="M7.16665 18C6.81109 18 6.49998 17.8667 6.23331 17.6C5.96665 17.3333 5.83331 17.0222 5.83331 16.6667V3.33333C5.83331 2.97778 5.96665 2.66667 6.23331 2.4C6.49998 2.13333 6.81109 2 7.16665 2H20.5C20.8555 2 21.1666 2.13333 21.4333 2.4C21.7 2.66667 21.8333 2.97778 21.8333 3.33333V16.6667C21.8333 17.0222 21.7 17.3333 21.4333 17.6C21.1666 17.8667 20.8555 18 20.5 18H7.16665ZM7.99998 16H20V4H7.99998V16ZM9.61109 8.88889H12.7222V5.77778H9.61109V8.88889ZM14.9444 8.88889H18.0555V5.77778H14.9444V8.88889ZM9.61109 14.2222H12.7222V11.1111H9.61109V14.2222ZM14.9444 14.2222H18.0555V11.1111H14.9444V14.2222Z"
        fill={props.fill}
      />
      <path
        d="M1.83331 20C1.83331 21.1 2.72403 22 3.81269 22H17.8333V20H3.81269V6H1.83331V20Z"
        fill={props.fill}
      />
    </SvgIcon>
  )
}

export default DatasetCollection
