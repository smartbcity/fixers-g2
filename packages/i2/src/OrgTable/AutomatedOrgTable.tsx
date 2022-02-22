import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'
import React, { useCallback, useEffect } from 'react'
import { request, useAsyncResponse } from 'utils'
import { OrganizationGetAllQuery, Organization } from '../OrgFactory/types'
import { OrgTable, OrgTableProps } from './OrgTable'

export interface AutomatedOrgTableBasicProps extends BasicProps {
  /**
   * The api url where to make the locals api calls
   */
  apiUrl: string
  /**
   * The token to authorize the api calls
   */
  jwt?: string
  /**
   * The initial states of the filters
   */
  initialFiltersValues?: { page?: number; search?: string }
  /**
   * The event called when the filters changes
   */
  submitted?: (params: { page?: number; search?: string }) => void
}

export type AutomatedOrgTableProps = MergeMuiElementProps<
  Omit<OrgTableProps, 'organizations' | 'onFetchOrganizations'>,
  AutomatedOrgTableBasicProps
>

export const AutomatedOrgTable = (props: AutomatedOrgTableProps) => {
  const { apiUrl, jwt, initialFiltersValues, submitted, ...other } = props

  const getOrganizations = useCallback(
    async (params?: { page?: number; search?: string }) => {
      const res = await request<{ organizations: Organization[] }[]>({
        url: `${apiUrl}/getAllOrganizations`,
        method: 'POST',
        body: JSON.stringify({
          ...params,
          size: 10
        } as OrganizationGetAllQuery),
        jwt: jwt
      })
      if (res) {
        return res[0].organizations
      } else {
        return undefined
      }
    },
    [apiUrl, jwt]
  )

  const { result, status, execute } = useAsyncResponse(getOrganizations, false)

  useEffect(() => {
    execute(initialFiltersValues)
  }, [execute, initialFiltersValues])

  const onFetchOrganizations = useCallback(
    (page: number, search?: string | undefined) => {
      execute({ page: page, search: search })
      submitted && submitted({ page: page, search: search })
    },
    [execute, submitted]
  )

  return (
    <OrgTable
      isLoading={status !== 'SUCCESS'}
      organizations={result ?? []}
      onFetchOrganizations={onFetchOrganizations}
      {...other}
    />
  )
}
