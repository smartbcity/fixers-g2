import {
  InputFormBasicProps,
  TextFieldProps,
  InputForm
} from '@smartb/g2-forms'
import React from 'react'
import { FieldRenderProps } from '../type'
import { ElementRendererFunction } from '../../ComposableRender'

export type TextFieldExtendProps = Partial<
  Omit<
    TextFieldProps & InputFormBasicProps<'textField'>,
    'value' | 'onChange' | 'label' | 'classes' | 'styles'
  >
>

export type TextFieldRenderProps = FieldRenderProps<
  'textField',
  TextFieldExtendProps
>

export const TextFieldRender: ElementRendererFunction<TextFieldRenderProps> = (
  props: TextFieldRenderProps
) => {
  const { element, formState, basicProps } = props
  const { params } = element
  const onChange = basicProps.onChange
  delete basicProps.onChange
  const value = formState.getFieldProps(basicProps.name).value ?? ''
  return (
    <InputForm
      inputType='textField'
      value={value}
      {...params}
      {...basicProps}
      onChange={(value: string) => {
        formState.setFieldValue(basicProps.name, value, false)
        !!onChange && onChange(value)
      }}
      readonly={basicProps.readonly}
    />
  )
}
