import React, { useState } from 'react'
import { InputForm, InputFormBasicProps } from './InputForm'
import { Meta } from '@storybook/react'
import { Story } from '@storybook/react/types-6-0'
import {
  ArgsTable,
  PRIMARY_STORY,
  Subtitle,
  Primary,
  Description,
  Stories
} from '@storybook/addon-docs'
import LinkTo from '@storybook/addon-links/react'
import { Box, Typography } from '@material-ui/core'
import { InputFormClasses, InputFormStyles } from './docs'

export default {
  title: 'Forms/InputForm',
  component: InputForm,
  parameters: {
    docs: {
      page: () => (
        <>
          <Primary />
          <Description>
            This components is made to add an input with a label in a form. You
            can easily switch between the two types of inputs that are sharing
            props together.
          </Description>
          <Description>
            The following props are only the inputForm props plus the props in
            common between the textfield and the select if you want to see all
            the props of every one of them please see the references below.
          </Description>
          <ArgsTable story={PRIMARY_STORY} />
          <Subtitle>References</Subtitle>
          <Typography variant='body2' style={{ marginBottom: '5px' }}>
            -{' '}
            <LinkTo kind='Forms' story='Select'>
              Select
            </LinkTo>
          </Typography>
          <Typography variant='body2' style={{ marginBottom: '5px' }}>
            -{' '}
            <LinkTo kind='Forms' story='TextField'>
              TextField
            </LinkTo>
          </Typography>
          <Typography variant='body2' style={{ marginBottom: '5px' }}>
            -{' '}
            <LinkTo kind='Forms' story='DatePicker'>
              DatePicker
            </LinkTo>
          </Typography>
          <Stories />
        </>
      )
    }
  },
  argTypes: {
    classes: {
      table: {
        type: {
          summary: 'InputFormClasses',
          detail: InputFormClasses
        }
      }
    },
    styles: {
      table: {
        type: {
          summary: 'InputFormStyles',
          detail: InputFormStyles
        }
      }
    },
    inputClasses: {
      table: {
        type: {
          summary: 'SelectClasses | TextFieldClasses'
        }
      }
    },
    inputStyles: {
      table: {
        type: {
          summary: 'SelectStyles | TextFieldStyles'
        }
      }
    }
  }
} as Meta

export const InputFormStory: Story<InputFormBasicProps> = (
  args: InputFormBasicProps
) => {
  return <InputForm {...args} style={{ width: '500px' }} />
}

export const FormExample: Story<InputFormBasicProps> = () => {
  const [form, setform] = useState({ email: '', password: '', gender: '', birthday: undefined })
  return (
    <Box display='flex' flexDirection='column' alignItems='center'>
      <InputForm
        label='email:'
        value={form.email}
        onChange={(value) => setform({ ...form, email: value })}
        onRemove={() => setform({ ...form, email: '' })}
        id='FormExampleEmail'
        inputType='textField'
        textFieldType='email'
        placeholder='example@gmail.com'
        style={{
          width: '400px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: '20px'
        }}
        styles={{ label: { marginBottom: '0px' }, input: { width: '60%' } }}
      />
      <InputForm
        value={form.password}
        onChange={(value) => setform({ ...form, password: value })}
        onRemove={() => setform({ ...form, password: '' })}
        label='password:'
        id='FormExamplePassword'
        inputType='textField'
        textFieldType='password'
        style={{
          width: '400px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: '20px'
        }}
        styles={{ label: { marginBottom: '0px' }, input: { width: '60%' } }}
      />
      <InputForm
        value={form.gender}
        label='gender:'
        inputType='select'
        onChangeValue={(value) => setform({ ...form, gender: value })}
        options={[
          { key: 'male', label: 'Male' },
          { key: 'female', label: 'Female' }
        ]}
        placeholder='chosse your gender'
        style={{
          width: '400px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: '20px'
        }}
        styles={{ label: { marginBottom: '0px' }, input: { width: '60%' } }}
      />
      <InputForm
        value={form.birthday}
        label='birthday:'
        inputType='datePicker'
        onChangeDate={(date) => setform({ ...form, birthday: date })}
        placeholder='Choose your birthday'
        style={{
          width: '400px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: '20px'
        }}
        styles={{ label: { marginBottom: '0px' }, input: { width: '60%' } }}
      />
    </Box>
  )
}

InputFormStory.args = {
  label: 'un input:',
  id: 'InputFormExample'
}

InputFormStory.storyName = 'InputForm'
FormExample.storyName = 'Form example'
