import { Typography } from '@mui/material'
import { Presentation } from '@smartb/g2-components'
import React from 'react'

export interface TableCellProfileProps {
  value?: {
    givenName?: string
    familyName?: string
  }
}

export const TableCellProfile = (props: TableCellProfileProps) => {
  const { value } = props
  if (!value?.givenName && !value?.familyName) return <Typography>-</Typography>
  return <Presentation label={`${value?.givenName} ${value?.familyName}`} />
}
