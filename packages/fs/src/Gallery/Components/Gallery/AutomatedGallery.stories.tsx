import { Meta, StoryFn } from '@storybook/react'
import { AutomatedGallery, AutomatedGalleryProps } from './AutomatedGallery'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Box } from '@mui/material'
import React from 'react'

export default {
  title: 'Fs/AutomatedGallery',
  component: AutomatedGallery
} as Meta

const queryClient = new QueryClient()

export const AutomatedGalleryStory: StoryFn<AutomatedGalleryProps> = (
  args: AutomatedGalleryProps
) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SubComponent {...args} />
    </QueryClientProvider>
  )
}

const SubComponent = (args: AutomatedGalleryProps) => {
  return (
    <Box
      sx={{
        width: '400px',
        height: '500px'
      }}
    >
      <AutomatedGallery galleryName='gallery1' {...args} />
    </Box>
  )
}

AutomatedGalleryStory.args = {
  directoryPath: {
    directory: 'gallery1',
    objectId: '0fe05d72-db8e-4ae1-9852-68ec74fa3b01',
    objectType: 'project'
  }
}

AutomatedGalleryStory.storyName = 'AutomatedGallery'
