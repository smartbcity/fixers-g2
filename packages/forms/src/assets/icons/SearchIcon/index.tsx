import React from 'react'
import { ReactComponent } from './search-icon.svg'
import { SvgIcon, SvgIconProps } from '@mui/material'

export const SearchIcon = (props: SvgIconProps) => {
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
