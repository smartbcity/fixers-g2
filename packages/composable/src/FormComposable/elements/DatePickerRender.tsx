import {
  InputFormBasicProps,
  DatePickerProps,
  InputForm
} from '@smartb/g2-forms'
import React from 'react'
import { FieldRenderProps } from '../type/FieldRenderProps'
import { ElementRendererFunction } from '../../ComposableRender/ElementRenderer'

export type DatePickerExtendProps = Partial<
  Omit<
    DatePickerProps & InputFormBasicProps<'datePicker'>,
    'value' | 'onChangeDate' | 'label' | 'classes' | 'styles'
  >
>

export type DatePickerRenderProps = FieldRenderProps<
  'datePicker',
  DatePickerExtendProps
>

export const DatePickerRender: ElementRendererFunction<
  DatePickerRenderProps
> = (props: DatePickerRenderProps) => {
  const { params, formState, basicProps } = props
  const date = new Date(formState.getFieldProps(basicProps.name).value)
  delete basicProps.onChange
  return (
    <InputForm
      inputType='datePicker'
      value={
        !isNaN(date.getTime())
          ? date
          : formState.getFieldProps(basicProps.name).value ?? ''
      }
      {...basicProps}
      {...params}
      onChangeDate={(date) => {
        formState.setFieldValue(
          basicProps.name,
          date && !isNaN(date.getTime()) ? date : date?.toString(),
          false
        )
        !!basicProps.onChange && basicProps.onChange(date)
      }}
    />
  )
}
