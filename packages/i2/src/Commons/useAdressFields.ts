import { FormField, FormPartialField, ValidatorFnc } from '@smartb/g2-forms'
import { useMemo } from 'react'
import { Address, addressValidation, AdressValidationStrings } from '.'

export interface AdressStrings extends AdressValidationStrings {
  /**
   * @default "Addresse (facultatif)"
   */
  street?: string
  /**
   * @default "Code postal (facultatif)"
   */
  postalCode?: string
  /**
   * @default "Ville (facultatif)"
   */
  city?: string
}

export type AdressReadonlyFields = {
  [k in keyof Address]?: boolean
}

export interface useAdressFieldsParams {
  /**
   * The default address to use in the form
   */
  address?: Address
  /**
   * The prop to use to add custom translation to the component
   */
  strings?: AdressStrings
  /**
   * The prop to use to put the fields in readonly
   */
  readonly?: boolean
  /**
   * An object containing the additionnal validators. The key should be the name of the field
   */
  additionnalValidators?: { [key: string]: ValidatorFnc }
}

export const useAdressFields = (params?: useAdressFieldsParams) => {
  const {
    address,
    strings = {},
    readonly = false,
    additionnalValidators
  } = params || {}

  const addressPartialFields = useMemo(
    () => ({
      street: {
        name: 'street',
        defaultValue: address?.street,
        validator: readonly
          ? undefined
          : (value: any, values: any) =>
              addressValidation.street(
                value,
                values,
                strings,
                additionnalValidators
              )
      } as FormPartialField,
      postalCode: {
        name: 'postalCode',
        defaultValue: address?.postalCode,
        validator: readonly
          ? undefined
          : (value: any, values: any) =>
              addressValidation.postalCode(
                value,
                values,
                strings,
                additionnalValidators
              )
      } as FormPartialField,
      city: {
        name: 'city',
        defaultValue: address?.city,
        validator: readonly
          ? undefined
          : (value: any, values: any) =>
              addressValidation.city(
                value,
                values,
                strings,
                additionnalValidators
              )
      } as FormPartialField
    }),
    [address, strings, readonly]
  )

  const addressFields = useMemo(
    () => ({
      street: {
        key: 'street',
        name: 'street',
        type: 'textfield',
        label: strings?.street ?? 'Addresse (facultatif)',
        textFieldProps: {
          readonly: readonly
        }
      } as FormField,
      postalCode: {
        key: 'postalCode',
        name: 'postalCode',
        type: 'textfield',
        label: strings?.postalCode ?? 'Code postal (facultatif)',
        textFieldProps: {
          readonly: readonly
        }
      } as FormField,
      city: {
        key: 'city',
        name: 'city',
        type: 'textfield',
        label: strings?.city ?? 'Ville (facultatif)',
        textFieldProps: {
          readonly: readonly
        }
      } as FormField
    }),
    [readonly, strings]
  )

  return {
    addressFields,
    addressPartialFields
  }
}
