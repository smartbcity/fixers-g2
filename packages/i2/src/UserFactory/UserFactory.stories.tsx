import { Meta } from '@storybook/react'
import React from 'react'
import { UserFactory, UserFactoryProps } from './UserFactory'
import { Story } from '@storybook/react/types-6-0'
import { ArgsTable, PRIMARY_STORY, Subtitle } from '@storybook/addon-docs'
import LinkTo from '@storybook/addon-links/react'
import { Stack, Typography } from '@mui/material'
import { styles, classes } from './types'

export default {
  title: 'I2/UserFactory',
  component: UserFactory,
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
          </Stack>
        </>
      )
    }
  },
  argTypes: {
    classes: {
      table: {
        type: {
          summary: 'UserFactoryClasses',
          detail: classes
        }
      }
    },
    styles: {
      table: {
        type: {
          summary: 'UserFactoryStyles',
          detail: styles
        }
      }
    }
  }
} as Meta

export const UserFactoryStory: Story<UserFactoryProps> = (
  args: UserFactoryProps
) => {
  return <UserFactory {...args} />
}

UserFactoryStory.args = {
  onSubmit: (user) => console.log(user),
  organizationId: '1',
  organizationsRefs: [
    {
      id: '1',
      name: 'Smartb'
    },
    {
      id: '2',
      name: 'Google'
    }
  ],
  rolesOptions: [
    {
      key: '2',
      label: 'User'
    },
    {
      key: '1',
      label: 'Admin'
    }
  ]
}

UserFactoryStory.storyName = 'UserFactory'
