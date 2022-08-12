import {
  InputFormBasicProps,
  AutoCompleteProps,
  InputForm
} from '@smartb/g2-forms'
import React, { FunctionComponent } from 'react'
import { FieldProps } from '../factories/FormElementsFactories'

export type AutoCompleteExtendProps = Partial<
  Omit<
    AutoCompleteProps & InputFormBasicProps<'autoComplete'>,
    | 'value'
    | 'values'
    | 'onChangeValue'
    | 'onChangeValues'
    | 'label'
    | 'classes'
    | 'styles'
  >
>

type AutoCompleteRenderPros = FieldProps<
  'autoComplete',
  AutoCompleteExtendProps
>

export const AutoCompleteRender: FunctionComponent<AutoCompleteRenderPros> = (
  props: AutoCompleteRenderPros
) => {
  const { element, formState, formProps } = props
  return element.props?.multiple === true ? (
    // @ts-ignore
    <InputForm
      inputType='autoComplete'
      values={formState.getFieldProps(formProps.name).value ?? []}
      onChangeValues={(values: any) => {
        formState.setFieldValue(formProps.name, values, false)
        !!formProps.onChange && formProps.onChange(values)
      }}
      {...element.props}
      {...formProps}
    />
  ) : (
    // @ts-ignore
    <InputForm
      inputType='autoComplete'
      value={formState.getFieldProps(formProps.name).value ?? ''}
      onChangeValue={(value: any) => {
        formState.setFieldValue(formProps.name, value, false)
        !!formProps.onChange && formProps.onChange(value)
      }}
      {...element?.props}
      {...formProps}
    />
  )
}
