import { Meta } from '@storybook/react'
import React, { useCallback } from 'react'
import {
  AutomatedGalleryFactory,
  AutomatedGalleryFactoryProps
} from './AutomatedGalleryFactory'
import { Story } from '@storybook/react/types-6-0'
import { useGetGallery, useDeleteFiles, useUploadFiles } from '../Gallery'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Box } from '@mui/material'

export default {
  title: 'Fs/AutomatedGalleryFactory',
  component: AutomatedGalleryFactory
} as Meta

const queryClient = new QueryClient()

export const AutomatedGalleryFactoryStory: Story<AutomatedGalleryFactoryProps> =
  (args: AutomatedGalleryFactoryProps) => {
    return (
      <QueryClientProvider client={queryClient}>
        <SubComponent {...args} />
      </QueryClientProvider>
    )
  }

const SubComponent = (args: AutomatedGalleryFactoryProps) => {
  const gallery = useGetGallery({
    apiUrl: 'http://51.83.34.130:8090',
    directoryPath: {
      directory: 'gallery1',
      objectId: '0fe05d72-db8e-4ae1-9852-68ec74fa3b01',
      objectType: 'project'
    }
  })

  const deleteFiles = useDeleteFiles({
    apiUrl: 'http://51.83.34.130:8090'
  })

  const uploadFiles = useUploadFiles({
    apiUrl: 'http://51.83.34.130:8090'
  })
  return (
    <AutomatedGalleryFactory
      gallery={gallery}
      directoryPath={{
        directory: 'gallery1',
        objectId: '0fe05d72-db8e-4ae1-9852-68ec74fa3b01',
        objectType: 'project'
      }}
      galleryName='gallery1'
      deleteFiles={deleteFiles}
      uploadFiles={uploadFiles}
      sx={{
        height: '200px'
      }}
      {...args}
    />
  )
}

AutomatedGalleryFactoryStory.storyName = 'AutomatedGalleryFactory'
