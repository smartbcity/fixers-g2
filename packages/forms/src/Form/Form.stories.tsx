import React from 'react'
import { Form, FormBasicProps, Field } from './Form'
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
import { Typography } from '@mui/material'
import { ActionDoc, FieldDoc, FormClasses, FormStyles, FormState } from './docs'
import { useForm } from './useForm'

export default {
  title: 'Forms/Form',
  component: Form,
  parameters: {
    docs: {
      page: () => (
        <>
          <Primary />
          <Description>
            This components is made to display a simple form using
            [Formik](https://formik.org/).
          </Description>
          <Description>
            If you want a complexe form you will have to create it by your self.
            We recommand using [Formik](https://formik.org/) even for complexe
            form.
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
            <LinkTo kind='Forms' story='CheckBox'>
              CheckBox
            </LinkTo>
          </Typography>
          <Description>
            You have to use the hook `useForm` that will intialise the formState
            and return it to you. The `FormState` equal to the return type of
            the hook useFormik.
          </Description>
          <Description>
            If you need the formik state in your fields creation you can use
            `useFormWithPartialFields` that only requires the minimum
            informations needed to init the formik states. So you can create
            your fields with the formState available.
          </Description>
          <Description>
            In your validator functions there is some type check that have to be
            done. If you expect a number coming out of your field check if it
            hasn't been stringified. When a date picker return an invalid date
            the date is stringified.
          </Description>
          <Stories />
        </>
      )
    }
  },
  argTypes: {
    fields: {
      table: {
        type: {
          summary: 'Field[]',
          detail: FieldDoc
        }
      }
    },
    actions: {
      table: {
        type: {
          summary: 'Action[]',
          detail: ActionDoc
        }
      }
    },
    formState: {
      table: {
        type: {
          summary: 'FormState',
          detail: FormState
        }
      }
    },
    classes: {
      table: {
        type: {
          summary: 'FormClasses',
          detail: FormClasses
        }
      }
    },
    styles: {
      table: {
        type: {
          summary: 'FormStyles',
          detail: FormStyles
        }
      }
    }
  }
} as Meta

export const FormStory: Story<FormBasicProps> = (args: FormBasicProps) => {
  const formState = useForm({
    fields: args.fields,
    onSubmit: (values) => console.log(values)
  })
  return <Form {...args} formState={formState} style={{ width: '500px' }} />
}

const fields: Field[] = [
  {
    key: 'storybook-form-field-name',
    name: 'name',
    label: 'Name',
    type: 'textfield',
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
    selectProps: {
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
    type: 'datepicker',
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
    radioChoicesProps: {
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
    type: 'checkbox',
    defaultValue: false,
    validator: (value) => (value !== true ? 'You have to agree' : undefined)
  }
]

FormStory.args = {
  fields: fields,
  actions: [
    {
      label: 'validate',
      key: 'validateFormButton',
      type: 'submit'
    }
  ]
}

FormStory.storyName = 'Form'
