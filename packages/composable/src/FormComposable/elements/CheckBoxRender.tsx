import { CheckBox, CheckBoxProps } from '@smartb/g2-forms'
import React, { FunctionComponent } from 'react'
import { FieldRenderProps } from '../factories/FormElementsFactories'

export type CheckBoxExtendProps = Partial<
  Omit<CheckBoxProps, 'checked' | 'onChange' | 'label' | 'classes' | 'styles'>
>

type CheckBoxRenderPros = FieldRenderProps<'checkBox', CheckBoxExtendProps>

export const CheckBoxRender: FunctionComponent<CheckBoxRenderPros> = (
  props: CheckBoxRenderPros
) => {
  const { element, formState, basicProps } = props
  return (
    <CheckBox
      checked={formState.getFieldProps(basicProps.name).value}
      onChange={(_: React.ChangeEvent<HTMLInputElement>, value: boolean) => {
        formState.setFieldValue(basicProps.name, value, false)
        !!basicProps.onChange && basicProps.onChange(value)
      }}
      disabled={element.props?.disabled}
      {...element.props}
      {...basicProps}
    />
  )
}
