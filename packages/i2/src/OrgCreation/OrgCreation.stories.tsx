import { Meta } from '@storybook/react'
import React from 'react'
import { OrgCreation, OrgCreationProps } from './OrgCreation'
import { Story } from '@storybook/react/types-6-0'
import { getOrganization } from './getOrganization'
import { ArgsTable, PRIMARY_STORY, Subtitle } from '@storybook/addon-docs'
import LinkTo from '@storybook/addon-links/react'
import { Stack, Typography } from '@mui/material'
import { styles, classes } from './types'

export default {
  title: 'I2/OrgCreation',
  component: OrgCreation,
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
          summary: 'OrgCreationClasses',
          detail: classes
        }
      }
    },
    styles: {
      table: {
        type: {
          summary: 'OrgCreationStyles',
          detail: styles
        }
      }
    }
  }
} as Meta

export const OrgCreationStory: Story<OrgCreationProps> = (
  args: OrgCreationProps
) => {
  return <OrgCreation {...args} />
}

OrgCreationStory.args = {
  onSubmit: (org) => console.log(org),
  getInseeOrganization: getOrganization
}

OrgCreationStory.storyName = 'OrgCreation'
