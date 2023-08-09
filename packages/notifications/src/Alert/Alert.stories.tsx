import React from 'react'
import { Alert as AruiAlert, AlertBasicProps } from './Alert'
import { Meta, StoryFn } from '@storybook/react'

import { Box } from '@mui/material'
import { classes, styles } from './types'

export default {
  title: 'Notifications/Alert',
  component: AruiAlert,

  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kgphqh0uVhoXt8TK3LlkGj/G2-%2F-Design-System?node-id=1017%3A1683'
    }
  },
  argTypes: {
    classes: {
      table: {
        type: {
          summary: 'AlertClasses',
          detail: classes
        }
      }
    },
    styles: {
      table: {
        type: {
          summary: 'AlertStyles',
          detail: styles
        }
      }
    }
  }
} as Meta

export const Alert: StoryFn<AlertBasicProps> = (args: AlertBasicProps) => {
  return (
    <>
      <AruiAlert isRelative {...args} />
    </>
  )
}

export const AlertSeverity: StoryFn<AlertBasicProps> = () => {
  return (
    <Box display='flex' justifyContent='center' flexDirection='column'>
      <AruiAlert
        style={{
          margin: 10
        }}
        isRelative
        severity='info'
        message='info'
      />
      <AruiAlert
        style={{
          margin: 10
        }}
        isRelative
        severity='warning'
        message='warning'
      />
      <AruiAlert
        style={{
          margin: 10
        }}
        isRelative
        severity='success'
        message='success'
      />
      <AruiAlert
        style={{
          margin: 10
        }}
        isRelative
        severity='error'
        message='error'
      />
    </Box>
  )
}

export const AlertColorBase: StoryFn<AlertBasicProps> = () => {
  return (
    <Box display='flex' justifyContent='center' flexDirection='column'>
      <AruiAlert
        style={{
          margin: 10
        }}
        isRelative
        colorBase='light'
        onClose={() => {}}
        message='light'
      />
      <AruiAlert
        style={{
          margin: 10
        }}
        isRelative
        colorBase='dark'
        onClose={() => {}}
        message='dark'
      />
    </Box>
  )
}

Alert.args = {
  message: 'Hello',
  onClose: () => {}
}

Alert.storyName = 'Alert'
