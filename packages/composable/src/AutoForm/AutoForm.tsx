import { Stack, StackProps, Typography, Divider } from '@mui/material'
import React, { useMemo } from 'react'
import {
  FormComposable,
  FormComposableBasicProps,
  FormComposableField,
  FormComposableState,
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
} & Pick<
  FormComposableBasicProps<{}>,
  'display' | 'gridColumnNumber' | 'orientation'
>

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
  getFormActions?: (formState: FormComposableState) => React.ReactNode
}

export const AutoForm = (props: AutoFormProps) => {
  const {
    formData,
    isLoading,
    readOnly,
    onSubmit,
    formikConfig,
    getFormActions,
    ...other
  } = props

  const formState = useFormComposable({
    onSubmit,
    isLoading,
    readOnly: formData?.readOnly ?? readOnly,
    formikConfig: {
      ...formikConfig,
      ...formData?.formikConfig
    }
  })

  const actions = useMemo(
    () => getFormActions && getFormActions(formState),
    [formState]
  )

  return (
    <Stack gap={3} {...other}>
      {formData?.sections.map((section) => {
        const message = section.conditions?.find((cond) =>
          evalCondition(cond, formState.values)
        )
        return (
          <>
            {formData?.sections.length > 1 && (
              <TitleDivider title={section.label} />
            )}
            <FormComposable
              key={section.id}
              formState={formState}
              fields={section.fields}
              display={section.display}
              gridColumnNumber={section.gridColumnNumber}
              orientation={section.orientation}
            />
            {message && (
              <Typography
                sx={{
                  color: (theme) => theme.palette[message.type].main
                }}
              >
                {message.message}
              </Typography>
            )}
          </>
        )
      })}
      {actions}
    </Stack>
  )
}

export interface TitleDividerProps {
  title?: string
}

export const TitleDivider = (props: TitleDividerProps) => {
  const { title } = props
  return (
    <Stack gap={2}>
      <Typography variant='h6'>{title}</Typography>
      <Divider />
    </Stack>
  )
}
