import { CheckBox, CheckBoxProps } from '@smartb/g2-forms'
import React from 'react'
import { FieldRenderProps } from '../type'
import { ElementRendererFunction } from '../../ComposableRender'
import { getIn } from 'formik'

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
  const { element, formState, basicProps } = props
  const { params } = element
  const value = getIn(formState.values, basicProps.name)
  const onChange = basicProps.onChange
  delete basicProps.onChange
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
        !!onChange && onChange(value)
      }}
    />
  )
}
