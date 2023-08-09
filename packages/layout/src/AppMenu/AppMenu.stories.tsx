import React from 'react'
import { AppMenu as AruiAppMenu, AppLogoProps, AppMenuProps } from './AppMenu'
import { Meta, StoryFn } from '@storybook/react'
import { Box, Typography } from '@mui/material'
import {
  ArgsTable,
  PRIMARY_STORY,
  Subtitle,
  Primary,
  Stories
} from '@storybook/addon-docs'
import { styles, classes } from './types'
import LinkTo from '@storybook/addon-links/react'
import defaultLogo from '../assets/smartb.png'
import itemsLogo from '../assets/impactcity-logo-2.png'

export default {
  title: 'Layout/AppMenu',
  component: AruiAppMenu,
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

const Template: StoryFn<AppMenuProps> = (args: AppMenuProps) => {
  return (
    <div style={{ width: '200px' }}>
      <AruiAppMenu {...args} />
    </div>
  )
}

export const AppMenu = Template.bind({})

AppMenu.args = {
  logo: {
    src: defaultLogo
  } as AppLogoProps,
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

AppMenu.storyName = 'AppMenu'
