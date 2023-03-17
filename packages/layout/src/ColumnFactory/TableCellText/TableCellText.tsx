import { Typography } from '@mui/material'
import React from 'react'

export interface TableCellTextProps {
  value?: string
}

export const TableCellText = (props: TableCellTextProps) => {
  const { value } = props
  const text = !value?.trim()?.length ?? 0 ? '-' : value
  return <Typography>{text}</Typography>
}
