import { FormikConfig, FormikHelpers, useFormik } from 'formik'
import { useCallback, useMemo } from 'react'
import { FiltersField } from '../Filters'
import { useSearchParams } from 'react-router-dom'

export type EnhancedFiltersState = ReturnType<typeof useFormik>

export type EnhancedFiltersPartialField = {
  name: string
  defaultValue?: any
}

interface useEnhancedFiltersParams<
  T extends EnhancedFiltersPartialField = EnhancedFiltersPartialField
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
   * this prop allow you to add you custom config to the useEnhancedFiltersik hook
   */
  formikConfig?: Omit<
    FormikConfig<any>,
    'initialValues' | 'onSubmit' | 'validate'
  >
}

export const useEnhancedFilters = (
  params: useEnhancedFiltersParams<FiltersField>
): EnhancedFiltersState => {
  let [searchParams, setSearchParams] = useSearchParams()
  const qs = require('qs')
  const { fields, onSubmit, formikConfig } = params

  const unformatFieldValue = useCallback((field: any, value: any) => {
    switch (field.type) {
      case 'datepicker':
        const date = new Date(value * 1000)
        return date.toString()
      default:
        return value
    }
  }, [])

  const initialValues = useMemo(() => {
    const params = qs.parse(searchParams.toString())
    const obj = {}
    fields.forEach((field) => {
      obj[field.name] = params[field.name]
        ? unformatFieldValue(field, params[field.name])
        : field.defaultValue
    })
    return obj
  }, [])

  const onSubmitMemoized = useCallback(
    (values: any, formikHelpers: FormikHelpers<any>) => {
      onSubmit(values, formikHelpers)

      let fieldsValues = { ...values }

      fields.forEach((field) => {
        fieldsValues[field.name] = fieldsValues[field.name]
          ? formatFieldValue(field, fieldsValues[field.name])
          : undefined
      })

      setSearchParams(
        qs.stringify(fieldsValues, {
          addQueryPrefix: true,
          arrayFormat: 'repeat'
        })
      )
    },
    [onSubmit]
  )

  const formatFieldValue = useCallback((field: any, value: any) => {
    switch (field.type) {
      case 'datepicker':
        return Date.parse(value)
      default:
        return value
    }
  }, [])

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: onSubmitMemoized,
    ...formikConfig
  })

  return formik
}

/**
 * the useEnhancedFilters with the minimum informations needed to init the useformik state
 */
export const useEnhancedFiltersWithPartialFields = (
  params: useEnhancedFiltersParams<EnhancedFiltersPartialField>
): EnhancedFiltersState => {
  return useEnhancedFiltersBase(params)
}

export const useEnhancedFiltersBase = <
  T extends EnhancedFiltersPartialField = EnhancedFiltersPartialField
>(
  params: useEnhancedFiltersParams<T>
): EnhancedFiltersState => {
  const { fields, onSubmit, formikConfig } = params
  const initialValues = useMemo(() => {
    const obj = {}
    fields.forEach((field) => {
      obj[field.name] = field.defaultValue
    })
    return obj
  }, [])

  return useFormik({
    initialValues: initialValues,
    onSubmit: onSubmit,
    ...formikConfig
  })
}
