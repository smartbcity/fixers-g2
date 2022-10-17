import { cx } from '@emotion/css'
import { Option } from '@smartb/g2-forms'
import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'
import React, { useMemo } from 'react'
import { User } from '../../Domain'
import { AdressValidationStrings } from '../../../Commons'
import { OrganizationId, OrganizationRef } from '../../../Organization'
import { Stack, StackProps } from '@mui/material'
import { useElementSize } from '@mantine/hooks'
import { UserSummary } from '../UserSummary'
import { useDeletableForm } from '../../../Commons/useDeletableForm'
import {
  FormComposable,
  FormComposableField,
  FormComposableState
} from '@smartb/g2-composable'
import {
  userFieldsName,
  useUserFormFields,
  UseUserFormFieldsProps
} from './useUserFormFields'

export type Validated = boolean

export interface UserFactoryStrings extends AdressValidationStrings {
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
    UseUserFormFieldsProps<User> {
  /**
   * The base user
   */
  user?: User
  /**
   * The state of the form obtainable by calling useUserFormState
   */
  formState: FormComposableState
  /**
   * The additional fields to add to the form
   */
  additionalFields?: FormComposableField[]
  /**
   * The name of the field you want to block in the form state
   */
  blockedFields?: userFieldsName[]
  /**
   * The organizations refs needed to make the orgnization select
   */
  organizationsRefs?: OrganizationRef[]
  /**
   * Use This props if you have roles that you don't want the user to be able to select but able to see in readonly use this prop
   */
  readonlyRolesOptions?: Option[]
  /**
   * If you want the organization to transform to a link
   */
  getOrganizationUrl?: (organizationId: OrganizationId) => string
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
    className,
    readonly = false,
    formState,
    organizationsRefs,
    additionalFields,
    organizationId,
    isLoading = false,
    strings,
    getOrganizationUrl,
    blockedFields = [],
    readonlyRolesOptions,
    multipleRoles = true,
    checkEmailValidity,
    formExtension,
    fieldsOverride,
    ...other
  } = props

  const { ref, width } = useElementSize()

  const { fieldsArray } = useUserFormFields(props)
  delete other.isUpdate

  const definitivBlockedFields = useMemo(
    (): userFieldsName[] => [
      //@ts-ignore
      ...(!fieldsOverride?.roles?.memberOf?.options || organizationId
        ? (['memberOf'] as userFieldsName[])
        : []),
      //@ts-ignore
      ...(!fieldsOverride?.roles?.params?.options
        ? (['roles'] as userFieldsName[])
        : []),
      //@ts-ignore
      ...(!isUpdate && !readonly
        ? (['sendEmailLink'] as userFieldsName[])
        : []),
      ...blockedFields
    ],
    [blockedFields, fieldsOverride, organizationId]
  )

  const finalFields = useDeletableForm<FormComposableField<string, {}>>({
    initialFields: fieldsArray,
    additionalFields: additionalFields,
    blockedFields: definitivBlockedFields
  })

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
        <FormComposable
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
