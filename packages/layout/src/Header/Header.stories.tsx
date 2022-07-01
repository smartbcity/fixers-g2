import React, { useState } from 'react'
import { Header as AruiHeader, HeaderProps } from './Header'
import { Meta } from '@storybook/react'
import { Story } from '@storybook/react/types-6-0'
import { IconButton, Stack, Typography } from '@mui/material'
import { Edit, Delete } from '@mui/icons-material'
import { styles, classes } from './docs'
import { BackButton, Button } from '@smartb/g2-components'
import { StatusTag } from '@smartb/g2-notifications'

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

export const HeaderWithGoBack: Story = () => {
  return (
    <AruiHeader
      content={[
        {
          leftPart: [
            <BackButton key='header-goback'>Go back</BackButton>,
            <Typography key='header-title' variant='h4'>
              Title
            </Typography>
          ],
          rightPart: [
            <IconButton key='header-edit'>
              <Edit />
            </IconButton>,
            <IconButton key='header-delete'>
              <Delete />
            </IconButton>,
          ]
        }
      ]}
    />
  )
}

export const HeaderFreeContent: Story = () => {
  return (
    <AruiHeader
      freeContent={(
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography key='header-title' variant='h4'>
            My propject
          </Typography>
          <StatusTag label='Refused' variant='error' />
          <Button >
            Correct
          </Button>
        </Stack>
      )}

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
        <BackButton key='header-goback'>Go back</BackButton>,
      ],
      rightPart: [
      ]
    },  {
      leftPart: [
        <Typography key='header-title' variant='h4'>
          Title
        </Typography>
      ],
      rightPart: [
        <Button key='header-cancelButton' variant='text'>
          Cancel
        </Button>,
        <Button >Send A report</Button>
      ]
    }
  ]
}

Header.storyName = 'Header'
