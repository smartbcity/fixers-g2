import { FieldRenderProps } from '../FormComposable/type/FieldRenderProps'
import { FunctionComponent } from 'react'

export interface ElementParams<TYPE extends string, PARAMS> {
  type: TYPE
  params?: PARAMS
}

export type ElementRendererFunction<
  PROPS extends FieldRenderProps<string, {}>
> = FunctionComponent<PROPS>

export interface RenderersConfig
  extends Record<string, ElementRendererFunction<any>> {}

// Type used to export ElementParams type from rendertype.
// Types looks good in ide preview but when using object is any type
// export type ComposableRendererKeys<RENDERER extends RenderersConfig> = Extract<
//   keyof RENDERER,
//   string
// >

// export type ComposableRendererFunction<RENDERER extends RenderersConfig> =
//   RENDERER[ComposableRendererKeys<RENDERER>]
//
// export type ComposableElementRendererProps<RENDERER extends RenderersConfig> =
//   FunctionRendererTypeGetter<ComposableRendererFunction<RENDERER>>['elements']
//
// export type FunctionRendererTypeGetter<T extends ElementRendererFunction<any>> =
//   T extends ElementRendererFunction<infer R> ? R : unknown

// Example d'utilisatiom
// export interface FormRenderersConfig extends RenderersConfig {
//   autoComplete: ElementRendererFunction<AutoCompleteRenderProps>
//   checkBox: ElementRendererFunction<CheckBoxRenderProps>
//   datePicker: ElementRendererFunction<DatePickerRenderProps>
//   radioChoices: ElementRendererFunction<RadioChoicesRenderProps>
//   select: ElementRendererFunction<SelectRenderProps>
//   textField: ElementRendererFunction<TextFieldRenderProps>
// }

// export const DefaultRenderer: FormRenderersConfig = {
//   textField: TextFieldRender,
//   select: SelectRender,
//   autoComplete: AutoCompleteRender,
//   radioChoices: RadioChoicesRender
// }

// export type FieldRenderType = ComposableElementRendererProps<
//   typeof DefaultRenderer
// >
