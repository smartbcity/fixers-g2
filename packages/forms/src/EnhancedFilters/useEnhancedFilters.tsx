import { FormikHelpers, useFormik } from 'formik'
import { useCallback, useMemo, useState } from 'react'
import {
  FiltersField,
  FiltersPartialField,
  FiltersState,
  useFiltersParams
} from '../Filters'
import { useSearchParams } from 'react-router-dom'
import qs from 'qs'

export type EnhancedFilterState<F extends {} | undefined = undefined> = {
  /**
   * the filters of the form
   */
  formFilters: FiltersState
  /**
   * the submitted filters to be included in your api calls
   */
  submittedFilters: any
  /**
   * the filters not included in the form. For example a `page` or a `size` attribut
   */
  additionnalFilters: F
  /**
   * the setter of the additionnal filters
   */
  setAdditionnalFilters: (filters: F | ((oldValues: F) => F)) => void
}

interface useEnhancedFiltersParams<
  T extends FiltersPartialField = FiltersPartialField,
  F extends {} | undefined = undefined
> extends Omit<useFiltersParams<T>, 'onSubmit'> {
  /**
   * the callback called when the form is being validated by the user
   * please use the `setSubmitting` in the formikHelpers object to inform about any asynchronous task
   * before the end of the submission
   */
  onSubmit?: (
    values: { [key: string]: any },
    formikHelpers: FormikHelpers<any>,
    additionnalFilters: F
  ) => void | Promise<any>
  /**
   * the initial values of the filters not included in the form and in the url. For example a `page` or a `size` attribut
   */
  initAdditionnalFilters?: F
}

const retrieveNumber = (value: any) => {
  const number = Number(value)
  if (!isNaN(number)) return number
  return value
}

const unformatFieldValue = (field: any, value: any) => {
  switch (field.type) {
    case 'datepicker':
      const date = new Date(Number(value))
      return date.toString()
    case 'textfield':
      return retrieveNumber(value)
    default:
      return value
  }
}

const formatFieldValue = (field: any, value: any) => {
  switch (field.type) {
    case 'datepicker':
      return Date.parse(value)
    default:
      return value
  }
}

export const useEnhancedFiltersBase = <
  T extends FiltersPartialField = FiltersPartialField,
  F extends {} | undefined = undefined
>(
  params: useEnhancedFiltersParams<T, F>
): EnhancedFilterState<F> => {
  const { fields, onSubmit, formikConfig, initAdditionnalFilters } = params

  const [searchParams, setSearchParams] = useSearchParams()

  const initialValues = useMemo(() => {
    const obj = {}
    const params = qs.parse(searchParams.toString())
    fields.forEach((field) => {
      obj[field.name] = params[field.name]
        ? unformatFieldValue(field, params[field.name])
        : field.defaultValue
      delete params[field.name]
    })
    let additionnals = {}
    const unformattedParams = {}
    for (let i in params) {
      unformattedParams[i] = retrieveNumber(params[i])
    }
    additionnals = { ...initAdditionnalFilters, ...unformattedParams }
    return {
      formValues: obj,
      additionnalFilters: additionnals,
      allFilters: { ...obj, ...additionnals }
    }
  }, [])

  const [submittedFilters, setSubmittedFilters] = useState(
    initialValues.allFilters
  )
  const [additionnalFilters, setAdditionnalFilters] = useState<F>(
    initialValues.additionnalFilters as F
  )

  const onSubmitMemoized = useCallback(
    (values: any, formikHelpers: FormikHelpers<any>) => {
      onSubmit && onSubmit(values, formikHelpers, additionnalFilters)

      let fieldsValues = { ...values }

      fields.forEach((field) => {
        fieldsValues[field.name] = fieldsValues[field.name]
          ? formatFieldValue(field, fieldsValues[field.name])
          : undefined
      })

      const filters = { ...fieldsValues, ...additionnalFilters }

      setSearchParams(
        qs.stringify(filters, {
          addQueryPrefix: true,
          arrayFormat: 'repeat'
        })
      )

      setSubmittedFilters(filters)
    },
    [onSubmit, searchParams, setSearchParams, additionnalFilters]
  )

  const formik = useFormik({
    initialValues: initialValues.formValues,
    onSubmit: onSubmitMemoized,
    ...formikConfig
  })

  const setAdditionnalFiltersMeMoized = useCallback(
    (filters: F | ((oldValues: F) => F)) => {
      setAdditionnalFilters(filters)
      formik.submitForm()
    },
    [formik.submitForm]
  )

  return {
    formFilters: formik,
    additionnalFilters,
    setAdditionnalFilters: setAdditionnalFiltersMeMoized,
    submittedFilters
  }
}

export const useEnhancedFilters = <F extends {} | undefined = undefined>(
  params: useEnhancedFiltersParams<FiltersField, F>
): EnhancedFilterState<F> => {
  return useEnhancedFiltersBase<FiltersField, F>(params)
}

/**
 * the useEnhancedFilters with the minimum informations needed to init the useformik state
 */
export const useEnhancedFiltersWithPartialFields = <
  F extends {} | undefined = undefined
>(
  params: useEnhancedFiltersParams<FiltersPartialField, F>
): EnhancedFilterState<F> => {
  return useEnhancedFiltersBase<FiltersPartialField, F>(params)
}
