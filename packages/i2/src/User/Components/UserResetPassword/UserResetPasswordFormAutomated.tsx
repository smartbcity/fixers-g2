import React, { useCallback } from 'react'
import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'
import { UserId, UserResetPasswordCommand } from '../../Domain'
import {
  UserResetPasswordForm,
  UserResetPasswordFormProps
} from './UserResetPasswordForm'
import { useResetUserPassword } from '../..'

export interface UserResetPasswordFormAutomatedBasicProps extends BasicProps {
  /**
   * The Api url where to make the locals Api calls
   */
  apiUrl: string
  /**
   * The token to authorize the Api calls
   */
  jwt?: string
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
  const { userId, apiUrl, jwt, ...other } = props

  const resetUserPassword = useResetUserPassword({
    apiUrl: apiUrl,
    jwt: jwt
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
