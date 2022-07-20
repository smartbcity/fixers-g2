import { cx } from '@emotion/css'
import { Stack, StackProps } from '@mui/material'
import {
  Form,
  FormField,
  FormPartialField,
  useFormWithPartialFields
} from '@smartb/g2-forms'
import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'
import React, { useCallback, useEffect, useMemo } from 'react'
import { UserId, UserUpdatePasswordCommand } from '../../Domain'
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
   * @default 'Nouveau mot de passe'
   */
  newPassword?: string
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
   * The ref of the submit element
   */
  SubmitButtonRef?: React.RefObject<HTMLElement | undefined>
  /**
   * The submit event
   * @param user command to reset a password
   * @returns true if the Api call has been successfull
   */
  onSubmit?: (cmd: UserUpdatePasswordCommand) => Promise<boolean> | boolean
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
    classes,
    styles,
    className,
    strings,
    SubmitButtonRef,
    ...other
  } = props

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

  useEffect(() => {
    const element = SubmitButtonRef?.current
    if (element) {
      element.onclick = formState.submitForm
    }
  }, [SubmitButtonRef?.current, formState.submitForm])

  const form = useMemo(
    (): FormField[] => [
      {
        key: 'password',
        name: 'password',
        type: 'textfield',
        label: strings?.newPassword ?? 'Nouveau mot de passe',
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
      />
    </Stack>
  )
}
