import { FormikConfig, FormikHelpers, useFormik } from 'formik'
import { useCallback, useMemo } from 'react'
import { Field } from './Form'

export type FormState = ReturnType<typeof useFormik>

interface useFormParams {
  /**
   * the fields of the form
   */
  fields: Field[]
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

export const useForm = (params: useFormParams): FormState => {
  const { fields, onSubmit, formikConfig } = params
  const initialValues = useMemo(() => {
    const obj = {}
    fields.forEach((field) => {
      obj[field.name] = field.defaultValue
    })
    return obj
  }, [fields])

  const validate = useCallback(
    (values) => {
      const errors = {}
      fields.forEach((field) => {
        if (field.validator) {
          const error = field.validator(values[field.name])
          if (error) errors[field.name] = error
        }
      })
      return errors
    },
    [fields]
  )

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: onSubmit,
    validate: validate,
    ...formikConfig
  })

  return formik
}
