import React from 'react'
import { Alert as AruiAlert, AlertBasicProps } from './Alert'
import { Meta } from '@storybook/react'
import { Story } from '@storybook/react/types-6-0'
import { withDesign } from 'storybook-addon-designs'
import { Box } from '@mui/material'
import { classes, styles } from './types'

export default {
  title: 'Notifications/Alert',
  component: AruiAlert,
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/Ruq4cXc1frJJ5qVtLtnqje/SmartB-UI-kit?node-id=210%3A435'
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

export const Alert: Story<AlertBasicProps> = (args: AlertBasicProps) => {
  return (
    <>
      <AruiAlert
        style={{ position: 'relative', transform: 'unset', left: 0, bottom: 0 }}
        {...args}
      />
    </>
  )
}

export const AlertSeverity: Story<AlertBasicProps> = () => {
  return (
    <Box display='flex' justifyContent='center' flexDirection='column'>
      <AruiAlert
        style={{
          position: 'relative',
          transform: 'unset',
          left: 0,
          bottom: 0,
          margin: 10
        }}
        severity='info'
        message='info'
      />
      <AruiAlert
        style={{
          position: 'relative',
          transform: 'unset',
          left: 0,
          bottom: 0,
          margin: 10
        }}
        severity='warning'
        message='warning'
      />
      <AruiAlert
        style={{
          position: 'relative',
          transform: 'unset',
          left: 0,
          bottom: 0,
          margin: 10
        }}
        severity='success'
        message='success'
      />
      <AruiAlert
        style={{
          position: 'relative',
          transform: 'unset',
          left: 0,
          bottom: 0,
          margin: 10
        }}
        severity='error'
        message='error'
      />
    </Box>
  )
}

export const AlertColorBase: Story<AlertBasicProps> = () => {
  return (
    <Box display='flex' justifyContent='center' flexDirection='column'>
      <AruiAlert
        style={{
          position: 'relative',
          transform: 'unset',
          left: 0,
          bottom: 0,
          margin: 10
        }}
        colorBase='light'
        onClose={() => {}}
        message='light'
      />
      <AruiAlert
        style={{
          position: 'relative',
          transform: 'unset',
          left: 0,
          bottom: 0,
          margin: 10
        }}
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
