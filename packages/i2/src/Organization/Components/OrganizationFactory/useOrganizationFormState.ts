import {
  FormPartialField,
  Option,
  useFormWithPartialFields
} from '@smartb/g2-forms'
import { ValidatorFnc } from '@smartb/g2-forms'
import { useCallback, useMemo } from 'react'
import { addressValidation, requiredString } from '../../../Commons'
import { useDeletableForm } from '../../../Commons/useDeletableForm'
import {
  FlatOrganization,
  flatOrganizationToOrganization,
  Organization
} from '../../Domain'
import { siretValidation } from '../../Validation/siret'
import {
  OrganizationFactoryStrings,
  ReadonlyFields
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
   * An object containing the additionnal validators. The key should be the name of the field
   */
  additionnalValidators?: { [key: string]: ValidatorFnc }
  /**
   * The prop to use to add custom translation to the component
   */
  strings?: OrganizationFactoryStrings
  /**
   * The initial organization
   */
  organization?: Partial<Organization>
  /**
   * Use this prop if you want only some fields to be readonly
   */
  readonlyFields?: ReadonlyFields
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
    additionnalValidators,
    blockedFields,
    strings,
    organization,
    readonlyFields,
    rolesOptions,
    multipleRoles = true,
    onSubmit
  } = params ?? {}

  const defaultRoles = useMemo(() => {
    const givenRoles = rolesOptions?.map((it) => it.key)
    const roles = organization?.roles?.filter((it) => givenRoles?.includes(it))
    return multipleRoles ? roles : roles?.[0]
  }, [rolesOptions, organization?.roles, multipleRoles])

  const initialFields = useMemo(
    (): FormPartialField[] => [
      {
        name: 'siret',
        defaultValue: organization?.siret,
        validator: (value: any, values: any) =>
          siretValidation(value, values, readonlyFields, additionnalValidators)
      },
      {
        name: 'street',
        defaultValue: organization?.address?.street,
        validator: (value: any, values: any) =>
          addressValidation.street(
            value,
            values,
            strings,
            readonlyFields,
            additionnalValidators
          )
      },
      {
        name: 'postalCode',
        defaultValue: organization?.address?.postalCode,
        validator: (value: any, values: any) =>
          addressValidation.postalCode(
            value,
            values,
            strings,
            readonlyFields,
            additionnalValidators
          )
      },
      {
        name: 'city',
        defaultValue: organization?.address?.city,
        validator: readonlyFields?.address
          ? undefined
          : (value: any, values: any) =>
              addressValidation.city(
                value,
                values,
                strings,
                additionnalValidators
              )
      },
      {
        name: 'name',
        defaultValue: organization?.name,
        validator: (value?: string, values?: any) =>
          requiredString(
            'name',
            strings?.requiredField,
            value,
            values,
            readonlyFields,
            additionnalValidators
          )
      },
      {
        name: 'description',
        defaultValue: organization?.description,
        validator:
          !readonlyFields?.description && additionnalValidators?.description
            ? additionnalValidators?.description
            : undefined
      },
      {
        name: 'website',
        defaultValue: organization?.website,
        validator:
          !readonlyFields?.website && additionnalValidators?.website
            ? additionnalValidators?.website
            : undefined
      },
      {
        name: 'roles',
        defaultValue: defaultRoles,
        validator:
          !readonlyFields?.roles && additionnalValidators?.roles
            ? additionnalValidators?.roles
            : undefined
      }
    ],
    [
      organization,
      rolesOptions,
      readonlyFields,
      strings,
      defaultRoles,
      additionnalValidators
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
