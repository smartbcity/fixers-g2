import React from 'react'
import { ToolsMenu as AruiToolsMenu, ToolsMenuProps } from './ToolsMenu'
import { Meta, StoryFn } from '@storybook/react'
import {
  AccountCircle,
  ContactPhone,
  Payment,
  Settings
} from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import { ArgsTable, PRIMARY_STORY, Subtitle } from '@storybook/addon-docs'
import { styles, classes, Menu } from './types'
import LinkTo from '@storybook/addon-links/react'

export default {
  title: 'Layout/ToolsMenu',
  component: AruiToolsMenu,
  parameters: {
    docs: {
      page: () => (
        <>
          <ArgsTable story={PRIMARY_STORY} />
          <Subtitle>References</Subtitle>
          <Box display='flex' flexDirection='column'>
            <Typography variant='body2' style={{ marginBottom: '5px' }}>
              -{' '}
              <LinkTo kind='Layout' story='ItemsLayout'>
                itemsLayoutProps
              </LinkTo>
            </Typography>
            <Typography variant='body2' style={{ marginBottom: '5px' }}>
              -{' '}
              <LinkTo kind='Layout' story='TabsMenu'>
                tabsMenuProps
              </LinkTo>
            </Typography>
          </Box>
        </>
      )
    }
  },
  argTypes: {
    menu: {
      table: {
        type: {
          summary: 'Menu',
          detail: Menu
        }
      },
      control: null
    },
    itemsLayoutProps: {
      table: {
        type: {
          summary: 'Partial<ItemsLayoutBasicProps>'
        }
      },
      control: null
    },
    tabsMenuProps: {
      control: null
    },
    classes: {
      table: {
        type: {
          summary: 'ToolsMenuClasses',
          detail: classes
        }
      }
    },
    styles: {
      table: {
        type: {
          summary: 'ToolsMenuStyles',
          detail: styles
        }
      }
    }
  }
} as Meta

const Template: StoryFn<ToolsMenuProps> = (args: ToolsMenuProps) => (
  <AruiToolsMenu {...args}></AruiToolsMenu>
)

export const ToolsMenu = Template.bind({})
ToolsMenu.args = {
  display: 'list',
  menu: {
    label: 'profile',
    key: 'profile',
    icon: <AccountCircle />,
    items: [
      {
        key: 'key1',
        label: 'Section 1',
        icon: <Payment style={{ width: '60px', height: '60px' }} />
      },
      {
        key: 'key2',
        label: 'Section 2',
        icon: <ContactPhone style={{ width: '60px', height: '60px' }} />
      },
      {
        key: 'key3',
        label: 'Section 3',
        icon: <Settings style={{ width: '60px', height: '60px' }} />
      }
    ]
  }
}

ToolsMenu.storyName = 'ToolsMenu'
