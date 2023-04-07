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
import { Box, Stack, Typography } from '@mui/material'
import { StatusTag } from '@smartb/g2-notifications'
import { InputFormClasses, InputFormStyles } from './docs'
import { Option } from '../Select'

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

export const InputFormReadOnly: Story<InputFormBasicProps> = (
  args: InputFormBasicProps
) => {
  return (
    <InputForm
      {...args}
      label='ReadOnly input'
      value='My value'
      inputType='textField'
      style={{ width: '500px' }}
      readOnly
    />
  )
}

export const InputFormReadOnlyChip: Story<InputFormBasicProps> = (
  args: InputFormBasicProps
) => {
  return (
    <InputForm
      label='ReadOnly input chip'
      value='My value'
      inputType='textField'
      style={{ width: '500px' }}
      readOnly
      readOnlyType='chip'
      getReadOnlyChipColor={() => '#E56643'}
    />
  )
}

const CustomStatusTag = ({ values }) => {
  return (
    <Stack>
      {values.map((value: Option) => (
        <StatusTag label={value.label} />
      ))}
    </Stack>
  )
}

export const InputFormReadOnlyCustom: Story<InputFormBasicProps> = (
  args: InputFormBasicProps
) => {
  return (
    <InputForm
      inputType='select'
      label='ReadOnly input chip'
      values={['status1', 'status2']}
      options={[
        {
          key: 'status1',
          label: 'Started'
        },
        {
          key: 'status2',
          label: 'Done dzsqf qsdf azef azef qsd fazrg azegh azrhazdhazer'
        }
      ]}
      multiple
      style={{ width: '500px' }}
      readOnly
      readOnlyType='customContainer'
      readOnlyElement={CustomStatusTag}
      getReadOnlyChipColor={() => '#E56643'}
    />
  )
}

export const InputFormLoading: Story<InputFormBasicProps> = (
  args: InputFormBasicProps
) => {
  return (
    <InputForm
      inputType='textField'
      label='Loading input'
      value='My value'
      style={{ width: '500px' }}
      isLoading
    />
  )
}

export const FormExample: Story<InputFormBasicProps> = () => {
  const [form, setform] = useState({
    email: '',
    password: '',
    gender: '',
    birthday: undefined,
    nationality: 'fr',
    cookies: []
  })
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
        orientation='horizontal'
        style={{
          width: '400px',
          margin: '20px'
        }}
        styles={{ input: { width: '60%', flexGrow: 0 } }}
      />
      <InputForm
        value={form.password}
        onChange={(value) => setform({ ...form, password: value })}
        onRemove={() => setform({ ...form, password: '' })}
        label='password:'
        id='FormExamplePassword'
        inputType='textField'
        textFieldType='password'
        orientation='horizontal'
        style={{
          width: '400px',
          margin: '20px'
        }}
        styles={{ input: { width: '60%', flexGrow: 0 } }}
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
        orientation='horizontal'
        style={{
          width: '400px',
          margin: '20px'
        }}
        styles={{ input: { width: '60%', flexGrow: 0 } }}
      />
      <InputForm
        value={form.birthday}
        label='birthday:'
        inputType='datePicker'
        onChangeDate={(date) => setform({ ...form, birthday: date })}
        placeholder='Choose your birthday'
        orientation='horizontal'
        style={{
          width: '400px',
          margin: '20px'
        }}
        styles={{ input: { width: '60%', flexGrow: 0 } }}
      />
      <InputForm
        value={form.nationality}
        label='nationality:'
        inputType='radioChoices'
        onChange={(value: string) => setform({ ...form, nationality: value })}
        choices={[
          { key: 'fr', label: 'I have the french nationnality' },
          { key: 'other', label: "I don't have the french nationnality" }
        ]}
        style={{
          width: '400px',
          margin: '20px'
        }}
      />
      <InputForm
        values={form.cookies}
        label='which cookie do you accept:'
        inputType='multiChoices'
        onChange={(values) => setform({ ...form, cookies: values })}
        options={[
          {
            key: 'statistics',
            label: 'I accept all the cookies for the statistics'
          },
          {
            key: 'analitics',
            label: 'I accept all the cookies for the analitics'
          },
          {
            key: 'essential',
            label: 'I accept the essential cookies for the platform'
          }
        ]}
        style={{
          width: '400px',
          margin: '20px'
        }}
      />
    </Box>
  )
}

InputFormStory.args = {
  label: 'un input:',
  id: 'InputFormExample',
  inputType: 'textField'
}

InputFormStory.storyName = 'InputForm'
FormExample.storyName = 'Form example'
