import { FormikConfig, FormikHelpers, useFormik } from 'formik'
import { useMemo } from 'react'
import { FiltersField } from './Filters'

export type FiltersState = ReturnType<typeof useFormik>

export type FiltersPartialField = {
  name: string
  defaultValue?: any
}

interface useFiltersParams<
  T extends FiltersPartialField = FiltersPartialField
> {
  /**
   * the fields of the form
   */
  fields: T[]
  /**
   * the callback called when the form is being validated by the user
   * please use the `setSubmitting` in the formikHelpers object to inform about any asynchronous task
   * before the end of the submission
   */
  onSubmit: (
    values: { [key: string]: any },
    formikHelpers: FormikHelpers<any>
  ) => void | Promise<any>
  /**
   * this prop allow you to add you custom config to the useFiltersik hook
   */
  formikConfig?: Omit<
    FormikConfig<any>,
    'initialValues' | 'onSubmit' | 'validate'
  >
}

export const useFilters = (
  params: useFiltersParams<FiltersField>
): FiltersState => {
  return useFiltersBase(params)
}

/**
 * the usefilters with the minimum informations needed to init the useformik state
 */
export const useFiltersWithPartialFields = (
  params: useFiltersParams<FiltersPartialField>
): FiltersState => {
  return useFiltersBase(params)
}

export const useFiltersBase = <
  T extends FiltersPartialField = FiltersPartialField
>(
  params: useFiltersParams<T>
): FiltersState => {
  const { fields, onSubmit, formikConfig } = params
  const initialValues = useMemo(() => {
    const obj = {}
    fields.forEach((field) => {
      obj[field.name] = field.defaultValue
    })
    return obj
  }, [])

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: onSubmit,
    ...formikConfig
  })

  return formik
}
