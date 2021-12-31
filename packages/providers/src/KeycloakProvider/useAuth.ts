import { useKeycloak } from '@react-keycloak/web'
import { useCallback, useMemo } from 'react'
import { KeycloakInstance, KeycloakTokenParsed } from 'keycloak-js'

type AuthService<
  Additionnals extends AuthServiceAdditionnal = {},
  Roles extends string = string
> = {
  /**
   * get the variable userId from the token parsed
   * @return {string | undefined} return  the id or undefined if not authenticated
   */
  getUserId: () => string | undefined
  /**
   * CheckRounded if the current user has one of the roles given in parameter
   * @param {Roles | string}  roles - The roles that you want to check if the user has them
   * @return {boolean} Return true if the user has one of the roles of if no roles are provided
   */
  isAuthorized: (roles: Roles[]) => boolean
} & Additionnals

type KeycloackInjector<
  Roles extends string = string,
  T = undefined,
  R = any
> = (keycloak: KeycloakWithRoles<Roles>, params?: T) => R

type AuthFnc<T = undefined, R = any> = (params?: T) => R

export type KeycloackService<T = {}, Roles extends string = string> = {
  [K in keyof T]: KeycloackInjector<
    Roles,
    T[K] extends { paramsType: unknown } ? T[K]['paramsType'] : undefined,
    T[K] extends { returnType: unknown } ? T[K]['returnType'] : undefined
  >
}

export type AuthServiceAdditionnal<T = {}> = {
  [K in keyof T]: AuthFnc<
    T[K] extends { paramsType: unknown } ? T[K]['paramsType'] : undefined,
    T[K] extends { returnType: unknown } ? T[K]['returnType'] : undefined
  >
}

interface KeycloakTokenParsedWithRoles<Roles extends string = string>
  extends KeycloakTokenParsed {
  realm_access?: {
    roles: Roles[]
  }
}

interface KeycloakWithRoles<Roles extends string = string>
  extends KeycloakInstance {
  tokenParsed?: KeycloakTokenParsedWithRoles<Roles>
  hasRealmRole: (role: Roles) => boolean
}

interface Auth<
  Additionnals extends AuthServiceAdditionnal = {},
  Roles extends string = string
> {
  service: AuthService<Additionnals, Roles>
  keycloak: KeycloakWithRoles<Roles>
}

function useAuth<AdditionnalServices, Roles extends string = string>(
  additionnalServices: KeycloackService<AdditionnalServices, Roles>
): Auth<AuthServiceAdditionnal<AdditionnalServices>, Roles>

function useAuth<Roles extends string = string>(): Auth<{}, Roles>

function useAuth<
  AdditionnalServices = undefined,
  Roles extends string = string
>(
  additionnalServices?: KeycloackService<AdditionnalServices, Roles>
): Auth<AuthServiceAdditionnal<AdditionnalServices>, Roles> {
  const { keycloak } = useKeycloak()

  const keycloakWithRoles: KeycloakWithRoles<Roles> = useMemo(
    () => keycloak as KeycloakWithRoles<Roles>,
    [keycloak]
  )

  const isAuthorized = useCallback(
    (roles: Roles[]): boolean => {
      if (!roles || roles.length === 0) return true
      let authorization = false
      roles.forEach((r) => {
        const realm = keycloakWithRoles.hasRealmRole(r)
        const resource = keycloakWithRoles.hasResourceRole(r)
        if (realm || resource) authorization = true
      })
      return authorization
    },
    [keycloakWithRoles]
  )

  const getUserId = useCallback(
    // @ts-ignore
    (): string | undefined => keycloakWithRoles.tokenParsed?.userId,
    [keycloakWithRoles]
  )

  const service: AuthService = useMemo(
    () => ({
      getUserId: getUserId,
      isAuthorized: isAuthorized
    }),
    [isAuthorized, getUserId]
  )

  const additionnals: AuthServiceAdditionnal<AdditionnalServices> =
    useMemo(() => {
      const object: AuthServiceAdditionnal<AdditionnalServices> =
        {} as AuthServiceAdditionnal<AdditionnalServices>
      for (let serviceName in additionnalServices) {
        const fn: AuthFnc = (params) =>
          additionnalServices[serviceName.toString()](keycloakWithRoles, params)
        object[serviceName.toString()] = fn
      }
      return object
    }, [additionnalServices, keycloakWithRoles])

  return {
    service: Object.assign(service, additionnals),
    keycloak: keycloakWithRoles
  }
}

export { useAuth }
export default useAuth
