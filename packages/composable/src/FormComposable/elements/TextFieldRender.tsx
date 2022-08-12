import {
  InputFormBasicProps,
  TextFieldProps,
  InputForm
} from '@smartb/g2-forms'
import { FunctionComponent } from 'react'
import { FieldProps } from '../factories/FormElementsFactories'

export type TextFieldExtendProps = Partial<
  Omit<
    TextFieldProps & InputFormBasicProps<'textField'>,
    'value' | 'onChange' | 'label' | 'classes' | 'styles'
  >
>

type TextFieldElementProps = FieldProps<'textField', TextFieldExtendProps>

export const TextFieldRender: FunctionComponent<TextFieldElementProps> = (
  props: TextFieldElementProps
) => {
  const { element, formState, formProps } = props
  const value = formState.getFieldProps(formProps.name).value
  return (
    // @ts-ignore
    <InputForm
      inputType='textField'
      value={value}
      {...formProps}
      {...element.props}
      onChange={(value: string) => {
        formState.setFieldValue(formProps.name, value, false)
        !!formProps.onChange && formProps.onChange(value)
      }}
      isLoading={formProps.isLoading}
    />
  )
}
