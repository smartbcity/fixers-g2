import { Meta } from '@storybook/react'
import React from 'react'
import {
  OrganizationFactory,
  OrganizationFactoryProps
} from './OrganizationFactory'
import { Story } from '@storybook/react/types-6-0'
import { ArgsTable, PRIMARY_STORY, Subtitle } from '@storybook/addon-docs'
import LinkTo from '@storybook/addon-links/react'
import { Stack, Typography } from '@mui/material'
import { styles, classes } from './types'

export default {
  title: 'I2/Factory',
  component: OrganizationFactory,
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
          summary: 'OrganizationFactoryClasses',
          detail: classes
        }
      }
    },
    styles: {
      table: {
        type: {
          summary: 'OrganizationFactoryStyles',
          detail: styles
        }
      }
    }
  }
} as Meta

export const OrganizationFactoryStory: Story<OrganizationFactoryProps> = (
  args: OrganizationFactoryProps
) => {
  return (
    <OrganizationFactory
      {...args}
      organization={{ roles: ['Manager'], name: 'SmartB' }}
    />
  )
}

OrganizationFactoryStory.args = {
  onSubmit: (org) => window.alert(JSON.stringify(org)),
  rolesOptions: [
    {
      key: 'Operateur',
      label: 'Operateur'
    },
    {
      key: 'Manager',
      label: 'Manager'
    }
  ]
}

OrganizationFactoryStory.storyName = 'OrganizationFactory'
