import {
  Organization,
  OrganizationCreateCommand,
  OrganizationGetByIdQuery,
  OrganizationUpdateCommand
} from '../Domain'
import { useCallback } from 'react'
import { request } from 'utils'
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
  QueryFunctionContext
} from 'react-query'

export interface OrganizationPageQuery {
  name?: string
  role?: string
  page?: number
  size?: number
}

export interface OrganizationPageQueryResult {
  organizations: Organization[]
  total: number
}

export interface getOrganizationsParams {
  /**
   * @default "organization"
   */
  queryKey?: string
  jwt?: string
  apiUrl: string
  options?: Omit<
    UseQueryOptions<
      OrganizationPageQueryResult,
      unknown,
      OrganizationPageQueryResult,
      (string | OrganizationPageQuery | undefined)[]
    >,
    'queryKey' | 'queryFn'
  >
  queryParams?: OrganizationPageQuery
}

export const useGetOrganizations = (params: getOrganizationsParams) => {
  const {
    apiUrl,
    jwt,
    options,
    queryKey = 'organizations',
    queryParams
  } = params

  const getOrganizations = useCallback(
    async ({
      queryKey
    }: QueryFunctionContext<
      [string, OrganizationPageQuery | undefined]
    >): Promise<OrganizationPageQueryResult> => {
      const [_key, currentParams] = queryKey
      const res = await request<
        { organizations: Organization[]; total: number }[]
      >({
        url: `${apiUrl}/getAllOrganizations`,
        method: 'POST',
        body: JSON.stringify({
          ...currentParams,
          name: currentParams?.name,
          page: currentParams?.page ? currentParams?.page - 1 : 0,
          size: 10
        } as OrganizationPageQuery),
        jwt: jwt
      })
      if (res) {
        return {
          organizations: res[0]?.organizations,
          total: res[0]?.total ? Math.ceil(res[0]?.total / 10) : 0
        }
      } else {
        return {
          organizations: [],
          total: 0
        }
      }
    },
    [apiUrl, jwt]
  )

  return useQuery([queryKey, queryParams], getOrganizations, options)
}

export interface getOrganizationParams {
  /**
   * @default "organization"
   */
  queryKey?: string
  jwt?: string
  organizationId?: string
  apiUrl: string
  options?: Omit<
    UseQueryOptions<
      { organization: Organization } | undefined,
      unknown,
      { organization: Organization } | undefined,
      (string | undefined)[]
    >,
    'queryKey' | 'queryFn'
  >
}

export const useGetOrganization = (params: getOrganizationParams) => {
  const {
    apiUrl,
    jwt,
    options,
    organizationId,
    queryKey = 'organization'
  } = params

  const getOrganization = useCallback(
    async ({ queryKey }: QueryFunctionContext<[string, string]>) => {
      const [_key, organizationId] = queryKey
      const res = await request<{ organization: Organization }[]>({
        url: `${apiUrl}/getOrganization`,
        method: 'POST',
        body: JSON.stringify({
          id: organizationId
        } as OrganizationGetByIdQuery),
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

  return useQuery([queryKey, organizationId], getOrganization, {
    enabled: !!organizationId,
    ...options
  })
}

export interface updateOrganizationParams {
  jwt?: string
  apiUrl: string
  options?: Omit<
    UseMutationOptions<
      undefined | { id: string },
      unknown,
      Organization,
      unknown
    >,
    'mutationFn'
  >
}

export const useUpdateOrganization = (params: updateOrganizationParams) => {
  const { apiUrl, jwt, options } = params

  const updateOrganization = useCallback(
    async (organization: Organization) => {
      const res = await request<{ id: string }[]>({
        url: `${apiUrl}/updateOrganization`,
        method: 'POST',
        body: JSON.stringify({
          ...organization
        } as OrganizationUpdateCommand),
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

  return useMutation(updateOrganization, options)
}

export interface createOrganizationParams {
  jwt?: string
  apiUrl: string
  options?: Omit<
    UseMutationOptions<
      undefined | { id: string },
      unknown,
      Organization,
      unknown
    >,
    'mutationFn'
  >
}

export const useCreateOrganization = (params: createOrganizationParams) => {
  const { apiUrl, jwt, options } = params

  const createOrganization = useCallback(
    async (organization: Organization) => {
      const res = await request<{ id: string }[]>({
        url: `${apiUrl}/createOrganization`,
        method: 'POST',
        body: JSON.stringify({
          ...organization
        } as OrganizationCreateCommand),
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

  return useMutation(createOrganization, options)
}
