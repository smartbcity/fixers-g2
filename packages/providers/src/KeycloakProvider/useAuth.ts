import { useKeycloak } from '@react-keycloak/web'
import { useCallback, useMemo } from 'react'
import Keycloak, { KeycloakTokenParsed } from 'keycloak-js'

export type AuthedUser = {
  id: string
  email: string
  memberOf?: string
  firstName: string
  fullName: string
  lastName: string
  roles: string[]
}

export type isAuthorized = boolean

export type AuthFunction = <U extends AuthedUser>(
  authedUser: U,
  ...args
) => isAuthorized

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
   * get the authed user informations from the token parsed
   * @return {User | undefined} return the user or undefined if not authenticated
   */
  getUser: () => AuthedUser | undefined

  /**
   * get the user roles from the token parsed
   * @return {Roles[]  | undefined} return the user roles or undefined if not authenticated
   */
  getUserRoles: () => Roles[] | undefined

  /**
   * will check if the user has the role you passed in parameter in his effective roles. If you pass an array of roles, it will return true if the user has at least one of the roles.
   * @return {boolean}
   */
  hasRole: (role: Roles | Roles[]) => boolean

  /**
   * will check if the user has all the roles you passed in parameter in his effective roles.
   * @return {boolean}
   */
  hasAllRoles: (roles: Roles[]) => boolean

  /**
   * will check if the current user is a memeber of the organization.
   * @return {boolean}
   */
  isMemberOf: (organizationId: string) => boolean

  /**
   * It will return the principale role of the user. This function only works if you have construct the array role in the correct order (from the most important to the less important)
   * @return {Roles | undefined} return the role or undefined if not authenticated
   */
  getUserPrincipalRole: () => Roles | undefined

  /**
   * It will return the principale role of the given list. This function only works if you have construct the array role in the correct order (from the most important to the less important)
   * @return {Roles | undefined} return the role or undefined if not authenticated
   */
  getPrincipalRole: (roles: Roles[]) => Roles | undefined

  /**
   * It will exececute the auth function by passing it the authenticated user and return the boolean result
   */
  executeAuthFunction: (authFunction: AuthFunction, ...args) => isAuthorized
} & RolesServices<Roles> &
  Additionnals

type KeycloackInjector<
  Roles extends string = string,
  T = undefined,
  R = any
> = (
  keycloak: KeycloakWithRoles<Roles>,
  services: AuthService<{}, Roles>,
  params?: T
) => R

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
  extends Keycloak {
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

function useAuth<Roles extends string = string>(): Auth<{}, Roles>
function useAuth<Roles extends string = string>(
  roles?: Roles[]
): Auth<{}, Roles>

function useAuth<
  AdditionnalServices = undefined,
  Roles extends string = string
>(
  roles: Roles[] = [],
  additionnalServices?: KeycloackService<AdditionnalServices, Roles>
): Auth<AuthServiceAdditionnal<AdditionnalServices>, Roles> {
  const { keycloak } = useKeycloak()

  const keycloakWithRoles: KeycloakWithRoles<Roles> = useMemo(
    () => keycloak as KeycloakWithRoles<Roles>,
    [keycloak]
  )

  const getPrincipalRole = useCallback(
    (givenRoles: Roles[]): Roles | undefined => {
      for (let it in roles) {
        if (givenRoles.includes(roles[it])) {
          return roles[it]
        }
      }
      return
    },
    [roles]
  )

  const getUserPrincipalRole = useCallback((): Roles | undefined => {
    //@ts-ignore
    const userRoles: Roles[] =
      keycloakWithRoles.tokenParsed?.realm_access?.roles ?? []
    return getPrincipalRole(userRoles)
  }, [keycloakWithRoles, getPrincipalRole])

  const hasRole = useCallback(
    (role: Roles | Roles[]): boolean => {
      if (Array.isArray(role)) {
        if (role.length === 0) return true
        for (let it in role) {
          if (keycloakWithRoles.hasRealmRole(role[it])) return true
        }
        return false
      } else {
        return keycloakWithRoles.hasRealmRole(role)
      }
    },
    [keycloakWithRoles]
  )

  const hasAllRoles = useCallback(
    (roles: Roles[]): boolean => {
      let hasAll = true
      roles.forEach((role) => {
        if (!hasRole(role)) {
          hasAll = false
        }
      })
      return hasAll
    },
    [keycloakWithRoles, hasRole]
  )

  const getUserId = useCallback(
    // @ts-ignore
    (): string | undefined => keycloakWithRoles.tokenParsed?.sub,
    [keycloakWithRoles]
  )

  const getUserRoles = useCallback(
    // @ts-ignore
    (): Roles[] | undefined =>
      keycloakWithRoles.tokenParsed?.realm_access?.roles,
    [keycloakWithRoles]
  )

  const getUser = useCallback(
    // @ts-ignore
    (): CommonUser | undefined => {
      if (!keycloakWithRoles.authenticated) return
      return {
        id: keycloakWithRoles.tokenParsed?.sub,
        email: keycloakWithRoles.tokenParsed?.email,
        memberOf: keycloakWithRoles.tokenParsed?.memberOf,
        firstName: keycloakWithRoles.tokenParsed?.given_name,
        lastName: keycloakWithRoles.tokenParsed?.family_name,
        role: keycloakWithRoles.tokenParsed?.realm_access?.roles,
        fullName: keycloakWithRoles.tokenParsed?.name
      }
    },
    [keycloakWithRoles]
  )

  const isMemberOf = useCallback(
    (organizationId: string): boolean =>
      keycloakWithRoles.tokenParsed?.memberOf === organizationId,
    [keycloakWithRoles]
  )

  const executeAuthFunction = useCallback(
    (authFunction: AuthFunction, ...args) => {
      const user = getUser()
      if (!user) return false
      return authFunction(user, ...args)
    },
    [getUser]
  )

  const rolesServices: RolesServices<Roles> = useMemo(() => {
    const object: RolesServices<Roles> = {} as RolesServices<Roles>
    for (let it in roles) {
      const fn = () => hasRole(roles[it])
      object[`is_${roles[it]}`] = fn
    }
    return object
  }, [hasRole, roles])

  const service: AuthService<{}, Roles> = useMemo(
    () => ({
      getUserId: getUserId,
      hasRole: hasRole,
      getUser: getUser,
      getUserPrincipalRole: getUserPrincipalRole,
      getPrincipalRole: getPrincipalRole,
      hasAllRoles: hasAllRoles,
      isMemberOf: isMemberOf,
      getUserRoles: getUserRoles,
      executeAuthFunction,
      ...rolesServices
    }),
    [
      hasRole,
      getUserId,
      getUser,
      getUserPrincipalRole,
      rolesServices,
      getPrincipalRole,
      hasAllRoles,
      isMemberOf,
      getUserRoles,
      executeAuthFunction
    ]
  )

  const additionnals: AuthServiceAdditionnal<AdditionnalServices> =
    useMemo(() => {
      const object: AuthServiceAdditionnal<AdditionnalServices> =
        {} as AuthServiceAdditionnal<AdditionnalServices>
      for (let serviceName in additionnalServices) {
        const fn: AuthFnc = (params) =>
          additionnalServices[serviceName.toString()](
            keycloakWithRoles,
            service,
            params
          )
        object[serviceName.toString()] = fn
      }
      return object
    }, [additionnalServices, keycloakWithRoles, hasRole, roles, service])

  return {
    service: Object.assign(service, additionnals),
    keycloak: keycloakWithRoles
  }
}

export { useAuth }
export default useAuth
