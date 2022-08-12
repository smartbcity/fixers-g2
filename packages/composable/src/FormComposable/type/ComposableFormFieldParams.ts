import { FieldRenderType } from '../factories/FormElementsFactories'

export type ComposableFormFieldParams = {
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
  /**
   * the validator that takes the value of the input and return an error or undefined/nothing if the value is valid
   */
  validator?: (value: any | undefined) => Promise<string> | string | undefined
  /**
   * if you want to add other nodes around the input use this function
   */
  customDisplay?: (input: React.ReactNode) => React.ReactNode
  /**
   * the event called when the value of the input change
   */
  onChange?: (value: any) => void
} & FieldRenderType
