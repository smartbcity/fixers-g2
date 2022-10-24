import React, { ReactElement } from 'react'
import {
  RadioChoicesProps,
  InputForm,
  InputFormBasicProps
} from '@smartb/g2-forms'
import { FieldRenderProps } from '../type'
import { ElementRendererFunction } from '../../ComposableRender'

export type RadioChoicesExtendProps = Partial<
  Omit<
    RadioChoicesProps & InputFormBasicProps<'radioChoices'>,
    'value' | 'onChange' | 'label' | 'classes' | 'styles'
  >
>

export type RadioChoicesRenderProps = FieldRenderProps<
  'radioChoices',
  RadioChoicesExtendProps
>

export const RadioChoicesRender: ElementRendererFunction<
  RadioChoicesRenderProps
> = (props: RadioChoicesRenderProps): ReactElement => {
  const { element, formState, basicProps } = props
  const { params } = element
  const value = formState.values[basicProps.name]
  const onChange = basicProps.onChange
  delete basicProps.onChange
  return (
    <InputForm
      inputType='radioChoices'
      value={value ?? ''}
      {...params}
      {...basicProps}
      onChange={(_: React.ChangeEvent<HTMLInputElement>, value: string) => {
        formState.setFieldValue(basicProps.name, value, false)
        !!onChange && onChange(value)
      }}
    />
  )
}
