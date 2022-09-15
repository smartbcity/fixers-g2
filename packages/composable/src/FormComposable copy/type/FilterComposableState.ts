import { useFormik } from 'formik'

export interface FiltersComposableState {
  submittedFilters: any
  filtersSate: ReturnType<typeof useFormik>
  setAdditionnalFilters: (fieldName: string, value: any) => void
}
