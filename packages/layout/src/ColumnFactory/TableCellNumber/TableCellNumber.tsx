import { Typography } from '@mui/material'
import { formatNumber } from '@smartb/g2-utils'
import React from 'react'

export interface TableCellNumberProps {
  value?: number
  isCurrency?: boolean
  language?: string
  fractionDigits?: number
}

export const TableCellNumber = (props: TableCellNumberProps) => {
  const {
    value,
    isCurrency = false,
    language = 'fr',
    fractionDigits = 2
  } = props
  const number = !value
    ? '-'
    : formatNumber(value, language, fractionDigits, isCurrency)
  return <Typography>{number}</Typography>
}
