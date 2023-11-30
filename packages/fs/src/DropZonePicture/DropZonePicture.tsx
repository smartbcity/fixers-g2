import React from 'react'
import { Box, InputLabel } from '@mui/material'
import { cx } from '@emotion/css'
import { DropPicture, DropPictureProps } from '@smartb/g2-components'

// TODO Need to be reviewed
export const DropZonePicture = (drop: Partial<DropPictureProps>) => {
  return (
    <Box
      className={cx('AruiOrgFactory-dropPictureBox')}
      sx={{
        margin: '20px 0',
        marginBottom: '23px',
        '& .AruiDropzone-root': {
          width: '260px',
          height: '260px'
        }
      }}
    >
      <InputLabel
        sx={{
          marginBottom: '15px',
          fontSize: 16,
          color: '#323338'
        }}
      >
        Image
      </InputLabel>
      <DropPicture {...drop} styles={{ image: { objectFit: 'contain' } }} />
    </Box>
  )
}
