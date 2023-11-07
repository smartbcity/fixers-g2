import React, { ReactNode } from 'react'
import { Meta, StoryFn } from '@storybook/react'
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
import { FieldRenderProps, FormComposableField } from './type'
import {
  ElementParams,
  ElementRendererFunction,
  ElementRenderersConfig
} from '../ComposableRender'
import { Typography } from '@mui/material'
import { requiredField, requiredTrue } from './validator'
import { BrowserRouter } from 'react-router-dom'

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

type DebugRenderProps = FieldRenderProps<string, DebugExtendProps>
const DebugRender: ElementRendererFunction<DebugRenderProps> = (
  props: DebugRenderProps
) => {
  const { element, formState, basicProps } = props
  const { params } = element
  return (
    <>
      <Typography>
        {basicProps.label} {params?.formName}
      </Typography>
      <Typography>{JSON.stringify(formState.values)}</Typography>
    </>
  )
}

export type HiddenProps = {
  formName: string
}

type HiddenRenderProps = FieldRenderProps<string, HiddenProps>
const HiddenRender: ElementRendererFunction<HiddenRenderProps> = (
  _: HiddenRenderProps
) => {
  return <></>
}

const CustomRenderer: ElementRenderersConfig<any> = {
  debug: DebugRender,
  hidden: HiddenRender
}

export type CustomFieldRenderType = ElementParams<'debug', DebugExtendProps>
export type AllFormComposableField = FormComposableField | CustomFieldRenderType

const FormComposableStory: StoryFn<FormComposableProps> = (
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
    // readOnly: true,
    // emptyValueInReadOnly: "-"
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

  console.log(formState.values)

  return (
    <BrowserRouter>
      <FormComposable<typeof CustomRenderer>
        {...args}
        customFactories={CustomRenderer}
        actions={actions}
        formState={formState}
        style={{ width: '600px' }}
      />
    </BrowserRouter>
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
      validator: (value: string) => (!value ? 'required' : undefined),
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
      validator: requiredField('The currency is required')
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
      validator: requiredField('The currency is required')
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
      validator: requiredField('The currency is required')
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
      validator: requiredField('The currency is required')
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
    name: 'map',
    type: 'map',
    params: {
      draggableMarkerPlugin: {
        enable: true
      }
    },
    fullRow: true
  },
  {
    name: 'picture',
    type: 'dropPicture',
    params: {
      height: '200px'
    }
  },
  {
    key: 'storybook-form-field-name',
    name: 'name',
    label: 'Name',
    type: 'textField',
    validator: requiredField('The name is required')
  },
  {
    key: 'storybook-form-field-gender',
    name: 'gender.value',
    label: 'Gender',
    type: 'select',
    defaultValue: '',
    validator: requiredField('The gender is required'),
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
    defaultValue: '',
    validator: requiredField('The birthdate is required')
  },
  {
    key: 'storybook-form-field-yesOrNo',
    name: 'yesOrNo',
    label: 'Yes or no?',
    type: 'radioChoices',
    defaultValue: '',
    validator: requiredField('Answer the question'),
    params: {
      choices: [
        { key: true, label: 'Yes' },
        { key: false, label: 'No' }
      ],
      row: true
    }
  },
  {
    key: 'storybook-form-field-termsOfUse',
    name: 'termsOfUse',
    label: 'do you accept the terms of use?',
    type: 'multiChoices',
    defaultValue: '',
    validator: requiredField('Answer the question'),
    params: {
      options: [
        { key: 'yes', label: 'Yes take my data' },
        {
          key: 'maybe',
          label: "I don't know cause i haven't the time to read it"
        },
        { key: 'no', label: 'no' }
      ]
    }
  },
  {
    name: 'document',
    type: 'documentHandler',
    fullRow: true,
    label: 'A document',
    params: {
      fileTypesAllowed: ['pdf']
    }
  },
  {
    key: 'storybook-form-field-terms',
    name: 'terms',
    label: 'I agree to the terms and conditions',
    type: 'checkBox',
    defaultValue: false,
    validator: requiredTrue('You have to agree')
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

const withCustomDisplay = (input: ReactNode): ReactNode => {
  return <div>WithCustomDisplay: {input}</div>
}

const FullFieldsWithCustomDisplayField: AllFormComposableField[] = [
  {
    key: 'storybook-form-field-name',
    name: 'name',
    label: 'Name',
    type: 'textField',
    customDisplay: withCustomDisplay,
    validator: requiredField('The name is required')
  },
  {
    key: 'storybook-form-field-gender',
    name: 'gender.value',
    label: 'Gender',
    type: 'select',
    defaultValue: '',
    customDisplay: withCustomDisplay,
    validator: requiredField('The gender is required'),
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
    defaultValue: '',
    customDisplay: withCustomDisplay,
    validator: requiredField('The birthdate is required')
  },
  {
    key: 'storybook-form-field-yesOrNo',
    name: 'yesOrNo',
    label: 'Yes or no?',
    type: 'radioChoices',
    defaultValue: '',
    customDisplay: withCustomDisplay,
    validator: requiredField('Answer the question'),
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
    customDisplay: withCustomDisplay,
    validator: requiredTrue('You have to agree')
  },
  {
    key: 'storybook-form-field-debug',
    name: 'debug',
    label: 'Debug',
    type: 'debug',
    customDisplay: withCustomDisplay,
    params: {
      formName: 'Full Fields'
    },
    defaultValue: 'The description'
  }
] as AllFormComposableField[]

export const FullFieldsWithCustom = FormComposableStory.bind({})
FullFieldsWithCustom.args = {
  fields: FullFieldsWithCustomDisplayField
}

export const GridDisplayForm = FormComposableStory.bind({})
GridDisplayForm.args = {
  fields: fullFields,
  display: 'grid',
  gridColumnNumber: 2
}

const conditionsFormField: AllFormComposableField[] = [
  {
    name: 'name',
    label: 'Name',
    type: 'textField',
    conditions: [
      {
        type: 'validator',
        expression: '#value == null',
        error: 'The field is required'
      }
    ]
  },
  {
    name: 'gender.value',
    label: 'Gender',
    type: 'select',
    conditions: [
      {
        type: 'display',
        expression: '#values.name != null'
      },
      {
        type: 'validator',
        expression: '#value.name == male',
        error: 'We are sorry but only females are allowed to create an account'
      }
    ],
    params: {
      options: [
        { key: 'male', label: 'male' },
        { key: 'female', label: 'female' }
      ]
    }
  },
  {
    name: 'birthdate',
    label: 'Birthdate',
    type: 'datePicker',
    conditions: [
      {
        type: 'validator',
        expression: '#value > 1099765436',
        error: 'You should be 18 or more'
      }
    ]
  }
] as AllFormComposableField[]

export const ConditionsForm = FormComposableStory.bind({})
ConditionsForm.args = {
  fields: conditionsFormField
}
