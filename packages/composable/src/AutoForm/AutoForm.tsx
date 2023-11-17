import { Stack, StackProps, Typography, Divider } from '@mui/material'
import React, { useCallback, useMemo } from 'react'
import {
  FormComposable,
  FormComposableBasicProps,
  FormComposableField,
  FormComposableState,
  FormikFormParams,
  useFormComposable
} from '../FormComposable'
import { SectionCondition, evalCondition } from '../Conditions'
import { FormikHelpers } from 'formik'
import { CommandWithFile } from '@smartb/g2-utils'

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
   * the description of the section
   */
  description?: string
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
  sectionsType?: 'default' | 'divided'
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
    Pick<FormikFormParams<{}>, 'readOnly' | 'isLoading' | 'formikConfig'> {
  onSubmit?: (
    command: CommandWithFile<any>,
    values: any,
    formikHelpers: FormikHelpers<any>
  ) => boolean | void | Promise<any> | Promise<boolean>
  formData?: AutoFormData
  getFormActions?: (formState: FormComposableState) => React.ReactNode
  initialValues?: any
  downloadDocument?: (fieldName: string) => Promise<string | undefined>
}

export const AutoForm = (props: AutoFormProps) => {
  const {
    formData,
    isLoading,
    readOnly,
    onSubmit,
    formikConfig,
    getFormActions,
    initialValues,
    downloadDocument,
    ...other
  } = props

  const sectionsType = formData?.sectionsType ?? 'default'

  const initial = useMemo(() => {
    const initialValuesCopy = { ...initialValues }
    formData?.sections.forEach((section) =>
      section.fields.forEach((field) => {
        if (field.type === 'documentHandler') {
          if (initialValuesCopy[field.name] && downloadDocument) {
            initialValuesCopy[`${field.name}Uploaded`] = () =>
              downloadDocument(field.name)
            initialValuesCopy[field.name] = undefined
          }
        }
      })
    )
    return initialValuesCopy
  }, [initialValues, formData, downloadDocument])

  const onSubmitCommand = useCallback(
    (values: any, formikHelpers: FormikHelpers<any>) => {
      if (onSubmit) {
        const command: CommandWithFile<any> = {
          command: {},
          files: []
        }
        formData?.sections.forEach((section) =>
          section.fields.forEach((field) => {
            if (values[field.name] != undefined) {
              if (field.type === 'documentHandler') {
                command.files.push({
                  file: values[field.name],
                  atrKey: field.name
                })
              } else {
                command.command[field.name] = values[field.name]
              }
            }
          })
        )
        onSubmit(command, values, formikHelpers)
      }
    },
    [onSubmit, formData]
  )

  const formState = useFormComposable({
    onSubmit: onSubmitCommand,
    isLoading,
    readOnly: formData?.readOnly ?? readOnly,
    formikConfig: {
      ...formikConfig,
      ...formData?.formikConfig,
      initialValues: initial
    }
  })

  const actions = useMemo(
    () => getFormActions && getFormActions(formState),
    [formState]
  )

  return (
    <Stack gap={3} {...other}>
      {formData?.sections.map((section) => {
        console.log(section)
        const message = section.conditions?.find((cond) =>
          evalCondition(cond, formState.values)
        )
        return (
          <>
            {formData?.sections.length > 1 && (
              <TitleDivider
                withDivider={sectionsType === 'divided'}
                title={section.label}
              />
            )}
            {section.description && (
              <Typography variant='body2'>{section.description}</Typography>
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
  withDivider?: boolean
}

export const TitleDivider = (props: TitleDividerProps) => {
  const { title, withDivider = true } = props
  return (
    <Stack gap={2}>
      <Typography variant='h6'>{title}</Typography>
      {withDivider && <Divider />}
    </Stack>
  )
}
