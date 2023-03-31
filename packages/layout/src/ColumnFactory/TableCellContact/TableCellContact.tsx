import { IconButton, Stack, Typography } from '@mui/material'
import { Tooltip } from '@smartb/g2-notifications'
import { LocalPhoneRounded, MailRounded } from '@mui/icons-material'
import React from 'react'
import { stopPropagation } from '../TableCellLink/TableCellLink'

export interface TableCellContactProps {
  phone?: string
  email?: string
}

export const TableCellContact = (props: TableCellContactProps) => {
  const { email, phone } = props
  if (!email && !phone) return <Typography>-</Typography>
  return (
    <Stack
      direction='row'
      sx={{
        gap: '5px'
      }}
    >
      {email && (
        <Tooltip helperText={email}>
          <IconButton onClick={stopPropagation} href={'mailto:' + email}>
            <MailRounded />
          </IconButton>
        </Tooltip>
      )}
      {phone && (
        <Tooltip helperText={phone}>
          <IconButton onClick={stopPropagation} href={'tel:' + phone}>
            <LocalPhoneRounded />
          </IconButton>
        </Tooltip>
      )}
    </Stack>
  )
}
