import React, { ReactElement, useMemo } from 'react'
import {
  RadioChoicesProps,
  InputForm,
  InputFormBasicProps
} from '@smartb/g2-forms'
import { FieldRenderProps } from '../type'
import { ElementRendererFunction } from '../../ComposableRender'
import { getValueSetup } from '../type/getValueSetup'

export type RadioChoicesExtendProps = Partial<
  Omit<
    RadioChoicesProps & InputFormBasicProps<'radioChoices'>,
    'value' | 'onChange' | 'label' | 'classes' | 'styles'
  >
>

export type RadioChoicesRenderProps = FieldRenderProps<
  'radioChoices',
  RadioChoicesExtendProps
>

export const RadioChoicesRender: ElementRendererFunction<
  RadioChoicesRenderProps
> = (props: RadioChoicesRenderProps): ReactElement => {
  const { element, formState, basicProps } = props
  const { params } = element
  const { value, setFieldValue } = useMemo(
    () => getValueSetup(basicProps.name, formState, basicProps.sharedNameIndex),
    [basicProps.name, formState, basicProps.sharedNameIndex]
  )
  const onChange = basicProps.onChange
  delete basicProps.onChange
  return (
    <InputForm
      inputType='radioChoices'
      value={value ?? ''}
      {...params}
      {...basicProps}
      onChange={(value: string) => {
        setFieldValue(value)
        !!onChange && onChange(value)
      }}
    />
  )
}
