import { CheckBox, CheckBoxProps } from '@smartb/g2-forms'
import React, { FunctionComponent } from 'react'
import { FieldProps } from '../factories/FormElementsFactories'

export type CheckBoxExtendProps = Partial<
  Omit<CheckBoxProps, 'checked' | 'onChange' | 'label' | 'classes' | 'styles'>
>

type CheckBoxRenderPros = FieldProps<'checkBox', CheckBoxExtendProps>

export const CheckBoxRender: FunctionComponent<CheckBoxRenderPros> = (
  props: CheckBoxRenderPros
) => {
  const { element, formState, formProps } = props
  return (
    <CheckBox
      checked={formState.getFieldProps(formProps.name).value}
      onChange={(_: React.ChangeEvent<HTMLInputElement>, value: boolean) => {
        formState.setFieldValue(formProps.name, value, false)
        !!formProps.onChange && formProps.onChange(value)
      }}
      disabled={element.props?.disabled}
      {...element.props}
      {...formProps}
    />
  )
}
