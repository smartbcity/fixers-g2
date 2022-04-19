import { Meta } from '@storybook/react'
import React from 'react'
import { GalleryFactory, GalleryFactoryProps } from './GalleryFactory'
import { Story } from '@storybook/react/types-6-0'
import { Box } from '@mui/material'
import { useState } from '@storybook/addons'
import { FsFile } from '../Gallery/types'
import { fileToBase64 } from 'utils'

export default {
  title: 'I2/GalleryFactory',
  component: GalleryFactory
} as Meta

export const GalleryFactoryStory: Story<GalleryFactoryProps> = (
  args: GalleryFactoryProps
) => {
  const [gallery, setgallery] = useState<FsFile[]>([])
  return (
    <GalleryFactory
      files={gallery}
      onAdd={(files) => {
        const fsFiles = files.map(async (file): Promise<FsFile> => {
          const base64 = await fileToBase64(file)
          return {
            path: {
              name: file.name
            },
            id: 'new-' + file.name,
            metadata: {},
            objectId: 'new-' + file.name,
            url: base64
          }
        })
        Promise.all(fsFiles).then((values) => {
          setgallery((oldValues) => [...oldValues, ...values])
        })
      }}
      onDelete={(file) => {
        setgallery((oldValues) =>
          oldValues.filter((element) => file.id !== element.id)
        )
      }}
      {...args}
    />
  )
}

GalleryFactoryStory.storyName = 'GalleryFactory'
