import { getIn } from 'formik'
import { FormComposableState } from './FormComposableState'

export const getValueSetup = (
  name: string,
  formState: FormComposableState,
  sharedNameIndex?: number
) => {
  const value = getIn(formState.values, name)
  return {
    value: sharedNameIndex != null ? (value ?? [])[sharedNameIndex] : value,
    setFieldValue: (newValue) => {
      if (sharedNameIndex != null) {
        const setupValue = [...(value ?? [])]
        setupValue[sharedNameIndex] = newValue
        formState.setFieldValue(name, setupValue, false)
      } else {
        formState.setFieldValue(name, newValue, false)
      }
    }
  }
}
