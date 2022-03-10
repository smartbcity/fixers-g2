import { ListItemProps } from '@mui/material'
import React from 'react'

export interface MenuItem<T = {}> {
  key: string
  goto?: () => void
  href?: string
  label: string
  component?: React.ElementType<any>
  icon?: JSX.Element
  componentProps?: T & ListItemProps
  isSelected?: boolean
}

export interface MenuItems<T = {}> extends MenuItem<T> {
  items?: MenuItems<T>[]
}
