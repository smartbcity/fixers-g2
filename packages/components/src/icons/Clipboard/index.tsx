import React from 'react'
import ReactComponent from './clipboard-icon.svg'
import { MergeReactElementProps } from '@smartb/g2-utils'
import { useTheme } from '@smartb/g2-themes'

interface ClipboardBasicProps {
  color?: string
}

type ClipboardProps = MergeReactElementProps<'svg', ClipboardBasicProps>

export const Clipboard = React.forwardRef(
  (props: ClipboardProps, ref: React.Ref<SVGSVGElement>) => {
    const theme = useTheme()
    const { color = theme.colors.secondary, ...other } = props
    return <ReactComponent fill={color} ref={ref} {...other} />
  }
)
