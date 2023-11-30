import React, { useState } from 'react'
import { CheckBox, CheckBoxBasicProps } from './CheckBox'
import { Meta, StoryFn } from '@storybook/react'
import { CheckBoxClasses, CheckBoxStyles } from './docs'
import { Box } from '@mui/material'

export default {
  title: 'Forms/CheckBox',
  component: CheckBox,

  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kgphqh0uVhoXt8TK3LlkGj/G2-%2F-Design-System?node-id=1014%3A955'
    }
  },
  argTypes: {
    classes: {
      table: {
        type: {
          summary: 'CheckBoxClasses',
          detail: CheckBoxClasses
        }
      }
    },
    styles: {
      table: {
        type: {
          summary: 'CheckBoxStyles',
          detail: CheckBoxStyles
        }
      }
    }
  }
} as Meta

export const CheckBoxStory: StoryFn<CheckBoxBasicProps> = (
  args: CheckBoxBasicProps
) => {
  return <CheckBox {...args} />
}

export const CheckBoxStates: StoryFn<CheckBoxBasicProps> = () => {
  const [checked, setChecked] = useState(false)

  return (
    <Box display='flex' justifyContent='space-around' alignItems='center'>
      <CheckBox
        label='Normal'
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
      <CheckBox
        label='Disabled'
        checked={checked}
        onChange={() => setChecked(!checked)}
        disabled
      />
      <CheckBox
        label='Unvalid'
        checked={checked}
        onChange={() => setChecked(!checked)}
        error
        errorMessage='there is an error'
      />
    </Box>
  )
}

CheckBoxStory.args = {
  label: 'CA Checkbox'
}

CheckBoxStory.storyName = 'CheckBox'
CheckBoxStates.storyName = 'All the states of the CheckBox'
