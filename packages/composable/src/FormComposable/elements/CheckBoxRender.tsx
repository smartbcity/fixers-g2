import { CheckBox, CheckBoxProps } from '@smartb/g2-forms'
import React, { FunctionComponent } from 'react'
import { FieldRenderProps } from '../factories/FieldRenderProps'

export type CheckBoxExtendProps = Partial<
  Omit<CheckBoxProps, 'checked' | 'onChange' | 'label' | 'classes' | 'styles'>
>

type CheckBoxRenderPros = FieldRenderProps<'checkBox', CheckBoxExtendProps>

export const CheckBoxRender: FunctionComponent<CheckBoxRenderPros> = (
  props: CheckBoxRenderPros
) => {
  const { element, formState, basicProps } = props
  const elementProps = element.params
  const value = formState.getFieldProps(basicProps.name).value
  return (
    <CheckBox
      checked={value}
      disabled={elementProps?.disabled}
      {...element.params}
      {...basicProps}
      readOnly={
        basicProps.readonly === true
          ? basicProps.readonly
          : elementProps?.readOnly
      }
      onChange={(_: React.ChangeEvent<HTMLInputElement>, value: boolean) => {
        formState.setFieldValue(basicProps.name, value, false)
        !!basicProps.onChange && basicProps.onChange(value)
      }}
    />
  )
}
