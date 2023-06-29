import React, { ReactElement, useMemo } from 'react'
import {
  InputForm,
  InputFormBasicProps,
  MultiChoicesProps
} from '@smartb/g2-forms'
import { FieldRenderProps } from '../type'
import { ElementRendererFunction } from '../../ComposableRender'
import { getValueSetup } from '../type/getValueSetup'

export type MultiChoicesExtendProps = Partial<
  Omit<
    MultiChoicesProps & InputFormBasicProps<'multiChoices'>,
    'value' | 'onChange' | 'label' | 'classes' | 'styles'
  >
>

export type MultiChoicesRenderProps = FieldRenderProps<
  'multiChoices',
  MultiChoicesExtendProps
>

export const MultiChoicesRender: ElementRendererFunction<
  MultiChoicesRenderProps
> = (props: MultiChoicesRenderProps): ReactElement => {
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
      inputType='multiChoices'
      values={value ?? ''}
      {...params}
      {...componentProps}
      onChange={(values) => {
        setFieldValue(values)
        !!onChange && onChange(values)
      }}
    />
  )
}
