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
import { FieldRenderProps } from './type/FieldRenderProps'
import {
  ComposableElementRendererProps,
  ElementRendererFunction,
  RenderersConfig
} from '../ComposableRender/ElementRenderer'
import { Typography } from '@mui/material'

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

export type DebugExtendProps = {
  formName: string
}

type DebugRenderProps = FieldRenderProps<'debug', DebugExtendProps>
const DebugRender: ElementRendererFunction<DebugRenderProps> = (
  props: DebugRenderProps
) => {
  const { elements, formState, basicProps } = props
  const { params } = elements
  return (
    <>
      <Typography>
        {basicProps.label} {params?.formName}
      </Typography>
      <Typography>{JSON.stringify(formState.values)}</Typography>
    </>
  )
}

export interface CustomFormRenderersConfig extends RenderersConfig {
  debug: ElementRendererFunction<DebugRenderProps>
}

const CustomRenderer: CustomFormRenderersConfig = {
  debug: DebugRender
}
export type CustomFieldRenderType = ComposableElementRendererProps<
  typeof CustomRenderer
>

export type AllFormComposableField = FormComposableField

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
    <FormComposable<typeof CustomRenderer>
      {...args}
      customFactories={CustomRenderer}
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
      params: {},
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
      params: {
        choices: [],
        disabled: true
      },
      defaultValue: 'The description'
    },
    {
      key: 'storybook-form-field-debug',
      name: 'debug',
      label: 'Debug',
      type: 'debug',
      params: {
        formName: 'TextFieldForm'
      },
      defaultValue: 'The description'
    }
  ] as AllFormComposableField[]
}

export const SelectForm = FormComposableStory.bind({})
SelectForm.args = {
  fields: [
    {
      key: 'storybook-form-select-from',
      name: 'from',
      label: 'From',
      type: 'select',
      params: {
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
      params: {
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
      params: {
        options: [
          { key: '100', label: '100' },
          { key: '200', label: '200' }
        ],
        disabled: true
      },
      defaultValue: '200'
    },
    {
      key: 'storybook-form-field-debug',
      name: 'debug',
      label: 'Debug',
      type: 'debug',
      params: {
        formName: 'Select Form'
      },
      defaultValue: 'The description'
    }
  ] as AllFormComposableField[]
}

export const RadioSelectForm = FormComposableStory.bind({})
RadioSelectForm.args = {
  fields: [
    {
      key: 'storybook-form-radioChoices-from',
      name: 'from',
      label: 'From',
      type: 'radioChoices',
      params: {
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
      params: {
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
      params: {
        choices: [
          { key: '100', label: '100' },
          { key: '200', label: '200' }
        ],
        disabled: true
      },
      defaultValue: '200'
    },
    {
      key: 'storybook-form-field-debug',
      name: 'debug',
      label: 'Debug',
      type: 'debug',
      params: {
        formName: 'Radio Select Form'
      },
      defaultValue: 'The description'
    }
  ] as AllFormComposableField[]
}

const fullFields: AllFormComposableField[] = [
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
    params: {
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
    params: {
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
  },
  {
    key: 'storybook-form-field-debug',
    name: 'debug',
    label: 'Debug',
    type: 'debug',
    params: {
      formName: 'Full Fields'
    },
    defaultValue: 'The description'
  }
] as AllFormComposableField[]

export const FullForm = FormComposableStory.bind({})
FullForm.args = {
  fields: fullFields
}
