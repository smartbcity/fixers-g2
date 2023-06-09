import { Meta } from '@storybook/react'
import React from 'react'
import { GalleryFactory, GalleryFactoryProps } from './GalleryFactory'
import { Story } from '@storybook/react/types-6-0'
import { useState } from '@storybook/addons'
import { FsFile } from '../Gallery/types'
import { fileToBase64 } from '@smartb/g2-utils'

export default {
  title: 'Fs/GalleryFactory',
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
      sx={{
        height: '200px'
      }}
      {...args}
    />
  )
}

GalleryFactoryStory.storyName = 'GalleryFactory'
