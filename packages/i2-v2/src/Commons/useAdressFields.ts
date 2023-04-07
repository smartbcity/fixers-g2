import { FormComposableField } from '@smartb/g2-composable'
import { useMemo } from 'react'
import {
  Address,
  addressValidation,
  AdressValidationStrings,
  mergeFields
} from '.'

export type AdressFieldsName = 'street' | 'postalCode' | 'city'

export type AdressReadOnlyFields = {
  [k in keyof Address]?: boolean
}

export type AdressFieldsOverride = Partial<
  Record<AdressFieldsName, Partial<FormComposableField<AdressFieldsName>>>
>

export interface useAdressFieldsParams {
  /**
   * The prop to use to add custom translation to the component
   */
  strings?: AdressValidationStrings
  /**
   * use This prop to override the fields
   */
  fieldsOverride?: AdressFieldsOverride
}

export const useAdressFields = (params?: useAdressFieldsParams) => {
  const { strings, fieldsOverride } = params || {}

  const addressFields = useMemo(
    () => ({
      street: mergeFields<FormComposableField<AdressFieldsName>>(
        {
          key: 'street',
          name: 'street',
          type: 'textField',
          label: 'Addresse (facultatif)',
          validator: (value: any, values: any) =>
            addressValidation.street(value, values, strings)
        },
        fieldsOverride?.street
      ),
      postalCode: mergeFields<FormComposableField<AdressFieldsName>>(
        {
          key: 'postalCode',
          name: 'postalCode',
          type: 'textField',
          label: 'Code postal (facultatif)',
          validator: (value: any, values: any) =>
            addressValidation.postalCode(value, values, strings)
        },
        fieldsOverride?.postalCode
      ),
      city: mergeFields<FormComposableField<AdressFieldsName>>(
        {
          key: 'city',
          name: 'city',
          type: 'textField',
          label: 'Ville (facultatif)',
          validator: (value: any, values: any) =>
            addressValidation.city(value, values, strings)
        },
        fieldsOverride?.city
      )
    }),
    [strings, fieldsOverride]
  )

  return {
    addressFields
  }
}
