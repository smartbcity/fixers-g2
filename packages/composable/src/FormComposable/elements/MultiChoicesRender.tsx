import React, { ReactElement, useMemo } from 'react'
import {
  InputForm,
  InputFormBasicProps,
  MultiChoicesProps
} from '@smartb/g2-forms'
import { FieldRenderProps } from '../type'
import { ElementRendererFunction } from '../../ComposableRender'
import { getValueSetup } from '../type/getValueSetup'

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
  const { value, setFieldValue } = useMemo(
    () => getValueSetup(basicProps.name, formState, basicProps.sharedNameIndex),
    [basicProps.name, formState, basicProps.sharedNameIndex]
  )
  const onChange = basicProps.onChange
  delete basicProps.onChange
  delete basicProps.sharedNameIndex
  return (
    <InputForm
      inputType='multiChoices'
      values={value ?? ''}
      {...params}
      {...basicProps}
      onChange={(values) => {
        setFieldValue(values)
        !!onChange && onChange(values)
      }}
    />
  )
}
