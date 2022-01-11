import React from 'react'
import { MenuBasicProps, Menu as AruiMenu } from './Menu'
import { Meta } from '@storybook/react'
import { Story } from '@storybook/react/types-6-0'
import { withDesign } from 'storybook-addon-designs'

export default {
  title: 'Components/Menu',
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kgphqh0uVhoXt8TK3LlkGj/G2-%2F-Design-System?node-id=1014%3A580'
    }
  },
  component: AruiMenu
} as Meta

const Template: Story<MenuBasicProps> = (args: MenuBasicProps) => (
  <AruiMenu {...args} />
)

export const Menu = Template.bind({})
Menu.args = {
  menu: [
    {
      key: 'key1',
      goto: () => {},
      label: 'Section 1'
    },
    {
      key: 'key2',
      goto: () => {},
      label: 'Section 2',
      isSelected: true,
      items: [
        {
          key: 'key2-key3',
          goto: () => {},
          label: 'Section 3',
          isSelected: true
        },
        {
          key: 'key2-key4',
          goto: () => {},
          label: 'Section 4'
        }
      ]
    },
    {
      key: 'key5',
      goto: () => {},
      label: 'Section 5'
    }
  ]
}

Menu.storyName = 'Menu'
