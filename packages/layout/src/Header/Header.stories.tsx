import React, { useState } from 'react'
import { Header as AruiHeader, HeaderProps } from './Header'
import { Meta } from '@storybook/react'
import { Story } from '@storybook/react/types-6-0'
import { Typography } from '@mui/material'
import { styles, classes } from './docs'
import { Button } from '@smartb/g2-components'

export default {
  title: 'Layout/Header',
  component: AruiHeader,
  argTypes: {
    classes: {
      table: {
        type: {
          summary: 'HeaderClasses',
          detail: classes
        }
      }
    },
    styles: {
      table: {
        type: {
          summary: 'HeaderStyles',
          detail: styles
        }
      }
    }
  }
} as Meta

export const Header: Story<HeaderProps> = (args: HeaderProps) => {
  const [tab, settab] = useState('1')
  return (
    <AruiHeader
      currentTab={tab}
      onTabChange={(_, tab) => settab(tab)}
      {...args}
    />
  )
}

export const HeaderWithGoBack: Story<HeaderProps> = (args: HeaderProps) => {
  const [tab, settab] = useState('1')
  return (
    <AruiHeader
      currentTab={tab}
      onTabChange={(_, tab) => settab(tab)}
      {...args}
    />
  )
}

Header.args = {
  tabs: [
    {
      key: '1',
      label: 'Tab 1'
    },
    {
      key: '2',
      label: 'Tab 2'
    },
    {
      key: '3',
      label: 'Tab 3'
    },
    {
      key: '4',
      label: 'Tab 4'
    },
    {
      key: '5',
      label: 'Tab 5'
    },
    {
      key: '6',
      label: 'Tab 6'
    }
  ],
  content: [
    {
      leftPart: [
        <Typography key='header-title' variant='h4'>
          Title
        </Typography>
      ],
      rightPart: [
        <Button key='header-cancelButton' variant='text'>
          Cancel
        </Button>,
        <Button key='header-validateButton'>Validate</Button>
      ]
    }
  ]
}

Header.storyName = 'Header'
