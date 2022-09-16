import { FilterDatePicker, FilterDatePickerProps } from '@smartb/g2-forms'
import React from 'react'
import { FieldRenderProps } from '../type'
import { ElementRendererFunction } from '../../ComposableRender'

export type FilterDatePickerExtendProps = Partial<
  Omit<FilterDatePickerProps, 'value' | 'onChangeDate'>
>

export type FilterDatePickerRenderProps = FieldRenderProps<
  'textField',
  FilterDatePickerExtendProps
>

export const FilterDatePickerRender: ElementRendererFunction<
  FilterDatePickerRenderProps
> = (props: FilterDatePickerRenderProps) => {
  const { element, formState, basicProps, defaultSubmitBehavior } = props
  const { params } = element
  const value = formState.getFieldProps(basicProps.name).value
  return (
    <FilterDatePicker
      value={value ?? ''}
      onChangeDate={(date) => {
        formState.setFieldValue(basicProps.name, date, false)
      }}
      onRemove={() => {
        console.log('remove')
        formState.setFieldValue(basicProps.name, '', false)
        defaultSubmitBehavior && formState.submitForm()
      }}
      onClose={() => {
        console.log('close')
        defaultSubmitBehavior && formState.submitForm()
      }}
      {...params}
      {...basicProps}
    />
  )
}
