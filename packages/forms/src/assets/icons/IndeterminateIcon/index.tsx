import React from 'react'
import { ReactComponent } from './IndeterminateIcon.svg'
import { MergeReactElementProps } from '@smartb/g2-themes'

interface IndeterminateIconProps {}

type Props = MergeReactElementProps<'svg', IndeterminateIconProps>

export const IndeterminateIcon = React.forwardRef(
  (props: Props, ref: React.Ref<SVGSVGElement>) => {
    return <ReactComponent ref={ref} {...props} />
  }
)
