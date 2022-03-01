import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'
import React, { useCallback, useEffect } from 'react'
import { request, useAsyncResponse } from 'utils'
import { OrgTableFilters } from '.'
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
  initialFiltersValues?: OrgTableFilters
  /**
   * The event called when the filters changes
   */
  submitted?: (params?: OrgTableFilters) => void
}

export type AutomatedOrgTableProps = MergeMuiElementProps<
  Omit<OrgTableProps, 'organizations' | 'onFetchOrganizations'>,
  AutomatedOrgTableBasicProps
>

export const AutomatedOrgTable = (props: AutomatedOrgTableProps) => {
  const { apiUrl, jwt, initialFiltersValues, submitted, ...other } = props

  const getOrganizations = useCallback(
    async (params?: OrgTableFilters) => {
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
    (params?: OrgTableFilters) => {
      execute(params)
      submitted && submitted(params)
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
