import React from 'react'
import ReactComponent from './calendar.svg'
import { SvgIcon, SvgIconProps } from '@mui/material'

export const Calendar = (props: SvgIconProps) => {
  const { sx, ...other } = props
  return (
    <SvgIcon
      sx={{
        color: '#353945',
        ...sx
      }}
      component={ReactComponent}
      inheritViewBox
      {...other}
    />
  )
}
