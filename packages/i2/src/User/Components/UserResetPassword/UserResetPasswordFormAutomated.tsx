import React, { useCallback } from 'react'
import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'
import {
  UserId,
  UserResetPasswordCommand,
  UserResetPasswordResult
} from '../../Domain'
import {
  UserResetPasswordForm,
  UserResetPasswordFormProps
} from './UserResetPasswordForm'
import { UseMutationResult } from 'react-query'

export interface UserResetPasswordFormAutomatedBasicProps extends BasicProps {
  /**
   * The id of the user
   */
  userId: UserId
  /**
   * The result of the hook `useResetUserPassword`
   */
  resetUserPassword: UseMutationResult<
    UserResetPasswordResult,
    unknown,
    UserResetPasswordCommand,
    unknown
  >
}

export type UserResetPasswordFormAutomatedProps = MergeMuiElementProps<
  UserResetPasswordFormProps,
  UserResetPasswordFormAutomatedBasicProps
>

export const UserResetPasswordFormAutomated = (
  props: UserResetPasswordFormAutomatedProps
) => {
  const { userId, resetUserPassword, ...other } = props

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
