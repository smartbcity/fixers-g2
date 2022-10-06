import { useMemo } from 'react'
import { FormField, FormPartialField } from '@smartb/g2-forms'

export interface DeletableFormParams<
  T extends FormField | FormPartialField = FormField
> {
  initialFields: T[]
  additionalFields?: T[]
  /**
   * The names of the fields to block
   */
  blockedFields?: string[]
}

export const useDeletableForm = <
  T extends FormField | FormPartialField = FormField
>(
  deletePrams: DeletableFormParams<T>
) => {
  const { initialFields, blockedFields, additionalFields = [] } = deletePrams
  const fields = useMemo(() => {
    const fields: T[] = [...initialFields, ...additionalFields]
    const fieldsFiltered = blockedFields
      ? fields.filter((field) => !blockedFields.includes(field.name as string))
      : fields
    return fieldsFiltered
  }, [initialFields, additionalFields, blockedFields])
  return fields
}
