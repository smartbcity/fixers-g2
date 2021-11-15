import React from 'react'
import {
  DropPicture as AruiDropPicture,
  DropPictureBasicProps
} from './DropPicture'
import { Meta } from '@storybook/react'
import { Story } from '@storybook/react/types-6-0'
import { styles, classes } from './types'
import { Box } from '@mui/material'

export default {
  title: 'Components/DropPicture',
  component: AruiDropPicture,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/4Nl4422AUGHNVClZOHzPg8/SmartB-UI-kit?node-id=713%3A0'
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

const Template: Story<DropPictureBasicProps> = (
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
