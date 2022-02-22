import { Meta } from '@storybook/react'
import React from 'react'
import { OrgFactory, OrgFactoryProps } from './OrgFactory'
import { Story } from '@storybook/react/types-6-0'
import { ArgsTable, PRIMARY_STORY, Subtitle } from '@storybook/addon-docs'
import LinkTo from '@storybook/addon-links/react'
import { Stack, Typography } from '@mui/material'
import { styles, classes } from './types'

export default {
  title: 'I2/OrgFactory',
  component: OrgFactory,
  parameters: {
    docs: {
      page: () => (
        <>
          <ArgsTable story={PRIMARY_STORY} />
          <Subtitle>References</Subtitle>
          <Stack>
            <Typography variant='body2' style={{ marginBottom: '5px' }}>
              -{' '}
              <LinkTo kind='Forms' story='Form'>
                Form
              </LinkTo>
            </Typography>
            <Typography variant='body2' style={{ marginBottom: '5px' }}>
              -{' '}
              <LinkTo kind='Notifications' story='Popover'>
                PopOver
              </LinkTo>
            </Typography>
          </Stack>
        </>
      )
    }
  },
  argTypes: {
    classes: {
      table: {
        type: {
          summary: 'OrgFactoryClasses',
          detail: classes
        }
      }
    },
    styles: {
      table: {
        type: {
          summary: 'OrgFactoryStyles',
          detail: styles
        }
      }
    }
  }
} as Meta

export const OrgFactoryStory: Story<OrgFactoryProps> = (
  args: OrgFactoryProps
) => {
  return <OrgFactory {...args} />
}

OrgFactoryStory.args = {
  onSubmit: (org) => console.log(org)
}

OrgFactoryStory.storyName = 'OrgFactory'
