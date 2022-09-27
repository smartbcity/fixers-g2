import { useFormik } from 'formik'

export interface FiltersComposableState<T extends {} = any> {
  submittedFilters: T
  formState: ReturnType<typeof useFormik>
  setAdditionnalFilter: (fieldName: string, value: any) => void
  filtersCount: number
}
