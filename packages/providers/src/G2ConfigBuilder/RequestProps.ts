import { useMemo } from 'react'
import { fsConfig, i2Config, platFormConfig } from '.'
import { useAuth } from '../KeycloakProvider'

export type RequestProps = {
  url: string
  jwt?: string
}

export const useNoAuthenticatedRequest = (
  endpoint: 'plateform' | 'im' | 'fs' = 'plateform'
): RequestProps => {
  return useMemo(
    () => ({
      url:
        endpoint === 'fs'
          ? fsConfig().url
          : endpoint === 'im'
          ? i2Config().url
          : platFormConfig().url
    }),
    []
  )
}

export const useAuthenticatedRequest = (
  endpoint: 'plateform' | 'im' | 'fs' = 'plateform'
): RequestProps => {
  const auth = useAuth()
  return useMemo(
    () => ({
      url:
        endpoint === 'fs'
          ? fsConfig().url
          : endpoint === 'im'
          ? i2Config().url
          : platFormConfig().url,
      jwt: auth.keycloak.token
    }),
    [auth.keycloak.token]
  )
}
