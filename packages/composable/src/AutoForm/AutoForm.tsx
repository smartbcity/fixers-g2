import { Stack, StackProps, Typography } from '@mui/material'
import React from 'react'
import {
  FormComposable,
  FormComposableBasicProps,
  FormComposableField,
  FormikFormParams,
  useFormComposable
} from '../FormComposable'
import { SectionCondition, evalCondition } from '../Conditions'

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
  /**
   * The section conditions
   */
  conditions?: SectionCondition[]
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
      {formData?.sections.map((section) => {
        const message = section.conditions?.find((cond) =>
          evalCondition(cond, formState.values)
        )
        return (
          <>
            <FormComposable
              key={section.id}
              formState={formState}
              fields={section.fields}
              display={section.display}
              gridColumnNumber={section.gridColumnNumber}
            />
            {message && (
              <Typography
                sx={{
                  alignSelf: 'center',
                  color: (theme) => theme.palette[message.type].main
                }}
              >
                {message.message}
              </Typography>
            )}
          </>
        )
      })}
    </Stack>
  )
}
