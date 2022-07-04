import {
  User,
  UserResetPasswordCommand,
  UserResetPasswordResult
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
    queryKey = 'organization'
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
          roles: user.role
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

export type ResetUserPasswordOptions = Omit<
  UseMutationOptions<
    UserResetPasswordResult | undefined,
    unknown,
    UserResetPasswordCommand | undefined,
    unknown
  >,
  'mutationFn'
>

export interface ResetUserPasswordParams {
  jwt?: string
  apiUrl: string
  options?: ResetUserPasswordOptions
}

export const useResetUserPassword = (params: ResetUserPasswordParams) => {
  const { apiUrl, jwt, options } = params

  const resetUserPassword = useCallback(
    async (
      cmd?: UserResetPasswordCommand
    ): Promise<UserResetPasswordResult | undefined> => {
      const res = await request<UserResetPasswordResult[]>({
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
