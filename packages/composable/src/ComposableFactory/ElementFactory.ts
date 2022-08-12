import { ComponentClass, createElement, FunctionComponent } from 'react'

export type ComposableConfigMap<CONFIG> = {
  type: keyof CONFIG
  props: CONFIG[keyof CONFIG]
}

// export type ComposableConfigMap<CONFIG> = (keyof CONFIG & CONFIG[keyof CONFIG])

// export interface RenderTypeTT<CONFIG extends ComposableConfigMap<any>> {
//   type: CONFIG['type']
//   props?: CONFIG['props']
// }

export interface ElementType<TYPE extends string, PROPS> {
  type: TYPE
  props?: PROPS
}

export interface ElementRenderProps<TYPE extends string, PROPS> {
  element: ElementType<TYPE, PROPS>
}

export interface ElementFactory<
  TYPE extends string,
  PROPS,
  ELEMENT_PROPS extends ElementRenderProps<TYPE, PROPS>
> {
  factory: FunctionComponent<ELEMENT_PROPS> | ComponentClass<ELEMENT_PROPS>
}

export type ElementFactories<
  TYPE extends string,
  PROPS,
  ELEMENT_PROPS extends ElementRenderProps<TYPE, PROPS>
> = Record<TYPE, ElementFactory<TYPE, PROPS, ELEMENT_PROPS>>

export type ComposableElementFactoryType = <
  TYPE extends string,
  PROPS,
  COMPONENT_PROPS extends ElementRenderProps<TYPE, PROPS>
>(
  componentProps: COMPONENT_PROPS,
  factories?: ElementFactories<TYPE, PROPS, any>
) => JSX.Element | null

export const ComposableElementFactory: ComposableElementFactoryType = (
  componentProps,
  factories?
) => {
  if (!factories || !(componentProps.element.type in factories)) return null
  const factoryInstance = factories[componentProps.element.type]?.factory
  if (!factoryInstance) {
    console.warn('Debug: Using custom message type without factory!')
    return null
  }
  return createElement(factoryInstance, componentProps)
}
