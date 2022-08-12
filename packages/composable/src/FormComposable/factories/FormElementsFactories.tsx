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
  ComposableConfigMap,
  ElementFactories,
  ElementProps,
  ElementType
} from '../../ComposableFactory/ElementFactory'
import { ComposableFormState } from '../useFormFieldComposable'
import { ComposableFormProps } from '../type/FormField'

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

export type FieldTypeConfigMap = ComposableConfigMap<FieldTypeMap>

export interface FieldProps<TYPE extends FieldType, PROPS = FieldRenderType>
  extends ElementProps<TYPE, PROPS> {
  element: ElementType<TYPE, PROPS>
  formState: ComposableFormState
  formProps: ComposableFormProps
}

export type FieldFactories<
  TYPE extends FieldType,
  PROPS = FieldRenderType
> = ElementFactories<TYPE, PROPS, FieldProps<TYPE, PROPS>>

export const DefaultFactories: FieldFactories<any, any> = {
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
