import { Loading, LoadingProps } from '@smartb/g2-components'
import { useTheme } from '@smartb/g2-themes'
import { Box } from '@mui/material'
import React from 'react'

export const LoadingProviders = (props: Omit<LoadingProps, 'icon'>) => {
  const theme = useTheme()
  return (
    <Loading
      {...props}
      icon={
        theme.logoUrl ? (
          <img
            src={theme.logoUrl}
            style={{
              width: '80vw',
              maxWidth: '250px',
              maxHeight: '80vh',
              marginBottom: '20px'
            }}
            alt='The application logo'
          />
        ) : (
          <Box
            sx={{
              width: '80vw',
              maxWidth: '250px',
              height: '80vh',
              maxHeight: '250px'
            }}
          />
        )
      }
    />
  )
}
