import { Skeleton, Stack, Typography } from '@mui/material'
import React from 'react'

export const ElevatedLoading = () => {
  return (
    <Stack
      sx={{
        width: '100%'
      }}
      alignItems='center'
    >
      <Stack
        direction='row'
        spacing={3}
        justifyContent='space-between'
        sx={{
          padding: '10px',
          width: '100%',
          boxSizing: 'border-box'
        }}
      >
        <Typography sx={{ width: '100px' }} variant='h6'>
          <Skeleton animation='wave' />
        </Typography>
        <Typography sx={{ width: '100px' }} variant='h6'>
          <Skeleton animation='wave' />
        </Typography>
        <Typography sx={{ width: '100px' }} variant='h6'>
          <Skeleton animation='wave' />
        </Typography>
        <Typography sx={{ width: '100px' }} variant='h6'>
          <Skeleton animation='wave' />
        </Typography>
      </Stack>
      <Skeleton
        animation='wave'
        variant='rectangular'
        sx={{
          height: '42px',
          width: '100%',
          margin: '10px 0',
          borderRadius: '4px'
        }}
      />
      <Skeleton
        animation='wave'
        variant='rectangular'
        sx={{
          height: '42px',
          width: '100%',
          margin: '10px 0',
          borderRadius: '4px'
        }}
      />
      <Skeleton
        animation='wave'
        variant='rectangular'
        sx={{
          height: '42px',
          width: '100%',
          margin: '10px 0',
          borderRadius: '4px'
        }}
      />
      <Skeleton
        animation='wave'
        variant='rectangular'
        sx={{
          height: '42px',
          width: '100%',
          margin: '10px 0',
          borderRadius: '4px'
        }}
      />
    </Stack>
  )
}
