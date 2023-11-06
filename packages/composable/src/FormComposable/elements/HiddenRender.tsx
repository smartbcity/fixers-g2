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
    () => getValueSetup(componentProps.name, formState),
    [componentProps.name, formState]
  )

  delete componentProps.onChange

  return <input value={value ?? ''} type='hidden' {...params} />
}
