import { createElement } from 'react'
import { ElementRenderers, ElementProps } from './ElementRenderer'

export type ElementFactoryType = (
  componentProps: ElementProps<any, any>,
  renderers?: ElementRenderers<any>
) => JSX.Element | null

export const ElementFactory: ElementFactoryType = (
  componentProps,
  renderers?
) => {
  if (!renderers || !(componentProps.type in renderers)) return null
  const factoryInstance = renderers[componentProps.type]
  if (!factoryInstance) {
    console.warn('Debug: Using custom message type without factory!')
    return null
  }
  return createElement(factoryInstance, componentProps)
}
