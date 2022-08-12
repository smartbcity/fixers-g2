import { useFormik } from 'formik'
import { DependencyList, useMemo } from 'react'
import { FormAction } from '@smartb/g2-forms'
import { ComposableFormField } from './type/FormField'

export type ComposableFormState = ReturnType<typeof useFormik> & {
  actions: FormAction[]
}

interface FormFieldParams {
  fields: ComposableFormField[]
}

interface FormFieldResult {
  fields: ComposableFormField[]
}

export const useFormFieldComposable = (
  params: FormFieldParams,
  deps?: DependencyList
): FormFieldResult => {
  const { fields } = params
  const fieldsMemo = useMemo((): ComposableFormField[] => fields, deps)
  return {
    fields: fieldsMemo
  }
}
