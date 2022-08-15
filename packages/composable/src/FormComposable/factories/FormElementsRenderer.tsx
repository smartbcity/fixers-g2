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
import { FieldRenderProps } from './FieldRenderProps'
import {
  ComposableConfigKeys,
  ComposableElementConfig,
  ElementRenderers,
  ElementType
} from '../../ComposableFactory/ElementRenderer'

/**
 * Map a field type to  Props type.
 */
/**
 * Map a field type to  Props type.
 */
export interface FieldTypeMap extends ComposableElementConfig {
  autoComplete: ElementType<'autoComplete', AutoCompleteExtendProps>
  checkBox: ElementType<'checkBox', CheckBoxExtendProps>
  textField: ElementType<'textField', TextFieldExtendProps>
  select: ElementType<'select', FormSelectExtendProps>
  datePicker: ElementType<'datePicker', DatePickerExtendProps>
  radioChoices: ElementType<'radioChoices', RadioChoicesExtendProps>
}

export type FieldRenderType = FieldTypeMap[ComposableConfigKeys<FieldTypeMap>]

export const DefaultRenderer: ElementRenderers<
  FieldTypeMap,
  FieldRenderProps<string, any>
> = {
  textField: TextFieldRender,
  select: SelectRender,
  autoComplete: AutoCompleteRender,
  checkBox: CheckBoxRender,
  datePicker: DatePickerRender,
  radioChoices: RadioChoicesRender
}
