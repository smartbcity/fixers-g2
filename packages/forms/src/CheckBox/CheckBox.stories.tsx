import React, { useState } from 'react'
import {CheckBox, CheckBoxBasicProps} from './CheckBox'
import { Meta } from '@storybook/react'
import {Story} from "@storybook/react/types-6-0";
import {CheckBoxClasses, CheckBoxStyles} from './docs'
import { Box } from  '@mui/material';
import { withDesign } from 'storybook-addon-designs'

export default {
  title: 'Forms/CheckBox',
  component: CheckBox,
  decorators:[withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/4Nl4422AUGHNVClZOHzPg8/SmartB-UI-kit?node-id=208%3A107',
    },
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

export const CheckBoxStory: Story<CheckBoxBasicProps> = (args: CheckBoxBasicProps) => {

  return (
    <CheckBox
      {...args}
    />
  )
}

export const CheckBoxStates: Story<CheckBoxBasicProps> = () => {

  const [checked, setChecked] = useState(false)

  return (
    <Box display="flex" justifyContent="space-around" alignItems="center">
      <CheckBox
        label="Normal"
        checked={checked}
        onChange={()=> setChecked(!checked)}
      />
       <CheckBox
        label="Disabled"
        checked={checked}
        onChange={()=> setChecked(!checked)}
        disabled
      />
      <CheckBox
        label="Unvalid"
        checked={checked}
        onChange={()=> setChecked(!checked)}
        error
        errorMessage="there is an error"
      />
    </Box>
  )
}

CheckBoxStory.args = {
  label: 'CA Checkbox'
}

CheckBoxStory.storyName = "CheckBox"
CheckBoxStates.storyName = "All the states of the CheckBox"
