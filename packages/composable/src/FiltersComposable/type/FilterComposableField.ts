import { FilterRenderType } from '../factories/FormElementsRenderer'
import {
  ComposableElementRendererProps,
  ElementRenderersConfig
} from '../../ComposableRender'

export type FilterComposableField<
  Name extends string = string,
  ELEMENT_PARAMS extends ElementRenderersConfig = {}
> = {
  /**
   * the unique key of the field by default the name
   */
  key?: string
  /**
   * the name of the field used to define it in the returned values
   */
  name: Name
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
