import { FilterTextFieldRender } from '../elements/FilterTextFieldRender'
import { FilterSelectRender } from '../elements/FilterSelectRender'
import { FilterDatePickerRender } from '../elements/FilterDatePickerRender'
import { ComposableElementRendererProps } from '../../ComposableRender'

export const DefaultRenderer = {
  datePicker: FilterDatePickerRender,
  select: FilterSelectRender,
  textField: FilterTextFieldRender,
  hidden: undefined
} as const

export type FilterRenderType = ComposableElementRendererProps<
  typeof DefaultRenderer
>
