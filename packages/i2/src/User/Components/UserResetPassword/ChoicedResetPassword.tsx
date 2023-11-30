import { Box, InputLabel, Typography } from '@mui/material'
import { Action, Link } from '@smartb/g2-components'
import { PopUp } from '@smartb/g2-layout'
import { i2Config, useAuth } from '@smartb/g2-providers'
import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { useUserResetPassword } from '../../Api'
import {
  UserResetPasswordFormAutomated,
  UserResetPasswordFormAutomatedProps
} from './UserResetPasswordFormAutomated'

export interface ChoicedResetPasswordStrings {
  /**
   * @default 'Mot de passe'
   */
  passwordLabel?: string
  /**
   * @default 'Changer le mot de passe'
   */
  passwordLink?: string
  /**
   * @default 'Changement de mot de passe'
   */
  passwordTitle?: string
  /**
   * @default "Un email pour effectuer le changement de mot de passe va être envoyé à l'adresse email de votre compte."
   */
  passwordEmail?: string
  /**
   * @default "Annuler"
   */
  cancelButton?: string
  /**
   * @default "Confirmer"
   */
  confirmButton?: string
}

export interface ChoicedResetPasswordBasicProps extends BasicProps {
  /**
   * The type of the reset password
   *
   * @defautl 'email'
   */
  resetPasswordType?: 'email' | 'forced'
  /**
   * The prop to use to add custom translation to the component
   */
  choicedResetPasswordstrings?: ChoicedResetPasswordStrings
}

export type ChoicedResetPasswordProps = MergeMuiElementProps<
  UserResetPasswordFormAutomatedProps,
  ChoicedResetPasswordBasicProps
>

export const ChoicedResetPassword = (props: ChoicedResetPasswordProps) => {
  const {
    resetPasswordType = 'email',
    userId,
    userUpdatePasswordOptions,
    choicedResetPasswordstrings,
    ...other
  } = props
  const [open, setOpen] = useState(false)
  const [mutating, setMutating] = useState(false)
  const [error, setError] = useState(false)
  const submitRef = useRef<HTMLButtonElement>(null)
  const { keycloak } = useAuth()

  const onToggle = useCallback(() => {
    setOpen((open) => !open)
  }, [])

  const onSuccess = useCallback(
    (data, varaibles, context) => {
      setMutating(false)
      onToggle()
      userUpdatePasswordOptions?.onSuccess &&
        userUpdatePasswordOptions.onSuccess(data, varaibles, context)
    },
    [onToggle, userUpdatePasswordOptions?.onSuccess]
  )

  const onMutate = useCallback(
    (varaibles) => {
      setMutating(true)
      userUpdatePasswordOptions?.onMutate &&
        userUpdatePasswordOptions.onMutate(varaibles)
    },
    [userUpdatePasswordOptions?.onMutate]
  )

  const onError = useCallback(
    (error, varaibles, context) => {
      setMutating(false)
      setError(true)
      userUpdatePasswordOptions?.onError &&
        userUpdatePasswordOptions.onError(error, varaibles, context)
    },
    [userUpdatePasswordOptions?.onError]
  )

  const userResetPassword = useUserResetPassword({
    apiUrl: i2Config().url,
    jwt: keycloak.token,
    options: {
      ...userUpdatePasswordOptions,
      onMutate,
      onSuccess,
      onError
    }
  })

  const actions = useMemo(
    (): Action[] => [
      {
        label: choicedResetPasswordstrings?.cancelButton ?? 'Annuler',
        key: 'cancelPopupButton',
        onClick: onToggle,
        variant: 'text'
      },
      {
        label: choicedResetPasswordstrings?.confirmButton ?? 'Confirmer',
        key: 'confirmPopupButton',
        sx: {},
        ref: submitRef,
        isLoading: mutating,
        fail: error,
        onClick: () => {
          if (resetPasswordType === 'email') {
            userResetPassword.mutate({ id: userId })
          }
        }
      }
    ],
    [onToggle, mutating, error, choicedResetPasswordstrings, userId]
  )

  return (
    <Box>
      <InputLabel>
        {choicedResetPasswordstrings?.passwordLabel ?? 'Mot de passe'}
      </InputLabel>
      <Link onClick={onToggle} sx={{ color: '#1E88E5', cursor: 'pointer' }}>
        {choicedResetPasswordstrings?.passwordLink ?? 'Changer le mot de passe'}
      </Link>
      <PopUp onClose={onToggle} open={open} actions={actions}>
        <Typography variant='h6' style={{ marginBottom: '15px' }}>
          {choicedResetPasswordstrings?.passwordTitle ??
            'Changement de mot de passe'}
        </Typography>
        {resetPasswordType === 'email' ? (
          <Typography variant='body1'>
            {choicedResetPasswordstrings?.passwordEmail ??
              "Un email pour effectuer le changement de mot de passe va être envoyé à l'adresse email de votre compte."}
          </Typography>
        ) : (
          <UserResetPasswordFormAutomated
            userUpdatePasswordOptions={{
              ...userUpdatePasswordOptions,
              onMutate,
              onSuccess,
              onError
            }}
            SubmitButtonRef={submitRef}
            userId={userId}
            {...other}
          />
        )}
      </PopUp>
    </Box>
  )
}
