import React from 'react'
import { MenuBasicProps, Menu as AruiMenu } from './Menu'
import { Meta } from '@storybook/react'
import { Story } from '@storybook/react/types-6-0'

export default {
  title: 'Components/Menu',
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
