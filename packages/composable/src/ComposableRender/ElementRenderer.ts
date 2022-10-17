import { FunctionComponent, ReactNode } from 'react'

export interface ElementParams<TYPE extends string, PARAMS> {
  type: TYPE
  params?: PARAMS
  /**
   * if you want to add other nodes around the input use this function
   */
  customDisplay?: (input: ReactNode) => ReactNode
}

export interface WithElementParams<TYPE extends string, PARAMS> {
  key: string
  element: ElementParams<TYPE, PARAMS>
}

export type ElementRenderersConfig<
  PROPS extends WithElementParams<string, {}> = WithElementParams<string, {}>
> = Record<string, ElementRendererFunction<PROPS>>

export type ElementRendererFunction<
  PROPS extends WithElementParams<string, {}> = WithElementParams<string, {}>
> = FunctionComponent<PROPS>

export type ComposableElementRendererProps<
  RENDERER extends ElementRenderersConfig
> = ExtractElementParams<ComposableRendererFunction<RENDERER>>['element']

export type ComposableRendererFunction<
  RENDERER extends ElementRenderersConfig
> = RENDERER[ExtractRenderersKeys<RENDERER>]

export type ExtractRenderersKeys<RENDERER extends ElementRenderersConfig> =
  Extract<keyof RENDERER, string>

export type ExtractElementParams<
  T extends ElementRendererFunction<WithElementParams<string, any>>
> = T extends ElementRendererFunction<infer R> ? R : unknown
