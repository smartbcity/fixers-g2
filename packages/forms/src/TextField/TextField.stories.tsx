import { Meta } from '@storybook/react'
import React, { useState } from 'react'
import { TextField, TextFieldProps } from './TextField'
import { Story } from "@storybook/react/types-6-0";
import { TextFieldClasses, TextFieldStyles } from './docs'
import { Box, Typography } from '@material-ui/core';
import { CreditCard } from '@material-ui/icons';
import { withDesign } from 'storybook-addon-designs'

export default {
  title: 'Forms/TextField',
  component: TextField,
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/4Nl4422AUGHNVClZOHzPg8/SmartB-UI-kit?node-id=210%3A45',
    },
  },
  argTypes: {
    classes: {
      table: {
        type: {
          summary: 'TextFieldClasses',
          detail: TextFieldClasses
        }
      }
    },
    styles: {
      table: {
        type: {
          summary: 'TextFieldStyles',
          detail: TextFieldStyles
        }
      }
    }
  }
} as Meta

export const TextFieldStory: Story<TextFieldProps> = (args: TextFieldProps) => {

  return (
    <TextField
      {...args}
    />
  )
}

export const TextFieldSizes: Story<TextFieldProps> = () => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <TextField
        placeholder="small"
        id="smallTextField"
        size="small"
        style={{ width: 350, margin: 20 }}
      />
      <TextField
        placeholder="medium"
        id="mediumTextField"
        size="medium"
        style={{ width: 350, margin: 20 }}
      />
      <TextField
        placeholder="large"
        id="largeTextField"
        size="large"
        style={{ width: 350, margin: 20 }}
      />
    </Box>
  )
}

export const TextFieldStates: Story<TextFieldProps> = () => {

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <TextField
        value="error"
        id="errorTextField"
        error
        errorMessage="A custom error message"
        style={{ width: 350, margin: 20 }}
      />
      <TextField
        placeholder="validated"
        id="validatedTextField"
        validated
        style={{ width: 350, margin: 20 }}
      />
      <TextField
        placeholder="disabled"
        id="disabledTextField"
        disabled
        style={{ width: 350, margin: 20 }}
      />
    </Box>
  )
}

export const SerchTextField: Story<TextFieldProps> = () => {

  const [value, setValue] = useState("")
  const [search, setSearch] = useState(undefined)

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <TextField
        placeholder="search something here"
        value={value}
        onChange={(value) => setValue(value)}
        onSearch={() => setSearch(value)}
        onRemove={() => setValue('')}
        id="searchTextField"
        textFieldType="search"
        style={{ width: 350, margin: 20 }}
      />
      {search && <Typography>You searched: {search}</Typography>}
    </Box>
  )
}

export const CustomIcon: Story<TextFieldProps> = () => {

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <TextField
        inputIcon={<CreditCard />}
        id="creditTextField"
        placeholder="Add your credit card informations"
        style={{ width: 350, margin: 20 }}
      />
      <TextField
        inputIcon={'€'}
        iconPosition="end"
        placeholder="The amount you want to pay"
        id="paymentTextField"
        style={{ width: 350, margin: 20 }}
      />
    </Box>
  )
}

TextFieldStory.args = {
  placeholder: 'Type something here...'
}

TextFieldStory.storyName = "TextField"
TextFieldSizes.storyName = "All the sizes of the TextField"
SerchTextField.storyName = "The search type TextField"
TextFieldStates.storyName = "The TextField states"
CustomIcon.storyName = "TextFields with custom icon"
