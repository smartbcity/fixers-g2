import {
  InputFormBasicProps,
  TextFieldProps,
  InputForm
} from '@smartb/g2-forms'
import React, { FunctionComponent } from 'react'
import { FieldRenderProps } from '../factories/FormElementsRenderer'

export type TextFieldExtendProps = Partial<
  Omit<
    TextFieldProps & InputFormBasicProps<'textField'>,
    'value' | 'onChange' | 'label' | 'classes' | 'styles'
  >
>

type TextFieldElementProps = FieldRenderProps<'textField', TextFieldExtendProps>

export const TextFieldRender: FunctionComponent<TextFieldElementProps> = (
  props: TextFieldElementProps
) => {
  const { element, formState, basicProps } = props
  const elementProps = element.props
  const value = formState.getFieldProps(basicProps.name).value
  console.log('////////////////////////')
  console.log('////////////////////////')
  console.log(value)
  console.log('////////////////////////')
  console.log('////////////////////////')
  return (
    <InputForm
      inputType='textField'
      value={value}
      {...elementProps}
      {...basicProps}
      onChange={(value: string) => {
        formState.setFieldValue(basicProps.name, value, false)
        !!basicProps.onChange && basicProps.onChange(value)
      }}
      readonly={basicProps.readonly}
    />
  )
}
