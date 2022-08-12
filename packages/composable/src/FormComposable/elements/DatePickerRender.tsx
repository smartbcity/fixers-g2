import {
  InputFormBasicProps,
  DatePickerProps,
  InputForm
} from '@smartb/g2-forms'
import React, { FunctionComponent } from 'react'
import { FieldRenderProps } from '../factories/FormElementsFactories'

export type DatePickerExtendProps = Partial<
  Omit<
    DatePickerProps & InputFormBasicProps<'datePicker'>,
    'value' | 'onChangeDate' | 'label' | 'classes' | 'styles'
  >
>

type DatePickerRenderPros = FieldRenderProps<
  'datePicker',
  DatePickerExtendProps
>

export const DatePickerRender: FunctionComponent<DatePickerRenderPros> = (
  props: DatePickerRenderPros
) => {
  const { element, formState, basicProps } = props
  const date = new Date(formState.getFieldProps(basicProps.name).value)
  return (
    <InputForm
      inputType='datePicker'
      value={
        !isNaN(date.getTime())
          ? date
          : formState.getFieldProps(basicProps.name).value ?? ''
      }
      onChangeDate={(date) => {
        formState.setFieldValue(
          basicProps.name,
          date && !isNaN(date.getTime()) ? date : date?.toString(),
          false
        )
        !!basicProps.onChange && basicProps.onChange(date)
      }}
      {...basicProps}
      {...element.props}
    />
  )
}
