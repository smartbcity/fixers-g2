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

export default {
  title: 'Composable/Form',
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

export const FormComposableStory: Story<FormComposableProps> = (
  args: FormComposableProps
) => {
  const formState = useFormComposable({
    formikConfig: {
      initialValues: {}
    },
    onSubmit: (values) => {
      console.log(values)
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
      label: 'validate',
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

// const fields: ComposableFormField[] = [
//   {
//     key: 'storybook-form-field-name',
//     name: 'name',
//     label: 'Name',
//     type: 'textField',
//     props: {
//       disabled: true
//     },
//     validator: (value) =>
//       value === undefined || value === '' ? 'The name is required' : undefined
//   },
//   {
//     key: 'storybook-form-field-gender',
//     name: 'gender',
//     label: 'Gender',
//     type: 'select',
//     defaultValue: '',
//     validator: (value) =>
//       value === undefined || value === ''
//         ? 'The gender is required'
//         : undefined,
//     props: {
//       options: [
//         { key: 'male', label: 'male' },
//         { key: 'female', label: 'female' }
//       ]
//     }
//   },
//   {
//     key: 'storybook-form-field-birthdate',
//     name: 'birthdate',
//     label: 'Birthdate',
//     type: 'datePicker',
//     defaultValue: ''
//   },
//   {
//     key: 'storybook-form-field-yesOrNo',
//     name: 'yesOrNo',
//     label: 'Yes or no?',
//     type: 'radioChoices',
//     defaultValue: '',
//     validator: (value) =>
//       value === undefined || value === '' ? 'answer the question' : undefined,
//     props: {
//       choices: [
//         { key: 'yes', label: 'Yes' },
//         { key: 'no', label: 'No' }
//       ]
//     }
//   },
//   {
//     key: 'storybook-form-field-terms',
//     name: 'terms',
//     label: 'I agree to the terms and conditions',
//     type: 'checkBox',
//     defaultValue: false,
//     validator: (value) => (value !== true ? 'You have to agree' : undefined)
//   }
// ]

FormComposableStory.args = {
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

FormComposableStory.storyName = 'Form'
