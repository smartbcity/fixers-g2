import React from 'react'
import { AlertHub as AruiAlertHub, AlertHubProps } from './AlertHub'
import { Meta } from '@storybook/react'
import { Story } from '@storybook/react/types-6-0'
import { withDesign } from 'storybook-addon-designs'
import { Box } from '@material-ui/core'
import { useAlertHub } from './useAlertHub'
import { Button } from '../Buttons'

export default {
  title: 'Components/AlertHub',
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
    //@ts-ignore
    pushAlert({ message: 'hello' })
  }

  const handleClickSuccess = () => {
    //@ts-ignore
    pushAlert({ message: 'hello', severity: 'success' })
  }

  return (
    <React.Fragment>
      <Button onClick={handleClick}>Show snackbar</Button>
      <Button onClick={handleClickSuccess}>Show success snackbar</Button>
    </React.Fragment>
  )
}

export const AlertHub: Story<AlertHubProps> = (args: AlertHubProps) => {
  return (
    <AruiAlertHub {...args}>
      <Example />
    </AruiAlertHub>
  )
}

AlertHub.storyName = 'AlertHub'
