import { useFormik } from 'formik'

export interface FiltersComposableState {
  submittedFilters: any
  formState: ReturnType<typeof useFormik>
  setAdditionnalFilter: (fieldName: string, value: any) => void
  filtersCount: number
}
