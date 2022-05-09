import { cx } from '@emotion/css'
import { Stack, StackProps } from '@mui/material'
import {
  Form,
  FormAction,
  FormField,
  FormPartialField,
  useFormWithPartialFields
} from '@smartb/g2-forms'
import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { UserId, UserResetPasswordCommand } from '../../Domain'
import { FormikHelpers } from 'formik'
import {
  passwordCheckValidation,
  passwordValidation,
  PasswordValidationStrings
} from '../../Validation/password'

export type Validated = boolean

export interface UserResetPasswordFormClasses {
  form: string
}

export interface UserResetPasswordFormStyles {
  form: React.CSSProperties
}

export interface UserResetPasswordStrings extends PasswordValidationStrings {
  /**
   * @default 'Enregister nouveau mot de passe'
   */
  submitButtonLabel?: string
  /**
   * @default 'Mot de passe'
   */
  password?: string
  /**
   * @default 'Vérification du mot de passe'
   */
  passwordCheck?: string
}

export interface UserResetPasswordFormBasicProps extends BasicProps {
  /**
   * The base user
   */
  userId: UserId
  /**
   * The submit event
   * @param user command to reset a password
   * @returns true if the Api call has been successfull
   */
  onSubmit?: (cmd: UserResetPasswordCommand) => Promise<boolean> | boolean
  /**
   * The label placed in the submit button
   * @default 'Valider'
   */
  submitButtonLabel?: string
  /**
   * The classes applied to the different part of the component
   */
  classes?: UserResetPasswordFormClasses
  /**
   * The styles applied to the different part of the component
   */
  styles?: UserResetPasswordFormStyles
  /**
   * The prop to use to add custom translation to the component
   */
  strings?: UserResetPasswordStrings
}

export type UserResetPasswordFormProps = MergeMuiElementProps<
  StackProps,
  UserResetPasswordFormBasicProps
>

export const UserResetPasswordForm = (props: UserResetPasswordFormProps) => {
  const {
    userId,
    onSubmit,
    submitButtonLabel = 'Enregister nouveau mot de passe',
    classes,
    styles,
    className,
    strings,
    ...other
  } = props

  const [feedback, setFeedback] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    setFeedback(undefined)
  }, [onSubmit])

  const partialFields = useMemo(
    (): FormPartialField[] => [
      {
        name: 'password',
        validator: (value) => passwordValidation(value, strings)
      },
      {
        name: 'passwordCheck',
        validator: (value, values) =>
          passwordCheckValidation(value, values, strings)
      }
    ],
    [strings]
  )

  const onSubmitMemoized = useCallback(
    async (
      values: { [key: string]: any },
      formikHelpers: FormikHelpers<any>
    ) => {
      if (onSubmit) {
        const feedback = await onSubmit({
          id: userId,
          password: values.password
        })
        setFeedback(feedback)
        if (feedback) {
          formikHelpers.resetForm()
        }
      }
    },
    [onSubmit, userId]
  )

  const formState = useFormWithPartialFields({
    fields: partialFields,
    onSubmit: onSubmitMemoized,
    formikConfig: {
      enableReinitialize: true
    }
  })

  const form = useMemo(
    (): FormField[] => [
      {
        key: 'password',
        name: 'password',
        type: 'textfield',
        label: strings?.password ?? 'Mot de passe',
        textFieldProps: {
          textFieldType: 'password'
        }
      },
      {
        key: 'passwordCheck',
        name: 'passwordCheck',
        type: 'textfield',
        label: strings?.passwordCheck ?? 'Vérification du mot de passe',
        textFieldProps: {
          textFieldType: 'password'
        }
      }
    ],
    []
  )

  const actions = useMemo(
    (): FormAction[] => [
      {
        key: 'SubmitForm',
        label: strings?.submitButtonLabel ?? 'Enregister nouveau mot de passe',
        success: feedback !== undefined && feedback,
        fail: feedback !== undefined && !feedback,
        onClick: formState.submitForm,
        className: 'AruiUserResetPassword-submitForm'
      }
    ],
    [submitButtonLabel, formState.submitForm, feedback]
  )

  return (
    <Stack
      flexWrap='wrap'
      justifyContent='space-between'
      direction='column'
      className={cx('AruiUserResetPassword-root', className)}
      {...other}
    >
      <Form
        className={cx(
          'AruiUserResetPassword-form',
          'mainFormLeft',
          classes?.form
        )}
        style={styles?.form}
        fields={form}
        formState={formState}
        actions={actions}
      />
    </Stack>
  )
}
