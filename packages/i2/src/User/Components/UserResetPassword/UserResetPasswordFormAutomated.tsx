import React, { useCallback } from 'react'
import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'
import { UserId, UserResetPasswordCommand } from '../../Domain'
import {
  UserResetPasswordForm,
  UserResetPasswordFormProps
} from './UserResetPasswordForm'
import { useResetUserPassword } from '../..'
import { i2Config, useAuth } from '@smartb/g2-providers'

export interface UserResetPasswordFormAutomatedBasicProps extends BasicProps {
  /**
   * The id of the user
   */
  userId: UserId
}

export type UserResetPasswordFormAutomatedProps = MergeMuiElementProps<
  UserResetPasswordFormProps,
  UserResetPasswordFormAutomatedBasicProps
>

export const UserResetPasswordFormAutomated = (
  props: UserResetPasswordFormAutomatedProps
) => {
  const { userId, ...other } = props

  const { keycloak } = useAuth()

  const resetUserPassword = useResetUserPassword({
    apiUrl: i2Config().userUrl,
    jwt: keycloak.token
  })

  const handleResetPasswordSubmit = useCallback(
    async (cmd: UserResetPasswordCommand) => {
      const result = await resetUserPassword.mutateAsync(cmd)
      return !!result
    },
    [resetUserPassword.mutateAsync]
  )

  return (
    <UserResetPasswordForm
      userId={userId}
      onSubmit={handleResetPasswordSubmit}
      {...other}
    />
  )
}
