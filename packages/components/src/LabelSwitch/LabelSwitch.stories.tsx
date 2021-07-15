import React, { useState } from 'react'
import {
  LabelSwitch as AruiLabelSwitch,
  LabelSwitchBasicProps,
  Label
} from './LabelSwitch'
import { Meta } from '@storybook/react'
import { Story } from '@storybook/react/types-6-0'
import { withDesign } from 'storybook-addon-designs'
import { styles, classes } from './docs'

export default {
  title: 'Components/LabelSwitch',
  component: AruiLabelSwitch,
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/4Nl4422AUGHNVClZOHzPg8/SmartB-UI-kit?node-id=276%3A0'
    }
  },
  argTypes: {
    classes: {
      table: {
        type: {
          summary: 'LabelSwitchClasses',
          detail: classes
        }
      }
    },
    styles: {
      table: {
        type: {
          summary: 'LabelSwitchStyles',
          detail: styles
        }
      }
    }
  }
} as Meta

export const LabelSwitch: Story<LabelSwitchBasicProps> = (
  args: LabelSwitchBasicProps
) => {
  const [labelValue, setlabelValue] = useState('3Month')
  return (
    <AruiLabelSwitch
      {...args}
      onLabelChange={setlabelValue}
      selectedLabelValue={labelValue}
    />
  )
}

const labels: Label[] = [
  {
    name: 'Month',
    value: 'Month',
    key: 'LabelSwitch_month'
  },
  {
    name: '3 months',
    value: '3Month',
    key: 'LabelSwitch_3month'
  },
  {
    name: 'Year',
    value: 'Year',
    key: 'LabelSwitch_year'
  },
  {
    name: 'All',
    value: 'All',
    key: 'LabelSwitch_all'
  }
]

LabelSwitch.args = {
  labels: labels
}

LabelSwitch.storyName = 'LabelSwitch'
