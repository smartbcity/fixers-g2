import { FunctionComponent } from 'react'

export interface ElementParams<TYPE extends string, PARAMS> {
  type: TYPE
  params?: PARAMS
}

export interface WithElementParams<TYPE extends string, PARAMS> {
  element: ElementParams<TYPE, PARAMS>
}

export interface ElementRenderersConfig
  extends Record<
    string,
    ElementRendererFunction<WithElementParams<string, {}>>
  > {}

export type ElementRendererFunction<
  PROPS extends WithElementParams<string, {}>
> = FunctionComponent<PROPS>

// Type used to export ElementParams type from rendertype.
// Types looks good in ide preview but when using object is any type

export type ComposableElementRendererProps<
  RENDERER extends ElementRenderersConfig
> = ExtractElementParams<ComposableRendererFunction<RENDERER>>

export type ComposableRendererFunction<
  RENDERER extends ElementRenderersConfig
> = RENDERER[ExtractRenderersKeys<RENDERER>]

export type ExtractRenderersKeys<RENDERER extends ElementRenderersConfig> =
  Extract<keyof RENDERER, string>

export type ExtractElementParams<
  T extends ElementRendererFunction<WithElementParams<string, any>>
> = T extends ElementRendererFunction<
  infer R extends WithElementParams<string, any>
>
  ? R['element']
  : unknown
