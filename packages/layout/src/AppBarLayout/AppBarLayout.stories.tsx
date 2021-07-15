import React from 'react'
import {
  AppBarLayout as AruiAppBarLayout,
  AppBarLayoutBasicProps
} from './AppBarLayout'
import { Meta } from '@storybook/react'
import { Story } from '@storybook/react/types-6-0'
import { styles, classes } from './types'
import { ArgsTable, PRIMARY_STORY } from '@storybook/addon-docs'

export default {
  title: 'Layout/AppBarLayout',
  component: AruiAppBarLayout,
  parameters: {
    docs: {
      page: () => (
        <>
          <ArgsTable story={PRIMARY_STORY} />
        </>
      )
    }
  },
  argTypes: {
    classes: {
      table: {
        type: {
          summary: 'AppBarLayoutClasses',
          detail: classes
        }
      }
    },
    styles: {
      table: {
        type: {
          summary: 'AppBarLayoutStyles',
          detail: styles
        }
      }
    }
  }
} as Meta

const Template: Story<AppBarLayoutBasicProps> = (
  args: AppBarLayoutBasicProps
) => <AruiAppBarLayout {...args}></AruiAppBarLayout>

export const AppBarLayout = Template.bind({})
AppBarLayout.args = {
  onDrawerOpen: () => {},
  children: 'Some content'
}
AppBarLayout.storyName = 'AppBarLayout'
