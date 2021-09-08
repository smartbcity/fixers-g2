import React from 'react'
import { ReactComponent } from './select.svg'
import { MergeReactElementProps } from '@smartb/g2-themes'

interface SelectIconProps {
  color?: string
}

type Props = MergeReactElementProps<'svg', SelectIconProps>

export const SelectIcon = React.forwardRef(
  (props: Props, ref: React.Ref<SVGSVGElement>) => {
    const { color = '#FFFFFF' } = props
    return <ReactComponent stroke={color} fill='none' ref={ref} {...props} />
  }
)
