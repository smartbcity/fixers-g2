import React, { FunctionComponent, ReactElement } from 'react'
import { SelectProps, InputForm, InputFormBasicProps } from '@smartb/g2-forms'
import { FieldProps } from '../factories/FormElementsFactories'

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

type SelectFieldProps = FieldProps<'select', FormSelectExtendProps>

export const SelectRender: FunctionComponent<SelectFieldProps> = (
  props: SelectFieldProps
): ReactElement => {
  const { element, formState, formProps } = props
  return element.props?.multiple === true ? (
    <InputForm
      inputType='select'
      values={formState.getFieldProps(formProps.name).value ?? []}
      onChangeValues={(values: string[]) => {
        formState.setFieldValue(formProps.name, values, false)
        !!formProps.onChange && formProps.onChange(values)
      }}
      {...element.props}
      {...formProps}
    />
  ) : (
    <InputForm
      inputType='select'
      value={formState.getFieldProps(formProps.name).value ?? ''}
      onChangeValue={(value: string) => {
        formState.setFieldValue(formProps.name, value, false)
        !!formProps.onChange && formProps.onChange(value)
      }}
      {...element.props}
      {...formProps}
    />
  )
}
