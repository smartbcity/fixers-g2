import React from 'react'
import {
  StandAloneAppLayout as AruiStandAloneAppLayout,
  StandAloneAppLayoutProps
} from './StandAloneAppLayout'
import { Meta } from '@storybook/react'
import { Story } from '@storybook/react/types-6-0'
import { Box, Link, Typography } from '@mui/material'
import { ArgsTable, PRIMARY_STORY, Subtitle } from '@storybook/addon-docs'
import LinkTo from '@storybook/addon-links/react'
import defaultLogo from '../assets/smartb.png'
import itemsLogo from '../assets/impactcity-logo-2.png'
import { AppLogoProps } from '../AppMenu'
import { styles, classes } from './docs'

export default {
  title: 'Layout/StandAloneAppLayout',
  component: AruiStandAloneAppLayout,
  parameters: {
    docs: {
      page: () => (
        <>
          <ArgsTable story={PRIMARY_STORY} />
          <Subtitle>References</Subtitle>
          <Box display='flex' flexDirection='column'>
            <Typography variant='body2' style={{ marginBottom: '5px' }}>
              -{' '}
              <LinkTo kind='Layout' story='UserMenu'>
                UserMenuProps
              </LinkTo>
            </Typography>
            <Typography variant='body2' style={{ marginBottom: '5px' }}>
              -{' '}
              <LinkTo kind='Layout' story='AppMenu'>
                AppMenu
              </LinkTo>
            </Typography>
            <Typography variant='body2' style={{ marginBottom: '5px' }}>
              -{' '}
              <Link
                color='#0000ee'
                href='https://material-ui.com/api/drawer/#drawer-api'
              >
                drawerProps
              </Link>
            </Typography>
          </Box>
        </>
      )
    },
    layout: 'fullscreen'
  },
  argTypes: {
    classes: {
      table: {
        type: {
          summary: 'StandAloneAppLayoutClasses',
          detail: classes
        }
      }
    },
    styles: {
      table: {
        type: {
          summary: 'StandAloneAppLayoutStyles',
          detail: styles
        }
      }
    }
  }
} as Meta

export const StandAloneAppLayout: Story<StandAloneAppLayoutProps> = (
  args: StandAloneAppLayoutProps
) => {
  return <AruiStandAloneAppLayout {...args} />
}

StandAloneAppLayout.args = {
  logo: {
    src: defaultLogo
  } as AppLogoProps,
  userMenuProps: {
    defaultOpen: true,
    currentUser: {
      givenName: 'John',
      familyName: 'Doe',
      role: 'Administrator'
    },
    loggedMenu: [
      {
        key: 'my-profile',
        goto: () => {},
        label: 'My Profile'
      },
      {
        key: 'preferances',
        goto: () => {},
        label: 'Preferences'
      },
      {
        key: 'logout',
        goto: () => {},
        label: 'Log out'
      }
    ]
  },
  menu: [
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

StandAloneAppLayout.storyName = 'StandAloneAppLayout'
