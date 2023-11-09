import { Stack, StackProps } from '@mui/material'
import React from 'react'
import {
  FormComposable,
  FormComposableBasicProps,
  FormComposableField,
  FormikFormParams,
  useFormComposable
} from '../FormComposable'

export type FormSection = {
  /**
   * the id of the section
   */
  id: string
  /**
   * the label of the section
   */
  label?: string
  /**
   * the fields of the section
   */
  fields: FormComposableField<string, {}>[]
} & Pick<FormComposableBasicProps<{}>, 'display' | 'gridColumnNumber'>

export type AutoFormData = {
  /**
   * describe the type of display for the sections
   * @default "default"
   */
  sectionsType?: 'default'
  /**
   * The different sections of the form
   */
  sections: FormSection[]
} & Pick<
  FormikFormParams<{}>,
  'readOnly' | 'emptyValueInReadOnly' | 'formikConfig'
>

export interface AutoFormProps
  extends Omit<StackProps, 'onSubmit'>,
    Pick<
      FormikFormParams<{}>,
      'readOnly' | 'isLoading' | 'onSubmit' | 'formikConfig'
    > {
  formData?: AutoFormData
}

export const AutoForm = (props: AutoFormProps) => {
  const { formData, isLoading, readOnly, onSubmit, formikConfig, ...other } =
    props

  const formState = useFormComposable({
    onSubmit,
    isLoading,
    readOnly: formData?.readOnly ?? readOnly,
    formikConfig: {
      ...formikConfig,
      ...formData?.formikConfig
    }
  })

  return (
    <Stack gap={3} {...other}>
      {formData?.sections.map((section) => (
        <FormComposable
          key={section.id}
          formState={formState}
          fields={section.fields}
          display={section.display}
          gridColumnNumber={section.gridColumnNumber}
        />
      ))}
    </Stack>
  )
}
