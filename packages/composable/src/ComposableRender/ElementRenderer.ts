import { ComponentClass, FunctionComponent } from 'react'

export interface ElementType<TYPE extends string, PARAMS> {
  type: TYPE
  params?: PARAMS
}

export interface ElementRendererProps<TYPE extends string, PARAMS> {
  element: ElementType<TYPE, PARAMS>
}

export type ComposableElementConfig = Record<string, ElementType<any, any>>

export type ComposableConfigKeys<CONFIG extends ComposableElementConfig> =
  Extract<keyof CONFIG, string>

export type ComposableConfigProps<CONFIG extends ComposableElementConfig> =
  CONFIG[ComposableConfigKeys<CONFIG>]

export interface ElementRenderPropsConfig<
  CONFIG extends ComposableElementConfig
> extends ElementRendererProps<
    ComposableConfigKeys<CONFIG>,
    ComposableConfigProps<CONFIG>['params']
  > {}

export type ElementRenderersFcn<CONFIG extends ComposableElementConfig> =
  | FunctionComponent<ElementRenderPropsConfig<CONFIG>>
  | ComponentClass<ElementRenderPropsConfig<CONFIG>>

export type ElementRenderers<CONFIG extends ComposableElementConfig> = Record<
  ComposableConfigKeys<CONFIG>,
  ElementRenderersFcn<CONFIG>
>
