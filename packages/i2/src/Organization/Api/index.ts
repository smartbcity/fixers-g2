import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { config, G2Organization } from 'i2'
import { KeycloakAuth } from '@smartb/g2-providers/dist/KeycloakProvider/KeycloakConfig'

export interface OrganizationGetAllQuery {
  name?: string
  role?: string
  page?: number
  size?: number
}

export interface OrganizationGetAllQueryResult {
  organizations: G2Organization[]
  total: number
}

const baseQuery = fetchBaseQuery({
  baseUrl: config.i2.orgUrl,
  prepareHeaders: (headers) => {
    const keycloak = KeycloakAuth.instance

    // If we have a token set in state, let's assume that we should be passing it.
    if (keycloak.token) {
      headers.set('authorization', `Bearer ${keycloak}`)
    }

    return headers
  }
})

export const OrganizationApi = createApi({
  reducerPath: 'organizationApi',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    organizationPage: builder.query<G2Organization[], OrganizationGetAllQuery>({
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
