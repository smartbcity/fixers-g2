import React from 'react'
import {
  StandAloneAppLayout as AruiStandAloneAppLayout,
  StandAloneAppLayoutProps
} from './StandAloneAppLayout'
import { Meta, StoryFn } from '@storybook/react'
import { Box, Link, Paper, Stack, Typography } from '@mui/material'
import { ArgsTable, PRIMARY_STORY, Subtitle } from '@storybook/addon-docs'
import LinkTo from '@storybook/addon-links/react'
import itemsLogo from '../assets/impactcity-logo-2.png'
import { styles, classes } from './docs'
import { Button } from '@smartb/g2-components'
import { Page } from '../Page'

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

export const StandAloneAppLayout: StoryFn<StandAloneAppLayoutProps> = (
  args: StandAloneAppLayoutProps
) => {
  return <AruiStandAloneAppLayout {...args} />
}

StandAloneAppLayout.args = {
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
  ],
  children: (
    <Page
      headerProps={{
        content: [
          {
            leftPart: [
              <Typography key='page-title' variant='h5'>
                Page Header
              </Typography>
            ],
            rightPart: [<Button key='page-action'>An action</Button>]
          }
        ],
        currentTab: 'tab-1'
      }}
      bottomActionsProps={{
        actions: [
          {
            label: 'Cancel',
            key: 'cancelButton',
            variant: 'text'
          },
          {
            label: 'validate',
            key: 'validateFormButton',
            type: 'submit'
          }
        ]
      }}
    >
      <Stack direction='row' height='120vh' alignItems='strecth' gap='32px'>
        <Paper sx={{ flexGrow: 1 }} elevation={0} />
        <Paper sx={{ flexGrow: 1 }} elevation={0} />
      </Stack>
    </Page>
  )
}

StandAloneAppLayout.storyName = 'StandAloneAppLayout'
