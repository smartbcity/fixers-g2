import {
  User,
  UserResetPasswordCommand,
  UserUpdatedEmailEvent,
  UserUpdateEmailCommand,
  UserUpdatePasswordCommand,
  UserUpdatePasswordResult
} from '../Domain'
import { useCallback } from 'react'
import { request } from '@smartb/g2-utils'
import {
  QueryFunctionContext,
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions
} from 'react-query'
import { UserTableFilters } from '../Components/UserTable'
import { OrganizationId, OrganizationRef } from '../../Organization'
import { UserPageResult } from '../Domain'

type UserGetAllQueryResultOptional =
  | { users: any; totalPages: number }
  | undefined

export type GetUsersOptions = Omit<
  UseQueryOptions<
    UserGetAllQueryResultOptional,
    unknown,
    UserGetAllQueryResultOptional,
    (string | UserTableFilters | undefined)[]
  >,
  'queryKey' | 'queryFn'
>

export interface GetUsersParams {
  /**
   * @default "organization"
   */
  queryKey?: string
  jwt?: string
  apiUrl: string
  options?: GetUsersOptions
  queryParams?: UserTableFilters
}

export const useGetUsers = <T extends User = User>(params: GetUsersParams) => {
  const { apiUrl, jwt, options, queryKey = 'users', queryParams } = params

  const getUsers = useCallback(
    async ({
      queryKey
    }: QueryFunctionContext<[string, UserTableFilters | undefined]>) => {
      const [_key, currentParams] = queryKey
      const res = await request<UserPageResult<T>[]>({
        url: `${apiUrl}/userPage`,
        method: 'POST',
        body: JSON.stringify({
          ...currentParams,
          page: currentParams?.page ? currentParams?.page - 1 : 0,
          size: 10
        }),
        jwt: jwt
      })
      if (res) {
        return {
          users: res[0]?.items,
          totalPages: Math.ceil(res[0]?.total / 10)
        }
      } else {
        return undefined
      }
    },
    [apiUrl, jwt]
  )

  return useQuery([queryKey, queryParams], getUsers, options)
}

export type GetUserOptions = Omit<
  UseQueryOptions<
    User | undefined,
    unknown,
    User | undefined,
    (string | undefined)[]
  >,
  'queryKey' | 'queryFn'
>

export interface GetUserParams {
  /**
   * @default "organization"
   */
  queryKey?: string
  jwt?: string
  userId?: string
  organizationId?: OrganizationId
  apiUrl: string
  options?: GetUserOptions
}

export const useGetUser = (params: GetUserParams) => {
  const {
    apiUrl,
    jwt,
    options,
    userId,
    organizationId,
    queryKey = 'user'
  } = params

  const getUser = useCallback(
    async ({
      queryKey
    }: QueryFunctionContext<[string, string]>): Promise<User | undefined> => {
      const [_key, userId] = queryKey
      const res = await request<{ item: User }[]>({
        url: `${apiUrl}/userGet`,
        method: 'POST',
        body: JSON.stringify({
          id: userId
        }),
        jwt: jwt
      })
      if (res) {
        // @ts-ignore
        return {
          ...res[0].item,
          memberOf:
            res[0]?.item?.memberOf ??
            ({ id: organizationId, name: '' } as OrganizationRef)
        }
      } else {
        return undefined
      }
    },
    [apiUrl, jwt, userId, organizationId]
  )

  return useQuery([queryKey, userId], getUser, {
    enabled: !!userId,
    ...options
  })
}

export type UpdateUserOptions = Omit<
  UseMutationOptions<{ id: string } | undefined, unknown, User, unknown>,
  'mutationFn'
>

export interface UpdateUserParams {
  jwt?: string
  apiUrl: string
  options?: UpdateUserOptions
}

export const useUpdateUser = (params: UpdateUserParams) => {
  const { apiUrl, jwt, options } = params

  const updateUser = useCallback(
    async (user: User) => {
      const res = await request<{ id: string }[]>({
        url: `${apiUrl}/userUpdate`,
        method: 'POST',
        body: JSON.stringify({
          ...user,
          memberOf: user.memberOf?.id,
          // @ts-ignore
          roles: user.roles.assignedRoles ?? []
        }),
        jwt: jwt
      })
      if (res) {
        return res[0]
      } else {
        return undefined
      }
    },
    [apiUrl, jwt]
  )

  return useMutation(updateUser, options)
}

export type CreateUserOptions = Omit<
  UseMutationOptions<{ id: string } | undefined, unknown, User, unknown>,
  'mutationFn'
>

export interface CreateUserParams {
  jwt?: string
  apiUrl: string
  organizationId?: OrganizationId
  options?: CreateUserOptions
}

export const useCreateUser = (params: CreateUserParams) => {
  const { apiUrl, jwt, options, organizationId } = params

  const createUser = useCallback(
    async (user: User) => {
      const res = await request<{ id: string }[]>({
        url: `${apiUrl}/userCreate`,
        method: 'POST',
        // @ts-ignore
        body: JSON.stringify({
          ...user,
          roles: user.roles.assignedRoles ?? [],
          memberOf: user.memberOf?.id ?? organizationId
        } as User),
        jwt: jwt
      })
      if (res) {
        return res[0]
      } else {
        return undefined
      }
    },
    [apiUrl, jwt, organizationId]
  )

  return useMutation(createUser, options)
}

export type UserUpdatePasswordOptions = Omit<
  UseMutationOptions<
    UserUpdatePasswordResult | undefined,
    unknown,
    UserUpdatePasswordCommand | undefined,
    unknown
  >,
  'mutationFn'
>

export interface UserUpdatePasswordParams {
  jwt?: string
  apiUrl: string
  options?: UserUpdatePasswordOptions
}

export const useUserUpdatePassword = (params: UserUpdatePasswordParams) => {
  const { apiUrl, jwt, options } = params

  const resetUserPassword = useCallback(
    async (
      cmd?: UserUpdatePasswordCommand
    ): Promise<UserUpdatePasswordResult | undefined> => {
      const res = await request<UserUpdatePasswordResult[]>({
        url: `${apiUrl}/userUpdatePassword`,
        method: 'POST',
        body: JSON.stringify(cmd),
        jwt: jwt
      })
      if (res) {
        return res[0]
      } else {
        return undefined
      }
    },
    [apiUrl, jwt]
  )

  return useMutation(resetUserPassword, options)
}

export type UserResetPasswordOptions = Omit<
  UseMutationOptions<
    UserUpdatePasswordResult | undefined,
    unknown,
    UserResetPasswordCommand | undefined,
    unknown
  >,
  'mutationFn'
>

export interface UserResetPasswordParams {
  jwt?: string
  apiUrl: string
  options?: UserResetPasswordOptions
}

export const useUserResetPassword = (params: UserResetPasswordParams) => {
  const { apiUrl, jwt, options } = params

  const resetUserPassword = useCallback(
    async (cmd?: {
      id: string
    }): Promise<UserUpdatePasswordResult | undefined> => {
      const res = await request<UserUpdatePasswordResult[]>({
        url: `${apiUrl}/userResetPassword`,
        method: 'POST',
        body: JSON.stringify(cmd),
        jwt: jwt
      })
      if (res) {
        return res[0]
      } else {
        return undefined
      }
    },
    [apiUrl, jwt]
  )

  return useMutation(resetUserPassword, options)
}

export type UserUpdateEmailOptions = Omit<
  UseMutationOptions<
    UserUpdatedEmailEvent | undefined,
    unknown,
    UserUpdateEmailCommand | undefined,
    unknown
  >,
  'mutationFn'
>

export interface UserUpdateEmailParams {
  jwt?: string
  apiUrl: string
  options?: UserUpdateEmailOptions
}

export const useUserUpdateEmail = (params: UserUpdateEmailParams) => {
  const { apiUrl, jwt, options } = params

  const updateEmail = useCallback(
    async (
      cmd?: UserUpdateEmailCommand
    ): Promise<UserUpdatedEmailEvent | undefined> => {
      const res = await request<UserUpdatedEmailEvent[]>({
        url: `${apiUrl}/userUpdateEmail`,
        method: 'POST',
        body: JSON.stringify(cmd),
        jwt: jwt
      })
      if (res) {
        return res[0]
      } else {
        return undefined
      }
    },
    [apiUrl, jwt]
  )

  return useMutation(updateEmail, options)
}

export const userExistsByEmail = async (
  email: string,
  apiUrl: string,
  jwt?: string
) => {
  const res = await request<{ item?: boolean }[]>({
    url: `${apiUrl}/userExistsByEmail`,
    method: 'POST',
    body: JSON.stringify({
      email: email
    }),
    jwt: jwt
  })
  if (res) {
    return res[0].item
  } else {
    return undefined
  }
}
