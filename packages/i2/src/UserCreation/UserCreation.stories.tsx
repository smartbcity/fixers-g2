import { Meta } from '@storybook/react'
import React from 'react'
import { UserCreation, UserCreationProps } from './UserCreation'
import { Story } from '@storybook/react/types-6-0'
import { ArgsTable, PRIMARY_STORY, Subtitle } from '@storybook/addon-docs'
import LinkTo from '@storybook/addon-links/react'
import { Stack, Typography } from '@mui/material'
import { styles, classes } from './types'

export default {
  title: 'I2/UserCreation',
  component: UserCreation,
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
          summary: 'UserCreationClasses',
          detail: classes
        }
      }
    },
    styles: {
      table: {
        type: {
          summary: 'UserCreationStyles',
          detail: styles
        }
      }
    }
  }
} as Meta

export const UserCreationStory: Story<UserCreationProps> = (
  args: UserCreationProps
) => {
  return <UserCreation {...args} />
}

UserCreationStory.args = {
  onSubmit: (user) => console.log(user)
}

UserCreationStory.storyName = 'UserCreation'
