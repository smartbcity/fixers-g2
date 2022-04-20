import { Organization } from '../Domain'
import { useCallback } from 'react'
import { request } from 'utils'

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

export const useOrganizationPageQuery = (apiUrl: string, jwt?: string) => {
  return useCallback(
    async (
      params?: OrganizationPageQuery
    ): Promise<OrganizationPageQueryResult> => {
      const res = await request<
        { organizations: Organization[]; total: number }[]
      >({
        url: `${apiUrl}/getAllOrganizations`,
        method: 'POST',
        body: JSON.stringify({
          ...params,
          name: params?.name,
          page: params?.page ? params?.page - 1 : 0,
          size: 10
        } as OrganizationPageQuery),
        jwt: jwt
      })
      if (res) {
        return {
          organizations: res[0]?.organizations,
          total: res[0]?.total ? Math.floor(res[0]?.total / 10) + 1 : 0
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
}

export const OrganizationApi = {
  useOrganizationPageQuery
}
