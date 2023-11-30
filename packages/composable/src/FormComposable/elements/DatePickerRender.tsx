import {
  InputFormBasicProps,
  DatePickerProps,
  InputForm
} from '@smartb/g2-forms'
import React, { useMemo } from 'react'
import { FieldRenderProps } from '../type'
import { ElementRendererFunction } from '../../ComposableRender'
import { getValueSetup } from '../type/getValueSetup'

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
  const { element, formState, basicProps } = props
  const { params } = element
  const componentProps = { ...basicProps }
  const { value, setFieldValue } = useMemo(
    () => getValueSetup(componentProps.name, formState),
    [componentProps.name, formState]
  )
  const date = new Date(value)
  const onChange = componentProps.onChange
  delete componentProps.onChange

  return (
    <InputForm
      inputType='datePicker'
      value={!isNaN(date.getTime()) ? date : value ?? ''}
      onChangeDate={(date) => {
        setFieldValue(
          date && !isNaN(date.getTime()) ? date.getTime() : date?.toString()
        )
        !!onChange && onChange(date)
      }}
      {...params}
      {...componentProps}
    />
  )
}
