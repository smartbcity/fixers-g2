import { Typography } from '@mui/material'
import React from 'react'

export interface TableCellDateProps {
  date?: number
}

export const TableCellDate = (props: TableCellDateProps) => {
  const { date } = props
  if (!date) return <Typography>-</Typography>
  const dateString = new Date(date).toLocaleDateString()
  return <Typography>{dateString}</Typography>
}
