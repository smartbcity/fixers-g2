import React from 'react'
import ReactComponent from './Edit.svg'
import { MergeReactElementProps } from '@smartb/g2-utils'

interface EditProps {
  color?: string
}

type Props = MergeReactElementProps<'svg', EditProps>

export const Edit = React.forwardRef(
  (props: Props, ref: React.Ref<SVGSVGElement>) => {
    const { color = '#9a9a9a' } = props
    return <ReactComponent stroke={color} ref={ref} {...props} />
  }
)
