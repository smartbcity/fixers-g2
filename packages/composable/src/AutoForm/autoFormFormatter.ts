import { Option } from '@smartb/g2-forms'
import { Condition, SectionCondition } from '../Conditions'
import { AutoFormData } from './AutoForm'

export type BackFormField = {
  name: string
  label?: string
  type: string
  description?: string
  helperText?: string
  options?: Option[]
  conditions?: Condition[]
  properties?: any
}

export type BackFormSection = {
  id: string
  label?: string
  fields: BackFormField[]
  conditions?: SectionCondition[]
  properties?: any
}

export type BackAutoFormData = {
  sections: BackFormSection[]
  properties?: any
}

export const autoFormFormatter = (autoForm: BackAutoFormData): AutoFormData => {
  return {
    sections: autoForm.sections.map((section) => ({
      ...section,
      ...section.properties,
      fields: section.fields.map(
        ({ description, helperText, options, properties, ...other }) => {
          const { fullRow, readOnly, defaultValue, ...otherProperties } =
            properties ?? {}
          return {
            ...other,
            fullRow,
            readOnly,
            defaultValue,
            params: {
              description,
              helperText,
              options,
              ...otherProperties
            }
          }
        }
      )
    })),
    ...autoForm.properties
  }
}
