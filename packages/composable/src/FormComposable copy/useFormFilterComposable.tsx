import { DependencyList, useMemo } from 'react'
import { FilterComposableField } from './type'

interface FormFilterParams {
  fields: FilterComposableField[]
}

interface FormFilterResult {
  fields: FilterComposableField[]
}

export const useFormFilterComposable = (
  params: FormFilterParams,
  deps?: DependencyList
): FormFilterResult => {
  const { fields } = params
  const fieldsMemo = useMemo((): FilterComposableField[] => fields, deps)
  return {
    fields: fieldsMemo
  }
}
