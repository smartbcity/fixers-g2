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
  ComposableConfigKeys,
  ComposableElementConfig,
  ElementRenderers,
  ElementRenderersFcn,
  ElementType
} from '../../ComposableRender/ElementRenderer'

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

type TT = (e: ElementType<any, any>) => ElementRenderersFcn<any>

export type ComposableElementConfigTT = Record<string, TT>
export const DefaultRendererF: ComposableElementConfigTT = {
  autoComplete: (_: ElementType<'autoComplete', AutoCompleteExtendProps>) =>
    TextFieldRender,
  checkBox: (_: ElementType<'checkBox', AutoCompleteExtendProps>) =>
    CheckBoxRender,
  datePicker: (_: ElementType<'datePicker', AutoCompleteExtendProps>) =>
    DatePickerRender,
  radioChoices: (_: ElementType<'radioChoices', AutoCompleteExtendProps>) =>
    RadioChoicesRender,
  select: (_: ElementType<'select', AutoCompleteExtendProps>) => SelectRender,
  textField: (_: ElementType<'textField', AutoCompleteExtendProps>) =>
    TextFieldRender
}

export const DefaultRenderer: ElementRenderers<FieldTypeMap> = {
  textField: TextFieldRender,
  select: SelectRender,
  autoComplete: AutoCompleteRender,
  checkBox: CheckBoxRender,
  datePicker: DatePickerRender,
  radioChoices: RadioChoicesRender
}

// FunctionComponent<TextFieldRenderProps>' is not assignable to type 'ElementRenderersFcn<FieldTypeMap>'.

// ElementType<"textField", Partial<Omit<Omit<Omit<TextFieldProps, "ref">, keyof TextFieldBasicProps> & TextFieldBasicProps & InputFormBasicProps<...>, "classes" | ... 3 more ... | "styles">>>
// is not assignable to type
// ElementType<string, ElementType<any, any>>
