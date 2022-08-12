import { FormClasses, FormComposableProps, FormStyles } from '../FormComposable'
import { useMemo } from 'react'
import { cx } from '@emotion/css'
import { FieldProps } from './FormElementsFactories'
import { ComposableFormState } from '../useFormFieldComposable'
import { ComposableFormField, ComposableFormProps } from '../type/FormField'

export const withFieldElements = (props: FormComposableProps) => {
  const { fields, formState, classes, styles, isLoading } = props
  return useMemo<FieldProps<any, any>[]>(() => {
    return fields.map((field) => {
      const formProps: ComposableFormProps = getFormProps(
        field,
        formState,
        classes,
        styles,
        isLoading
      )
      const { registerField } = formState
      registerField(formProps.name, {
        validate: field.validator
      })
      return {
        formProps: formProps,
        formState: formState,
        element: field
      } as FieldProps<any, any>
    })
  }, [
    fields,
    formState.values,
    formState.handleChange,
    formState.errors,
    classes?.field,
    styles?.field,
    isLoading
  ])
}

const getFormProps = (
  field: ComposableFormField,
  formState: ComposableFormState,
  classes?: FormClasses,
  styles?: FormStyles,
  isLoading?: boolean
): ComposableFormProps => {
  return {
    key: field.key,
    id: field.key,
    label: field.label,
    name: field.name,
    error: !!formState.errors[field.name],
    errorMessage: formState.errors[field.name] as string,
    isLoading: isLoading,
    className: cx(classes?.field, 'AruiForm-field', field.props?.className),
    style: {
      ...styles?.field,
      ...field.props?.style
    },
    onChange: field.onChange
  }
}
