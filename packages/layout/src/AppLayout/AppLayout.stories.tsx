import React, { useState } from 'react'
import { AppLayout as AruiAppLayout, AppLayoutProps } from './AppLayout'
import { Meta, StoryFn } from '@storybook/react'
import { Box, Link, Typography } from '@mui/material'
import { ArgsTable, PRIMARY_STORY, Subtitle } from '@storybook/addon-docs'
import { styles, classes, StyleProps } from './types'
import LinkTo from '@storybook/addon-links/react'

export default {
  title: 'Layout/AppLayout',
  component: AruiAppLayout,
  parameters: {
    docs: {
      page: () => (
        <>
          <ArgsTable story={PRIMARY_STORY} />
          <Subtitle>References</Subtitle>
          <Box display='flex' flexDirection='column'>
            <Typography variant='body2' style={{ marginBottom: '5px' }}>
              -{' '}
              <LinkTo kind='Layout' story='AppBarLayout'>
                appBarLayoutProps
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
    }
  },
  argTypes: {
    appBarLayoutProps: {
      table: {
        type: {
          summary: 'Partial<AppBarLayoutProps>'
        }
      },
      control: null
    },
    drawerProps: {
      table: {
        type: {
          summary: 'Partial<DrawerProps>'
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
    appBarContent: {
      control: null
    },
    classes: {
      table: {
        type: {
          summary: 'AppLayoutClasses',
          detail: classes
        }
      }
    },
    styles: {
      table: {
        type: {
          summary: 'AppLayoutStyles',
          detail: styles
        }
      }
    }
  }
} as Meta

const Template: StoryFn<AppLayoutProps> = (args: AppLayoutProps) => {
  const [open, setOpen] = useState(true)

  return <AruiAppLayout {...args} open={open} onToggle={() => setOpen(!open)} />
}

export const AppLayout = Template.bind({})
AppLayout.args = {
  appBarContent: 'AppBar content',
  drawerContent: 'Drawer content',
  drawerProps: {
    className: 'test'
  },
  appBar: {
    height: 150
  },
  menu: {
    width: 250
  },
  main: {
    margin: '24px'
  }
}

AppLayout.storyName = 'AppLayout'
