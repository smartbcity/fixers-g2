import { AuthedUser } from './useAuth'

export type isAuthorized = boolean

export type AuthFunction = <U extends AuthedUser>(
  authedUser: U,
  ...args
) => isAuthorized

export type Policies = Record<string, Record<string, AuthFunction>>

type RemoveFirstParameter<T extends any[]> = T extends [any, ...infer U]
  ? U
  : never

export type ModifiedPolicies<T> = {
  [K in keyof T]: {
    [P in keyof T[K]]: (
      //@ts-ignore
      ...args: RemoveFirstParameter<Parameters<T[K][P]>>
    ) => boolean
  }
}

export const reBindPolicieValues = <
  Policie extends Record<string, AuthFunction> = Record<string, AuthFunction>
>(
  policie: Policie
): Policie => {
  const policieKeys = Object.keys(Object.getPrototypeOf(policie)) as any[]
  return policieKeys.reduce<Policie>((object, key) => {
    //@ts-ignore
    object[key] = policie[key].bind(policie)
    return object
    //@ts-ignore
  }, {})
}
