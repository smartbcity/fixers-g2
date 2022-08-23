import { ElementParams } from '../../ComposableRender/ElementRenderer'
import { FormComposableState } from './FormComposableState'
import { FormComposableProps } from '../FormComposable'
import { useEffect, useMemo } from 'react'
import { FormComposableField } from './FormComposableField'
import { cx } from '@emotion/css'

export interface FieldRenderProps<TYPE extends string, PROPS> {
  elements: ElementParams<TYPE, PROPS>
  formState: FormComposableState
  basicProps: FieldRender
}

export interface FieldRender {
  key: string
  id: string
  label?: string
  name: string
  error: boolean
  errorMessage: string
  className: any
  style: any
  /**
   * Indicates if the data is currently loading
   *
   * @default false
   */
  isLoading?: boolean
  /**
   * Indicates if the data is on readonly mode
   *
   * @default false
   */
  readonly?: boolean
  onChange?: (value: any) => void
}

const useFormProps = (
  field: FormComposableField,
  props: FormComposableProps<any>
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

export const useFieldRenderProps = (
  props: FormComposableProps<any>
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
        elements: {
          params: field.params,
          type: field.type
        }
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
