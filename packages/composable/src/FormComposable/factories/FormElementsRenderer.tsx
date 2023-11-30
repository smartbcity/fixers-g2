import { TextFieldRender } from '../elements/TextFieldRender'
import { SelectRender } from '../elements/SelectRender'
import { DatePickerRender } from '../elements/DatePickerRender'
import { AutoCompleteRender } from '../elements/AutoCompleteRender'
import { CheckBoxRender } from '../elements/CheckBoxRender'
import { RadioChoicesRender } from '../elements/RadioChoicesRender'
import { ComposableElementRendererProps } from '../../ComposableRender'
import { DropPictureRender } from '../elements/DropPictureRender'
import { DocumentHandlerRender } from '../elements/DocumentHandlerRender'
import { MapComposableRenderer } from '../elements/MapComposableRenderer'
import { MultiChoicesRender } from '../elements/MultiChoicesRender'
import { HiddenRender } from '../elements/HiddenRender'

export const DefaultRenderer = {
  textField: TextFieldRender,
  select: SelectRender,
  autoComplete: AutoCompleteRender,
  checkBox: CheckBoxRender,
  datePicker: DatePickerRender,
  radioChoices: RadioChoicesRender,
  multiChoices: MultiChoicesRender,
  dropPicture: DropPictureRender,
  documentHandler: DocumentHandlerRender,
  map: MapComposableRenderer,
  hidden: HiddenRender
} as const

export type FieldRenderType = ComposableElementRendererProps<
  typeof DefaultRenderer
>
