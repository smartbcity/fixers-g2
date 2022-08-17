import {
  InputFormBasicProps,
  TextFieldProps,
  InputForm
} from '@smartb/g2-forms'
import React, { FunctionComponent } from 'react'
import { FieldRenderProps } from '../factories/FieldRenderProps'

export type TextFieldExtendProps = Partial<
  Omit<
    TextFieldProps & InputFormBasicProps<'textField'>,
    'value' | 'onChange' | 'label' | 'classes' | 'styles'
  >
>

type TextFieldRenderProps = FieldRenderProps<'textField', TextFieldExtendProps>

export const TextFieldRender: FunctionComponent<TextFieldRenderProps> = (
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
