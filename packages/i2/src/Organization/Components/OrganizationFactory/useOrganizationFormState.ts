import {
  FormPartialField,
  Option,
  useFormWithPartialFields
} from '@smartb/g2-forms'
import { ValidatorFnc } from '@smartb/g2-forms'
import { useCallback, useMemo } from 'react'
import { requiredString, useAdressFields } from '../../../Commons'
import { useDeletableForm } from '../../../Commons/useDeletableForm'
import {
  FlatOrganization,
  flatOrganizationToOrganization,
  Organization
} from '../../Domain'
import { siretValidation } from '../../Validation/siret'
import {
  OrganizationFactoryStrings,
  ReadOnlyFields
} from './OrganizationFactory'

export interface useOrganizationFormStateProps<T extends Organization> {
  /**
   * The additional fields to add to the form
   */
  additionalFields?: FormPartialField[]
  /**
   * The name of the field you want to block in the form state
   */
  blockedFields?: string[]
  /**
   * An object containing the additional validators. The key should be the name of the field
   */
  additionalValidators?: { [key: string]: ValidatorFnc }
  /**
   * The prop to use to add custom translation to the component
   */
  strings?: OrganizationFactoryStrings
  /**
   * The initial organization
   */
  organization?: Partial<Organization>
  /**
   * Use this prop if you want only some fields to be readOnly
   */
  readOnlyFields?: ReadOnlyFields
  /**
   * The roles options needed to make the roles select.
   */
  rolesOptions?: Option[]
  /**
   * Allow the organization to have multipe roles
   *
   * @default true
   */
  multipleRoles?: boolean
  /**
   * The submit event
   * @param organization the complete organization object after form Validation
   * @returns true if the Api call has been successfull
   */
  onSubmit?: (organization: T) => void
}

export const useOrganizationFormState = <T extends Organization = Organization>(
  params?: useOrganizationFormStateProps<T>
) => {
  const {
    additionalFields = [],
    additionalValidators,
    blockedFields,
    strings,
    organization,
    readOnlyFields,
    rolesOptions,
    multipleRoles = true,
    onSubmit
  } = params ?? {}

  const defaultRoles = useMemo(() => {
    const givenRoles = rolesOptions?.map((it) => it.key)
    const roles = organization?.roles?.filter((it) => givenRoles?.includes(it))
    return multipleRoles ? roles : roles?.[0]
  }, [rolesOptions, organization?.roles, multipleRoles])

  const { addressPartialFields } = useAdressFields({
    address: organization?.address,
    strings,
    additionalValidators,
    readOnly: readOnlyFields?.address
  })

  const initialFields = useMemo(
    (): FormPartialField[] => [
      {
        name: 'siret',
        defaultValue: organization?.siret,
        validator: (value: any, values: any) =>
          siretValidation(value, values, readOnlyFields, additionalValidators)
      },
      addressPartialFields.street,
      addressPartialFields.postalCode,
      addressPartialFields.city,
      {
        name: 'name',
        defaultValue: organization?.name,
        validator: (value?: string, values?: any) =>
          requiredString(
            'name',
            strings?.requiredField,
            value,
            values,
            readOnlyFields,
            additionalValidators
          )
      },
      {
        name: 'description',
        defaultValue: organization?.description,
        validator:
          !readOnlyFields?.description && additionalValidators?.description
            ? additionalValidators?.description
            : undefined
      },
      {
        name: 'website',
        defaultValue: organization?.website,
        validator:
          !readOnlyFields?.website && additionalValidators?.website
            ? additionalValidators?.website
            : undefined
      },
      {
        name: 'roles',
        defaultValue: defaultRoles,
        validator:
          !readOnlyFields?.roles && additionalValidators?.roles
            ? additionalValidators?.roles
            : undefined
      }
    ],
    [
      organization,
      rolesOptions,
      readOnlyFields,
      strings,
      defaultRoles,
      additionalValidators,
      addressPartialFields
    ]
  )

  const fields = useDeletableForm<FormPartialField>({
    initialFields,
    additionalFields,
    blockedFields
  })

  const onSubmitMemoized = useCallback(
    async (values: FlatOrganization) => {
      if (onSubmit) {
        onSubmit({
          ...values,
          ...flatOrganizationToOrganization(values, multipleRoles),
          id: organization?.id ?? ''
        } as T)
      }
    },
    [onSubmit, organization, multipleRoles]
  )

  return useFormWithPartialFields({
    fields: fields,
    onSubmit: onSubmitMemoized,
    formikConfig: {
      enableReinitialize: true
    }
  })
}
