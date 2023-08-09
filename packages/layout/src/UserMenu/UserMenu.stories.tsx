import React from 'react'
import { UserMenu as AruiUserMenu, UserMenuProps } from './UserMenu'
import { Meta, StoryFn } from '@storybook/react'
import itemsLogo from '../assets/impactcity-logo-2.png'
import {
  ArgsTable,
  PRIMARY_STORY,
  Subtitle,
  Primary,
  Stories
} from '@storybook/addon-docs'
import { styles, classes } from './docs'
import { Box, Typography } from '@mui/material'
import LinkTo from '@storybook/addon-links/react'

export default {
  title: 'Layout/UserMenu',
  component: AruiUserMenu,
  parameters: {
    docs: {
      page: () => (
        <>
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Subtitle>References</Subtitle>
          <Box display='flex' flexDirection='column'>
            <Typography variant='body2' style={{ marginBottom: '5px' }}>
              -{' '}
              <LinkTo kind='Components' story='Menu'>
                Menu
              </LinkTo>
            </Typography>
          </Box>
          <Stories />
        </>
      )
    }
  },
  argTypes: {
    classes: {
      table: {
        type: {
          summary: 'AppMenuClasses',
          detail: classes
        }
      }
    },
    styles: {
      table: {
        type: {
          summary: 'AppMenuStyles',
          detail: styles
        }
      }
    }
  }
} as Meta

export const UserMenu: StoryFn<UserMenuProps> = (args: UserMenuProps) => {
  return (
    <div style={{ width: '200px' }}>
      <AruiUserMenu {...args} />
    </div>
  )
}

UserMenu.args = {
  currentUser: {
    givenName: 'John',
    familyName: 'Doe',
    role: 'Administrator'
  },
  loggedMenu: [
    {
      key: 'dashboard',
      goto: () => {},
      label: 'dashboard',
      icon: <img style={{ width: '30px', height: '30px' }} src={itemsLogo} />
    },
    {
      key: 'activities',
      goto: () => {},
      label: 'activities',
      icon: <img style={{ width: '30px', height: '30px' }} src={itemsLogo} />
    },
    {
      key: 'application',
      goto: () => {},
      label: 'application',
      icon: <img style={{ width: '30px', height: '30px' }} src={itemsLogo} />
    }
  ]
}

UserMenu.storyName = 'UserMenu'
