import { Meta, StoryFn } from '@storybook/react'
import React from 'react'
import { UserTable, UserTableProps } from './UserTable'

import { ArgsTable, PRIMARY_STORY, Subtitle } from '@storybook/addon-docs'
import LinkTo from '@storybook/addon-links/react'
import { Stack, Typography } from '@mui/material'
import { User } from '../../Domain'

export default {
  title: 'I2/UserTable',
  component: UserTable,
  parameters: {
    docs: {
      page: () => (
        <>
          <ArgsTable story={PRIMARY_STORY} />
          <Subtitle>References</Subtitle>
          <Stack>
            <Typography variant='body2' style={{ marginBottom: '5px' }}>
              -{' '}
              <LinkTo kind='Components' story='Table'>
                Table
              </LinkTo>
            </Typography>
            <Typography variant='body2' style={{ marginBottom: '5px' }}>
              -{' '}
              <LinkTo kind='Forms' story='Filters'>
                Filters
              </LinkTo>
            </Typography>
          </Stack>
        </>
      )
    }
  }
} as Meta

export const UserTableStory: StoryFn<UserTableProps> = (
  args: UserTableProps
) => {
  return <UserTable {...args} />
}

const users: User[] = [
  {
    id: '1',
    role: 'User',
    givenName: 'Basile',
    familyName: 'Savouret',
    address: {
      street: '2 Rue du Pavillon',
      postalCode: '34000',
      city: 'Montpellier'
    },
    mail: 'savouret.basile@gmail.com',
    memberOf: {
      id: '1',
      name: 'Smartb'
    }
  },
  {
    id: '2',
    givenName: 'Teddy',
    familyName: 'Lee',
    role: 'Admin',
    address: {
      street: '2 Rue du Pavillon',
      postalCode: '34000',
      city: 'Montpellier'
    },
    mail: 'savouret.basile@gmail.com',
    memberOf: {
      id: '1',
      name: 'Smartb'
    }
  },
  {
    id: '3',
    givenName: 'Basile',
    familyName: 'Savouret',
    role: 'User',
    address: {
      street: '2 Rue du Pavillon',
      postalCode: '34000',
      city: 'Montpellier'
    },
    mail: 'savouret.basile@gmail.com',
    memberOf: {
      id: '1',
      name: 'Smartb'
    }
  }
]

UserTableStory.args = {
  users: users,
  totalPages: 10
}

UserTableStory.storyName = 'UserTable'
