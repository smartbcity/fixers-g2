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

const unformatFieldValue = (value: any, fieldName: string) => {
  if (Array.isArray(value)) return value
  if (fieldName.includes('-date')) {
    const date = new Date(Number(value))
    return date.toString()
  }
  return retrieveNumber(value)
}

export const useFiltersComposable = <T extends {}>(
  params: FormikFormParams<T>
): FiltersComposableState => {
  const { onSubmit, formikConfig } = params

  const [searchParams, setSearchParams] = useSearchParams()

  const initialValues = useMemo(() => {
    const obj = {}
    const params = qs.parse(searchParams.toString())
    for (let fieldName in params) {
      const realFieldName = fieldName.replace('-date', '')
      obj[realFieldName] = params[fieldName]
        ? unformatFieldValue(params[fieldName], fieldName)
        : formikConfig?.initialValues[fieldName]
    }
    return obj
  }, [])

  const [submittedFilters, setSubmittedFilters] = useState(initialValues)

  const onSubmitMemoized = useCallback(
    (values: any, formikHelpers: FormikHelpers<any>) => {
      onSubmit && onSubmit(values, formikHelpers)

      const renamedValues = {}

      for (let fieldName in values) {
        if (values[fieldName] instanceof Date) {
          renamedValues[fieldName + '-date'] = values[fieldName]
        } else {
          renamedValues[fieldName] = values[fieldName]
        }
      }

      setSearchParams(
        qs.stringify(renamedValues, {
          addQueryPrefix: true,
          arrayFormat: 'repeat',
          serializeDate: (date) => date.getTime().toString()
        })
      )

      setSubmittedFilters(values)
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

  const setAdditionnalFiltersMemoized = useCallback(
    (fieldName: string, value: any) => {
      formik.setFieldValue(fieldName, value)
      formik.submitForm()
    },
    [formik.submitForm]
  )

  return {
    filtersSate: formik,
    setAdditionnalFilters: setAdditionnalFiltersMemoized,
    submittedFilters
  }
}
