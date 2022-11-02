import { FormikConfig, FormikHelpers, useFormik, getIn } from 'formik'
import { FormAction, ValidatorFnc } from '@smartb/g2-forms'
import { useActionFeedback } from '@smartb/g2-components'
import { FormComposableState } from './type'
import { useCallback, useRef } from 'react'

export interface ActionProps {
  validate?: Partial<FormAction>
  cancel?: Partial<FormAction>
}

export interface FormikFormParams<T> {
  /**
   * the callback called when the form is being validated by the user
   * please use the `setSubmitting` in the formikHelpers object to inform about any asynchronous task
   * before the end of the submission
   */
  onSubmit: (
    values: T,
    formikHelpers: FormikHelpers<any>
  ) => boolean | Promise<boolean>
  /**
   * this prop allow you to add you custom config to the useFormik hook
   */
  formikConfig?: Partial<Omit<FormikConfig<any>, 'onSubmit'>>
  actions?: ActionProps
}

export const useFormComposable = <T extends {}>(
  params: FormikFormParams<T>
): FormComposableState => {
  const feedback = useActionFeedback()
  const { onSubmit, formikConfig } = params
  const validators = useRef<Record<string, ValidatorFnc>>({})
  const validate = useCallback(async (values) => {
    const errors = {}
    for (const fieldName in validators.current) {
      if (validators.current[fieldName]) {
        const error = await validators.current[fieldName](
          getIn(values, fieldName),
          values
        )
        if (error) {
          errors[fieldName] = error
        }
      }
    }
    return errors
  }, [])

  const formik = useFormik({
    onSubmit: async (...values) => {
      const result = await onSubmit(...values)
      feedback.setFeedback(result)
    },
    validate,
    validateOnBlur: false,
    validateOnChange: false,
    enableReinitialize: true,
    ...formikConfig,
    initialValues: formikConfig?.initialValues || {}
  })

  const actions: FormAction[] = [
    {
      key: 'cancel',
      label: 'Annuler',
      variant: 'text',
      ...(params.actions?.cancel || {})
    },
    {
      key: 'create',
      label: 'Créer',
      success: feedback.success,
      fail: feedback.fail,
      onClick: formik.submitForm,
      ...(params.actions?.validate || {})
    }
  ]

  const registerField = useCallback(
    (fieldName: string, validator: ValidatorFnc) => {
      validators.current[fieldName] = validator
    },
    []
  )

  const unregisterField = useCallback((fieldName: string) => {
    delete validators.current[fieldName]
  }, [])

  const validateField = useCallback(
    (fieldName: string) => {
      const validator = validators.current[fieldName]
      const error = !!validator
        ? validator(getIn(formik.values, fieldName), formik.values)
        : undefined
      if (typeof error === 'string') formik.setFieldError(fieldName, error)
      else error?.then((value) => formik.setFieldError(fieldName, value))
      return error
    },
    [validators, formik.values, formik.getFieldProps, formik.setFieldError]
  )

  return {
    ...formik,
    registerField,
    unregisterField,
    validateField,
    actions: actions
  }
}
