import React from 'react'
import {
  ProgressIndicator as AruiProgressIndicator,
  ProgressIndicatorProps
} from './ProgressIndicator'
import { Meta, StoryFn } from '@storybook/react'
import { withDesign } from 'storybook-addon-designs'
import { classes, styles } from './docs'

export default {
  title: 'Notifications/ProgressIndicator',
  component: AruiProgressIndicator,
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kgphqh0uVhoXt8TK3LlkGj/G2-%2F-Design-System?node-id=1017%3A1677'
    }
  },
  argTypes: {
    classes: {
      table: {
        type: {
          summary: 'ProgressIndicatorClasses',
          detail: classes
        }
      }
    },
    styles: {
      table: {
        type: {
          summary: 'ProgressIndicatorStyles',
          detail: styles
        }
      }
    }
  }
} as Meta

export const ProgressIndicator: StoryFn<ProgressIndicatorProps> = (
  args: ProgressIndicatorProps
) => <AruiProgressIndicator {...args} />

ProgressIndicator.args = {
  value: 30
}

ProgressIndicator.storyName = 'ProgressIndicator'
