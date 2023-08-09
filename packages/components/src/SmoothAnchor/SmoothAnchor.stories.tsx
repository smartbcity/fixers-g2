import React from 'react'
import {
  SmoothAnchor as AruiSmoothAnchor,
  SmoothAnchorBasicProps
} from './SmoothAnchor'
import { Meta, StoryFn } from '@storybook/react'
import { Box, Typography } from '@mui/material'
import { Link } from '../Link'
import { BrowserRouter } from 'react-router-dom'

export default {
  title: 'Components/SmoothAnchor',
  component: AruiSmoothAnchor
} as Meta

export const SmoothAnchor: StoryFn<SmoothAnchorBasicProps> = () => {
  return (
    <Box display='flex' width='100%' height='1500px'>
      <Link href='#myAnchor'>Go To the anchor</Link>
      <BrowserRouter>
        <Box
          sx={{
            alignSelf: 'flex-end'
          }}
        >
          <Typography>The anchor scrolled you to me</Typography>
          <AruiSmoothAnchor id='myAnchor' />
        </Box>
      </BrowserRouter>
    </Box>
  )
}

SmoothAnchor.storyName = 'SmoothAnchor'
