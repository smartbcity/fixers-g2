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
  strings?: AdressValidationStrings
) => {
  const city = values.city?.trim()
  const postalCode = values.postalCode?.trim()
  const trimmed = value?.trim()
  if ((!!postalCode || !!city) && !trimmed)
    return (
      strings?.completeTheStreet ??
      ("Vous devez renseigner l'addresse en plus de la ville et du code postal" as string)
    )
  return undefined
}

const codePostal = (
  value?: string,
  values?: any,
  strings?: AdressValidationStrings
) => {
  const street = !!values.street?.trim()
  const city = !!values.city?.trim()
  const trimmed = value?.trim()
  if ((street || city) && !trimmed)
    return (
      strings?.completeThePostalCode ??
      ('Vous devez renseigner le code postal pour avoir une adresse complète' as string)
    )
  if (!!trimmed && trimmed?.length !== 5)
    return (
      strings?.postalCodeLongerThan5 ??
      ('Un code postal doit être composé de 5 chiffres' as string)
    )
  return undefined
}

const city = (
  value?: string,
  values?: any,
  strings?: AdressValidationStrings
) => {
  const street = values.street?.trim()
  const postalCode = values.postalCode?.trim()
  const trimmed = value?.trim()
  if ((!!street || !!postalCode) && !trimmed)
    return (
      strings?.completeTheCity ??
      ('Vous devez renseigner la ville pour avoir une adresse complète' as string)
    )
  return undefined
}

export const addressValidation = {
  street,
  postalCode: codePostal,
  city
}
