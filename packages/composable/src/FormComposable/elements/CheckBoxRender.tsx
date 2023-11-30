import { CheckBox, CheckBoxProps } from '@smartb/g2-forms'
import React, { useMemo } from 'react'
import { FieldRenderProps } from '../type'
import { ElementRendererFunction } from '../../ComposableRender'
import { getValueSetup } from '../type/getValueSetup'

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
  const componentProps = { ...basicProps }
  delete componentProps.emptyValueInReadOnly
  const { value, setFieldValue } = useMemo(
    () => getValueSetup(componentProps.name, formState),
    [componentProps.name, formState]
  )
  const onChange = componentProps.onChange
  delete componentProps.onChange

  return (
    <CheckBox
      checked={value}
      disabled={params?.disabled}
      onChange={(_: React.ChangeEvent<HTMLInputElement>, value: boolean) => {
        setFieldValue(value)
        !!onChange && onChange(value)
      }}
      {...params}
      {...componentProps}
      readOnly={
        componentProps.readOnly === true
          ? componentProps.readOnly
          : params?.readOnly
      }
    />
  )
}
