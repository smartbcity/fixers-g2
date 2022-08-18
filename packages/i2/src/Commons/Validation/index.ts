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
  additionnalValidators?: any
) => {
  const city = values.city?.trim()
  const postalCode = values.postalCode?.trim()
  const trimmed = value?.trim()
  if ((!!postalCode || !!city) && !trimmed)
    return (
      strings?.completeTheStreet ??
      ("Vous devez renseigner l'addresse en plus de la ville et du code postal" as string)
    )
  return additionnalValidators?.street
    ? additionnalValidators.street(trimmed, values)
    : undefined
}

const postalCode = (
  value?: string,
  values?: any,
  strings?: AdressValidationStrings,
  additionnalValidators?: any
) => {
  const street = !!values.street?.trim()
  const city = !!values.city?.trim()
  const trimmed = value?.trim()
  if ((street || city) && !trimmed)
    return (
      strings?.completeThePostalCode ??
      ('Vous devez renseigner le code postal pour avoir une adresse complète' as string)
    )
  return additionnalValidators?.postalCode
    ? additionnalValidators.postalCode(trimmed, values)
    : undefined
}

const city = (
  value?: string,
  values?: any,
  strings?: AdressValidationStrings,
  additionnalValidators?: any
) => {
  const street = values.street?.trim()
  const postalCode = values.postalCode?.trim()
  const trimmed = value?.trim()
  if ((!!street || !!postalCode) && !trimmed)
    return (
      strings?.completeTheCity ??
      ('Vous devez renseigner la ville pour avoir une adresse complète' as string)
    )
  return additionnalValidators?.city
    ? additionnalValidators.city(trimmed, values)
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
  additionnalValidators?: any
) => {
  if (readonlyFields && readonlyFields[fieldName]) return undefined
  const string = String(value).trim()
  if (!string || !value) return errorMessage ?? 'le champ est obligatoire'
  return additionnalValidators && additionnalValidators[fieldName]
    ? additionnalValidators[fieldName](string, values)
    : undefined
}
