import React from 'react'
import {
  StatusTag as AruiStatusTag,
  StatusTagBasicProps
} from './StatusTag'
import { Meta } from '@storybook/react'
import { Story } from '@storybook/react/types-6-0'
import { withDesign } from 'storybook-addon-designs'
import { Box } from '@material-ui/core'

export default {
  title: 'Notifications/StatusTag',
  component: AruiStatusTag,
  decorators:[withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/4Nl4422AUGHNVClZOHzPg8/SmartB-UI-kit?node-id=248%3A3',
    },
  }
} as Meta

export const StatusTag: Story<StatusTagBasicProps> = (args: StatusTagBasicProps) => {
  return (
    <AruiStatusTag {...args}/>
  )
}

StatusTag.args = {
  label: "Status"
}

StatusTag.storyName = 'StatusTag'

export const StatusVariant: Story<StatusTagBasicProps> = () => {
  return (
    <Box display="flex" justifyContent="space-around">
      <AruiStatusTag label="info" variant="info"/>
      <AruiStatusTag label="error" variant="error"/>
      <AruiStatusTag label="success" variant="success"/>
      <AruiStatusTag label="warning" variant="warning"/>
      <AruiStatusTag label="custom color" customColor="#9FB0C9"/>
    </Box>
  )
}

