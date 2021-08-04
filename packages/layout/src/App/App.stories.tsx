import React, { useState } from 'react'
import { App as AruiApp, AppProps } from './App'
import { Meta } from '@storybook/react'
import { Story } from '@storybook/react/types-6-0'
import { action } from '@storybook/addon-actions'
import {
  AccountCircle,
  Description,
  ExitToApp,
  Settings
} from '@material-ui/icons'
import defaultLogo from '../assets/impactcity-logo-2.png'
import { Box, Button, Typography } from '@material-ui/core'
import { ArgsTable, PRIMARY_STORY, Subtitle } from '@storybook/addon-docs'
import { styles, classes, StyleProps, MenuItem } from './types'
import LinkTo from '@storybook/addon-links/react'

export default {
  title: 'Layout/App',
  component: AruiApp,
  parameters: {
    docs: {
      page: () => (
        <>
          <ArgsTable story={PRIMARY_STORY} />
          <Subtitle>References</Subtitle>
          <Box display='flex' flexDirection='column'>
            <Typography variant='body2' style={{ marginBottom: '5px' }}>
              -{' '}
              <LinkTo kind='Layout' story='ToolsMenu'>
                ToolsMenuProps
              </LinkTo>
            </Typography>
            <Typography variant='body2' style={{ marginBottom: '5px' }}>
              -{' '}
              <LinkTo kind='Layout' story='AppBar'>
                appBarProps
              </LinkTo>
            </Typography>
            <Typography variant='body2' style={{ marginBottom: '5px' }}>
              -{' '}
              <LinkTo kind='Layout' story='DrawerMenu'>
                drawerMenuProps
              </LinkTo>
            </Typography>
          </Box>
        </>
      )
    }
  },
  argTypes: {
    toolsMenuProps: {
      table: {
        type: {
          summary: 'ToolsMenuProps[]'
        }
      },
      control: null
    },
    appBarProps: {
      table: {
        type: {
          summary: 'Partial<AppBarProps>'
        }
      },
      control: null
    },
    drawerMenuProps: {
      table: {
        type: {
          summary: 'Partial<DrawerMenuProps>'
        }
      },
      control: null
    },
    menu: {
      table: {
        type: {
          summary: 'MenuItem[]',
          detail: MenuItem
        }
      },
      control: null
    },
    styleProps: {
      table: {
        type: {
          summary: 'StyleProps',
          detail: StyleProps
        }
      },
      control: null
    },
    navBarContent: {
      control: null
    },
    classes: {
      table: {
        type: {
          summary: 'AppClasses',
          detail: classes
        }
      }
    },
    styles: {
      table: {
        type: {
          summary: 'AppStyles',
          detail: styles
        }
      }
    }
  }
} as Meta

const Template: Story<AppProps> = (args: AppProps) => {
  const [open, setOpen] = useState(false)

  return <AruiApp {...args} open={open} onToggle={() => setOpen(!open)} />
}

const profileMenu = {
  key: 'Settings',
  goto: action('clicked on preference'),
  label: 'Settings',
  icon: <Settings />,
  items: [
    {
      key: 'preference',
      goto: action('clicked on preference'),
      label: 'preferences',
      items: [
        {
          key: 'preference',
          goto: action('clicked on preference'),
          label: 'preferences'
        },
        {
          key: 'logout',
          goto: action('clicked on logout'),
          label: 'logout'
        }
      ]
    }
  ]
}

const profileMenu2 = {
  label: 'profile',
  key: 'profile',
  icon: <AccountCircle />,
  items: [
    {
      key: 'section 1',
      label: 'section 1',
      icon: <AccountCircle />,
      items: [
        {
          key: 'preference',
          label: 'preference',
          icon: <Settings />
        },
        {
          key: 'statement',
          label: 'statement',
          icon: <Description />
        },
        {
          key: 'logout',
          label: 'logout',
          icon: <ExitToApp />
        }
      ]
    }
  ]
}

export const App = Template.bind({})
App.args = {
  toolsMenuProps: [
    {
      menu: profileMenu,
      display: 'list'
    },
    {
      menu: profileMenu2,
      display: 'list'
    }
  ],
  menu: [
    {
      key: 'dashboard',
      goto: () => {},
      label: 'dashboard',
      icon: <img style={{ width: '30px', height: '30px' }} src={defaultLogo} />
    },
    {
      key: 'activities',
      goto: () => {},
      label: 'activities',
      icon: <img style={{ width: '30px', height: '30px' }} src={defaultLogo} />
    },
    {
      key: 'application',
      goto: () => {},
      label: 'application',
      icon: <img style={{ width: '30px', height: '30px' }} src={defaultLogo} />
    }
  ],
  title: 'SmartB',
  logo: defaultLogo,
  navBarContent: (
    <div>
      <Button onClick={action('clicked on Company')}>Company</Button>
      <Button onClick={action('clicked on Dark mode')}>Dark mode</Button>
    </div>
  ),
  drawerContent: 'Drawer content',
  styleProps: {
    appBarHeight: 70,
    detailDrawerWidth: 600,
    menuWidth: 210
  }
}
