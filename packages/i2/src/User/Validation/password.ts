export const passwordValidation = (value?: string): string | undefined => {
  const password = value?.trim()
  if (!password) {
    return 'Vous devez renseigner le mot de passe' as string
  }
  if (!!password && password?.length < 8) {
    return "Le mot de passe doit être composé d'au minimum 8 caractères"
  }
  return undefined
}

export const passwordCheckValidation = (
  value?: string,
  values?: any
): string | undefined => {
  const password = values.password?.trim()
  const passwordCheck = value?.trim()
  if (password !== passwordCheck)
    return 'Vous devez renseigner un mot de passe identique au premier' as string
  return undefined
}
