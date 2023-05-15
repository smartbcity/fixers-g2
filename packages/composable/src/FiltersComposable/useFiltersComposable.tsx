import { FormikConfig, FormikHelpers, useFormik } from 'formik'
import { useCallback, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import qs from 'qs'
import { FiltersComposableState } from './type/FilterComposableState'
import { equals } from 'ramda'

export interface FormikFormParams<T> {
  /**
   * the callback called when the form is being validated by the user
   * please use the `setSubmitting` in the formikHelpers object to inform about any asynchronous task
   * before the end of the submission
   *
   * You can return the filtered values that will be saved in the url
   */
  onSubmit?: (
    values: T,
    submittedFilters: T,
    formikHelpers: FormikHelpers<any>
  ) => any | Promise<any>
  /**
   * this prop allow you to add you custom config to the useFormik hook
   */
  formikConfig?: Omit<FormikConfig<any>, 'onSubmit'>
}

const retrieveNumber = (value: any) => {
  const number = Number(value)
  if (!isNaN(number)) return number
  return value
}

const unformatFieldValue = (value: any) => {
  if (Array.isArray(value)) return value
  return retrieveNumber(value)
}

export const useFiltersComposable = <T extends {} = any>(
  params?: FormikFormParams<T>
): FiltersComposableState<T> => {
  const { onSubmit, formikConfig } = params ?? {}

  const [searchParams, setSearchParams] = useSearchParams()

  const initialValues = useMemo(() => {
    const obj = {}
    const params = qs.parse(searchParams.toString())
    for (let fieldName in params) {
      obj[fieldName] = unformatFieldValue(params[fieldName])
    }
    return { ...formikConfig?.initialValues, ...obj }
  }, [])

  const [submittedFilters, setSubmittedFilters] = useState(initialValues)

  const filtersCount = useMemo(() => {
    let count = 0
    for (let it in submittedFilters) {
      const value = submittedFilters[it]
      if (Array.isArray(value)) {
        count += value.length
      } else if (value !== undefined) {
        count += 1
      }
    }
    return count
  }, [submittedFilters])

  const onSubmitMemoized = useCallback(
    (values: any, formikHelpers: FormikHelpers<any>) => {
      if (equals(values, submittedFilters)) return
      const customValues = onSubmit
        ? onSubmit(values, submittedFilters, formikHelpers)
        : undefined
      const definedValues = customValues ?? values
      //@ts-ignore
      const cleanedValues = qs.parse(searchParams.toString())

      for (let fieldName in definedValues) {
        const value = definedValues[fieldName]
        if ((typeof value === 'number' || !!value) && value.length !== 0) {
          cleanedValues[fieldName] = value
        } else {
          cleanedValues[fieldName] = undefined
        }
      }

      setSearchParams(
        qs.stringify(cleanedValues, {
          addQueryPrefix: true,
          arrayFormat: 'indices',
          serializeDate: (date) => date.toISOString()
        })
      )

      setSubmittedFilters(cleanedValues)
      formikHelpers.setValues(cleanedValues)
    },
    [onSubmit, setSearchParams, submittedFilters, searchParams]
  )

  const formik = useFormik({
    onSubmit: onSubmitMemoized,
    ...formikConfig,
    validateOnBlur: false,
    validateOnChange: false,
    initialValues: initialValues
  })

  const setAdditionalFilterMemoized = useCallback(
    (fieldName: string, value: any) => {
      formik.setFieldValue(fieldName, value)
      formik.submitForm()
    },
    [formik.submitForm]
  )

  return {
    formState: formik,
    setAdditionalFilter: setAdditionalFilterMemoized,
    submittedFilters,
    filtersCount
  }
}
