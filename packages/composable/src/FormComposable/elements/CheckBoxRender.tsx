import { CheckBox, CheckBoxProps } from '@smartb/g2-forms'
import React from 'react'
import { FieldRenderProps } from '../type/FieldRenderProps'
import { ElementRendererFunction } from '../../ComposableRender/ElementRenderer'

export type CheckBoxExtendProps = Partial<
  Omit<CheckBoxProps, 'checked' | 'onChange' | 'label' | 'classes' | 'styles'>
>

export type CheckBoxRenderProps = FieldRenderProps<
  'checkBox',
  CheckBoxExtendProps
>

export const CheckBoxRender: ElementRendererFunction<CheckBoxRenderProps> = (
  props: CheckBoxRenderProps
) => {
  const { elements, formState, basicProps } = props
  const { params } = elements
  const value = formState.getFieldProps(basicProps.name).value
  return (
    <CheckBox
      checked={value}
      disabled={params?.disabled}
      {...params}
      {...basicProps}
      readOnly={
        basicProps.readonly === true ? basicProps.readonly : params?.readOnly
      }
      onChange={(_: React.ChangeEvent<HTMLInputElement>, value: boolean) => {
        formState.setFieldValue(basicProps.name, value, false)
        !!basicProps.onChange && basicProps.onChange(value)
      }}
    />
  )
}
