import {
  TextFieldRender,
  TextFieldRenderProps
} from '../elements/TextFieldRender'
import { SelectRender, SelectRenderProps } from '../elements/SelectRender'
import {
  DatePickerRender,
  DatePickerRenderProps
} from '../elements/DatePickerRender'
import {
  AutoCompleteRender,
  AutoCompleteRenderProps
} from '../elements/AutoCompleteRender'
import { CheckBoxRender, CheckBoxRenderProps } from '../elements/CheckBoxRender'
import {
  RadioChoicesRender,
  RadioChoicesRenderProps
} from '../elements/RadioChoicesRender'
import {
  ComposableRendererFunctionProps,
  ElementRendererFunction,
  RenderersConfig
} from '../../ComposableRender/ElementRenderer'

export interface FormRenderersConfig extends RenderersConfig {
  autoComplete: ElementRendererFunction<AutoCompleteRenderProps>
  checkBox: ElementRendererFunction<CheckBoxRenderProps>
  datePicker: ElementRendererFunction<DatePickerRenderProps>
  radioChoices: ElementRendererFunction<RadioChoicesRenderProps>
  select: ElementRendererFunction<SelectRenderProps>
  textField: ElementRendererFunction<TextFieldRenderProps>
}

export const DefaultRenderer: FormRenderersConfig = {
  textField: TextFieldRender,
  select: SelectRender,
  autoComplete: AutoCompleteRender,
  checkBox: CheckBoxRender,
  datePicker: DatePickerRender,
  radioChoices: RadioChoicesRender
}

export type FieldRenderType = ComposableRendererFunctionProps<
  typeof DefaultRenderer
>
