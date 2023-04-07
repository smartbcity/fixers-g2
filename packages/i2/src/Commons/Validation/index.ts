import { PotentialError } from '@smartb/g2-forms'

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
  additionalValidators?: any
) => {
  const city = values.city?.trim()
  const postalCode = values.postalCode?.trim()
  const trimmed = value?.trim()
  if ((!!postalCode || !!city) && !trimmed)
    return (
      strings?.completeTheStreet ??
      ("Vous devez renseigner l'addresse en plus de la ville et du code postal" as string)
    )
  return additionalValidators?.street
    ? additionalValidators.street(trimmed, values)
    : undefined
}

const postalCode = (
  value?: string,
  values?: any,
  strings?: AdressValidationStrings,
  additionalValidators?: any
) => {
  const street = !!values.street?.trim()
  const city = !!values.city?.trim()
  const trimmed = value?.trim()
  if ((street || city) && !trimmed)
    return (
      strings?.completeThePostalCode ??
      ('Vous devez renseigner le code postal pour avoir une adresse complète' as string)
    )
  return additionalValidators?.postalCode
    ? additionalValidators.postalCode(trimmed, values)
    : undefined
}

const city = (
  value?: string,
  values?: any,
  strings?: AdressValidationStrings,
  additionalValidators?: any
) => {
  const street = values.street?.trim()
  const postalCode = values.postalCode?.trim()
  const trimmed = value?.trim()
  if ((!!street || !!postalCode) && !trimmed)
    return (
      strings?.completeTheCity ??
      ('Vous devez renseigner la ville pour avoir une adresse complète' as string)
    )
  return additionalValidators?.city
    ? additionalValidators.city(trimmed, values)
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
  readOnlyFields?: any,
  additionalValidators?: any
) => {
  if (readOnlyFields && readOnlyFields[fieldName]) return undefined
  const string = String(value).trim()
  if (!string || !value) return errorMessage ?? 'le champ est obligatoire'
  return additionalValidators && additionalValidators[fieldName]
    ? additionalValidators[fieldName](string, values)
    : undefined
}

export const validatePhone = (
  value?: string,
  errorString?: string
): PotentialError => {
  const trimmed = (value ?? '').trim().replaceAll(' ', '')
  if (trimmed && trimmed.length !== 10)
    return errorString ?? 'Le numéro de téléphone doit contenir dix chiffres'
  return
}
