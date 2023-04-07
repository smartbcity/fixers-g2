import { useFormik } from 'formik'

export interface FiltersComposableState<T extends {} = any> {
  submittedFilters: T
  formState: ReturnType<typeof useFormik>
  setAdditionalFilter: (fieldName: string, value: any) => void
  filtersCount: number
}
