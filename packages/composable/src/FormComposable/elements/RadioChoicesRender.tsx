import React, { FunctionComponent, ReactElement } from 'react'
import {
  RadioChoicesProps,
  InputForm,
  InputFormBasicProps
} from '@smartb/g2-forms'
import { FieldRenderProps } from '../factories/FieldRenderProps'

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
  const { params, formState, basicProps } = props
  return (
    <InputForm
      inputType='radioChoices'
      value={formState.getFieldProps(basicProps.name).value ?? ''}
      {...params}
      {...basicProps}
      onChange={(_: React.ChangeEvent<HTMLInputElement>, value: string) => {
        formState.setFieldValue(basicProps.name, value, false)
        !!basicProps.onChange && basicProps.onChange(value)
      }}
    />
  )
}
