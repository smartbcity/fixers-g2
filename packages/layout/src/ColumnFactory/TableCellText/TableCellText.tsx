import { Typography, TypographyProps } from '@mui/material'
import React from 'react'

export interface TableCellTextProps {
  value?: string
  componentProps?: TypographyProps
}

export const TableCellText = (props: TableCellTextProps) => {
  const { value, componentProps } = props
  const text = !value?.trim()?.length ?? 0 ? '-' : value
  return (
    <Typography
      {...componentProps}
      sx={{
        WebkitLineClamp: 2,
        lineClamp: '2',
        display: 'box',
        //@ts-ignore
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        ...componentProps?.sx
      }}
    >
      {text}
    </Typography>
  )
}
