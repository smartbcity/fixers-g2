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
  const { element, formState, formProps } = props
  const date = new Date(formState.getFieldProps(formProps.name).value)
  return (
    <InputForm
      inputType='datePicker'
      value={
        !isNaN(date.getTime())
          ? date
          : formState.getFieldProps(formProps.name).value ?? ''
      }
      onChangeDate={(date) => {
        formState.setFieldValue(
          formProps.name,
          date && !isNaN(date.getTime()) ? date : date?.toString(),
          false
        )
        !!formProps.onChange && formProps.onChange(date)
      }}
      {...formProps}
      {...element.props}
    />
  )
}
