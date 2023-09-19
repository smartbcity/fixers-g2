import React from 'react'
import { ReactComponent } from './checkIcon.svg'
import { SvgIcon, SvgIconProps } from '@mui/material'

export const CheckIcon = (props: SvgIconProps) => {
  return <SvgIcon component={ReactComponent} inheritViewBox {...props} />
}
