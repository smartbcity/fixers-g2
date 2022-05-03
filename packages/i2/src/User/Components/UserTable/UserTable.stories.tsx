import { Meta } from '@storybook/react'
import React from 'react'
import { UserTable, UserTableProps } from './UserTable'
import { Story } from '@storybook/react/types-6-0'
import { ArgsTable, PRIMARY_STORY, Subtitle } from '@storybook/addon-docs'
import LinkTo from '@storybook/addon-links/react'
import { Stack, Typography } from '@mui/material'
import { User } from '../../Domain'
import { Button } from '@smartb/g2-components'

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

export const UserTableStory: Story<UserTableProps> = (args: UserTableProps) => {
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
  totalPages: 10,
  onFiltersChanged: (params) => console.log(params),
  organizationsRefs: [
    {
      id: 'smartb',
      name: 'smartb'
    }
  ],
  rolesOptions: [
    {
      key: 'user',
      label: 'User'
    },
    {
      key: 'admin',
      label: 'Admin'
    }
  ],
  tableActions: <Button>Créer une organisation</Button>
}

UserTableStory.storyName = 'UserTable'
