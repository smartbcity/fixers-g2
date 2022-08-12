import { useFormik } from 'formik'
import { FormAction } from '@smartb/g2-forms'

export type ComposableFormState = ReturnType<typeof useFormik> & {
  actions: FormAction[]
}
