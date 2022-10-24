import {
  InputFormBasicProps,
  AutoCompleteProps,
  InputForm
} from '@smartb/g2-forms'
import React from 'react'
import { FieldRenderProps } from '../type'
import { ElementRendererFunction } from '../../ComposableRender'

export type AutoCompleteExtendProps = Partial<
  Omit<
    AutoCompleteProps & InputFormBasicProps<'autoComplete'>,
    | 'value'
    | 'values'
    | 'onChangeValue'
    | 'onChangeValues'
    | 'label'
    | 'classes'
    | 'styles'
  >
>

export type AutoCompleteRenderProps = FieldRenderProps<
  'autoComplete',
  AutoCompleteExtendProps
>

export const AutoCompleteRender: ElementRendererFunction<
  AutoCompleteRenderProps
> = (props: AutoCompleteRenderProps) => {
  const { element, formState, basicProps } = props
  const { params } = element
  const onChange = basicProps.onChange
  delete basicProps.onChange
  const value = formState.values[basicProps.name]
  return params?.multiple === true ? (
    // @ts-ignore
    <InputForm
      inputType='autoComplete'
      values={value ?? []}
      onChangeValues={(values: any) => {
        formState.setFieldValue(basicProps.name, values, false)
        !!onChange && onChange(values)
      }}
      {...params}
      {...basicProps}
    />
  ) : (
    // @ts-ignore
    <InputForm
      inputType='autoComplete'
      value={value ?? null}
      onChangeValue={(value: any) => {
        formState.setFieldValue(basicProps.name, value, false)
        !!onChange && onChange(value)
      }}
      {...params}
      {...basicProps}
    />
  )
}
