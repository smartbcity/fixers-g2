import { DependencyList, useMemo } from 'react'
import { FormComposableField } from './type'

interface FormFieldParams {
  fields: FormComposableField[]
}

interface FormFieldResult {
  fields: FormComposableField[]
}

export const useFormFieldComposable = (
  params: FormFieldParams,
  deps?: DependencyList
): FormFieldResult => {
  const { fields } = params
  const fieldsMemo = useMemo((): FormComposableField[] => fields, deps)
  return {
    fields: fieldsMemo
  }
}
