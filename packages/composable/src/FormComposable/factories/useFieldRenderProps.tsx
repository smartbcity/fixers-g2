import { FormComposableProps } from '../FormComposable'
import { useEffect, useMemo } from 'react'
import { cx } from '@emotion/css'
import { FormComposableField } from '../type/FormComposableField'
import { FieldRender, FieldRenderProps } from './FieldRenderProps'

export const useFieldRenderProps = (
  props: FormComposableProps
): FieldRenderProps<any, any>[] => {
  const { fields, formState, classes, styles, isLoading } = props
  const memo = useMemo<FieldRenderProps<string, any>[]>(() => {
    return fields.map((field: FormComposableField) => {
      const formProps = useFormProps(field, props)
      const { registerField } = formState
      registerField(formProps.name, {
        validate: field.validator
      })
      return {
        basicProps: formProps,
        formState: formState,
        element: field
      } as FieldRenderProps<any, any>
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
  const { setFieldValue } = formState
  useEffect(() => {
    fields.map((field) => {
      field.defaultValue && setFieldValue(field.name, field.defaultValue)
    })
  }, [])
  return memo
}

const useFormProps = (
  field: FormComposableField,
  props: FormComposableProps
): FieldRender => {
  const { formState, classes, styles, isLoading } = props
  return {
    key: field.key,
    id: field.key,
    label: field.label,
    name: field.name,
    error: !!formState.errors[field.name],
    errorMessage: formState.errors[field.name] as string,
    isLoading: isLoading,
    className: cx(classes?.field, 'AruiForm-field', field.params?.className),
    style: {
      ...styles?.field,
      ...field.params?.style
    },
    onChange: field.onChange,
    readonly: field.readonly === true ? field.readonly : props?.readonly
  }
}
