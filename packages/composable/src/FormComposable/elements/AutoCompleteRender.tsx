import {
  InputFormBasicProps,
  AutoCompleteProps,
  InputForm
} from '@smartb/g2-forms'
import React, { useMemo } from 'react'
import { FieldRenderProps } from '../type'
import { ElementRendererFunction } from '../../ComposableRender'
import { getValueSetup } from '../type/getValueSetup'

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
  const componentProps = { ...basicProps }
  const onChange = componentProps.onChange

  const { value, setFieldValue } = useMemo(
    () => getValueSetup(componentProps.name, formState),
    [componentProps.name, formState]
  )
  delete componentProps.onChange

  return params?.multiple === true ? (
    // @ts-ignore
    <InputForm
      inputType='autoComplete'
      values={value ?? []}
      onChangeValues={(values: any) => {
        setFieldValue(values)
        !!onChange && onChange(values)
      }}
      {...params}
      {...componentProps}
    />
  ) : (
    // @ts-ignore
    <InputForm
      inputType='autoComplete'
      value={value ?? null}
      onChangeValue={(value: any) => {
        setFieldValue(value)
        !!onChange && onChange(value)
      }}
      {...params}
      {...componentProps}
    />
  )
}
