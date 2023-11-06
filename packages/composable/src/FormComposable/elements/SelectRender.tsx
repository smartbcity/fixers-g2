import React, { ReactElement, useMemo } from 'react'
import { SelectProps, InputForm, InputFormBasicProps } from '@smartb/g2-forms'
import { FieldRenderProps } from '../type'
import { ElementRendererFunction } from '../../ComposableRender'
import { getValueSetup } from '../type/getValueSetup'

export type FormSelectExtendProps = Partial<
  Omit<
    SelectProps & InputFormBasicProps<'select'>,
    | 'value'
    | 'values'
    | 'onChangeValue'
    | 'onChangeValues'
    | 'label'
    | 'classes'
    | 'styles'
  >
>

export type SelectRenderProps = FieldRenderProps<
  'select',
  FormSelectExtendProps
>

export const SelectRender: ElementRendererFunction<SelectRenderProps> = (
  props: SelectRenderProps
): ReactElement => {
  const { element, formState, basicProps } = props
  const { params } = element
  const componentProps = { ...basicProps }
  const { value, setFieldValue } = useMemo(
    () => getValueSetup(componentProps.name, formState),
    [componentProps.name, formState]
  )
  const onChange = componentProps.onChange
  delete componentProps.onChange

  return params?.multiple === true ? (
    <InputForm
      inputType='select'
      values={value ?? []}
      onChangeValues={(values: string[]) => {
        setFieldValue(values)
        !!onChange && onChange(values)
      }}
      {...params}
      {...componentProps}
    />
  ) : (
    <InputForm
      inputType='select'
      value={value ?? ''}
      onChangeValue={(value: string) => {
        formState.setFieldValue(componentProps.name, value, false)
        !!onChange && onChange(value)
      }}
      {...params}
      {...componentProps}
    />
  )
}
