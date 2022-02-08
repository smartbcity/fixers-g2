import { FormikConfig, FormikHelpers, useFormik } from 'formik'
import { useCallback, useMemo } from 'react'
import { Field } from './Form'

export type FormState = Omit<ReturnType<typeof useFormik>, 'validateField'> & {
  validateField: (fieldName: string) => string | undefined
}

export type PartialField = {
  name: string
  defaultValue?: any
  validator?: (value: any) => string | undefined
}

interface useFormParams<T extends PartialField = PartialField> {
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
   * this prop allow you to add you custom config to the useFormik hook
   */
  formikConfig?: Omit<
    FormikConfig<any>,
    'initialValues' | 'onSubmit' | 'validate'
  >
}

export const useForm = (params: useFormParams<Field>): FormState => {
  return useFormBase(params)
}

/**
 * the useForm with the minimum informations needed to init the useformik state
 */
export const useFormWithPartialFields = (
  params: useFormParams<PartialField>
): FormState => {
  return useFormBase(params)
}

const useFormBase = <T extends PartialField = PartialField>(
  params: useFormParams<T>
): FormState => {
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
    validateOnBlur: false,
    validateOnChange: false,
    ...formikConfig
  })

  const validateField = useCallback(
    (fieldName: string) => {
      const field = fields.find((field) => field.name === fieldName)
      const error = field?.validator
        ? field?.validator(formik.values[fieldName])
        : undefined
      formik.setFieldError(fieldName, error)
      return error
    },
    [fields, formik.values, formik.setFieldError]
  )

  return { ...formik, validateField: validateField } as FormState
}
