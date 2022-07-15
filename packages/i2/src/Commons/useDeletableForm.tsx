import { useMemo } from 'react'
import { FormField } from '@smartb/g2-forms'

export interface DeletableFormParams {
  initialFields: FormField[]
  /**
   * The names of the fields to block
   */
  blockedFields?: string[]
}

export const useDeletableForm = (deletePrams: DeletableFormParams) => {
  const { initialFields, blockedFields } = deletePrams
  const fields = useMemo(() => {
    const fieldsFiltered = blockedFields
      ? initialFields.filter(
          (field) => !blockedFields.includes(field.name as string)
        )
      : initialFields
    return fieldsFiltered
  }, [initialFields, blockedFields])
  return fields
}
