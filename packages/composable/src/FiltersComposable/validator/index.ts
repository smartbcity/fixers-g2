import { FieldValidatorFnc } from '../type'

export const requiredField =
  (message: string): FieldValidatorFnc =>
  (value: any) => {
    const string = String(value).trim()
    return !string || !value ? message : undefined
  }

export const requiredTrue =
  (message: string): FieldValidatorFnc =>
  (value: any) => {
    return value !== true ? message : undefined
  }
