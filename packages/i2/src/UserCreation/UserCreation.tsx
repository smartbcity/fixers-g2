import { cx } from '@emotion/css'
import { Stack, StackProps, styled } from '@mui/material'
import {
  Form,
  FormAction,
  FormField,
  FormPartialField,
  useFormWithPartialFields
} from '@smartb/g2-forms'
import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { FlatUser, FlatUserToUser, User } from './types'

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
  '& .AruiUserCreation-submitForm': {
    marginTop: '20px'
  },
  '& .AruiUserCreation-sendEmailLink': {
    margin: '20px 0',
    marginTop: '30px'
  }
})

export type Validated = boolean

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/i

export interface UserCreationClasses {
  leftForm?: string
  rightForm?: string
  actionsContainer?: string
}

export interface UserCreationStyles {
  leftForm?: React.CSSProperties
  rightForm?: React.CSSProperties
  actionsContainer?: React.CSSProperties
}

export interface UserCreationBasicProps extends BasicProps {
  /**
   * The base user
   */
  user?: User
  /**
   * The submit event
   * @param user the complete user object after form validation
   * @returns true if the api call has been successfull
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
   * The classes applied to the different part of the component
   */
  classes?: UserCreationClasses
  /**
   * The styles applied to the different part of the component
   */
  styles?: UserCreationStyles
}

export type UserCreationProps = MergeMuiElementProps<
  StackProps,
  UserCreationBasicProps
>

export const UserCreation = (props: UserCreationProps) => {
  const {
    user,
    onSubmit,
    submitButtonLabel = 'Valider',
    classes,
    styles,
    isUpdate = false,
    className,
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
        defaultValue: user?.address.street,
        validator: (value?: string) => {
          const trimmed = (value ?? '').trim()
          if (!trimmed) return "Vous devez renseigner l'addresse" as string
          return undefined
        }
      },
      {
        name: 'postalCode',
        defaultValue: user?.address.postalCode,
        validator: (value?: string | number) => {
          const string = String(value).trim()
          if (!string || !value)
            return 'Vous devez renseigner le code postal' as string
          if (string.length != 5)
            return 'un code postal doit être composé de 5 chiffres' as string
          return undefined
        }
      },
      {
        name: 'city',
        defaultValue: user?.address.city,
        validator: (value?: string) => {
          const trimmed = (value ?? '').trim()
          if (!trimmed) return 'Vous devez renseigner la ville' as string
          return undefined
        }
      },
      {
        name: 'mail',
        defaultValue: user?.mail,
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
          if (trimmed && trimmed.length != 10)
            return 'Le numéro de téléphone doit contenir dix chiffre'
          return undefined
        }
      },
      {
        name: 'password',
        defaultValue: user?.password,
        validator: (value?: string, values?: any) => {
          const trimmed = (value ?? '').trim()
          const link =
            typeof values['sendEmailLink'] === 'boolean'
              ? values['sendEmailLink']
              : values['sendEmailLink'] === 'true'
          if (link) {
            if (!trimmed && !isUpdate) return undefined
            if (trimmed.length < 8)
              return 'Le mot de passe temporaire doit contenir au moins 8 caractère'
            return undefined
          }
          if (!trimmed && !isUpdate)
            return "Vous devez renseigner le mot de passe de l'utilisateur si vous ne lui envoyez pas de lien" as string
          if (trimmed.length < 8)
            return 'Le mot de passe temporaire doit contenir au moins 8 caractère'
          return undefined
        }
      },
      ...(!isUpdate
        ? [
            {
              name: 'sendEmailLink',
              defaultValue: true
            }
          ]
        : [])
    ],
    [user, isUpdate]
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
        label: 'Prénom'
      },
      {
        key: 'familyName',
        name: 'familyName',
        type: 'textfield',
        label: 'Nom de Famille'
      },
      {
        key: 'street',
        name: 'street',
        type: 'textfield',
        label: 'addresse'
      },
      {
        key: 'postalCode',
        name: 'postalCode',
        type: 'textfield',
        label: 'Code postal',
        textFieldProps: {
          textFieldType: 'number'
        }
      },
      {
        key: 'city',
        name: 'city',
        type: 'textfield',
        label: 'Ville'
      }
    ],
    []
  )

  const rightForm = useMemo(
    (): FormField[] => [
      {
        key: 'mail',
        name: 'mail',
        type: 'textfield',
        label: 'Adresse mail',
        textFieldProps: {
          textFieldType: 'email'
        }
      },
      {
        key: 'phone',
        name: 'phone',
        type: 'textfield',
        label: 'Numéro de téléphone (facultatif)',
        textFieldProps: {
          textFieldType: 'number'
        }
      },
      {
        key: 'password',
        name: 'password',
        type: 'textfield',
        label: "Mot de passe temporaire (obligatoire sans lien d'invitation)"
      },
      ...(!isUpdate
        ? [
            {
              key: 'sendEmailLink',
              name: 'sendEmailLink',
              type: 'checkbox',
              label: "Envoyer un lien d'invitation par mail",
              checkBoxProps: {
                className: 'AruiUserCreation-sendEmailLink'
              }
            } as FormField
          ]
        : [])
    ],
    [isUpdate]
  )

  const actions = useMemo(
    (): FormAction[] => [
      {
        key: 'SubmitForm',
        label: submitButtonLabel,
        success: feedback !== undefined && feedback,
        fail: feedback !== undefined && !feedback,
        onClick: formState.submitForm,
        className: 'AruiUserCreation-submitForm'
      }
    ],
    [submitButtonLabel, formState.submitForm, feedback]
  )

  return (
    <StyledStack
      width='100%'
      maxWidth='650px'
      flexWrap='wrap'
      justifyContent='space-between'
      direction='row'
      className={cx('AruiUserCreation-root', className)}
      {...other}
    >
      <Form
        className={cx(
          'AruiUserCreation-leftForm',
          'mainFormLeft',
          classes?.leftForm
        )}
        style={styles?.leftForm}
        fields={leftForm}
        formState={formState}
      />
      <Form
        className={cx(
          'AruiUserCreation-rightForm',
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
            'AruiUserCreation-actionsContainer',
            classes?.actionsContainer
          ),
          style: styles?.actionsContainer
        }}
      />
    </StyledStack>
  )
}
