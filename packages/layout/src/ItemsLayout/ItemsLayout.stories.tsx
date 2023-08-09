import React from 'react'
import {
  ItemsLayout as AruiItemsLayout,
  ItemsLayoutBasicProps
} from './ItemsLayout'
import { Meta, StoryFn } from '@storybook/react'
import defaultLogo from '../assets/impactcity-logo-2.png'
import { styles, classes, Menu } from './types'

export default {
  title: 'Layout/ItemsLayout',
  component: AruiItemsLayout,
  argTypes: {
    menu: {
      table: {
        type: {
          summary: 'Menu',
          detail: Menu
        }
      },
      control: null
    },
    classes: {
      table: {
        type: {
          summary: 'ItemsLayoutClasses',
          detail: classes
        }
      }
    },
    styles: {
      table: {
        type: {
          summary: 'ItemsLayoutStyles',
          detail: styles
        }
      }
    }
  }
} as Meta

const Template: StoryFn<ItemsLayoutBasicProps> = (
  args: ItemsLayoutBasicProps
) => <AruiItemsLayout {...args} />

export const ItemsLayout = Template.bind({})
ItemsLayout.args = {
  display: 'list',
  menu: {
    items: [
      {
        key: 'key1',
        goto: () => {},
        label: 'Section 1',
        icon: (
          <img
            style={{ width: '60px', height: '60px' }}
            src={defaultLogo}
            alt='smart b'
          />
        )
      },
      {
        key: 'key2',
        goto: () => {},
        label: 'Section 2',
        icon: (
          <img
            style={{ width: '60px', height: '60px' }}
            src={defaultLogo}
            alt='smart b'
          />
        )
      },
      {
        key: 'key3',
        goto: () => {},
        label: 'Section 3',
        icon: (
          <img
            style={{ width: '60px', height: '60px' }}
            src={defaultLogo}
            alt='smart b'
          />
        )
      }
    ]
  }
}

ItemsLayout.storyName = 'ItemsLayout'
