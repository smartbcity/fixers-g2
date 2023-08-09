import React from 'react'
import { TabsMenu as AruiTabsMenu, TabsMenuProps } from './TabsMenu'
import { Meta, StoryFn } from '@storybook/react'
import { styles, classes, Tab } from './types'

export default {
  title: 'Layout/TabsMenu',
  component: AruiTabsMenu,
  argTypes: {
    tabs: {
      table: {
        type: {
          summary: 'Tab[]',
          detail: Tab
        }
      }
    },
    classes: {
      table: {
        type: {
          summary: 'TabsMenuClasses',
          detail: classes
        }
      }
    },
    styles: {
      table: {
        type: {
          summary: 'PopUpStyles',
          detail: styles
        }
      }
    }
  }
} as Meta

const Template: StoryFn<TabsMenuProps> = (args: TabsMenuProps) => (
  <AruiTabsMenu {...args} />
)

export const TabsMenu = Template.bind({})
TabsMenu.args = {
  variant: 'fullWidth',
  tabs: [{ label: 'section1' }, { label: 'section2' }],
  children: ['Content 1', 'Content 2']
}

TabsMenu.storyName = 'TabsMenu'
