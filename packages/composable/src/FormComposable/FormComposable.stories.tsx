import React from 'react'
import { Meta } from '@storybook/react'
import { Story } from '@storybook/react/types-6-0'
import {
  ArgsTable,
  PRIMARY_STORY,
  Primary,
  Description,
  Stories
} from '@storybook/addon-docs'
import { FormComposable, FormComposableProps } from './FormComposable'
import { useFormComposable } from './useFormComposable'
import { FormAction } from '@smartb/g2-forms'
import { FormComposableField } from './type/FormComposableField'

export default {
  title: 'Composable/FormComposable',
  component: FormComposable,
  parameters: {
    docs: {
      page: () => (
        <>
          <Primary />
          <Description>
            This components is made to display a simple form using
            [Formik](https://formik.org/).
          </Description>
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </>
      )
    }
  }
} as Meta

const FormComposableStory: Story<FormComposableProps> = (
  args: FormComposableProps
) => {
  const formState = useFormComposable({
    formikConfig: {
      initialValues: {}
    },
    onSubmit: (values) => {
      window.alert(JSON.stringify(values))
      return true
    }
  })
  const actions: FormAction[] = [
    {
      label: 'reset',
      key: 'resetFiltersButton',
      variant: 'text',
      onClick: () => formState.resetForm()
    },
    {
      label: 'Validate',
      key: 'validateFormButton',
      type: 'submit'
    }
  ]
  return (
    <FormComposable
      {...args}
      actions={actions}
      formState={formState}
      style={{ width: '500px' }}
    />
  )
}

export const TextFieldForm = FormComposableStory.bind({})
TextFieldForm.args = {
  fields: [
    {
      key: 'storybook-form-field-name',
      name: 'name',
      label: 'Name',
      type: 'textField',
      props: {},
      validator: (value) =>
        value === undefined || value === ''
          ? 'The name is required'
          : undefined,
      defaultValue: 'The Default Name'
    },
    {
      key: 'storybook-form-field-description',
      name: 'description',
      label: 'Description',
      type: 'textField',
      props: {
        disabled: true
      },
      defaultValue: 'The description'
    }
  ]
}

export const SelectForm = FormComposableStory.bind({})
SelectForm.args = {
  fields: [
    {
      key: 'storybook-form-select-from',
      name: 'from',
      label: 'From',
      type: 'select',
      props: {
        options: [
          { key: 'dollar', label: '$' },
          { key: 'euro', label: '€' }
        ]
      },
      validator: (value) =>
        value === undefined || value === ''
          ? 'The currency is required'
          : undefined
    },
    {
      key: 'storybook-form-select-to',
      name: 'to',
      label: 'to',
      type: 'select',
      props: {
        multiple: true,
        options: [
          { key: 'dollar', label: '$' },
          { key: 'euro', label: '€' }
        ]
      },
      validator: (value) =>
        value === undefined || value === ''
          ? 'The currency is required'
          : undefined
    },
    {
      key: 'storybook-form-select-value',
      name: 'value',
      label: 'Value',
      type: 'textField',
      props: {
        options: [
          { key: '100', label: '100' },
          { key: '200', label: '200' }
        ],
        disabled: true
      },
      defaultValue: '200'
    }
  ]
}

export const RadioSelectForm = FormComposableStory.bind({})
RadioSelectForm.args = {
  fields: [
    {
      key: 'storybook-form-radioChoices-from',
      name: 'from',
      label: 'From',
      type: 'radioChoices',
      props: {
        choices: [
          { key: 'dollar', label: '$' },
          { key: 'euro', label: '€' }
        ]
      },
      validator: (value) =>
        value === undefined || value === ''
          ? 'The currency is required'
          : undefined
    },
    {
      key: 'storybook-form-radioChoices-to',
      name: 'to',
      label: 'to',
      type: 'radioChoices',
      props: {
        multiple: true,
        choices: [
          { key: 'dollar', label: '$' },
          { key: 'euro', label: '€' }
        ]
      },
      validator: (value) =>
        value === undefined || value === ''
          ? 'The currency is required'
          : undefined
    },
    {
      key: 'storybook-form-radioChoices-value',
      name: 'value',
      label: 'Value',
      type: 'radioChoices',
      props: {
        choices: [
          { key: '100', label: '100' },
          { key: '200', label: '200' }
        ],
        disabled: true
      },
      defaultValue: '200'
    }
  ]
}

const fullFields: FormComposableField[] = [
  {
    key: 'storybook-form-field-name',
    name: 'name',
    label: 'Name',
    type: 'textField',
    validator: (value) =>
      value === undefined || value === '' ? 'The name is required' : undefined
  },
  {
    key: 'storybook-form-field-gender',
    name: 'gender',
    label: 'Gender',
    type: 'select',
    defaultValue: '',
    validator: (value) =>
      value === undefined || value === ''
        ? 'The gender is required'
        : undefined,
    props: {
      options: [
        { key: 'male', label: 'male' },
        { key: 'female', label: 'female' }
      ]
    }
  },
  {
    key: 'storybook-form-field-birthdate',
    name: 'birthdate',
    label: 'Birthdate',
    type: 'datePicker',
    defaultValue: ''
  },
  {
    key: 'storybook-form-field-yesOrNo',
    name: 'yesOrNo',
    label: 'Yes or no?',
    type: 'radioChoices',
    defaultValue: '',
    validator: (value) =>
      value === undefined || value === '' ? 'answer the question' : undefined,
    props: {
      choices: [
        { key: 'yes', label: 'Yes' },
        { key: 'no', label: 'No' }
      ]
    }
  },
  {
    key: 'storybook-form-field-terms',
    name: 'terms',
    label: 'I agree to the terms and conditions',
    type: 'checkBox',
    defaultValue: false,
    validator: (value) => (value !== true ? 'You have to agree' : undefined)
  }
]

export const FullForm = FormComposableStory.bind({})
FullForm.args = {
  fields: fullFields
}

// FormComposableStory.storyName = 'Form'
