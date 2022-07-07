import React, { useState } from 'react'
import { InputLabeled, InputLabeledBasicProps } from './InputLabeled'
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
import { Box, Typography } from '@mui/material'
import { InputLabeledClasses, InputLabeledStyles } from './docs'

export default {
  title: 'Forms/InputLabeled',
  component: InputLabeled,
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
          <Typography variant='body2' style={{ marginBottom: '5px' }}>
            -{' '}
            <LinkTo kind='Forms' story='RadioChoices'>
              RadioChoices
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
          summary: 'InputLabeledClasses',
          detail: InputLabeledClasses
        }
      }
    },
    styles: {
      table: {
        type: {
          summary: 'InputLabeledStyles',
          detail: InputLabeledStyles
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

export const InputLabeledStory: Story<InputLabeledBasicProps> = (
  args: InputLabeledBasicProps
) => {
  return <InputLabeled {...args} style={{ width: '500px' }} />
}

export const InputLabeledReadonly: Story<InputLabeledBasicProps> = (
  args: InputLabeledBasicProps
) => {
  return (
    <InputLabeled
      {...args}
      label='Readonly input'
      value='My value'
      inputType='textField'
      style={{ width: '500px' }}
      readonly
    />
  )
}

export const InputLabeledReadonlyChip: Story<InputLabeledBasicProps> = (
  args: InputLabeledBasicProps
) => {
  return (
    <InputLabeled
      label='Readonly input chip'
      value='My value'
      inputType='textField'
      style={{ width: '500px' }}
      readonly
      readonlyType='chip'
      getReadonlyChipColor={() => '#E56643'}
    />
  )
}

export const InputLabeledLoading: Story<InputLabeledBasicProps> = (
  args: InputLabeledBasicProps
) => {
  return (
    <InputLabeled
      label='Loading input'
      value='My value'
      style={{ width: '500px' }}
      isLoading
    />
  )
}

export const FormExample: Story<InputLabeledBasicProps> = () => {
  const [form, setform] = useState({
    email: '',
    password: '',
    gender: '',
    birthday: undefined,
    nationality: 'fr'
  })
  return (
    <Box display='flex' flexDirection='column' alignItems='center'>
      <InputLabeled
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
      <InputLabeled
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
      <InputLabeled
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
      <InputLabeled
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
      <InputLabeled
        value={form.nationality}
        label='nationality:'
        inputType='radioChoices'
        onChange={(_: React.ChangeEvent<HTMLInputElement>, value: string) =>
          setform({ ...form, nationality: value })
        }
        choices={[
          { key: 'fr', label: 'I have the french nationnality' },
          { key: 'other', label: "I don't have the french nationnality" }
        ]}
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

InputLabeledStory.args = {
  label: 'un input:',
  id: 'InputLabeledExample',
  inputType: 'textField'
}

InputLabeledStory.storyName = 'InputLabeled'
FormExample.storyName = 'Form example'
