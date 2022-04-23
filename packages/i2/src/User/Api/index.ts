import {
  OrganizationRef,
  User,
  UserResetPasswordCommand,
  UserResetPasswordResult
} from '../Domain'
import { useCallback } from 'react'
import { request } from 'utils'
import {
  QueryFunctionContext,
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions
} from 'react-query'
import { UserTableFilters } from '../Components/UserTable'

export interface getUsersParams {
  /**
   * @default "organization"
   */
  queryKey?: string
  jwt?: string
  apiUrl: string
  options?: Omit<
    UseQueryOptions<
      { users: User[]; totalPages: number } | undefined,
      unknown,
      { users: User[]; totalPages: number } | undefined,
      (string | UserTableFilters | undefined)[]
    >,
    'queryKey' | 'queryFn'
  >
  queryParams?: UserTableFilters
}

export const useGetUsers = (params: getUsersParams) => {
  const { apiUrl, jwt, options, queryKey = 'users', queryParams } = params

  const getUsers = useCallback(
    async ({
      queryKey
    }: QueryFunctionContext<[string, UserTableFilters | undefined]>) => {
      const [_key, currentParams] = queryKey
      const res = await request<{ users: User[]; total: number }[]>({
        url: `${apiUrl}/getAllUsers`,
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
          users: res[0]?.users,
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

export interface getUserParams {
  /**
   * @default "organization"
   */
  queryKey?: string
  jwt?: string
  userId?: string
  organizationId?: string
  apiUrl: string
  options?: Omit<
    UseQueryOptions<
      User | undefined,
      unknown,
      User | undefined,
      (string | undefined)[]
    >,
    'queryKey' | 'queryFn'
  >
}

export const useGetUser = (params: getUserParams) => {
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
      const res = await request<{ user: User }[]>({
        url: `${apiUrl}/getUser`,
        method: 'POST',
        body: JSON.stringify({
          id: userId
        }),
        jwt: jwt
      })
      if (res) {
        // @ts-ignore
        return {
          ...res[0].user,
          memberOf:
            res[0]?.user?.memberOf ??
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

export interface updateUserParams {
  jwt?: string
  apiUrl: string
  options?: Omit<
    UseMutationOptions<{ id: string } | undefined, unknown, User, unknown>,
    'mutationFn'
  >
}

export const useUpdateUser = (params: updateUserParams) => {
  const { apiUrl, jwt, options } = params

  const updateUser = useCallback(
    async (user: User) => {
      const res = await request<{ id: string }[]>({
        url: `${apiUrl}/updateUser`,
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

export interface createUserParams {
  jwt?: string
  apiUrl: string
  organizationId?: string
  options?: Omit<
    UseMutationOptions<{ id: string } | undefined, unknown, User, unknown>,
    'mutationFn'
  >
}

export const useCreateUser = (params: createUserParams) => {
  const { apiUrl, jwt, options, organizationId } = params

  const createUser = useCallback(
    async (user: User) => {
      const res = await request<{ id: string }[]>({
        url: `${apiUrl}/createUser`,
        method: 'POST',
        // @ts-ignore
        body: JSON.stringify({
          ...user,
          roles: user.roles.assignedRoles ?? [],
          memberOf: organizationId
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

export interface resetUserPasswordParams {
  jwt?: string
  apiUrl: string
  options?: Omit<
    UseMutationOptions<
      UserResetPasswordResult | undefined,
      unknown,
      UserResetPasswordCommand | undefined,
      unknown
    >,
    'mutationFn'
  >
}

export const useResetUserPassword = (params: resetUserPasswordParams) => {
  const { apiUrl, jwt, options } = params

  const resetUserPassword = useCallback(
    async (
      cmd?: UserResetPasswordCommand
    ): Promise<UserResetPasswordResult | undefined> => {
      const res = await request<UserResetPasswordResult[]>({
        url: `${apiUrl}/resetUserPassword`,
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
