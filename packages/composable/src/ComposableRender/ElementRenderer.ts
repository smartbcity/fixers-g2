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
export interface ElementRenderPropsConfig<
  CONFIG extends ComposableElementConfig
> extends ElementRenderProps<
    ComposableConfigKeys<CONFIG>,
    ComposableConfigProps<CONFIG>['props']
  > {}

export type ElementRenderersFcn<CONFIG extends ComposableElementConfig> =
  | FunctionComponent<ElementRenderPropsConfig<CONFIG>>
  | ComponentClass<ElementRenderPropsConfig<CONFIG>>

export type ElementRenderers<CONFIG extends ComposableElementConfig> = Record<
  ComposableConfigKeys<CONFIG>,
  ElementRenderersFcn<CONFIG>
>
