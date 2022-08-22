import React, { ReactElement } from 'react'
import {
  RadioChoicesProps,
  InputForm,
  InputFormBasicProps
} from '@smartb/g2-forms'
import { FieldRenderProps } from '../type/FieldRenderProps'
import { ElementRendererFunction } from '../../ComposableRender/ElementRenderer'

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
  const { elements, formState, basicProps } = props
  const { params } = elements
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
