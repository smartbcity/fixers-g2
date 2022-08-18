import React, { ReactElement } from 'react'
import { SelectProps, InputForm, InputFormBasicProps } from '@smartb/g2-forms'
import { FieldRenderProps } from '../type/FieldRenderProps'
import { ElementRendererFunction } from '../../ComposableRender/ElementRenderer'

export type FormSelectExtendProps = Partial<
  Omit<
    SelectProps & InputFormBasicProps<'select'>,
    | 'value'
    | 'values'
    | 'onChangeValue'
    | 'onChangeValues'
    | 'label'
    | 'classes'
    | 'styles'
  >
>

export type SelectRenderProps = FieldRenderProps<
  'select',
  FormSelectExtendProps
>

export const SelectRender: ElementRendererFunction<SelectRenderProps> = (
  props: SelectRenderProps
): ReactElement => {
  const { params, formState, basicProps } = props
  return params?.multiple === true ? (
    <InputForm
      inputType='select'
      values={formState.getFieldProps(basicProps.name).value ?? []}
      onChangeValues={(values: string[]) => {
        formState.setFieldValue(basicProps.name, values, false)
        !!basicProps.onChange && basicProps.onChange(values)
      }}
      {...params}
      {...basicProps}
    />
  ) : (
    <InputForm
      inputType='select'
      value={formState.getFieldProps(basicProps.name).value ?? ''}
      onChangeValue={(value: string) => {
        formState.setFieldValue(basicProps.name, value, false)
        !!basicProps.onChange && basicProps.onChange(value)
      }}
      {...params}
      {...basicProps}
    />
  )
}
