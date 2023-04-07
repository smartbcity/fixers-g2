import { PotentialError } from '@smartb/g2-forms'

export const siretValidation = (
  value?: string,
  values?: any,
  readOnlyFields?: any,
  additionnalValidators?: any
): PotentialError => {
  if (readOnlyFields?.siret) return undefined
  const trimmed = value?.trim()
  if (!!trimmed && trimmed?.length !== 14 && trimmed?.length !== 0)
    return 'un numéro de siret doit être composé de 14 chiffres'
  return additionnalValidators?.siret
    ? additionnalValidators?.siret(trimmed, values)
    : undefined
}
