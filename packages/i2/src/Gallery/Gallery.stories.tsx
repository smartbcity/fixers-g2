import { Meta } from '@storybook/react'
import React from 'react'
import { Gallery, GalleryProps } from './Gallery'
import { Story } from '@storybook/react/types-6-0'
import { Box } from '@mui/material'
import horizontalSrc from './horizontal.jpg'
import verticalSrc from './vertical.jpg'
import squaredSrc from './squared.jpg'

export default {
  title: 'I2/Gallery',
  component: Gallery
} as Meta

export const GalleryStory: Story<GalleryProps> = (args: GalleryProps) => {
  return (
    <Box
      sx={{
        width: '400px',
        height: '500px'
      }}
    >
      <Gallery {...args} />
    </Box>
  )
}

GalleryStory.args = {
  files: [
    {
      id: '1',
      metadata: {},
      path: {
        name: 'horizontal.jpg'
      },
      objectId: '1',
      url: horizontalSrc
    },
    {
      id: '2',
      metadata: {},
      path: {
        name: 'squared.jpg'
      },
      objectId: '2',
      url: squaredSrc
    },
    {
      id: '3',
      metadata: {},
      path: {
        name: 'vertical.jpg'
      },
      objectId: '3',
      url: verticalSrc
    },
    {
      id: '4',
      metadata: {},
      path: {
        name: 'vertical.jpg'
      },
      objectId: '4',
      url: verticalSrc
    },
    {
      id: '5',
      metadata: {},
      path: {
        name: 'horizontal.jpg'
      },
      objectId: '5',
      url: horizontalSrc
    },
    {
      id: '6',
      metadata: {},
      path: {
        name: 'horizontal.jpg'
      },
      objectId: '6',
      url: horizontalSrc
    },
    {
      id: '7',
      metadata: {},
      path: {
        name: 'squared.jpg'
      },
      objectId: '7',
      url: squaredSrc
    },
    {
      id: '8',
      metadata: {},
      path: {
        name: 'vertical.jpg'
      },
      objectId: '8',
      url: verticalSrc
    },
    {
      id: '9',
      metadata: {},
      path: {
        name: 'horizontal.jpg'
      },
      objectId: '9',
      url: horizontalSrc
    },
    {
      id: '10',
      metadata: {},
      path: {
        name: 'squared.jpg'
      },
      objectId: '9',
      url: squaredSrc
    },
    {
      id: '11',
      metadata: {},
      path: {
        name: 'vertical.jpg'
      },
      objectId: '10',
      url: verticalSrc
    },
    {
      id: '12',
      metadata: {},
      path: {
        name: 'horizontal.jpg'
      },
      objectId: '11',
      url: horizontalSrc
    }
  ]
}

GalleryStory.storyName = 'Gallery'
