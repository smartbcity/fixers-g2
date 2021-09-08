import React from 'react'
import { ReactComponent } from './checkIcon.svg'
import { MergeReactElementProps } from '@smartb/g2-themes'

interface CheckIconProps {
}

type Props = MergeReactElementProps<'svg', CheckIconProps>

export const CheckIcon = React.forwardRef(
  (props: Props, ref: React.Ref<SVGSVGElement>) => {
    return <ReactComponent ref={ref} {...props} />
  }
)
