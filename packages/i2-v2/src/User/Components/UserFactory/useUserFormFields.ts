import { FormComposableField } from '@smartb/g2-composable'
import { useCallback, useMemo, useState } from 'react'
import {
  AdressFieldsName,
  mergeFields,
  requiredString,
  useAdressFields,
  validatePhone
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
  | 'sendVerifyEmail'
  | 'sendResetPassword'
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
   * If you want the organization to transform to a link
   */
  getOrganizationUrl?: (organizationId: OrganizationId) => string
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
    multipleRoles = true,
    getOrganizationUrl
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
    [user?.email, checkEmailValidity, strings?.emailAlreadyUsed]
  )

  const { addressFields } = useAdressFields({
    strings,
    //@ts-ignore
    fieldsOverride
  })

  const fields = useMemo(
    (): Record<userFieldsName, FormComposableField<userFieldsName>> => ({
      givenName: mergeFields<FormComposableField<userFieldsName>>(
        {
          key: 'givenName',
          name: 'givenName',
          type: 'textField',
          label: 'Prénom',
          validator: (value?: string) =>
            requiredString(strings?.requiredField, value)
        },
        fieldsOverride?.givenName
      ),
      familyName: mergeFields<FormComposableField<userFieldsName>>(
        {
          key: 'familyName',
          name: 'familyName',
          type: 'textField',
          label: 'Nom de famille',
          validator: (value?: string) =>
            requiredString(strings?.requiredField, value)
        },
        fieldsOverride?.familyName
      ),
      memberOf: mergeFields<FormComposableField<userFieldsName>>(
        {
          key: 'memberOf',
          name: 'memberOf',
          label: 'Organisation',
          type: 'select',
          params: {
            getReadonlyTextUrl: getOrganizationUrl
          }
        },
        fieldsOverride?.memberOf
      ),
      roles: mergeFields<FormComposableField<userFieldsName>>(
        {
          key: 'roles',
          name: 'roles',
          label: 'Rôle',
          type: 'select',
          params: {
            readonlyType: 'chip',
            multiple: multipleRoles
          }
        },
        fieldsOverride?.roles
      ),
      ...addressFields,
      email: mergeFields<FormComposableField<userFieldsName>>(
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
      phone: mergeFields<FormComposableField<userFieldsName>>(
        {
          key: 'phone',
          name: 'phone',
          type: 'textField',
          label: 'Numéro de téléphone (facultatif)',
          validator: (value) => validatePhone(value, strings?.enterAValidPhone)
        },
        fieldsOverride?.phone
      ),
      sendVerifyEmail: mergeFields<FormComposableField<userFieldsName>>(
        {
          name: 'sendVerifyEmail',
          type: 'checkBox',
          label: "Envoyer le mail de vérification de l'adresse email",
          params: {
            disabled: fieldsOverride?.sendVerifyEmail?.readonly
          }
        },
        fieldsOverride?.sendVerifyEmail
      ),
      sendResetPassword: mergeFields<FormComposableField<userFieldsName>>(
        {
          name: 'sendResetPassword',
          type: 'checkBox',
          label:
            "Envoyer le mail de création de son mot de passe à l'utilisateur",
          params: {
            disabled: fieldsOverride?.sendResetPassword?.readonly
          }
        },
        fieldsOverride?.sendResetPassword
      )
    }),
    [
      strings,
      fieldsOverride,
      organizationId,
      multipleRoles,
      addressFields,
      emailLoading,
      onCheckEmail,
      isUpdate,
      readonly
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
