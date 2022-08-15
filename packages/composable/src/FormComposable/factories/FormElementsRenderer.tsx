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
import { FieldRender } from './FieldRenderProps'
import { FormComposableState } from '../type/FormComposableState'
import {
  ElementRenderers,
  ElementRenderProps,
  ElementType
} from '../../ComposableFactory/ElementRenderer'

/**
 * Map a field type to  Props type.
 */
export interface FieldTypeMap {
  autoComplete: ElementType<'autoComplete', AutoCompleteExtendProps>
  checkBox: ElementType<'checkBox', CheckBoxExtendProps>
  textField: ElementType<'textField', TextFieldExtendProps>
  select: ElementType<'select', FormSelectExtendProps>
  datePicker: ElementType<'datePicker', DatePickerExtendProps>
  radioChoices: ElementType<'radioChoices', RadioChoicesExtendProps>
}

export type FieldType = keyof FieldTypeMap
export type FieldRenderType = FieldTypeMap[keyof FieldTypeMap]

// export type FieldTypeConfigMap = ComposableConfigMap<FieldTypeMap>

export interface FieldRenderProps<
  TYPE extends FieldType,
  PROPS = FieldRenderType
> extends ElementRenderProps<TYPE, PROPS> {
  element: ElementType<TYPE, PROPS>
  formState: FormComposableState
  basicProps: FieldRender
}

export type FieldRenderer<
  TYPE extends FieldType,
  PROPS = FieldRenderType
> = ElementRenderers<TYPE, PROPS, FieldRenderProps<TYPE, PROPS>>

export const DefaultRenderer: FieldRenderer<any, any> = {
  textField: {
    factory: TextFieldRender
  },
  select: {
    factory: SelectRender
  },
  autoComplete: {
    factory: AutoCompleteRender
  },
  checkBox: {
    factory: CheckBoxRender
  },
  datePicker: {
    factory: DatePickerRender
  },
  radioChoices: {
    factory: RadioChoicesRender
  }
}
