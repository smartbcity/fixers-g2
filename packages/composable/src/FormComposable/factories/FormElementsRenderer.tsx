import {
  TextFieldExtendProps,
  TextFieldRender
} from '../elements/TextFieldRender'
import { FormSelectExtendProps, SelectRender } from '../elements/SelectRender'
import {
  DatePickerExtendProps,
  DatePickerRender
} from '../elements/DatePickerRender'
import {
  AutoCompleteExtendProps,
  AutoCompleteRender
} from '../elements/AutoCompleteRender'
import { CheckBoxExtendProps, CheckBoxRender } from '../elements/CheckBoxRender'
import {
  RadioChoicesExtendProps,
  RadioChoicesRender
} from '../elements/RadioChoicesRender'
import {
  ElementParams,
  RenderersConfig
} from '../../ComposableRender/ElementRenderer'

export const DefaultRenderer: RenderersConfig = {
  textField: TextFieldRender,
  select: SelectRender,
  autoComplete: AutoCompleteRender,
  checkBox: CheckBoxRender,
  datePicker: DatePickerRender,
  radioChoices: RadioChoicesRender
}

export type FieldRenderType =
  | ElementParams<'autoComplete', AutoCompleteExtendProps>
  | ElementParams<'checkBox', CheckBoxExtendProps>
  | ElementParams<'datePicker', DatePickerExtendProps>
  | ElementParams<'radioChoices', RadioChoicesExtendProps>
  | ElementParams<'select', FormSelectExtendProps>
  | ElementParams<'textField', TextFieldExtendProps>
