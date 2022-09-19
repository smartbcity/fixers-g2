import { FilterRenderType } from '../factories/FormElementsRenderer'
import {
  ComposableElementRendererProps,
  ElementRenderersConfig
} from '../../ComposableRender'

export type FilterComposableField<
  ELEMENT_PARAMS extends ElementRenderersConfig = {}
> = {
  /**
   * the unique key of the field
   */
  key: string
  /**
   * the name of the field used to define it in the returned values
   */
  name: string
  /**
   * the displayed label of the field
   */
  label?: string
  /**
   * Tells if the field should stay on place on responsive mode
   * @default false
   */
  mandatory?: boolean
} & (FilterRenderType | ComposableElementRendererProps<ELEMENT_PARAMS>)
