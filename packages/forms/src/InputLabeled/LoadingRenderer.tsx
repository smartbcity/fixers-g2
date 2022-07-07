import { Skeleton } from '@mui/material'
import React from 'react'
import { InputLabeledProps } from './InputLabeled'

export const LoadingRenderer = (props: Partial<InputLabeledProps>) => {
  const { inputType, size = 'medium' } = props

  return inputType === 'radioChoices' ? (
    <Skeleton
      sx={{
        width: '150px',
        height: '100px',
        transform: 'none'
      }}
      animation='wave'
    />
  ) : (
    <Skeleton
      sx={{
        width: '100%',
        height: size === 'small' ? '32px' : size === 'medium' ? '40px' : '48px',
        transform: 'none'
      }}
      animation='wave'
    />
  )
}
