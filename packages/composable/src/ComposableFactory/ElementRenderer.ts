import { ComponentClass, FunctionComponent } from 'react'

export type ComposableElementConfig = Record<string, ElementType<any, any>>

export type ComposableConfigKeys<CONFIG extends ComposableElementConfig> =
  Extract<keyof CONFIG, string>

export type ComposableConfigProps<CONFIG extends ComposableElementConfig> =
  CONFIG[ComposableConfigKeys<CONFIG>]

export interface ElementType<TYPE extends string, PROPS> {
  type: TYPE
  props?: PROPS
}

export interface ElementRenderProps<TYPE extends string, PROPS> {
  element: ElementType<TYPE, PROPS>
}

export type ElementRenderersFcn<
  CONFIG extends ComposableElementConfig,
  ELEMENT_PROPS extends ElementRenderProps<
    ComposableConfigKeys<CONFIG>,
    ComposableConfigProps<CONFIG>
  >
> = FunctionComponent<ELEMENT_PROPS> | ComponentClass<ELEMENT_PROPS>

export type ElementRenderers<
  CONFIG extends ComposableElementConfig,
  ELEMENT_PROPS extends ElementRenderProps<
    ComposableConfigKeys<CONFIG>,
    ComposableConfigProps<CONFIG>
  >
> = Record<
  ComposableConfigKeys<CONFIG>,
  ElementRenderersFcn<CONFIG, ELEMENT_PROPS>
>
