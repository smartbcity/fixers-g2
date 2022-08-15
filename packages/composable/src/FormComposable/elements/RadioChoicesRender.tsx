import React, { FunctionComponent, ReactElement } from 'react'
import {
  RadioChoicesProps,
  InputForm,
  InputFormBasicProps
} from '@smartb/g2-forms'
import { FieldRenderProps } from '../factories/FormElementsRenderer'

export type RadioChoicesExtendProps = Partial<
  Omit<
    RadioChoicesProps & InputFormBasicProps<'radioChoices'>,
    'value' | 'onChange' | 'label' | 'classes' | 'styles'
  >
>

type RadioChoicesRenderPros = FieldRenderProps<
  'radioChoices',
  RadioChoicesExtendProps
>

export const RadioChoicesRender: FunctionComponent<RadioChoicesRenderPros> = (
  props: RadioChoicesRenderPros
): ReactElement => {
  const { element, formState, basicProps } = props
  return (
    // @ts-ignore
    <InputForm
      inputType='radioChoices'
      value={formState.getFieldProps(basicProps.name).value ?? ''}
      {...element.props}
      {...basicProps}
      onChange={(_: React.ChangeEvent<HTMLInputElement>, value: string) => {
        formState.setFieldValue(basicProps.name, value, false)
        !!basicProps.onChange && basicProps.onChange(value)
      }}
    />
  )
}
