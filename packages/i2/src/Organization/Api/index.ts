import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { keycloakAuth } from '@smartb/g2-providers'
import { Organization } from '../Factory'
import { i2Config } from '../../Config'

export interface OrganizationGetAllQuery {
  name?: string
  role?: string
  page?: number
  size?: number
}

export interface OrganizationGetAllQueryResult {
  organizations: Organization[]
  total: number
}

const baseQuery = fetchBaseQuery({
  baseUrl: i2Config.i2.orgUrl,
  prepareHeaders: (headers) => {
    const keycloak = keycloakAuth?.instance

    // If we have a token set in state, let's assume that we should be passing it.
    if (keycloak?.token) {
      headers.set('Authorization', `Bearer ${keycloak}`)
    }

    return headers
  }
})

export const OrganizationApi = createApi({
  reducerPath: 'organizationApi',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    organizationPage: builder.query<Organization[], OrganizationGetAllQuery>({
      query: (query: OrganizationGetAllQuery) => ({
        url: `getAllOrganizations`,
        method: 'POST',

        body: query
      }),
      transformResponse: (response: OrganizationGetAllQueryResult[]) =>
        response[0].organizations
    })
  })
})

export const { useOrganizationPageQuery } = OrganizationApi
