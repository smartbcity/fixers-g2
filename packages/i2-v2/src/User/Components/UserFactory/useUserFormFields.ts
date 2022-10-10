import { FormComposableField } from '@smartb/g2-composable'
import { useCallback, useMemo, useState } from 'react'
import {
  AdressFieldsName,
  mergeFields,
  requiredString,
  useAdressFields
} from '../../../Commons'
import { OrganizationId } from '../../../Organization'
import { User } from '../../Domain'
import { UserFactoryStrings } from './UserFactory'

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/i

export type userFieldsName =
  | 'givenName'
  | 'familyName'
  | 'email'
  | 'phone'
  | 'roles'
  | 'memberOf'
  | 'sendEmailLink'
  | AdressFieldsName

export type UserFactoryFieldsOverride = Partial<
  Record<userFieldsName, Partial<FormComposableField<userFieldsName>>>
>

export interface UseUserFormFieldsProps<T extends User> {
  /**
   * The prop to use to add custom translation to the component
   */
  strings?: UserFactoryStrings
  /**
   * use This prop to override the fields
   */
  fieldsOverride?: UserFactoryFieldsOverride
  /**
   * Allow the user to have multipe roles
   *
   * @default true
   */
  multipleRoles?: boolean
  /**
   * The event called to check if the email is available
   */
  checkEmailValidity?: (email: string) => Promise<boolean | undefined>
  /**
   * Indicates if it's an update
   * @default false
   */
  isUpdate?: boolean
  /**
   * The initial user object
   */
  user?: T
  /**
   * To activate Readonly view
   * @default false
   */
  readonly?: boolean
  /**
   * The organizationId of the user. Needed if you want to preSelect it when you are creating a user
   */
  organizationId?: OrganizationId
}

export const useUserFormFields = <T extends User = User>(
  params?: UseUserFormFieldsProps<T>
) => {
  const {
    strings,
    fieldsOverride,
    checkEmailValidity,
    isUpdate = false,
    readonly = false,
    organizationId,
    user,
    multipleRoles = true
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
    //@ts-ignore
    fieldsOverride
  })

  const fields = useMemo(
    (): FormComposableField<userFieldsName>[] => [
      mergeFields<FormComposableField<userFieldsName>>(
        {
          key: 'givenName',
          name: 'givenName',
          type: 'textField',
          label: 'Prénom',
          validator: (value?: string) =>
            requiredString(
              strings?.requiredField,
              value,
              fieldsOverride?.givenName?.readonly
            )
        },
        fieldsOverride?.givenName
      ),
      mergeFields<FormComposableField<userFieldsName>>(
        {
          key: 'familyName',
          name: 'familyName',
          type: 'textField',
          label: 'Nom de Famille',
          validator: (value?: string) =>
            requiredString(
              strings?.requiredField,
              value,
              fieldsOverride?.familyName?.readonly
            )
        },
        fieldsOverride?.familyName
      ),
      //@ts-ignore
      ...(fieldsOverride?.roles?.memberOf?.options || organizationId
        ? [
            mergeFields<FormComposableField<userFieldsName>>(
              {
                key: 'memberOf',
                name: 'memberOf',
                label: 'Organisation',
                type: 'select',
                defaultValue: user?.memberOf?.id ?? organizationId
              },
              fieldsOverride?.memberOf
            )
          ]
        : []),
      //@ts-ignore
      ...(fieldsOverride?.roles?.params?.options
        ? [
            mergeFields<FormComposableField<userFieldsName>>(
              {
                key: 'roles',
                name: 'roles',
                label: 'Role',
                type: 'select',
                params: {
                  readonlyType: 'chip',
                  multiple: multipleRoles
                }
              },
              fieldsOverride?.roles
            )
          ]
        : []),
      addressFields.street,
      addressFields.postalCode,
      addressFields.city,
      mergeFields<FormComposableField<userFieldsName>>(
        {
          key: 'email',
          name: 'email',
          type: 'textField',
          label: 'Adresse mail',
          params: {
            textFieldType: 'email',
            searchLoading: emailLoading,
            validated: emailValid
          },
          validator: async (value?: string) => {
            if (fieldsOverride?.email?.readonly) return undefined
            const trimmed = (value ?? '').trim()
            if (!trimmed)
              return (
                strings?.completeTheEmail ??
                ('Vous devez renseigner le mail' as string)
              )
            if (!emailRegex.test(trimmed))
              return (
                strings?.enterAValidEmail ??
                "L'email renseigné n'est pas correct"
              )
            return await onCheckEmail(trimmed)
          }
        },
        fieldsOverride?.email
      ),
      mergeFields<FormComposableField<userFieldsName>>(
        {
          key: 'phone',
          name: 'phone',
          type: 'textField',
          label: 'Numéro de téléphone (facultatif)',
          validator: (value?: string) => {
            if (fieldsOverride?.phone?.readonly) return undefined
            const trimmed = (value ?? '').trim().replace(' ', '')
            if (trimmed && trimmed.length !== 10)
              return (
                strings?.enterAValidPhone ??
                'Le numéro de téléphone doit contenir dix chiffres'
              )
            return
          }
        },
        fieldsOverride?.phone
      ),
      ...(!isUpdate && !readonly
        ? [
            mergeFields<FormComposableField<userFieldsName>>(
              {
                key: 'sendEmailLink',
                name: 'sendEmailLink',
                type: 'checkBox',
                label: "Envoyer un lien d'invitation par mail",
                params: {
                  className: 'AruiUserFactory-sendEmailLink',
                  disabled: fieldsOverride?.sendEmailLink?.readonly
                }
              },
              fieldsOverride?.sendEmailLink
            )
          ]
        : [])
    ],
    [
      user,
      isUpdate,
      fieldsOverride,
      multipleRoles,
      readonly,
      organizationId,
      strings,
      onCheckEmail
    ]
  )

  const fieldsArray = useMemo(() => Object.values(fields), [fields])

  return {
    emailLoading,
    emailValid,
    fields,
    fieldsArray
  }
}
