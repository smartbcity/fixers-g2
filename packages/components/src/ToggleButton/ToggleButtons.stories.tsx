import React, { useState } from 'react'
import {
  ToggleButtons as AruiToggleButtons,
  ToggleButtonsBasicProps
} from './ToggleButtons'
import { Meta, StoryFn } from '@storybook/react'
import { classes, styles } from './types'

export default {
  title: 'Components/ToggleButtons',
  component: AruiToggleButtons,
  argTypes: {
    classes: {
      table: {
        type: {
          summary: 'TicketClasses',
          detail: classes
        }
      }
    },
    styles: {
      table: {
        type: {
          summary: 'TicketStyles',
          detail: styles
        }
      }
    }
  }
} as Meta

export const ToggleButtons: StoryFn<ToggleButtonsBasicProps> = (
  args: ToggleButtonsBasicProps
) => {
  const [value, setvalue] = useState<
    string | number | (string | number)[] | undefined
  >(undefined)
  return (
    <AruiToggleButtons
      value={value}
      values={value}
      onChangeExclusive={(_, value) => setvalue(value)}
      onChangeNonExclusive={(_, values) => setvalue(values)}
      {...args}
    />
  )
}

ToggleButtons.args = {
  options: [
    {
      key: '1',
      content: 'Choice 1'
    },
    {
      key: '2',
      content: 'Choice 2'
    },
    {
      key: '3',
      content: 'Choice 3'
    }
  ]
}

ToggleButtons.storyName = 'ToggleButtons'
