import { FormikConfig, FormikHelpers, useFormik } from 'formik'
import { useCallback, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import qs from 'qs'
import { FiltersComposableState } from './type/FilterComposableState'

export interface FormikFormParams<T> {
  /**
   * the callback called when the form is being validated by the user
   * please use the `setSubmitting` in the formikHelpers object to inform about any asynchronous task
   * before the end of the submission
   */
  onSubmit?: (
    values: T,
    formikHelpers: FormikHelpers<any>
  ) => boolean | Promise<boolean>
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

export const useFiltersComposable = <T extends {}>(
  params?: FormikFormParams<T>
): FiltersComposableState => {
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
      onSubmit && onSubmit(values, formikHelpers)
      const cleanedValues = {}

      for (let fieldName in values) {
        const value = values[fieldName]
        if ((typeof value === 'number' || !!value) && value.length !== 0) {
          cleanedValues[fieldName] = value
        } else {
          cleanedValues[fieldName] = undefined
        }
      }

      setSearchParams(
        qs.stringify(cleanedValues, {
          addQueryPrefix: true,
          arrayFormat: 'repeat',
          serializeDate: (date) => date.toISOString()
        })
      )

      setSubmittedFilters(cleanedValues)
    },
    [onSubmit, searchParams, setSearchParams]
  )

  const formik = useFormik({
    onSubmit: onSubmitMemoized,
    ...formikConfig,
    validateOnBlur: false,
    validateOnChange: false,
    initialValues: initialValues
  })

  const setAdditionnalFilterMemoized = useCallback(
    (fieldName: string, value: any) => {
      formik.setFieldValue(fieldName, value)
      formik.submitForm()
    },
    [formik.submitForm]
  )

  return {
    formState: formik,
    setAdditionnalFilter: setAdditionnalFilterMemoized,
    submittedFilters,
    filtersCount
  }
}
