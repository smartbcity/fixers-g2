import { ElementType } from '../../ComposableRender/ElementRenderer'
import { FormComposableState } from '../type/FormComposableState'

export interface FieldRenderProps<TYPE extends string, PROPS>
  extends ElementType<TYPE, PROPS> {
  formState: FormComposableState
  basicProps: FieldRender
}

export interface FieldRender {
  key: string
  id: string
  label?: string
  name: string
  error: boolean
  errorMessage: string
  className: any
  style: any
  /**
   * Indicates if the data is currently loading
   *
   * @default false
   */
  isLoading?: boolean
  /**
   * Indicates if the data is on readonly mode
   *
   * @default false
   */
  readonly?: boolean
  onChange?: (value: any) => void
}
