import { Link as G2Link } from '@smartb/g2-components'
import { Link } from 'react-router-dom'
import React from 'react'
import { Typography } from '@mui/material'

export interface TableCellLinkProps {
  value?: string
  target?: React.HTMLAttributeAnchorTarget
  label?: string
}

export const stopPropagation = (e: any) => e.stopPropagation()

export const TableCellLink = (props: TableCellLinkProps) => {
  const { value, label, target = '_blank' } = props
  if (!label) return <Typography>-</Typography>
  return (
    <G2Link
      component={Link}
      componentProps={{ to: value }}
      onClick={stopPropagation}
      rel='noopener'
      target={target}
      color='#697077'
    >
      {label}
    </G2Link>
  )
}
