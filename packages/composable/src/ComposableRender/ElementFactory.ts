import { createElement } from 'react'
import { RenderersConfig } from './ElementRenderer'
import { FieldRenderProps } from '../FormComposable/type/FieldRenderProps'

export type ElementFactoryType = (
  componentProps: FieldRenderProps<any, any>,
  renderers?: RenderersConfig
) => JSX.Element | null

export const ElementFactory: ElementFactoryType = (
  componentProps,
  renderers?
) => {
  if (!renderers || !(componentProps.elements.type in renderers)) return null
  const factoryInstance = renderers[componentProps.elements.type]
  if (!factoryInstance) {
    console.warn('Debug: Using custom message type without factory!')
    return null
  }
  return createElement(factoryInstance, componentProps)
}
