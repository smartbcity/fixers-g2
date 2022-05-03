import { useCallback } from 'react'
import { useQuery, UseQueryOptions } from 'react-query'
import { OrganizationRef } from '../Domain'
import { request } from '@smartb/g2-utils'

export interface OrganizationRefsAllQuery {}

export interface OrganizationRefsAllResult {
  organizations: OrganizationRef[]
}

export type GetOrganizationRefsOptions = Omit<
  UseQueryOptions<
    OrganizationRefsAllResult,
    unknown,
    OrganizationRefsAllResult,
    OrganizationRefsAllQuery[]
  >,
  'queryKey' | 'queryFn'
>

export interface OrganizationRefsAllParams {
  queryKey?: string
  jwt?: string
  apiUrl: string
  options?: GetOrganizationRefsOptions
}

export const useGetOrganizationRefs = (params: OrganizationRefsAllParams) => {
  const { apiUrl, jwt, options, queryKey = 'organizationRefs' } = params

  const getOrganizationRefs =
    useCallback(async (): Promise<OrganizationRefsAllResult> => {
      const res = await request<{ organizations: OrganizationRef[] }[]>({
        url: `${apiUrl}/getAllOrganizationRefs`,
        method: 'POST',
        body: '[{}]',
        jwt: jwt
      })
      if (res) {
        return {
          organizations: res[0]?.organizations || []
        }
      } else {
        return {
          organizations: []
        }
      }
    }, [apiUrl, jwt])

  return useQuery([queryKey], getOrganizationRefs, options)
}
