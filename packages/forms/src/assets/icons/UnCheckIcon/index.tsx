import React from 'react'
import ReactComponent from './unCheckIcon.svg'
import { SvgIcon, SvgIconProps } from '@mui/material'

export const UnCheckIcon = (props: SvgIconProps) => {
  return <SvgIcon component={ReactComponent} inheritViewBox {...props} />
}
