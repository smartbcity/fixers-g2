import React from 'react'
import { DropZonePicture as AruiDropZonePicture } from './DropZonePicture'
import { Meta, StoryFn } from '@storybook/react'
import { DropPictureProps } from '@smartb/g2-components'

export default {
  title: 'Fs/DropZonePicture',
  component: AruiDropZonePicture,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kgphqh0uVhoXt8TK3LlkGj/G2-%2F-Design-System?node-id=1014%3A942'
    }
  }
} as Meta

const Template: StoryFn<DropPictureProps> = (args: DropPictureProps) => (
  <AruiDropZonePicture {...args} />
)

export const DropPicture = Template.bind({})

DropPicture.storyName = 'DropPicture'
