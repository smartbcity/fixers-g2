import { keycloakAuth } from '@smartb/g2-providers'
import { i2Config } from '../../Config'
import { UserResetPasswordCommand, UserResetPasswordResult } from '../Domain'
import { useCallback } from 'react'
import { request } from 'utils'

export const useResetUserPassword = () => {
  return useCallback(
    async (
      cmd?: UserResetPasswordCommand
    ): Promise<UserResetPasswordResult | undefined> => {
      const res = await request<UserResetPasswordResult[]>({
        url: `${i2Config()?.i2?.userUrl}/resetUserPassword`,
        method: 'POST',
        body: JSON.stringify(cmd),
        jwt: keycloakAuth?.instance?.token
      })
      if (res) {
        return res[0]
      } else {
        return undefined
      }
    },
    []
  )
}

export const UserApi = { resetUserPassword: useResetUserPassword }
