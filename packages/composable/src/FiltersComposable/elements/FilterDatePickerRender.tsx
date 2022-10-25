import { FilterDatePicker, FilterDatePickerProps } from '@smartb/g2-forms'
import React from 'react'
import { FieldRenderProps } from '../type'
import { ElementRendererFunction } from '../../ComposableRender'
import { getIn } from 'formik'

export type FilterDatePickerExtendProps = Partial<
  Omit<FilterDatePickerProps, 'value' | 'onChangeDate'>
>

export type FilterDatePickerRenderProps = FieldRenderProps<
  'datePicker',
  FilterDatePickerExtendProps
>

export const FilterDatePickerRender: ElementRendererFunction<
  FilterDatePickerRenderProps
> = (props: FilterDatePickerRenderProps) => {
  const { element, formState, basicProps, defaultSubmitBehavior } = props
  const { params } = element
  const value = getIn(formState.values, basicProps.name)
  return (
    <FilterDatePicker
      value={value ?? ''}
      onChangeDate={(date) => {
        formState.setFieldValue(basicProps.name, date, false)
      }}
      onRemove={() => {
        formState.setFieldValue(basicProps.name, '', false)
        defaultSubmitBehavior && formState.submitForm()
      }}
      onClose={() => {
        defaultSubmitBehavior && formState.submitForm()
      }}
      {...params}
      {...basicProps}
    />
  )
}
