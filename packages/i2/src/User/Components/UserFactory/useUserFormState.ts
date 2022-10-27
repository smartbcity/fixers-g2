import {
  FormPartialField,
  Option,
  useFormWithPartialFields,
  ValidatorFnc
} from '@smartb/g2-forms'
import { useCallback, useMemo, useState } from 'react'
import {
  requiredString,
  useAdressFields,
  validatePhone
} from '../../../Commons'
import { useDeletableForm } from '../../../Commons/useDeletableForm'
import { OrganizationId } from '../../../Organization'
import { FlatUser, FlatUserToUser, User } from '../../Domain'
import { UserFactoryStrings, ReadonlyFields } from './UserFactory'

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/i

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
   * An object containing the additionnal validators. The key should be the name of the field
   */
  additionnalValidators?: { [key: string]: ValidatorFnc }
  /**
   * The prop to use to add custom translation to the component
   */
  strings?: UserFactoryStrings
  /**
   * The initial user
   */
  user?: Partial<User>
  /**
   * Use this prop if you want only some fields to be readonly
   */
  readonlyFields?: ReadonlyFields
  /**
   * The roles options needed to make the roles select.
   */
  rolesOptions?: Option[]
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

  const { addressPartialFields } = useAdressFields({
    address: user?.address,
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
          const res = validatePhone(value, strings?.enterAValidPhone)
          if (res) return res
          return additionnalValidators?.phone
            ? additionnalValidators?.phone(value, values)
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

  const fields = useDeletableForm<FormPartialField>({
    initialFields,
    additionalFields,
    blockedFields
  })

  const onSubmitMemoized = useCallback(
    async (values: FlatUser) => {
      if (onSubmit) {
        onSubmit({
          ...values,
          ...FlatUserToUser(values, multipleRoles),
          id: user?.id ?? ''
        } as T)
      }
    },
    [onSubmit, user, multipleRoles]
  )

  const formState = useFormWithPartialFields({
    fields: fields,
    onSubmit: onSubmitMemoized,
    formikConfig: {
      enableReinitialize: true
    }
  })

  return {
    formState,
    emailLoading,
    emailValid
  }
}
