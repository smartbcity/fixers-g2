import React, { FunctionComponent, ReactElement } from 'react'
import { SelectProps, InputForm, InputFormBasicProps } from '@smartb/g2-forms'
import { FieldRenderProps } from '../factories/FieldRenderProps'

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

type SelectFieldProps = FieldRenderProps<'select', FormSelectExtendProps>

export const SelectRender: FunctionComponent<SelectFieldProps> = (
  props: SelectFieldProps
): ReactElement => {
  const { element, formState, basicProps } = props
  return element.props?.multiple === true ? (
    <InputForm
      inputType='select'
      values={formState.getFieldProps(basicProps.name).value ?? []}
      onChangeValues={(values: string[]) => {
        formState.setFieldValue(basicProps.name, values, false)
        !!basicProps.onChange && basicProps.onChange(values)
      }}
      {...element.props}
      {...basicProps}
    />
  ) : (
    <InputForm
      inputType='select'
      value={formState.getFieldProps(basicProps.name).value ?? ''}
      onChangeValue={(value: string) => {
        formState.setFieldValue(basicProps.name, value, false)
        !!basicProps.onChange && basicProps.onChange(value)
      }}
      {...element.props}
      {...basicProps}
    />
  )
}
