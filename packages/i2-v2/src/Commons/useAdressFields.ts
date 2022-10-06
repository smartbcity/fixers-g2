import { FormComposableField } from '@smartb/g2-composable'
import { useMemo } from 'react'
import { Address, addressValidation, AdressValidationStrings } from '.'

export type AdressFieldsName = "street" | 'postalCode' | "city"

export type AdressReadonlyFields = {
  [k in keyof Address]?: boolean
}

export interface useAdressFieldsParams {
  /**
   * The prop to use to add custom translation to the component
   */
  strings?: AdressValidationStrings
  /**
   * use This prop to override the fields
   */
  fieldsOverride?: Record<AdressFieldsName, Partial<FormComposableField<AdressFieldsName>>>
}

export const useAdressFields = (params?: useAdressFieldsParams) => {
  const {
    strings = {},
    fieldsOverride
  } = params || {}

  const addressFields = useMemo(
    () => ({
      street: {
        key: 'street',
        name: 'street',
        type: 'textField',
        label: 'Addresse (facultatif)',
        ...fieldsOverride?.street,
        validator: fieldsOverride?.street.readonly
          ? undefined
          : (value: any, values: any) =>
            addressValidation.street(
              value,
              values,
              strings,
              fieldsOverride?.street.validator
            ),
      } as FormComposableField<AdressFieldsName>,
      postalCode: {
        key: 'postalCode',
        name: 'postalCode',
        type: 'textField',
        label: 'Code postal (facultatif)',
        ...fieldsOverride?.postalCode,
        validator: fieldsOverride?.postalCode.readonly
          ? undefined
          : (value: any, values: any) =>
            addressValidation.postalCode(
              value,
              values,
              strings,
              fieldsOverride?.postalCode.validator
            ),
      } as FormComposableField<AdressFieldsName>,
      city: {
        key: 'city',
        name: 'city',
        type: 'textField',
        label: 'Ville (facultatif)',
        ...fieldsOverride?.city,
        validator: fieldsOverride?.city.readonly
          ? undefined
          : (value: any, values: any) =>
            addressValidation.city(
              value,
              values,
              strings,
              fieldsOverride?.city.validator
            ),
      } as FormComposableField<AdressFieldsName>
    }),
    [strings, fieldsOverride]
  )

  return {
    addressFields
  }
}
