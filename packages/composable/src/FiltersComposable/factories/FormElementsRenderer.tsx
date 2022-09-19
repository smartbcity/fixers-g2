import { FilterTextFieldRender } from '../elements/FilterTextFieldRender'
import { FilterSelectRender } from '../elements/FilterSelectRender'
import { FilterDatePickerRender } from '../elements/FilterDatePickerRender'
import { ComposableElementRendererProps } from '../../ComposableRender'
import { SpacerRender } from '../elements/SpacerRender'

export const DefaultRenderer = {
  datePicker: FilterDatePickerRender,
  textField: FilterTextFieldRender,
  select: FilterSelectRender,
  spacer: SpacerRender
} as const

export type FilterRenderType = ComposableElementRendererProps<
  typeof DefaultRenderer
>
