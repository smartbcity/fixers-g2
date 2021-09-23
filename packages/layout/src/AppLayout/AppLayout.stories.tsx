import React, { useState } from 'react'
import { AppLayout as AruiAppLayout, AppLayoutProps } from './AppLayout'
import { Meta } from '@storybook/react'
import { Story } from '@storybook/react/types-6-0'
import { Box, Link, Typography } from  '@mui/material'
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
              <Link href='https://material-ui.com/api/drawer/#drawer-api'>
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

const Template: Story<AppLayoutProps> = (args: AppLayoutProps) => {
  const [open, setOpen] = useState(false)

  return <AruiAppLayout {...args} open={open} onToggle={() => setOpen(!open)} />
}

export const AppLayout = Template.bind({})
AppLayout.args = {
  appBarContent: 'AppBar content',
  drawerContent: 'Drawer content',
  drawerProps: {
    className: 'test'
  },
  styleProps: {
    appBarHeight: 70,
    detailDrawerWidth: 600,
    menuWidth: 210
  }
}

AppLayout.storyName = 'AppLayout'
