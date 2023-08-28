import React from 'react'
import { ReactComponent } from './select.svg'
import { SvgIcon, SvgIconProps } from '@mui/material'

export const SelectIcon = (props: SvgIconProps) => {
  const { sx, ...other } = props
  return (
    <SvgIcon
      sx={{
        color: '#FFFFFF',
        ...sx
      }}
      component={ReactComponent}
      inheritViewBox
      {...other}
    />
  )
}
