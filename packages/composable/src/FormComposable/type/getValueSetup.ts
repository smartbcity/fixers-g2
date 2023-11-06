import { getIn } from 'formik'
import { FormComposableState } from './FormComposableState'

export const getValueSetup = (name: string, formState: FormComposableState) => {
  const value = getIn(formState.values, name)
  return {
    value: value,
    setFieldValue: (newValue) => {
      formState.setFieldValue(name, newValue, false)
    }
  }
}
