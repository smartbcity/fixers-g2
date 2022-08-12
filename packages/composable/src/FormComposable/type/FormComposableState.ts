import { FormAction } from '@smartb/g2-forms'
import { useFormik } from 'formik'

export type FormComposableState = ReturnType<typeof useFormik> & {
  actions: FormAction[]
}
