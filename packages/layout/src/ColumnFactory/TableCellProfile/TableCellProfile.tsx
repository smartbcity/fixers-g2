import { Typography } from '@mui/material'
import { Presentation } from '@smartb/g2-components'
import React from 'react'

export interface TableCellProfileProps {
  givenName?: string
  familyName?: string
}

export const TableCellProfile = (props: TableCellProfileProps) => {
  const { familyName, givenName } = props
  if (!givenName && familyName) return <Typography>-</Typography>
  return <Presentation label={`${givenName} ${familyName}`} />
}
