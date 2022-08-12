import { DependencyList, useMemo } from 'react'
import { FormComposableFieldProps } from './type/FormComposableFieldProps'

interface FormFieldParams {
  fields: FormComposableFieldProps[]
}

interface FormFieldResult {
  fields: FormComposableFieldProps[]
}

export const useFormFieldComposable = (
  params: FormFieldParams,
  deps?: DependencyList
): FormFieldResult => {
  const { fields } = params
  const fieldsMemo = useMemo((): FormComposableFieldProps[] => fields, deps)
  return {
    fields: fieldsMemo
  }
}
