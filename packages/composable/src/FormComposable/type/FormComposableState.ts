import { FormAction, PotentialError } from '@smartb/g2-forms'
import { useFormik } from 'formik'

export type FormComposableState = Omit<
  ReturnType<typeof useFormik>,
  'validateField'
> & {
  actions: FormAction[]
  validateField: (fieldName: string) => PotentialError
  readonly: boolean
  isLoading: boolean
}
