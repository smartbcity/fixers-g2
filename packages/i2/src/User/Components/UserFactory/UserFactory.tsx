import { cx } from '@emotion/css'
import {
  Form,
  FormField,
  FormPartialField,
  Option,
  useFormWithPartialFields
} from '@smartb/g2-forms'
import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'
import React, { useCallback, useEffect, useMemo } from 'react'
import { FlatUser, FlatUserToUser, User } from '../../Domain'
import { addressValidation, AdressValidationStrings } from '../../../Commons'
import { OrganizationId, OrganizationRef } from '../../../Organization'
import { Stack, StackProps } from '@mui/material'
import { useElementSize } from '@mantine/hooks'
import { UserSummary } from '../UserSummary'
import { useDeletableForm } from '../../../Commons/useDeletableForm'

export type Validated = boolean

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/i

export type ReadonlyFields = {
  [k in keyof User]?: boolean
}

export interface UserFactoryStrings extends AdressValidationStrings {
  /**
   * @default "Prénom"
   */
  givenName?: string
  /**
   * @default "Nom de Famille"
   */
  familyName?: string
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
  /**
   * @default "Adresse mail"
   */
  email?: string
  /**
   * @default "Numéro de téléphone (facultatif)"
   */
  phone?: string
  /**
   * @default "Role"
   */
  roles?: string
  /**
   * @default "Organisation"
   */
  organization?: string
  /**
   * @default "Envoyer un lien d'invitation par mail"
   */
  sendEmailLink?: string
  /**
   * @default "Vous devez renseigner le prénom"
   */
  completeTheGivenName?: string
  /**
   * @default "Vous devez renseigner le nom de famille"
   */
  completeTheFamilyName?: string
  /**
   * @default "Vous devez renseigner le mail"
   */
  completeTheEmail?: string
  /**
   * @default "L'email renseigner n'est pas correcte"
   */
  enterAValidEmail?: string
  /**
   * @default "Le numéro de téléphone doit contenir dix chiffres"
   */
  enterAValidPhone?: string
  /**
   * @default 'Vous devez renseigner le rôle'
   */
  chooseTheRole?: string
  /**
   * @default 'Cette addresse email est déjà utilisée'
   */
  emailAlreadyUsed?: string
}

export interface UserFactoryBasicProps extends BasicProps {
  /**
   * The base user
   */
  user?: User
  /**
   * The submit event
   * @param user the complete user object after form Validation
   * @returns true if the Api call has been successfull
   */
  onSubmit?: (user: User) => Promise<Validated> | Validated
  /**
   * Indicates if it's an update
   * @default false
   */
  isUpdate?: boolean
  /**
   * The ref of the submit element
   */
  SubmitButtonRef?: React.RefObject<HTMLElement | undefined>
  /**
   * To activate Readonly view
   * @default false
   */
  readonly?: boolean
  /**
   * The organizations refs needed to make the orgnization select
   */
  organizationsRefs?: OrganizationRef[]
  /**
   * The roles options needed to make the roles select.
   * The default role selected in the form will be the first of the list
   */
  rolesOptions?: Option[]
  /**
   * Use This props if you have roles that you don't want the user to be able to select but able to see in readonly use this prop
   */
  readonlyRolesOptions?: Option[]
  /**
   * The organizationId of the user. Needed if you want to preSelect it when you are creating a user
   */
  organizationId?: OrganizationId
  /**
   * If you want the organization to transform to a link
   */
  getOrganizationUrl?: (organizationId: OrganizationId) => string
  /**
   * The event called to check if the email is available
   */
  checkEmailValidity?: (email: string) => Promise<boolean | undefined>
  /**
   * Use this prop if you want only some fields to be readonly
   */
  readonlyFields?: ReadonlyFields
  /**
   * Allow the user to have multipe roles
   *
   * @default true
   */
  multipleRoles?: boolean
  /**
   * Indicates if the data is currently loading
   *
   * @default false
   */
  isLoading?: boolean
  /**
   * The nodes put at the bottom of the form
   */
  formExtension?: React.ReactNode
  /**
   * The prop to use to add custom translation to the component
   */
  strings?: UserFactoryStrings
  /**
   * The names of the fields to block
   */
  blockedFields?: string[]
}

export type UserFactoryProps = MergeMuiElementProps<
  StackProps,
  UserFactoryBasicProps
>

export const UserFactory = (props: UserFactoryProps) => {
  const {
    user,
    onSubmit,
    isUpdate = false,
    className,
    readonly = false,
    organizationsRefs,
    rolesOptions,
    organizationId,
    readonlyFields,
    isLoading = false,
    strings,
    SubmitButtonRef,
    getOrganizationUrl,
    blockedFields,
    readonlyRolesOptions,
    multipleRoles = true,
    checkEmailValidity,
    formExtension,
    ...other
  } = props

  const { ref, width } = useElementSize()

  const partialFields = useMemo(
    (): FormPartialField[] => [
      {
        name: 'givenName',
        defaultValue: user?.givenName,
        validator: (value?: string | number) => {
          if (readonlyFields?.givenName) return undefined
          const string = String(value).trim()
          if (!string || !value)
            return (
              strings?.completeTheGivenName ??
              ('Vous devez renseigner le prénom' as string)
            )
          return undefined
        }
      },
      {
        name: 'familyName',
        defaultValue: user?.familyName,
        validator: (value?: string | number) => {
          if (readonlyFields?.familyName) return undefined
          const string = String(value).trim()
          if (!string || !value)
            return (
              strings?.completeTheFamilyName ??
              ('Vous devez renseigner le nom de famille' as string)
            )
          return undefined
        }
      },
      {
        name: 'street',
        defaultValue: user?.address?.street,
        validator: (value: any, values: any) =>
          addressValidation.street(value, values, strings)
      },
      {
        name: 'postalCode',
        defaultValue: user?.address?.postalCode,
        validator: (value: any, values: any) =>
          addressValidation.postalCode(value, values, strings)
      },
      {
        name: 'city',
        defaultValue: user?.address?.city,
        validator: (value: any, values: any) =>
          addressValidation.city(value, values, strings)
      },
      {
        name: 'email',
        defaultValue: user?.email,
        validator: (value?: string) => {
          if (readonlyFields?.email) return undefined
          const trimmed = (value ?? '').trim()
          if (!trimmed)
            return (
              strings?.completeTheGivenName ??
              ('Vous devez renseigner le mail' as string)
            )
          if (!emailRegex.test(trimmed))
            return (
              strings?.enterAValidEmail ??
              "L'email renseigner n'est pas correcte"
            )
          return undefined
        }
      },
      {
        name: 'phone',
        defaultValue: user?.phone,
        validator: (value?: string) => {
          if (readonlyFields?.phone) return undefined
          const trimmed = (value ?? '').trim()
          if (trimmed && trimmed.length !== 10)
            return (
              strings?.enterAValidPhone ??
              'Le numéro de téléphone doit contenir dix chiffres'
            )
          return undefined
        }
      },
      {
        name: 'roles',
        defaultValue: multipleRoles
          ? user?.roles?.assignedRoles
          : user?.roles?.assignedRoles[0],
        validator: (value?: string | string[]) => {
          if (readonlyFields?.roles) return undefined
          if (!value)
            return strings?.chooseTheRole ?? 'Vous devez renseigner le rôle'
          return undefined
        }
      },
      {
        name: 'memberOf',
        defaultValue: user?.memberOf?.id ?? organizationId
      },
      ...(!isUpdate && !readonly
        ? [
            {
              name: 'sendEmailLink',
              defaultValue: true
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
      multipleRoles
    ]
  )

  const onSubmitMemoized = useCallback(
    async (values: FlatUser) => {
      if (onSubmit) {
        onSubmit({
          ...FlatUserToUser(values, multipleRoles),
          id: user?.id ?? ''
        })
      }
    },
    [onSubmit, user, multipleRoles]
  )

  const formState = useFormWithPartialFields({
    fields: partialFields,
    onSubmit: onSubmitMemoized,
    formikConfig: {
      enableReinitialize: true
    }
  })

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
      {
        key: 'street',
        name: 'street',
        type: 'textfield',
        label: strings?.street ?? 'Addresse (facultatif)',
        textFieldProps: {
          readonly: readonlyFields?.address
        }
      },
      {
        key: 'postalCode',
        name: 'postalCode',
        type: 'textfield',
        label: strings?.postalCode ?? 'Code postal (facultatif)',
        textFieldProps: {
          textFieldType: 'number',
          readonly: readonlyFields?.address
        }
      },
      {
        key: 'city',
        name: 'city',
        type: 'textfield',
        label: strings?.city ?? 'Ville (facultatif)',
        textFieldProps: {
          readonly: readonlyFields?.address
        }
      },
      {
        key: 'email',
        name: 'email',
        type: 'textfield',
        label: strings?.email ?? 'Adresse mail',
        textFieldProps: {
          textFieldType: 'email',
          readonly: readonlyFields?.email,
          onBlur: async () => {
            if (user?.email !== formState.values.email && checkEmailValidity) {
              const isValid = await checkEmailValidity(formState.values.email)
              if (isValid === true) {
                formState.setFieldError(
                  'email',
                  strings?.emailAlreadyUsed ?? 'Cet email est déjà utilisé'
                )
              }
            }
          }
        }
      },
      {
        key: 'phone',
        name: 'phone',
        type: 'textfield',
        label: strings?.phone ?? 'Numéro de téléphone (facultatif)',
        textFieldProps: {
          textFieldType: 'number',
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
    formState.values.email,
    user?.email
  ])

  const finalFields = useDeletableForm({
    initialFields: userForm,
    blockedFields: blockedFields
  })

  useEffect(() => {
    const element = SubmitButtonRef?.current
    if (element && !readonly) {
      element.onclick = formState.submitForm
    }
  }, [SubmitButtonRef?.current, formState.submitForm, readonly])

  return (
    <Stack
      {...other}
      className={cx('AruiUserFactory-root', className)}
      ref={ref}
      flexDirection={width < 450 ? 'column' : 'row'}
      justifyContent='center'
      sx={{
        width: '100%',
        gap: (theme) => (width < 450 ? theme.spacing(3) : theme.spacing(12))
      }}
    >
      <UserSummary
        onlyAvatar={width < 450}
        fullName={`${formState.values.givenName ?? ''} ${
          formState.values.familyName ?? ''
        }`}
        roles={formState.values.roles}
        rolesOptions={readonlyRolesOptions}
      />
      <Stack
        sx={{
          gap: (theme) => theme.spacing(3)
        }}
      >
        <Form
          className='AruiUserFactory-form'
          fields={finalFields}
          formState={formState}
          isLoading={isLoading}
          readonly={readonly}
          sx={{
            width: '100%',
            flexGrow: 1,
            maxWidth: '450px'
          }}
        />
        {formExtension}
      </Stack>
    </Stack>
  )
}
