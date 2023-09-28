import React from 'react'
import { ReactComponent } from './arrow-left.svg'
import { MergeReactElementProps } from '@smartb/g2-utils'

interface ArrowProps {
  color?: string
}

type Props = MergeReactElementProps<'svg', ArrowProps>

export const Arrow = React.forwardRef(
  (props: Props, ref: React.Ref<SVGSVGElement>) => {
    const { color = '#828282' } = props
    return <ReactComponent stroke={color} ref={ref} {...props} />
  }
)
