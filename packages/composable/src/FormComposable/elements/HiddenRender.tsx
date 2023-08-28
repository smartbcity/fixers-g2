import React, { useMemo } from 'react'
import { FieldRenderProps } from '../type'
import { ElementRendererFunction } from '../../ComposableRender'
import { getValueSetup } from '../type/getValueSetup'

export type HiddenRenderProps = FieldRenderProps<
  'hidden',
  React.InputHTMLAttributes<HTMLInputElement>
>

export const HiddenRender: ElementRendererFunction<HiddenRenderProps> = (
  props: HiddenRenderProps
) => {
  const { element, formState, basicProps } = props
  const { params } = element
  const componentProps = { ...basicProps }

  const { value } = useMemo(
    () =>
      getValueSetup(
        componentProps.name,
        formState,
        componentProps.sharedNameIndex
      ),
    [componentProps.name, formState, componentProps.sharedNameIndex]
  )

  delete componentProps.onChange
  delete componentProps.sharedNameIndex

  return <input value={value ?? ''} type='hidden' {...params} />
}
