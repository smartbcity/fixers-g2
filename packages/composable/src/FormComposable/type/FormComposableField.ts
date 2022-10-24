import { FieldRenderType } from '../factories/FormElementsRenderer'
import {
  ComposableElementRendererProps,
  ElementRenderersConfig
} from '../../ComposableRender'
import { ReactNode } from 'react'
import { PotentialError } from '@smartb/g2-forms'

export type FieldValidatorFnc = (value?: any, values?: any) => PotentialError

export type FormComposableField<
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
   * the default value of the field
   */
  defaultValue?: any
  /**
   * the validator that takes the value of the input and return an error or undefined/nothing if the value is valid
   */
  validator?: FieldValidatorFnc
  /**
   * if you want to add other nodes around the input use this function
   */
  customDisplay?: (input: ReactNode) => ReactNode
  /**
   * the event called when the value of the input change
   */
  onChange?: (value: any) => void
  /**
   * Indicates if the data is on readonly mode
   *
   * @default false
   */
  readonly?: boolean
} & (FieldRenderType | ComposableElementRendererProps<ELEMENT_PARAMS>)
