export interface ComposableForm {
  key: string
  id: string
  label?: string
  name: string
  error: boolean
  errorMessage: string
  className: any
  style: any
  isLoading?: boolean
  onChange?: (value: any) => void
}
