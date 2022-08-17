import {
  InputFormBasicProps,
  AutoCompleteProps,
  InputForm
} from '@smartb/g2-forms'
import React, { FunctionComponent } from 'react'
import { FieldRenderProps } from '../factories/FieldRenderProps'

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

type AutoCompleteRenderPros = FieldRenderProps<
  'autoComplete',
  AutoCompleteExtendProps
>

export const AutoCompleteRender: FunctionComponent<AutoCompleteRenderPros> = (
  props: AutoCompleteRenderPros
) => {
  const { element, formState, basicProps } = props
  return element.params?.multiple === true ? (
    // @ts-ignore
    <InputForm
      inputType='autoComplete'
      values={formState.getFieldProps(basicProps.name).value ?? []}
      onChangeValues={(values: any) => {
        formState.setFieldValue(basicProps.name, values, false)
        !!basicProps.onChange && basicProps.onChange(values)
      }}
      {...element.params}
      {...basicProps}
    />
  ) : (
    // @ts-ignore
    <InputForm
      inputType='autoComplete'
      value={formState.getFieldProps(basicProps.name).value ?? ''}
      onChangeValue={(value: any) => {
        formState.setFieldValue(basicProps.name, value, false)
        !!basicProps.onChange && basicProps.onChange(value)
      }}
      {...element?.params}
      {...basicProps}
    />
  )
}
