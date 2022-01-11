import React from 'react'
import { ReactComponent } from './RoundedArrow.svg'
import { MergeReactElementProps } from '@smartb/g2-themes'

interface RoundedArrowProps {
  color?: string
}

type Props = MergeReactElementProps<'svg', RoundedArrowProps>

export const RoundedArrow = React.forwardRef(
  (props: Props, ref: React.Ref<SVGSVGElement>) => {
    const { color = '#828282' } = props
    return <ReactComponent fill={color} ref={ref} {...props} />
  }
)
