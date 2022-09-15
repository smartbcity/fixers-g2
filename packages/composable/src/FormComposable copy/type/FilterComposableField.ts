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
   * the default value of the field
   */
  defaultValue?: any
} & (FilterRenderType | ComposableElementRendererProps<ELEMENT_PARAMS>)

export type FilterComposable<
  ELEMENT_PARAMS extends ElementRenderersConfig = {}
> = FilterComposableField<ELEMENT_PARAMS> | 'spacer'
