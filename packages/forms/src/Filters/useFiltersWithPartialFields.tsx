import { FormikConfig, FormikHelpers, useFormik } from 'formik'
import { useMemo } from 'react'
import { FiltersState } from './useFilters'

export type PartialField = {
  name: string
  defaultValue?: any
}

interface useFiltersWithPartialParams {
  /**
   * the partial fields of the form
   */
  partialFields: PartialField[]
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
   * this prop allow you to add you custom config to the useFormik hook
   */
  formikConfig?: Omit<
    FormikConfig<any>,
    'initialValues' | 'onSubmit' | 'validate'
  >
}

/**
 * the usefilters with the minimum informations needed to init the useformik state
 */
export const useFiltersWithPartialFields = (
  params: useFiltersWithPartialParams
): FiltersState => {
  const { partialFields, onSubmit, formikConfig } = params

  const initialValues = useMemo(() => {
    const obj = {}
    partialFields.forEach((field) => {
      obj[field.name] = field.defaultValue
    })
    return obj
  }, [partialFields])

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: onSubmit,
    ...formikConfig
  })

  return formik
}
