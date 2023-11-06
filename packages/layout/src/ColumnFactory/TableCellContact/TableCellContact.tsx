import { IconButton, Stack, Typography } from '@mui/material'
import { Tooltip } from '@smartb/g2-notifications'
import { LocalPhoneRounded, MailRounded } from '@mui/icons-material'
import React from 'react'
import { stopPropagation } from '../TableCellLink/TableCellLink'

export interface TableCellContactProps {
  value?: {
    phone?: string
    email?: string
  }
}

export const TableCellContact = (props: TableCellContactProps) => {
  const { value } = props
  if (!value?.email && !value?.phone) return <Typography>-</Typography>
  return (
    <Stack
      direction='row'
      sx={{
        gap: '5px'
      }}
    >
      {value?.email && (
        <Tooltip helperText={value?.email}>
          <IconButton onClick={stopPropagation} href={'mailto:' + value?.email}>
            <MailRounded />
          </IconButton>
        </Tooltip>
      )}
      {value?.phone && (
        <Tooltip helperText={value?.phone}>
          <IconButton onClick={stopPropagation} href={'tel:' + value?.phone}>
            <LocalPhoneRounded />
          </IconButton>
        </Tooltip>
      )}
    </Stack>
  )
}
