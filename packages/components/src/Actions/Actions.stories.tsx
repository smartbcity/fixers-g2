import React from 'react'
import { Actions as AruiActions, ActionsBasicProps } from './Actions'
import { Meta } from '@storybook/react'
import { Story } from '@storybook/react/types-6-0'
import { withDesign } from 'storybook-addon-designs'

export default {
  title: 'Components/Actions',
  component: AruiActions,
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kgphqh0uVhoXt8TK3LlkGj/G2-%2F-Design-System?node-id=1014%3A871'
    }
  }
} as Meta

const Template: Story<ActionsBasicProps> = (args: ActionsBasicProps) => (
  <AruiActions {...args} />
)

export const Actions = Template.bind({})
Actions.args = {
  actions: [
    {
      key: 'action1',
      label: 'Action1'
    },
    {
      key: 'action2',
      label: 'Action2'
    }
  ]
}
Actions.storyName = 'Actions'
