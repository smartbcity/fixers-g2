import React, { useMemo } from 'react'
import { Box, Stack, StackProps, Typography } from '@mui/material'
import { Option, SmartKey } from '@smartb/g2-forms'

export interface TableCellIconTagProps extends StackProps {
  value?: SmartKey
  options?: { icon?: React.ReactNode | string } & Option[]
  size?: 'small' | 'large' | 'medium'
}

export const TableCellIconTag = (props: TableCellIconTagProps) => {
  const { value, options, size = 'small', ...other } = props

  const selected = useMemo(
    () => options?.find((option) => option.key === value),
    [options, value]
  )
  return (
    <Stack gap={1} direction='row' alignItems='center' {...other}>
      <Box
        sx={{
          background: selected?.color ?? '#FAF8F3',
          borderRadius: '50%',
          padding:
            size === 'small' ? '7px' : size === 'medium' ? '9px' : '11px',
          display: 'flex'
        }}
      >
        {typeof selected?.icon === 'string' ? (
          <img
            src={selected?.icon}
            style={{
              width:
                size === 'small' ? '20px' : size === 'medium' ? '24px' : '35px',
              height:
                size === 'small' ? '20px' : size === 'medium' ? '24px' : '35px'
            }}
          />
        ) : (
          selected?.icon
        )}
      </Box>
      <Typography variant='body2'>{selected?.label}</Typography>
    </Stack>
  )
}
