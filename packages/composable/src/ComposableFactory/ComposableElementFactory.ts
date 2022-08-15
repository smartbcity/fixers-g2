import { createElement } from 'react'
import { ElementRenderers, ElementRenderProps } from './ElementRenderer'

export type ComposableElementFactoryType = (
  componentProps: ElementRenderProps<any, any>,
  renderers?: ElementRenderers<any, any>
) => JSX.Element | null

export const ComposableElementFactory: ComposableElementFactoryType = (
  componentProps,
  renderers?
) => {
  if (!renderers || !(componentProps.element.type in renderers)) return null
  const factoryInstance = renderers[componentProps.element.type]
  if (!factoryInstance) {
    console.warn('Debug: Using custom message type without factory!')
    return null
  }
  return createElement(factoryInstance, componentProps)
}
