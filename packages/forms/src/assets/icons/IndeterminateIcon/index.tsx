import React from 'react'
import { ReactComponent } from './IndeterminateIcon.svg'
import { SvgIcon, SvgIconProps } from '@mui/material'

export const IndeterminateIcon = (props: SvgIconProps) => {
  return <SvgIcon component={ReactComponent} inheritViewBox {...props} />
}
