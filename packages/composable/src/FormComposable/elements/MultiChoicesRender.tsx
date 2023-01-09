import React, { ReactElement } from 'react'
import {
  InputForm,
  InputFormBasicProps,
  MultiChoicesProps
} from '@smartb/g2-forms'
import { FieldRenderProps } from '../type'
import { ElementRendererFunction } from '../../ComposableRender'
import { getIn } from 'formik'

export type MultiChoicesExtendProps = Partial<
  Omit<
    MultiChoicesProps & InputFormBasicProps<'multiChoices'>,
    'value' | 'onChange' | 'label' | 'classes' | 'styles'
  >
>

export type MultiChoicesRenderProps = FieldRenderProps<
  'multiChoices',
  MultiChoicesExtendProps
>

export const MultiChoicesRender: ElementRendererFunction<
  MultiChoicesRenderProps
> = (props: MultiChoicesRenderProps): ReactElement => {
  const { element, formState, basicProps } = props
  const { params } = element
  const value = getIn(formState.values, basicProps.name)
  const onChange = basicProps.onChange
  delete basicProps.onChange
  return (
    <InputForm
      inputType='multiChoices'
      values={value ?? ''}
      {...params}
      {...basicProps}
      onChange={(values) => {
        formState.setFieldValue(basicProps.name, values, false)
        !!onChange && onChange(values)
      }}
    />
  )
}
