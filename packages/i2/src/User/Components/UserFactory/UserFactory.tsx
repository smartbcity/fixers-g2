import { cx } from '@emotion/css'
import { Form, FormField, Option } from '@smartb/g2-forms'
import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'
import React, { useEffect, useMemo } from 'react'
import { FlatUser, User } from '../../Domain'
import { AdressValidationStrings, useAdressFields } from '../../../Commons'
import { OrganizationId, OrganizationRef } from '../../../Organization'
import { Stack, StackProps } from '@mui/material'
import { useElementSize } from '@mantine/hooks'
import { UserSummary } from '../UserSummary'
import { useDeletableForm } from '../../../Commons/useDeletableForm'
import { useUserFormState, UseUserFormStateProps } from './useUserFormState'

export type Validated = boolean

export type ReadOnlyFields = {
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
   * @default "le champ est obligatoire"
   */
  requiredField?: string
  /**
   * @default "Vous devez renseigner le mail"
   */
  completeTheEmail?: string
  /**
   * @default "L'email renseigné n'est pas correct"
   */
  enterAValidEmail?: string
  /**
   * @default "Le numéro de téléphone doit contenir dix chiffres"
   */
  enterAValidPhone?: string

  /**
   * @default 'Cette addresse email est déjà utilisée'
   */
  emailAlreadyUsed?: string
}

export interface UserFactoryBasicProps
  extends BasicProps,
    UseUserFormStateProps<User> {
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
   * The ref of the submit element
   */
  SubmitButtonRef?: React.RefObject<HTMLElement | undefined>
  /**
   * The organizations refs needed to make the orgnization select
   */
  organizationsRefs?: OrganizationRef[]
  /**
   * Use This props if you have roles that you don't want the user to be able to select but able to see in readOnly use this prop
   */
  readOnlyRolesOptions?: Option[]
  /**
   * If you want the organization to transform to a link
   */
  getOrganizationUrl?: (organizationId: OrganizationId) => string
  /**
   * If you want to access the user state from the form use this function
   */
  setUserState?: (user: FlatUser) => void
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
    readOnly = false,
    organizationsRefs,
    rolesOptions,
    organizationId,
    readOnlyFields,
    isLoading = false,
    strings,
    SubmitButtonRef,
    getOrganizationUrl,
    blockedFields,
    readOnlyRolesOptions,
    multipleRoles = true,
    checkEmailValidity,
    formExtension,
    setUserState,
    additionnalValidators,
    ...other
  } = props

  const { ref, width } = useElementSize()

  const { formState, emailLoading, emailValid } = useUserFormState(props)
  delete other.additionalFields

  useEffect(() => {
    setUserState && setUserState(formState.values as FlatUser)
  }, [formState.values, setUserState])

  const { addressFields } = useAdressFields({
    address: user?.address,
    strings,
    additionnalValidators,
    readOnly: readOnlyFields?.address
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
          readOnly: readOnlyFields?.givenName
        }
      },
      {
        key: 'familyName',
        name: 'familyName',
        type: 'textfield',
        label: strings?.familyName ?? 'Nom de famille',
        textFieldProps: {
          readOnly: readOnlyFields?.familyName
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
                readOnly: readOnlyFields?.memberOf,
                getReadOnlyTextUrl: getOrganizationUrl
              }
            } as FormField
          ]
        : []),
      ...(rolesOptions
        ? [
            {
              key: 'roles',
              name: 'roles',
              label: strings?.roles ?? 'Rôle',
              type: 'select',
              selectProps: {
                options:
                  readOnlyFields?.roles === true || readOnly
                    ? readOnlyRolesOptions
                    : rolesOptions,
                readOnly: readOnlyFields?.roles,
                readOnlyType: 'chip',
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
          readOnly: readOnlyFields?.email,
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
          readOnly: readOnlyFields?.phone
        }
      },
      ...(!isUpdate && !readOnly
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
                disabled: readOnlyFields?.sendEmailLink
              }
            } as FormField
          ]
        : [])
    ]
  }, [
    isUpdate,
    rolesOptions,
    organizationsRefs,
    readOnlyFields,
    readOnly,
    organizationId,
    getOrganizationUrl,
    multipleRoles,
    emailLoading,
    emailValid,
    addressFields
  ])

  const finalFields = useDeletableForm({
    initialFields: userForm,
    blockedFields: blockedFields
  })

  useEffect(() => {
    const element = SubmitButtonRef?.current
    if (element && !readOnly) {
      element.onclick = formState.submitForm
    }
  }, [SubmitButtonRef?.current, formState.submitForm, readOnly])

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
        rolesOptions={readOnlyRolesOptions}
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
          readOnly={readOnly}
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
