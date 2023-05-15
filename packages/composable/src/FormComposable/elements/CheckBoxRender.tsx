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
  delete basicProps.emptyValueInReadOnly
  const { value, setFieldValue } = useMemo(
    () => getValueSetup(basicProps.name, formState, basicProps.sharedNameIndex),
    [basicProps.name, formState, basicProps.sharedNameIndex]
  )
  const onChange = basicProps.onChange
  delete basicProps.onChange
  delete basicProps.sharedNameIndex
  return (
    <CheckBox
      checked={value}
      disabled={params?.disabled}
      onChange={(_: React.ChangeEvent<HTMLInputElement>, value: boolean) => {
        setFieldValue(value)
        !!onChange && onChange(value)
      }}
      {...params}
      {...basicProps}
      readOnly={
        basicProps.readOnly === true ? basicProps.readOnly : params?.readOnly
      }
    />
  )
}
