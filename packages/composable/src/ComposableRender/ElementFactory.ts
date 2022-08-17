import { createElement } from 'react'
import { ElementRenderers, ElementRenderProps } from './ElementRenderer'

export type ElementFactoryType = (
  componentProps: ElementRenderProps<any, any>,
  renderers?: ElementRenderers<any>
) => JSX.Element | null

export const ElementFactory: ElementFactoryType = (
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
