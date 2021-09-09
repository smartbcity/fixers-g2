import React from 'react'
import {
  ProgressIndicator as AruiProgressIndicator,
  ProgressIndicatorProps
} from './ProgressIndicator'
import { Meta } from '@storybook/react'
import { Story } from '@storybook/react/types-6-0'
import { withDesign } from 'storybook-addon-designs'
import { classes, styles } from './docs'

export default {
  title: 'Notifications/ProgressIndicator',
  component: AruiProgressIndicator,
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/4Nl4422AUGHNVClZOHzPg8/SmartB-UI-kit?node-id=210%3A410'
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

export const ProgressIndicator: Story<ProgressIndicatorProps> = (
  args: ProgressIndicatorProps
) => <AruiProgressIndicator {...args} />

ProgressIndicator.args = {
  value: 30
}

ProgressIndicator.storyName = 'ProgressIndicator'
