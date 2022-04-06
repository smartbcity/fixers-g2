const street = (value: string, values: any) => {
  const city = values.city?.trim()
  const postalCode = values.postalCode?.trim()
  const trimmed = value?.trim()
  if ((!!postalCode || !!city) && !trimmed)
    return "Vous devez renseigner l'addresse en plus de la ville et du code postal" as string
  return undefined
}

const codePostal = (value: string | number, values: any) => {
  const street = !!values.street?.trim()
  const city = !!values.city?.trim()
  const trimmed = value?.trim()
  if ((street || city) && !trimmed)
    return 'Vous devez renseigner le code postal pour avoir une adresse complète' as string
  if (!!trimmed && trimmed?.length !== 5)
    return 'un code postal doit être composé de 5 chiffres' as string
  return undefined
}

const city = (value: string, values: any) => {
  const street = values.street?.trim()
  const postalCode = values.postalCode?.trim()
  const trimmed = value?.trim()
  if ((!!street || !!postalCode) && !trimmed)
    return 'Vous devez renseigner la ville pour avoir une adresse complète' as string
  return undefined
}

export const addressValidation = {
  street,
  postalCode: codePostal,
  city
}
