import React from 'react'
import { ReactComponent } from './calendar.svg'
import { MergeReactElementProps } from '@smartb/g2-themes'

interface CalendarProps {
  color?: string
}

type Props = MergeReactElementProps<'svg', CalendarProps>

export const Calendar = React.forwardRef(
  (props: Props, ref: React.Ref<SVGSVGElement>) => {
    const {color = "#353945"} = props
    return <ReactComponent stroke={color} ref={ref} {...props} />
  }
)
