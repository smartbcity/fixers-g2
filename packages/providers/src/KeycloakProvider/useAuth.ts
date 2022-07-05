import { useKeycloak } from '@react-keycloak/web'
import { useCallback, useMemo } from 'react'
import { KeycloakInstance, KeycloakTokenParsed } from 'keycloak-js'

export type CommonUser = {
  id: string
  email: string
  organizationId?: string
  firstName: string
  lastName: string
}

type ComputeRolesServicesNames<Roles extends string> = {
  [key in Roles]: `is_${key}`
}

type RolesServicesNames<Roles extends string> =
  ComputeRolesServicesNames<Roles>[keyof ComputeRolesServicesNames<Roles>]

type RolesServices<Roles extends string> = {
  [K in RolesServicesNames<Roles>]: () => boolean
}

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
   * get the common user informations from the token parsed
   * @return {User | undefined} return the user or undefined if not authenticated
   */
  getUser: () => CommonUser | undefined

  /**
   * will check if the user has the role you passed in parameter in his assigned roles
   * @return {boolean}
   */
  hasRole: (role: Roles) => boolean

  /**
   * It will return the principale role of the user. This function only works if you have construct the array role in the correct order (from the most important to the less important)
   * @return {Roles | undefined} return the role or undefined if not authenticated
   */
  getUserPrincipalRole: () => Roles | undefined
} & RolesServices<Roles> &
  Additionnals

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

export interface KeycloakWithRoles<Roles extends string = string>
  extends KeycloakInstance {
  tokenParsed?: KeycloakTokenParsedWithRoles<Roles>
  hasRealmRole: (role: Roles) => boolean
}

export interface Auth<
  Additionnals extends AuthServiceAdditionnal = {},
  Roles extends string = string
> {
  service: AuthService<Additionnals, Roles>
  keycloak: KeycloakWithRoles<Roles>
}

function useAuth<AdditionnalServices, Roles extends string = string>(
  roles: Roles[],
  additionnalServices: KeycloackService<AdditionnalServices, Roles>
): Auth<AuthServiceAdditionnal<AdditionnalServices>, Roles>

function useAuth<Roles extends string = string>(roles: Roles[]): Auth<{}, Roles>

function useAuth<
  AdditionnalServices = undefined,
  Roles extends string = string
>(
  roles: Roles[],
  additionnalServices?: KeycloackService<AdditionnalServices, Roles>
): Auth<AuthServiceAdditionnal<AdditionnalServices>, Roles> {
  const { keycloak } = useKeycloak()

  const keycloakWithRoles: KeycloakWithRoles<Roles> = useMemo(
    () => keycloak as KeycloakWithRoles<Roles>,
    [keycloak]
  )

  const getUserPrincipalRole = useCallback((): Roles | undefined => {
    const userRoles = keycloakWithRoles.tokenParsed?.roles?.assignedRoles ?? []
    for (let role in roles) {
      if (userRoles.includes(role)) {
        return role as Roles
      }
    }
    return
  }, [keycloakWithRoles, roles])

  const hasRole = useCallback(
    (role: Roles): boolean => {
      const userRoles =
        keycloakWithRoles.tokenParsed?.roles?.assignedRoles ?? []
      return userRoles.includes(role)
    },
    [keycloakWithRoles]
  )

  const getUserId = useCallback(
    // @ts-ignore
    (): string | undefined => keycloakWithRoles.tokenParsed?.sub,
    [keycloakWithRoles]
  )

  const getUser = useCallback(
    // @ts-ignore
    (): CommonUser | undefined => {
      if (!keycloakWithRoles.authenticated) return
      return {
        //@ts-ignore
        id: keycloakWithRoles.tokenParsed?.sub,
        //@ts-ignore
        email: keycloakWithRoles.tokenParsed?.email,
        //@ts-ignore
        organizationId: keycloakWithRoles.tokenParsed?.memberOf,
        //@ts-ignore
        firstName: keycloakWithRoles.tokenParsed?.given_name,
        //@ts-ignore
        lastName: keycloakWithRoles.tokenParsed?.family_name
      }
    },
    [keycloakWithRoles]
  )

  const rolesServices: RolesServices<Roles> = useMemo(() => {
    const object: RolesServices<Roles> = {} as RolesServices<Roles>
    for (let role in roles) {
      const fn = () => hasRole(role as Roles)
      object[`is_${role}`] = fn
    }
    return object
  }, [hasRole, roles])

  const service: AuthService<{}, Roles> = useMemo(
    () => ({
      getUserId: getUserId,
      hasRole: hasRole,
      getUser: getUser,
      getUserPrincipalRole: getUserPrincipalRole,
      ...rolesServices
    }),
    [hasRole, getUserId, getUser, getUserPrincipalRole, rolesServices]
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
    }, [additionnalServices, keycloakWithRoles, hasRole, roles])

  return {
    service: Object.assign(service, additionnals),
    keycloak: keycloakWithRoles
  }
}

export { useAuth }
export default useAuth
