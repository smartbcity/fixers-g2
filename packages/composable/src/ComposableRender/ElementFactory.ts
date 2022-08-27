import { createElement } from 'react'
import { ElementRenderersConfig, WithElementParams } from './ElementRenderer'

export type ElementFactoryType = (
  componentProps: WithElementParams<any, any>,
  renderers?: ElementRenderersConfig
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
