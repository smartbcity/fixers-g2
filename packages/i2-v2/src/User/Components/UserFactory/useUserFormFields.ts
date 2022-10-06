import { FormComposableField } from '@smartb/g2-composable'
import {
  FormPartialField,
  Option,
  useFormWithPartialFields,
  ValidatorFnc
} from '@smartb/g2-forms'
import { useCallback, useMemo, useState } from 'react'
import { AdressFieldsName, requiredString, useAdressFields } from '../../../Commons'
import { useDeletableForm } from '../../../Commons/useDeletableForm'
import { OrganizationId } from '../../../Organization'
import { FlatUser, FlatUserToUser, User } from '../../Domain'
import { UserFactoryStrings, ReadonlyFields } from './UserFactory'

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/i

export type userFieldsName = "givenName" | 'familyName' | "email" | "phone" | 'roles' | "memberOf" | "sendEmailLink" | AdressFieldsName

export interface UseUserFormStateProps<T extends User> {
  /**
   * The additional fields to add to the form
   */
  additionalFields?: FormPartialField[]
  /**
   * The name of the field you want to block in the form state
   */
  blockedFields?: string[]
  /**
   * The prop to use to add custom translation to the component
   */
  strings?: UserFactoryStrings
  /**
    * use This prop to override the fields
    */
  fieldsOverride?: Record<userFieldsName, Partial<FormComposableField<userFieldsName>>>
  /**
   * The event called to check if the email is available
   */
  checkEmailValidity?: (email: string) => Promise<boolean | undefined>
  /**
   * The submit event
   * @param user the complete user object after form Validation
   * @returns true if the Api call has been successfull
   */
  onSubmit?: (user: T) => void
  /**
   * Indicates if it's an update
   * @default false
   */
  isUpdate?: boolean
  /**
   * To activate Readonly view
   * @default false
   */
  readonly?: boolean
  /**
   * The organizationId of the user. Needed if you want to preSelect it when you are creating a user
   */
  organizationId?: OrganizationId
  /**
   * The r of the user. Needed if you want to preSelect it when you are creating a user
   */
  roles?: string[]
}

export const useUserFormState = <T extends User = User>(
  params?: UseUserFormStateProps<T>
) => {
  const {
    additionalFields = [],
    additionnalValidators,
    blockedFields,
    strings,
    user,
    readonlyFields,
    rolesOptions,
    multipleRoles = true,
    onSubmit,
    checkEmailValidity,
    isUpdate = false,
    readonly = false,
    organizationId,
    roles = []
  } = params ?? {}

  const [emailValid, setEmailValid] = useState(false)
  const [emailLoading, setEmailLoading] = useState(false)

  const onCheckEmail = useCallback(
    async (email: string): Promise<string | undefined> => {
      if (user?.email !== email && checkEmailValidity) {
        setEmailLoading(true)
        const isTaken = await checkEmailValidity(email)
        setEmailLoading(false)
        if (isTaken === true) {
          setEmailValid(false)
          return strings?.emailAlreadyUsed ?? 'Cet email est déjà utilisé'
        } else if (isTaken === false) {
          setEmailValid(true)
        }
      }
      return undefined
    },
    [user?.email, checkEmailValidity]
  )

  const { addressFields } = useAdressFields({
    strings,
    additionnalValidators,
    readonly: readonlyFields?.address
  })

  const initialFields = useMemo(
    (): FormPartialField[] => [
      {
        name: 'givenName',
        defaultValue: user?.givenName,
        validator: (value?: string, values?: any) =>
          requiredString(
            'givenName',
            strings?.requiredField,
            value,
            values,
            readonlyFields,
            additionnalValidators
          )
      },
      {
        name: 'familyName',
        defaultValue: user?.familyName,
        validator: (value?: string, values?: any) =>
          requiredString(
            'familyName',
            strings?.requiredField,
            value,
            values,
            readonlyFields,
            additionnalValidators
          )
      },
      addressPartialFields.street,
      addressPartialFields.postalCode,
      addressPartialFields.city,
      {
        name: 'email',
        defaultValue: user?.email,
        validator: async (value?: string) => {
          if (readonlyFields?.email) return undefined
          const trimmed = (value ?? '').trim()
          if (!trimmed)
            return (
              strings?.completeTheEmail ??
              ('Vous devez renseigner le mail' as string)
            )
          if (!emailRegex.test(trimmed))
            return (
              strings?.enterAValidEmail ?? "L'email renseigné n'est pas correct"
            )
          return await onCheckEmail(trimmed)
        }
      },
      {
        name: 'phone',
        defaultValue: user?.phone,
        validator: (value?: string, values?: any) => {
          if (readonlyFields?.phone) return undefined
          const trimmed = (value ?? '').trim().replace(' ', '')
          if (trimmed && trimmed.length !== 10)
            return (
              strings?.enterAValidPhone ??
              'Le numéro de téléphone doit contenir dix chiffres'
            )
          return additionnalValidators?.phone
            ? additionnalValidators?.phone(trimmed, values)
            : undefined
        }
      },
      {
        name: 'roles',
        defaultValue: multipleRoles
          ? user?.roles?.assignedRoles || roles
          : user?.roles?.assignedRoles[0] || roles[0],
        validator:
          !readonlyFields?.roles && additionnalValidators?.roles
            ? additionnalValidators?.roles
            : undefined
      },
      {
        name: 'memberOf',
        defaultValue: user?.memberOf?.id ?? organizationId,
        validator:
          !readonlyFields?.memberOf && additionnalValidators?.memberOf
            ? additionnalValidators?.memberOf
            : undefined
      },
      ...(!isUpdate && !readonly
        ? [
          {
            name: 'sendEmailLink',
            defaultValue: true,
            validator:
              readonlyFields?.sendEmailLink &&
                additionnalValidators?.sendEmailLink
                ? additionnalValidators?.sendEmailLink
                : undefined
          }
        ]
        : [])
    ],
    [
      user,
      isUpdate,
      rolesOptions,
      readonly,
      organizationId,
      readonlyFields,
      strings,
      multipleRoles,
      onCheckEmail,
      addressPartialFields
    ]
  )

  const userForm = useMemo((): FormField[] => {
    const orgsOptions =
      !!organizationsRefs && organizationsRefs.length > 0
        ? organizationsRefs.map(
          (orgRef): Option => ({
            key: orgRef.id,
            label: orgRef.name
          })
        )
        : undefined
    return [
      {
        key: 'givenName',
        name: 'givenName',
        type: 'textfield',
        label: strings?.givenName ?? 'Prénom',
        textFieldProps: {
          readonly: readonlyFields?.givenName
        }
      },
      {
        key: 'familyName',
        name: 'familyName',
        type: 'textfield',
        label: strings?.familyName ?? 'Nom de Famille',
        textFieldProps: {
          readonly: readonlyFields?.familyName
        }
      },
      ...(orgsOptions || organizationId
        ? [
          {
            key: 'memberOf',
            name: 'memberOf',
            label: strings?.organization ?? 'Organisation',
            type: 'select',
            selectProps: {
              options: orgsOptions,
              readonly: readonlyFields?.memberOf,
              getReadonlyTextUrl: getOrganizationUrl
            }
          } as FormField
        ]
        : []),
      ...(rolesOptions
        ? [
          {
            key: 'roles',
            name: 'roles',
            label: strings?.roles ?? 'Role',
            type: 'select',
            selectProps: {
              options:
                readonlyFields?.roles === true || readonly
                  ? readonlyRolesOptions
                  : rolesOptions,
              readonly: readonlyFields?.roles,
              readonlyType: 'chip',
              multiple: multipleRoles
            }
          } as FormField
        ]
        : []),
      addressFields.street,
      addressFields.postalCode,
      addressFields.city,
      {
        key: 'email',
        name: 'email',
        type: 'textfield',
        label: strings?.email ?? 'Adresse mail',
        textFieldProps: {
          textFieldType: 'email',
          readonly: readonlyFields?.email,
          searchLoading: emailLoading,
          validated: emailValid
        }
      },
      {
        key: 'phone',
        name: 'phone',
        type: 'textfield',
        label: strings?.phone ?? 'Numéro de téléphone (facultatif)',
        textFieldProps: {
          readonly: readonlyFields?.phone
        }
      },
      ...(!isUpdate && !readonly
        ? [
          {
            key: 'sendEmailLink',
            name: 'sendEmailLink',
            type: 'checkbox',
            label:
              strings?.sendEmailLink ??
              "Envoyer un lien d'invitation par mail",
            checkBoxProps: {
              className: 'AruiUserFactory-sendEmailLink',
              disabled: readonlyFields?.sendEmailLink
            }
          } as FormField
        ]
        : [])
    ]
  }, [
    isUpdate,
    rolesOptions,
    organizationsRefs,
    readonlyFields,
    readonly,
    organizationId,
    getOrganizationUrl,
    multipleRoles,
    emailLoading,
    emailValid,
    addressFields
  ])

  const fields = useDeletableForm<FormPartialField>({
    initialFields,
    additionalFields,
    blockedFields
  })


  return {
    emailLoading,
    emailValid
  }
}
