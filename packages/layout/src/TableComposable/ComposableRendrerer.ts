import { FunctionComponent } from 'react'

export interface ColumnParams<TYPE extends string, PARAMS> {
  type: TYPE
  properties?: PARAMS
}

export interface WithColumnParams<TYPE extends string, PARAMS> {
  key: string
  element: ColumnParams<TYPE, PARAMS>
}

export type ColumnRenderersConfig<
  PROPS extends WithColumnParams<string, {}> = WithColumnParams<string, {}>
> = Record<string, ColumnRendererFunction<PROPS>>

export type ColumnRendererFunction<
  PROPS extends WithColumnParams<string, {}> = WithColumnParams<string, {}>
> = FunctionComponent<PROPS>

export type ComposableColumnRendererProps<
  RENDERER extends ColumnRenderersConfig
> = ExtractColumnParams<ComposableRendererFunction<RENDERER>>['element']

export type ComposableRendererFunction<RENDERER extends ColumnRenderersConfig> =
  RENDERER[ExtractRenderersKeys<RENDERER>]

export type ExtractRenderersKeys<RENDERER extends ColumnRenderersConfig> =
  Extract<keyof RENDERER, string>

export type ExtractColumnParams<
  T extends ColumnRendererFunction<WithColumnParams<string, any>>
> = T extends ColumnRendererFunction<infer R> ? R : unknown
