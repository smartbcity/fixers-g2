export interface PasswordValidationStrings {
  /**
   * @default "Vous devez renseigner le mot de passe"
   */
  completeThePassword?: string
  /**
   * @default "Le mot de passe doit être composé d'au minimum 8 caractères"
   */
  passWordLongerThan8?: string
  /**
   * @default "Vous devez renseigner un mot de passe identique au premier"
   */
  samePasswordCheck?: string
}

export const passwordValidation = (
  value?: string,
  strings?: PasswordValidationStrings
): string | undefined => {
  const password = value?.trim()
  if (!password) {
    return (
      strings?.completeThePassword ??
      ('Vous devez renseigner le mot de passe' as string)
    )
  }
  if (!!password && password?.length < 8) {
    return (
      strings?.passWordLongerThan8 ??
      "Le mot de passe doit être composé d'au minimum 8 caractères"
    )
  }
  return undefined
}

export const passwordCheckValidation = (
  value?: string,
  values?: any,
  strings?: PasswordValidationStrings
): string | undefined => {
  const password = values.password?.trim()
  const passwordCheck = value?.trim()
  if (password !== passwordCheck)
    return (
      strings?.samePasswordCheck ??
      ('Vous devez renseigner un mot de passe identique au premier' as string)
    )
  return undefined
}
