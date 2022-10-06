import { ValidatorFnc } from "@smartb/g2-forms"

export interface AdressValidationStrings {
  /**
   * @default "Vous devez renseigner l'adresse en plus de la ville et du code postal"
   */
  completeTheStreet?: string
  /**
   * @default "Vous devez renseigner le code postal pour avoir une adresse complète"
   */
  completeThePostalCode?: string
  /**
   * @default "Un code postal doit être composé de 5 chiffres"
   */
  postalCodeLongerThan5?: string
  /**
   * @default "Vous devez renseigner la ville pour avoir une adresse complète"
   */
  completeTheCity?: string
}

const street = (
  value: string,
  values?: any,
  strings?: AdressValidationStrings,
  additionnalValidator?: ValidatorFnc
) => {
  const city = values.city?.trim()
  const postalCode = values.postalCode?.trim()
  const trimmed = value?.trim()
  if ((!!postalCode || !!city) && !trimmed)
    return (
      strings?.completeTheStreet ??
      ("Vous devez renseigner l'addresse en plus de la ville et du code postal" as string)
    )
  return additionnalValidator
    ? additionnalValidator(trimmed, values)
    : undefined
}

const postalCode = (
  value?: string,
  values?: any,
  strings?: AdressValidationStrings,
  additionnalValidator?: ValidatorFnc
) => {
  const street = !!values.street?.trim()
  const city = !!values.city?.trim()
  const trimmed = value?.trim()
  if ((street || city) && !trimmed)
    return (
      strings?.completeThePostalCode ??
      ('Vous devez renseigner le code postal pour avoir une adresse complète' as string)
    )
  return additionnalValidator
  ? additionnalValidator(trimmed, values)
  : undefined
}

const city = (
  value?: string,
  values?: any,
  strings?: AdressValidationStrings,
  additionnalValidator?: ValidatorFnc
) => {
  const street = values.street?.trim()
  const postalCode = values.postalCode?.trim()
  const trimmed = value?.trim()
  if ((!!street || !!postalCode) && !trimmed)
    return (
      strings?.completeTheCity ??
      ('Vous devez renseigner la ville pour avoir une adresse complète' as string)
    )
  return additionnalValidator
  ? additionnalValidator(trimmed, values)
  : undefined
}

export const addressValidation = {
  street,
  postalCode: postalCode,
  city
}

export const requiredString = (
  fieldName: string,
  errorMessage?: string,
  value?: string | number,
  values?: any,
  readonlyFields?: any,
  additionnalValidator?: ValidatorFnc
) => {
  if (readonlyFields && readonlyFields[fieldName]) return undefined
  const string = String(value).trim()
  if (!string || !value) return errorMessage ?? 'le champ est obligatoire'
  return additionnalValidator
  ? additionnalValidator(string, values)
  : undefined
}
