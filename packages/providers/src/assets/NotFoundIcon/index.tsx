import React from 'react'
import ReactComponent from './404.svg'

export const NotFoundIcon = React.forwardRef(
  (
    props: React.ComponentPropsWithRef<'svg'>,
    ref: React.Ref<SVGSVGElement>
  ) => {
    return <ReactComponent ref={ref} {...props} />
  }
)
