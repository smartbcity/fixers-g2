import { FieldRenderProps } from '../FormComposable/type/FieldRenderProps'
import { FunctionComponent } from 'react'

export interface ElementProps<TYPE extends string, PARAMS> {
  type: TYPE
  params?: PARAMS
}

export type ElementRendererFunction<
  PROPS extends FieldRenderProps<string, {}>
> = FunctionComponent<PROPS>

export interface RenderersConfig
  extends Record<string, ElementRendererFunction<any>> {}

export type ComposableRendererKeys<RENDERER extends RenderersConfig> = Extract<
  keyof RENDERER,
  string
>

export type ComposableRendererFunction<RENDERER extends RenderersConfig> =
  RENDERER[ComposableRendererKeys<RENDERER>]

export type ComposableElementRendererProps<RENDERER extends RenderersConfig> =
  FunctionRendererTypeGetter<ComposableRendererFunction<RENDERER>>['elements']

export type FunctionRendererTypeGetter<T extends ElementRendererFunction<any>> =
  T extends ElementRendererFunction<infer R> ? R : unknown
