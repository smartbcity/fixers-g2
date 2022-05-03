import { cx } from '@emotion/css'
import { Stack, StackProps, styled } from '@mui/material'
import {
  Form,
  FormAction,
  FormField,
  FormPartialField,
  Option,
  useFormWithPartialFields
} from '@smartb/g2-forms'
import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { FlatUser, FlatUserToUser, User } from '../../Domain'
import { addressValidation } from '../../../Commons'
import { OrganizationId, OrganizationRef } from '../../../Organization'

const StyledStack = styled(Stack)({
  '& input::-webkit-outer-spin-button, input::-webkit-inner-spin-button': {
    WebkitAppearance: 'none',
    appearance: 'none',
    margin: 0
  },
  '& input[type=number]': {
    MozAppearance: 'textfield'
  },
  '& .mainFormLeft': {
    marginRight: '30px',
    width: '260px'
  },
  '& .mainFormRight': {
    width: '300px'
  },
  '& .MuiInputLabel-root': {
    whiteSpace: 'break-spaces'
  },
  '& .AruiUserFactory-submitForm': {
    marginTop: '20px'
  },
  '& .AruiUserFactory-sendEmailLink': {
    margin: '20px 0',
    marginTop: '30px'
  }
})

export type Validated = boolean

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/i

export type ReadonlyFields = {
  [k in keyof User]?: boolean
}

export interface UserFactoryClasses {
  leftForm?: string
  rightForm?: string
  actionsContainer?: string
}

export interface UserFactoryStyles {
  leftForm?: React.CSSProperties
  rightForm?: React.CSSProperties
  actionsContainer?: React.CSSProperties
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
   * The label placed in the submit button
   * @default 'Valider'
   */
  submitButtonLabel?: string
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
   * The organizations refs needed to make the orgnization select
   */
  organizationsRefs?: OrganizationRef[]
  /**
   * The roles options needed to make the roles select.
   * The default role selected in the form will be the first of the list
   */
  rolesOptions?: Option[]
  /**
   * The organizationId of the user. Needed if you want to preSelect it when you are creating a user
   */
  organizationId?: OrganizationId
  /**
   * Use this prop if you want only some fields to be readonly
   */
  readonlyFields?: ReadonlyFields
  /**
   * The classes applied to the different part of the component
   */
  classes?: UserFactoryClasses
  /**
   * The styles applied to the different part of the component
   */
  styles?: UserFactoryStyles
}

export type UserFactoryProps = MergeMuiElementProps<
  StackProps,
  UserFactoryBasicProps
>

export const UserFactory = (props: UserFactoryProps) => {
  const {
    user,
    onSubmit,
    submitButtonLabel = 'Valider',
    classes,
    styles,
    isUpdate = false,
    className,
    readonly = false,
    organizationsRefs,
    rolesOptions,
    organizationId,
    readonlyFields,
    ...other
  } = props

  const [feedback, setFeedback] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    setFeedback(undefined)
  }, [onSubmit])

  const partialFields = useMemo(
    (): FormPartialField[] => [
      {
        name: 'givenName',
        defaultValue: user?.givenName,
        validator: (value?: string | number) => {
          const string = String(value).trim()
          if (!string || !value)
            return "Vous devez renseigner le prénom de l'utilisateur" as string
          return undefined
        }
      },
      {
        name: 'familyName',
        defaultValue: user?.familyName,
        validator: (value?: string | number) => {
          const string = String(value).trim()
          if (!string || !value)
            return "Vous devez renseigner le nom de famille de l'utilisateur" as string
          return undefined
        }
      },
      {
        name: 'street',
        defaultValue: user?.address?.street,
        validator: addressValidation.street
      },
      {
        name: 'postalCode',
        defaultValue: user?.address?.postalCode,
        validator: addressValidation.postalCode
      },
      {
        name: 'city',
        defaultValue: user?.address?.city,
        validator: addressValidation.city
      },
      {
        name: 'email',
        defaultValue: user?.email,
        validator: (value?: string) => {
          const trimmed = (value ?? '').trim()
          if (!trimmed)
            return "Vous devez renseigner le mail de l'utilisateur" as string
          if (!emailRegex.test(trimmed))
            return "L'email renseigner n'est pas correcte"
          return undefined
        }
      },
      {
        name: 'phone',
        defaultValue: user?.phone,
        validator: (value?: string) => {
          const trimmed = (value ?? '').trim()
          if (trimmed && trimmed.length !== 10)
            return 'Le numéro de téléphone doit contenir dix chiffres'
          return undefined
        }
      },
      {
        name: 'role',
        defaultValue: user?.roles.assignedRoles ?? [
          (rolesOptions ?? [])[0]?.key
        ]
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
    [user, isUpdate, rolesOptions, readonly, organizationId]
  )

  const onSubmitMemoized = useCallback(
    async (values: FlatUser) => {
      if (onSubmit) {
        const feedback = await onSubmit({
          ...FlatUserToUser(values),
          id: user?.id ?? ''
        })
        setFeedback(feedback)
      }
    },
    [onSubmit, user]
  )

  const formState = useFormWithPartialFields({
    fields: partialFields,
    onSubmit: onSubmitMemoized,
    formikConfig: {
      enableReinitialize: true
    }
  })

  const leftForm = useMemo(
    (): FormField[] => [
      {
        key: 'givenName',
        name: 'givenName',
        type: 'textfield',
        label: 'Prénom',
        textFieldProps: {
          disabled: readonly || readonlyFields?.givenName
        }
      },
      {
        key: 'familyName',
        name: 'familyName',
        type: 'textfield',
        label: 'Nom de Famille',
        textFieldProps: {
          disabled: readonly || readonlyFields?.familyName
        }
      },
      {
        key: 'street',
        name: 'street',
        type: 'textfield',
        label: 'Addresse (facultatif)',
        textFieldProps: {
          disabled: readonly || readonlyFields?.address
        }
      },
      {
        key: 'postalCode',
        name: 'postalCode',
        type: 'textfield',
        label: 'Code postal (facultatif)',
        textFieldProps: {
          textFieldType: 'number',
          disabled: readonly || readonlyFields?.address
        }
      },
      {
        key: 'city',
        name: 'city',
        type: 'textfield',
        label: 'Ville (facultatif)',
        textFieldProps: {
          disabled: readonly || readonlyFields?.address
        }
      }
    ],
    [readonly, readonlyFields]
  )

  const rightForm = useMemo((): FormField[] => {
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
        key: 'email',
        name: 'email',
        type: 'textfield',
        label: 'Adresse mail',
        textFieldProps: {
          textFieldType: 'email',
          disabled: readonly || readonlyFields?.email
        }
      },
      {
        key: 'phone',
        name: 'phone',
        type: 'textfield',
        label: 'Numéro de téléphone (facultatif)',
        textFieldProps: {
          textFieldType: 'number',
          disabled: readonly || readonlyFields?.phone
        }
      },
      ...(rolesOptions
        ? [
            {
              key: 'role',
              name: 'role',
              label: 'Role',
              type: 'select',
              selectProps: {
                options: rolesOptions,
                disabled: readonly || readonlyFields?.roles,
                multiple: true
              }
            } as FormField
          ]
        : []),
      ...(orgsOptions || organizationId
        ? [
            {
              key: 'memberOf',
              name: 'memberOf',
              label: 'Organisation',
              type: 'select',
              selectProps: {
                options: orgsOptions,
                disabled: readonly || readonlyFields?.memberOf
              }
            } as FormField
          ]
        : []),
      ...(!isUpdate && !readonly
        ? [
            {
              key: 'sendEmailLink',
              name: 'sendEmailLink',
              type: 'checkbox',
              label: "Envoyer un lien d'invitation par mail",
              checkBoxProps: {
                className: 'AruiUserFactory-sendEmailLink',
                disabled: readonly || readonlyFields?.sendEmailLink
              }
            } as FormField
          ]
        : [])
    ]
  }, [isUpdate, rolesOptions, organizationsRefs, readonly, organizationId])

  const actions = useMemo(
    (): FormAction[] =>
      readonly
        ? []
        : [
            {
              key: 'SubmitForm',
              label: submitButtonLabel,
              success: feedback !== undefined && feedback,
              fail: feedback !== undefined && !feedback,
              onClick: formState.submitForm,
              className: 'AruiUserFactory-submitForm'
            }
          ],
    [submitButtonLabel, formState.submitForm, feedback, readonly]
  )

  return (
    <StyledStack
      width='100%'
      maxWidth='650px'
      flexWrap='wrap'
      justifyContent='space-between'
      direction='row'
      className={cx('AruiUserFactory-root', className)}
      {...other}
    >
      <Form
        className={cx(
          'AruiUserFactory-leftForm',
          'mainFormLeft',
          classes?.leftForm
        )}
        style={styles?.leftForm}
        fields={leftForm}
        formState={formState}
      />
      <Form
        className={cx(
          'AruiUserFactory-rightForm',
          'mainFormRight',
          classes?.rightForm
        )}
        style={styles?.rightForm}
        fields={rightForm}
        formState={formState}
        actions={actions}
        actionsStackProps={{
          direction: 'row',
          justifyContent: 'flex-end',
          width: '100%',
          className: cx(
            'AruiUserFactory-actionsContainer',
            classes?.actionsContainer
          ),
          style: styles?.actionsContainer
        }}
      />
    </StyledStack>
  )
}
