import { Loading } from '@smartb/g2-components'
import { useTheme } from '@smartb/g2-themes'
import { Box } from '@mui/material'
import React from 'react'

export const LoadingProviders = () => {
  const theme = useTheme()
  return (
    <Loading
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
