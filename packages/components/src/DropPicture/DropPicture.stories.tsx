import React from 'react'
import {
  DropPicture as AruiDropPicture,
  DropPictureBasicProps
} from './DropPicture'
import { Meta, StoryFn } from '@storybook/react'
import { styles, classes } from './types'
import { Box } from '@mui/material'

export default {
  title: 'Components/DropPicture',
  component: AruiDropPicture,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kgphqh0uVhoXt8TK3LlkGj/G2-%2F-Design-System?node-id=1014%3A942'
    }
  },
  argTypes: {
    classes: {
      table: {
        type: {
          summary: 'DropPictureClasses',
          detail: classes
        }
      }
    },
    styles: {
      table: {
        type: {
          summary: 'DropPictureStyles',
          detail: styles
        }
      }
    }
  }
} as Meta

const Template: StoryFn<DropPictureBasicProps> = (
  args: DropPictureBasicProps
) => (
  <Box
    sx={{
      width: '500px',
      height: '300px'
    }}
  >
    <AruiDropPicture {...args} />
  </Box>
)

export const DropPicture = Template.bind({})

DropPicture.storyName = 'DropPicture'
