import React, { ReactElement } from 'react'
import { SelectProps, InputForm, InputFormBasicProps } from '@smartb/g2-forms'
import { FieldRenderProps } from '../type'
import { ElementRendererFunction } from '../../ComposableRender'
import { getIn } from 'formik'

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
  const { element, formState, basicProps } = props
  const { params } = element
  const value = getIn(formState.values, basicProps.name)
  const onChange = basicProps.onChange
  delete basicProps.onChange
  return params?.multiple === true ? (
    <InputForm
      inputType='select'
      values={value ?? []}
      onChangeValues={(values: string[]) => {
        formState.setFieldValue(basicProps.name, values, false)
        !!onChange && onChange(values)
      }}
      {...params}
      {...basicProps}
    />
  ) : (
    <InputForm
      inputType='select'
      value={value ?? ''}
      onChangeValue={(value: string) => {
        formState.setFieldValue(basicProps.name, value, false)
        !!onChange && onChange(value)
      }}
      {...params}
      {...basicProps}
    />
  )
}
