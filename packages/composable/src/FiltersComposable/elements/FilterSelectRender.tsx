import { FilterSelect, FilterSelectProps } from '@smartb/g2-forms'
import React from 'react'
import { FieldRenderProps } from '../type'
import { ElementRendererFunction } from '../../ComposableRender'
import { getIn } from 'formik'

export type FilterSelectExtendProps = Partial<
  Omit<FilterSelectProps, 'value' | 'onChangeValue' | 'onChangeValues'>
>

export type FilterSelectRenderProps = FieldRenderProps<
  'select',
  FilterSelectExtendProps
>

export const FilterSelectRender: ElementRendererFunction<
  FilterSelectRenderProps
> = (props: FilterSelectRenderProps) => {
  const { element, formState, basicProps, defaultSubmitBehavior } = props
  const { params } = element
  const value = getIn(formState.values, basicProps.name)
  return (params?.multiple === true) === true ? (
    <FilterSelect
      values={Array.isArray(value) ? value : !!value ? [value] : []}
      onChangeValues={(values) =>
        formState.setFieldValue(basicProps.name, values, false)
      }
      onRemove={() => {
        formState.setFieldValue(basicProps.name, [], false)
        defaultSubmitBehavior && formState.submitForm()
      }}
      onClose={() => defaultSubmitBehavior && formState.submitForm()}
      {...basicProps}
      {...params}
    />
  ) : (
    <FilterSelect
      value={value ?? ''}
      onChangeValue={(value) => {
        formState.setFieldValue(basicProps.name, value, false)
        defaultSubmitBehavior && formState.submitForm()
      }}
      onRemove={() => {
        formState.setFieldValue(basicProps.name, '', false)
        defaultSubmitBehavior && formState.submitForm()
      }}
      onClose={() => defaultSubmitBehavior && formState.submitForm()}
      {...basicProps}
      {...params}
    />
  )
}
