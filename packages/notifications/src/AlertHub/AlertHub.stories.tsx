import React from 'react'
import { AlertHub as AruiAlertHub, AlertHubProps } from './AlertHub'
import { Meta, StoryFn } from '@storybook/react'
import { withDesign } from 'storybook-addon-designs'
import { useAlertHub } from './useAlertHub'
import { Button } from '@smartb/g2-components'

export default {
  title: 'Notifications/AlertHub',
  component: AruiAlertHub,
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/Ruq4cXc1frJJ5qVtLtnqje/SmartB-UI-kit?node-id=210%3A435'
    }
  }
} as Meta

function Example() {
  const { pushAlert } = useAlertHub()

  const handleClick = () => {
    pushAlert({ message: 'hello' })
  }

  const handleClickSuccess = () => {
    pushAlert({ message: 'hello', severity: 'success' })
  }

  return (
    <React.Fragment>
      <Button onClick={handleClick}>Show snackbar</Button>
      <Button onClick={handleClickSuccess}>Show success snackbar</Button>
    </React.Fragment>
  )
}

export const AlertHub: StoryFn<AlertHubProps> = (args: AlertHubProps) => {
  return (
    <AruiAlertHub {...args}>
      <Example />
    </AruiAlertHub>
  )
}

AlertHub.storyName = 'AlertHub'
