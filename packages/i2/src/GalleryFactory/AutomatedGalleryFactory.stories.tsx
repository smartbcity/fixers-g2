import { Meta } from '@storybook/react'
import React, { useCallback } from 'react'
import {
  AutomatedGalleryFactory,
  AutomatedGalleryFactoryProps
} from './AutomatedGalleryFactory'
import { Story } from '@storybook/react/types-6-0'
import { useGetGallery, useDeleteFiles, useUploadFiles } from '../Gallery'
import { FileDeleteCommand, FileUploadCommand } from '../Gallery/types'
import { QueryClient, QueryClientProvider } from 'react-query'

export default {
  title: 'I2/AutomatedGalleryFactory',
  component: AutomatedGalleryFactory
} as Meta

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {}
  }
})

export const AutomatedGalleryFactoryStory: Story<AutomatedGalleryFactoryProps> =
  (args: AutomatedGalleryFactoryProps) => {
    const hookMemoized = useCallback(() => {
      return useGetGallery({
        apiUrl: 'http://51.83.34.130:8090',
        directoryPath: {
          directory: 'gallery1',
          objectId: '0fe05d72-db8e-4ae1-9852-68ec74fa3b01',
          objectType: 'project'
        }
      })
    }, [])

    const useSaveDeletes = useCallback(() => {
      return useDeleteFiles({
        apiUrl: 'http://51.83.34.130:8090'
      })
    }, [])

    const useSaveUploads = useCallback(() => {
      return useUploadFiles({
        apiUrl: 'http://51.83.34.130:8090'
      })
    }, [])

    return (
      <QueryClientProvider client={queryClient}>
        <AutomatedGalleryFactory
          useGetGallery={hookMemoized}
          directoryPath={{
            directory: 'gallery1',
            objectId: '0fe05d72-db8e-4ae1-9852-68ec74fa3b01',
            objectType: 'project'
          }}
          galleryName='gallery1'
          useDeleteFiles={useSaveDeletes}
          useUploadFiles={useSaveUploads}
          {...args}
        />
      </QueryClientProvider>
    )
  }

AutomatedGalleryFactoryStory.storyName = 'AutomatedGalleryFactory'
