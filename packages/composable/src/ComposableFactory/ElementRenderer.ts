import { ComponentClass, FunctionComponent } from 'react'

export type ComposableConfigMap<CONFIG> = {
  type: keyof CONFIG
  props: CONFIG[keyof CONFIG]
}

// export type ComposableConfigMap<CONFIG> = (keyof CONFIG & CONFIG[keyof CONFIG])

export interface RenderTypeTT<CONFIG extends ComposableConfigMap<any>> {
  type: CONFIG['type']
  props?: CONFIG['props']
}

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

export type ElementRenderers<
  TYPE extends string,
  PROPS,
  ELEMENT_PROPS extends ElementRenderProps<TYPE, PROPS>
> = Record<TYPE, ElementFactory<TYPE, PROPS, ELEMENT_PROPS>>
