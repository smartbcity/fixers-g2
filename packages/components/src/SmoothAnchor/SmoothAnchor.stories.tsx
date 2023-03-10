import React from 'react'
import {
  SmoothAnchor as AruiSmoothAnchor,
  SmoothAnchorBasicProps
} from './SmoothAnchor'
import { Meta } from '@storybook/react'
import { Story } from '@storybook/react/types-6-0'
import { Flight } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import { Link } from '../Link'
import { BrowserRouter } from 'react-router-dom'

export default {
  title: 'Components/SmoothAnchor',
  component: AruiSmoothAnchor
} as Meta

const defaultArgs = {
  title: 'flights',
  content: '24 500',
  icon: <Flight style={{ color: '#EDBA27', width: '50px', height: '50px' }} />
}

export const SmoothAnchor: Story<SmoothAnchorBasicProps> = (
  args: SmoothAnchorBasicProps
) => {
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
