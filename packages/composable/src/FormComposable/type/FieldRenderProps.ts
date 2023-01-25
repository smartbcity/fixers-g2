import { WithElementParams } from '../../ComposableRender'
import { FormComposableState } from './FormComposableState'
import { FormComposableProps } from '../FormComposable'
import { useEffect, useMemo } from 'react'
import { FormComposableField } from './FormComposableField'
import { cx } from '@emotion/css'
import { getIn } from 'formik'
import { SxProps, Theme } from '@mui/material'

export interface FieldRenderProps<TYPE extends string, PROPS>
  extends WithElementParams<TYPE, PROPS> {
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
  sharedNameIndex?: number
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
  sx?: SxProps<Theme>
  onChange?: (value: any) => void
}

const useFormProps = (
  field: FormComposableField,
  props: FormComposableProps<any>,
  index: number
): FieldRender => {
  const {
    formState,
    classes,
    styles,
    isLoading,
    readonly,
    gridColumnNumber = 2
  } = props
  const error = getIn(formState.errors, field.name)
  return {
    key: field.key ?? field.name,
    id: field.key ?? field.name,
    label: field.label,
    name: field.name,
    error: !!error,
    errorMessage: error as string,
    isLoading: isLoading === true ? isLoading : formState.isLoading,
    className: cx(classes?.field, 'AruiForm-field', field.params?.className),
    sharedNameIndex: field.sharedNameIndex,
    style: {
      width: '100%',
      ...styles?.field,
      ...field.params?.style
    },
    sx: field.fullRow
      ? {
          gridArea: {
            sm: 'unset',
            md: `${index} / 1 / ${index} / ${gridColumnNumber + 1}`
          }
        }
      : undefined,
    onChange: field.onChange,
    readonly:
      field.readonly === true
        ? field.readonly
        : readonly === true
        ? readonly
        : formState.readonly
  }
}

export const useFieldRenderProps = (
  props: FormComposableProps<any>
): FieldRenderProps<string, any>[] => {
  const { fields, formState, classes, styles, isLoading, readonly } = props

  useEffect(() => {
    const { registerField, unregisterField } = formState
    fields.forEach((field) => {
      if (!field.readonly) {
        const validator = field.validator
        registerField(field.name, validator)
      } else {
        unregisterField(field.name)
      }
    })
    return () => {
      fields.forEach((field) => formState.unregisterField(field.name))
    }
  }, [formState.registerField, formState.unregisterField, fields])

  const memo = useMemo<FieldRenderProps<string, any>[]>(() => {
    let gridIndex = 0
    return fields.map((field: FormComposableField) => {
      gridIndex += field.fullRow ? props.gridColumnNumber ?? 2 : 1
      const formProps = useFormProps(
        field,
        props,
        Math.ceil(gridIndex / (props.gridColumnNumber ?? 2))
      )
      return {
        basicProps: formProps,
        formState: formState,
        key: field.key ?? field.name,
        element: {
          params: field.params,
          type: field.type,
          customDisplay: field.customDisplay
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
    readonly,
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
