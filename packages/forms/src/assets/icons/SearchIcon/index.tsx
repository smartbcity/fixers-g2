import React from 'react'
import { ReactComponent } from './search-icon.svg'
import { MergeReactElementProps } from '@smartb/g2-utils'

interface SearchIconProps {
  color?: string
}

type Props = MergeReactElementProps<'svg', SearchIconProps>

export const SearchIcon = React.forwardRef(
  (props: Props, ref: React.Ref<SVGSVGElement>) => {
    const { color = '#FFFFFF' } = props
    return <ReactComponent fill={color} ref={ref} {...props} />
  }
)
