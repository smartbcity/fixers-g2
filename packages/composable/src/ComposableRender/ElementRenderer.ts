import { ComponentClass, FunctionComponent } from 'react'

export interface ElementType<TYPE extends string, PARAMS> {
  type: TYPE
  params?: PARAMS
}

export type ComposableElementConfig = Record<string, ElementType<any, any>>

export type ComposableConfigKeys<CONFIG extends ComposableElementConfig> =
  Extract<keyof CONFIG, string>

// export type ComposableConfigType<CONFIG extends ComposableElementConfig> =
//   CONFIG[ComposableConfigKeys<CONFIG>]['type']

export type ComposableConfigParams<CONFIG extends ComposableElementConfig> =
  CONFIG[ComposableConfigKeys<CONFIG>]['params']

export interface ElementRenderPropsConfig<
  CONFIG extends ComposableElementConfig
> extends ElementType<
    ComposableConfigKeys<CONFIG>,
    ComposableConfigParams<CONFIG>
  > {}

export type ElementRenderersFcn<CONFIG extends ComposableElementConfig> =
  | FunctionComponent<ElementRenderPropsConfig<CONFIG>>
  | ComponentClass<ElementRenderPropsConfig<CONFIG>>

export type ElementRenderers<CONFIG extends ComposableElementConfig> = Record<
  ComposableConfigKeys<CONFIG>,
  ElementRenderersFcn<CONFIG>
>
