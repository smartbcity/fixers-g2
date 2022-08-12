import { DependencyList, useMemo } from 'react'
import { ComposableFormFieldParams } from './type/ComposableFormFieldParams'

interface FormFieldParams {
  fields: ComposableFormFieldParams[]
}

interface FormFieldResult {
  fields: ComposableFormFieldParams[]
}

export const useFormFieldComposable = (
  params: FormFieldParams,
  deps?: DependencyList
): FormFieldResult => {
  const { fields } = params
  const fieldsMemo = useMemo((): ComposableFormFieldParams[] => fields, deps)
  return {
    fields: fieldsMemo
  }
}
