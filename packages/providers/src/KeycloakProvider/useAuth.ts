import { useCallback, useMemo } from 'react'
import { KeycloakTokenParsed } from 'keycloak-js'
import { useOidc, useOidcIdToken } from '@axa-fr/react-oidc'

export type AuthedUser = {
  id: string
  email: string
  memberOf: string | undefined
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
  Additionals extends AuthServiceAdditional = {},
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
  Additionals

type KeycloackInjector<
  Roles extends string = string,
  T = undefined,
  R = any
> = (
  keycloak: Keycloak<Roles>,
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

export type AuthServiceAdditional<T = {}> = {
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

export interface Keycloak<Roles extends string = string>
  extends ReturnType<typeof useOidc> {
  tokenParsed?: KeycloakTokenParsedWithRoles<Roles>
  token?: any
}

export interface Auth<
  Additionals extends AuthServiceAdditional = {},
  Roles extends string = string
> {
  service: AuthService<Additionals, Roles>
  keycloak: Keycloak<Roles>
}

function useAuth<AdditionalServices, Roles extends string = string>(
  roles: Roles[],
  additionalServices: KeycloackService<AdditionalServices, Roles>
): Auth<AuthServiceAdditional<AdditionalServices>, Roles>

function useAuth<Roles extends string = string>(): Auth<{}, Roles>
function useAuth<Roles extends string = string>(
  roles?: Roles[]
): Auth<{}, Roles>

function useAuth<AdditionalServices = undefined, Roles extends string = string>(
  roles: Roles[] = [],
  additionalServices?: KeycloackService<AdditionalServices, Roles>
): Auth<AuthServiceAdditional<AdditionalServices>, Roles> {
  const oidc = useOidc()
  const { isAuthenticated } = oidc
  const { idToken, idTokenPayload } = useOidcIdToken()

  const tokenParsed: KeycloakTokenParsedWithRoles<Roles> = idTokenPayload

  const keycloak = useMemo(
    (): Keycloak<Roles> => ({
      ...oidc,
      token: idToken,
      tokenParsed: idTokenPayload
    }),
    [oidc, idToken, idTokenPayload]
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
    const userRoles: Roles[] = tokenParsed?.realm_access?.roles ?? []
    return getPrincipalRole(userRoles)
  }, [tokenParsed, getPrincipalRole])

  const hasRole = useCallback(
    (role: Roles | Roles[]): boolean => {
      if (Array.isArray(role)) {
        if (role.length === 0) return true
        for (let it in role) {
          if (tokenParsed?.realm_access?.roles.includes(role[it])) return true
        }
        return false
      } else {
        return tokenParsed?.realm_access?.roles.includes(role) ?? false
      }
    },
    [tokenParsed]
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
    [hasRole]
  )

  const getUserId = useCallback(
    // @ts-ignore
    (): string | undefined => tokenParsed?.sub,
    [tokenParsed]
  )

  const getUserRoles = useCallback(
    // @ts-ignore
    (): Roles[] | undefined => tokenParsed?.realm_access?.roles,
    [tokenParsed]
  )

  const getUser = useCallback(
    // @ts-ignore
    (): CommonUser | undefined => {
      if (!isAuthenticated) return
      return {
        id: tokenParsed?.sub,
        email: tokenParsed?.email,
        memberOf: tokenParsed?.memberOf,
        firstName: tokenParsed?.given_name,
        lastName: tokenParsed?.family_name,
        roles: tokenParsed?.realm_access?.roles,
        fullName: tokenParsed?.name
      }
    },
    [isAuthenticated, tokenParsed]
  )

  const isMemberOf = useCallback(
    (organizationId: string): boolean =>
      tokenParsed?.memberOf === organizationId,
    [tokenParsed]
  )

  const executeAuthFunction = useCallback(
    function (authFunction: AuthFunction, ...args) {
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

  const additionals: AuthServiceAdditional<AdditionalServices> = useMemo(() => {
    const object: AuthServiceAdditional<AdditionalServices> =
      {} as AuthServiceAdditional<AdditionalServices>
    for (let serviceName in additionalServices) {
      const fn: AuthFnc = (params) =>
        additionalServices[serviceName.toString()](keycloak, service, params)
      object[serviceName.toString()] = fn
    }
    return object
  }, [additionalServices, keycloak, hasRole, roles, service])

  return {
    service: Object.assign(service, additionals),
    keycloak
  }
}

export { useAuth }
export default useAuth
