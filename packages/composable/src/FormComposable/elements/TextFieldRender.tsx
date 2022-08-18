import {
  InputFormBasicProps,
  TextFieldProps,
  InputForm
} from '@smartb/g2-forms'
import React from 'react'
import { FieldRenderProps } from '../type/FieldRenderProps'
import { ElementRendererFunction } from '../../ComposableRender/ElementRenderer'

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
  const { params, formState, basicProps } = props
  const value = formState.getFieldProps(basicProps.name).value
  return (
    <InputForm
      inputType='textField'
      value={value}
      {...params}
      {...basicProps}
      onChange={(value: string) => {
        formState.setFieldValue(basicProps.name, value, false)
        !!basicProps.onChange && basicProps.onChange(value)
      }}
      readonly={basicProps.readonly}
    />
  )
}
