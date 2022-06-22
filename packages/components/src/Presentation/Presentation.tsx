import { Box, Stack, StackProps, Typography } from '@mui/material'
import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'
import React from 'react'
import { UserAvatar } from '../UserAvatar'

export interface PresentationBasicProps extends BasicProps {
  /**
   * The label of the presentation.
   */
  label: string
  /**
   * The subLabel of the presentation.
   */
  subLabel?: string
  /**
   * The src of the image for the presentation. If not provided, the `Presentation` will be used.
   */
  imgSrc?: string
  /**
   * The presentation description used for the `alt` attribute of the image. And the aria-label of the `Presentation`.
   */
  description?: string
}

export type PresentationProps = MergeMuiElementProps<
  StackProps,
  PresentationBasicProps
>

export const Presentation = (props: PresentationProps) => {
  const { label, subLabel, imgSrc, sx, description, ...other } = props
  return (
    <Stack
      display='flex'
      justifyContent='flex-start'
      alignItems='center'
      direction='row'
      sx={{
        gap: '8px',
        ...sx
      }}
      {...other}
    >
      {imgSrc ? (
        <Box
          sx={{
            display: 'flex',

            '& .presentationImage': {
              width: '50px',
              borderRadius: '5px'
            }
          }}
        >
          <img src={imgSrc} alt={description} className='presentationImage' />
        </Box>
      ) : (
        <UserAvatar name={label} aria-label={description} />
      )}
      <Stack>
        <Typography align='left' variant='body2'>
          {label}
        </Typography>
        {subLabel && (
          <Typography sx={{ color: '#9E9E9E' }} align='left' variant='caption'>
            {subLabel}
          </Typography>
        )}
      </Stack>
    </Stack>
  )
}
