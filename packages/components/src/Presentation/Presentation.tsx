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
   * The src of the image for the presentation. If not provided, the `UserAvatar` will be used.
   */
  imgSrc?: string
  /**
   * Indicates whether the avatar is active or not.
   * @default true
   */
  displayAvatar?: boolean
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
  const {
    label,
    subLabel,
    imgSrc,
    sx,
    description,
    displayAvatar = true,
    ...other
  } = props
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
              borderRadius: (theme) =>
                `${Number(theme.shape.borderRadius) / 2}px`
            }
          }}
        >
          <img src={imgSrc} alt={description} className='presentationImage' />
        </Box>
      ) : (
        displayAvatar && <UserAvatar name={label} aria-label={description} />
      )}
      <Stack>
        <Typography align='left' variant='subtitle2'>
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
