import { FormikConfig, FormikHelpers, useFormik } from 'formik'
import { FormAction } from '@smartb/g2-forms'
import { useActionFeedback } from '@smartb/g2-components'
import { FormComposableState } from './type/FormComposableState'

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
  formikConfig?: Omit<FormikConfig<any>, 'onSubmit'>
  actions?: ActionProps
}

export const useFormComposable = <T extends {}>(
  params: FormikFormParams<T>
): FormComposableState => {
  const feedback = useActionFeedback()
  const { onSubmit, formikConfig } = params
  const formik = useFormik({
    onSubmit: async (...values) => {
      const result = await onSubmit(...values)
      feedback.setFeedback(result)
    },
    validateOnBlur: false,
    validateOnChange: false,
    enableReinitialize: true,
    initialValues: formikConfig?.initialValues,
    ...formikConfig
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

  return {
    ...formik,
    actions: actions
  }
}
