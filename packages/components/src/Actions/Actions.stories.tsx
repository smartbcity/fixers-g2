import React, { useState } from 'react'
import { Actions as AruiActions, ActionsBasicProps } from './Actions'
import { Meta, StoryFn } from '@storybook/react'
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

const Template: StoryFn<ActionsBasicProps> = (args: ActionsBasicProps) => (
  <AruiActions {...args} />
)

export const Actions = Template.bind({})
Actions.args = {
  // actions: [
  //   {
  //     key: 'action1',
  //     label: 'Action1'
  //   },
  //   {
  //     key: 'action2',
  //     label: 'Cancel',
  //     variant: 'cancellation'
  //   },
  //   {
  //     key: 'action2',
  //     label: 'Delete',
  //     variant: 'deletion'
  //   }
  // ]
}
Actions.storyName = 'Actions'

export const ActionsDisable: StoryFn<ActionsBasicProps> = () => {
  const [enable, setEnable] = useState(false)
  const word = enable ? 'disable' : 'enable'
  return (
    <AruiActions
      actions={[
        {
          key: 'action2',
          label: 'Second Action',
          showIf: () => enable
        },
        {
          key: 'action1',
          label: `Click to ${word} second action`,
          showIf: () => true,
          onClick: () => setEnable(!enable)
        }
      ]}
    />
  )
}
