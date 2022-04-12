import React, { useCallback } from 'react'
import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'
import { UserId, UserResetPasswordCommand } from '../../Domain'
import {
  UserResetPasswordForm,
  UserResetPasswordFormProps
} from './UserResetPasswordForm'
import { useResetUserPassword } from '../../Api'

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
  const resetUserPassword = useResetUserPassword()
  const handleResetPasswordSubmit = useCallback(
    async (cmd: UserResetPasswordCommand) => {
      const result = await resetUserPassword(cmd)
      return !!result
    },
    [useResetUserPassword]
  )

  return (
    <UserResetPasswordForm
      userId={userId}
      onSubmit={handleResetPasswordSubmit}
      {...other}
    />
  )
}
