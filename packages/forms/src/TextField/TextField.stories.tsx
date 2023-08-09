import { Meta, StoryFn } from '@storybook/react'
import React, { useState } from 'react'
import { TextField, TextFieldProps } from './TextField'
import { TextFieldClasses, TextFieldStyles } from './docs'
import { Box, Typography } from '@mui/material'
import { CreditCard } from '@mui/icons-material'
import { withDesign } from 'storybook-addon-designs'

export default {
  title: 'Forms/TextField',
  component: TextField,
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kgphqh0uVhoXt8TK3LlkGj/G2-%2F-Design-System?node-id=1014%3A1027'
    }
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

export const TextFieldStory: StoryFn<TextFieldProps> = (
  args: TextFieldProps
) => {
  const [value, setValue] = useState('')
  return (
    <TextField
      value={value}
      onChange={setValue}
      onRemove={() => setValue('')}
      {...args}
    />
  )
}

export const TextFieldSizes: StoryFn<TextFieldProps> = () => {
  return (
    <Box display='flex' flexDirection='column' alignItems='center'>
      <TextField
        placeholder='small'
        id='smallTextField'
        size='small'
        style={{ width: 350, margin: 20 }}
      />
      <TextField
        placeholder='medium'
        id='mediumTextField'
        size='medium'
        style={{ width: 350, margin: 20 }}
      />
      <TextField
        placeholder='large'
        id='largeTextField'
        size='large'
        style={{ width: 350, margin: 20 }}
      />
    </Box>
  )
}

export const TextFieldStates: StoryFn<TextFieldProps> = () => {
  return (
    <Box display='flex' flexDirection='column' alignItems='center'>
      <TextField
        value='error'
        id='errorTextField'
        error
        errorMessage='A custom error message'
        style={{ width: 350, margin: 20 }}
      />
      <TextField
        placeholder='validated'
        id='validatedTextField'
        validated
        style={{ width: 350, margin: 20 }}
      />
      <TextField
        placeholder='loading'
        id='validatedTextField'
        searchLoading
        style={{ width: 350, margin: 20 }}
      />
      <TextField
        placeholder='disabled'
        id='disabledTextField'
        disabled
        style={{ width: 350, margin: 20 }}
      />
    </Box>
  )
}

export const SerchTextField: StoryFn<TextFieldProps> = () => {
  const [value, setValue] = useState('')
  const [search, setSearch] = useState(undefined)
  const asyncFucntion = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('resolved')
      }, 2000)
    })
  }

  return (
    <Box display='flex' flexDirection='column' alignItems='center'>
      <TextField
        placeholder='search something here'
        value={value}
        onChange={(value) => setValue(value)}
        onSearch={async () => {
          await asyncFucntion()
          setSearch(value)
        }}
        onRemove={() => setValue('')}
        id='searchTextField'
        textFieldType='search'
        style={{ width: 350, margin: 20 }}
      />
      {search && <Typography>You searched: {search}</Typography>}
    </Box>
  )
}

export const CustomIcon: StoryFn<TextFieldProps> = () => {
  return (
    <Box display='flex' flexDirection='column' alignItems='center'>
      <TextField
        inputIcon={<CreditCard />}
        id='creditTextField'
        iconPosition='start'
        placeholder='Add your credit card informations'
        style={{ width: 350, margin: 20 }}
      />
      <TextField
        inputIcon={'€'}
        iconPosition='end'
        placeholder='The amount you want to pay'
        id='paymentTextField'
        style={{ width: 350, margin: 20 }}
      />
    </Box>
  )
}

TextFieldStory.args = {
  placeholder: 'Type something here...'
}

TextFieldStory.storyName = 'TextField'
TextFieldSizes.storyName = 'All the sizes of the TextField'
SerchTextField.storyName = 'The search type TextField'
TextFieldStates.storyName = 'The TextField states'
CustomIcon.storyName = 'TextFields with custom icon'
