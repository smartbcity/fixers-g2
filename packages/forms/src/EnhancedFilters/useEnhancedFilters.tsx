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
> extends useFiltersParams<T> {
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
  const [additionnalFilters, setAdditionnalFilters] = useState<F>(
    initAdditionnalFilters as F
  )

  const initialValues = useMemo(() => {
    const obj = {}
    const params = qs.parse(searchParams.toString())
    fields.forEach((field) => {
      obj[field.name] = params[field.name]
        ? unformatFieldValue(field, params[field.name])
        : field.defaultValue
      delete params[field.name]
    })
    delete params.id
    delete params.viewMode
    setAdditionnalFilters((originals) => {
      const unformattedParams = {}
      for (let i in params) {
        unformattedParams[i] = retrieveNumber(params[i])
      }
      return { ...originals, ...unformattedParams } as F
    })
    return obj
  }, [])

  console.log(additionnalFilters)
  const onSubmitMemoized = useCallback(
    (values: any, formikHelpers: FormikHelpers<any>) => {
      onSubmit && onSubmit(values, formikHelpers)

      let fieldsValues = { ...values }

      fields.forEach((field) => {
        fieldsValues[field.name] = fieldsValues[field.name]
          ? formatFieldValue(field, fieldsValues[field.name])
          : undefined
      })

      setSearchParams(
        qs.stringify(
          { ...fieldsValues, ...additionnalFilters },
          {
            addQueryPrefix: true,
            arrayFormat: 'repeat'
          }
        ) +
          '&' +
          'viewMode=story&id=forms-enhancedfilters--enhanced-filters-story'
      )
    },
    [onSubmit, searchParams, setSearchParams, additionnalFilters]
  )

  const formik = useFormik({
    initialValues: initialValues,
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
    setAdditionnalFilters: setAdditionnalFiltersMeMoized
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
