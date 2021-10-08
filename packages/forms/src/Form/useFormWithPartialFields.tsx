import { FormikConfig, FormikHelpers, useFormik } from 'formik'
import { useCallback, useMemo } from 'react'
import { FormState } from './useForm'

export type PartialField = {
  name: string
  defaultValue?: any
  validator?: (value: any) => string | undefined | void
}

interface useFormWithPartialParams {
  /**
   * the partial fields of the form
   */
  partialfFields: PartialField[]
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
 * the useform with the minimum informations needed to init the useformik state
 */
export const useFormWithPartialFields = (
  params: useFormWithPartialParams
): FormState => {
  const { partialfFields, onSubmit, formikConfig } = params
  const initialValues = useMemo(() => {
    const obj = {}
    partialfFields.forEach((field) => {
      obj[field.name] = field.defaultValue
    })
    return obj
  }, [partialfFields])

  const validate = useCallback(
    (values) => {
      const errors = {}
      partialfFields.forEach((field) => {
        if (field.validator) {
          const error = field.validator(values[field.name])
          if (error) errors[field.name] = error
        }
      })
      return errors
    },
    [partialfFields]
  )

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: onSubmit,
    validate: validate,
    ...formikConfig
  })

  return formik
}
