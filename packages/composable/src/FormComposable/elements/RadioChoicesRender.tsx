import React, { ReactElement, useMemo } from 'react'
import {
  RadioChoicesProps,
  InputForm,
  InputFormBasicProps
} from '@smartb/g2-forms'
import { FieldRenderProps } from '../type'
import { ElementRendererFunction } from '../../ComposableRender'
import { getValueSetup } from '../type/getValueSetup'

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
  const componentProps = { ...basicProps }
  const { value, setFieldValue } = useMemo(
    () =>
      getValueSetup(
        componentProps.name,
        formState,
        componentProps.sharedNameIndex
      ),
    [componentProps.name, formState, componentProps.sharedNameIndex]
  )
  const onChange = componentProps.onChange
  delete componentProps.onChange
  delete componentProps.sharedNameIndex
  return (
    <InputForm
      inputType='radioChoices'
      value={value ?? ''}
      {...params}
      {...componentProps}
      onChange={(value: string) => {
        setFieldValue(value)
        !!onChange && onChange(value)
      }}
    />
  )
}
