import {
  Organization,
  OrganizationCreateCommand,
  OrganizationGetByIdQuery,
  OrganizationId,
  OrganizationUpdateCommand
} from '../Domain'
import { useCallback } from 'react'
import { request } from '@smartb/g2-utils'
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
  QueryFunctionContext
} from 'react-query'
import { OrganizationTableFilters } from '../Components/OrganizationTable'
export * from './GetOrganizationRefsQuery'

export interface OrganizationPageQueryResult {
  organizations: Organization[]
  total: number
}

export type GetOrganizationsOptions = Omit<
  UseQueryOptions<
    OrganizationPageQueryResult,
    unknown,
    OrganizationPageQueryResult,
    (string | OrganizationTableFilters | undefined)[]
  >,
  'queryKey' | 'queryFn'
>

export interface GetOrganizationsParams {
  /**
   * @default "organization"
   */
  queryKey?: string
  jwt?: string
  apiUrl: string
  options?: GetOrganizationsOptions
  queryParams?: OrganizationTableFilters
}

export const useGetOrganizations = (params: GetOrganizationsParams) => {
  const {
    apiUrl,
    jwt,
    options,
    queryKey = 'organizations',
    queryParams
  } = params
  // TODO Remove all duplicated code with other request
  const getOrganizations = useCallback(
    async ({
      queryKey
    }: QueryFunctionContext<
      [string, OrganizationTableFilters | undefined]
    >): Promise<OrganizationPageQueryResult> => {
      const [_key, currentParams] = queryKey
      const res = await request<
        { organizations: Organization[]; total: number }[]
      >({
        url: `${apiUrl}/getAllOrganizations`,
        method: 'POST',
        body: JSON.stringify({
          ...currentParams,
          name: currentParams?.search,
          page: currentParams?.page ? currentParams?.page - 1 : 0,
          size: currentParams?.size ?? 10
        } as OrganizationTableFilters),
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

export type GetOrganizationOptions = Omit<
  UseQueryOptions<
    { organization: Organization } | undefined,
    unknown,
    { organization: Organization } | undefined,
    (string | undefined)[]
  >,
  'queryKey' | 'queryFn'
>

export interface GetOrganizationParams {
  /**
   * @default "organization"
   */
  queryKey?: string
  jwt?: string
  organizationId?: OrganizationId
  apiUrl: string
  options?: GetOrganizationOptions
}

export const useGetOrganization = (params: GetOrganizationParams) => {
  const {
    apiUrl,
    jwt,
    options,
    organizationId,
    queryKey = 'organization'
  } = params
  // TODO Remove all duplicated code with other request
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

export const getInseeOrganization = async (
  siret: string,
  apiUrl: string,
  jwt?: string
) => {
  const res = await request<{ organization?: Organization }[]>({
    url: `${apiUrl}/getInseeOrganization`,
    method: 'POST',
    body: JSON.stringify({
      siret: siret
    }),
    jwt: jwt
  })
  if (res) {
    return res[0].organization
  } else {
    return undefined
  }
}

export type UpdateOrganizationOptions = Omit<
  UseMutationOptions<
    undefined | { id: string },
    unknown,
    Organization,
    unknown
  >,
  'mutationFn'
>

export interface UpdateOrganizationParams {
  jwt?: string
  apiUrl: string
  options?: UpdateOrganizationOptions
}

export const useUpdateOrganization = (params: UpdateOrganizationParams) => {
  const { apiUrl, jwt, options } = params
  // TODO Remove all duplicated code with other request
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

export type CreateOrganizationOptions = Omit<
  UseMutationOptions<
    undefined | { id: string },
    unknown,
    Organization,
    unknown
  >,
  'mutationFn'
>

export interface CreateOrganizationParams {
  jwt?: string
  apiUrl: string
  options?: CreateOrganizationOptions
}

export const useCreateOrganization = (params: CreateOrganizationParams) => {
  const { apiUrl, jwt, options } = params
  // TODO Remove all duplicated code with other request
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

export * from './GetOrganizationRefsQuery'
