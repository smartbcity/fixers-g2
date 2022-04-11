import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'
import React, { useCallback, useEffect } from 'react'
import { request, useAsyncResponse } from 'utils'
import { OrgTableFilters } from './index'
import { OrganizationGetAllQuery, Organization } from '../Factory'
import { OrgTable, OrgTableProps } from './OrgTable'

export interface AutomatedOrganizationTableBasicProps extends BasicProps {
  /**
   * The Api url where to make the locals Api calls
   */
  apiUrl: string
  /**
   * The token to authorize the Api calls
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

export type AutomatedOrganizationTableProps = MergeMuiElementProps<
  Omit<OrgTableProps, 'organizations' | 'onFetchOrganizations'>,
  AutomatedOrganizationTableBasicProps
>

export const AutomatedOrganizationTable = (
  props: AutomatedOrganizationTableProps
) => {
  const { apiUrl, jwt, initialFiltersValues, submitted, ...other } = props
  // TODO The implementation of this hooks should be outside of this class
  const getOrganizations = useCallback(
    async (params?: OrgTableFilters) => {
      const res = await request<
        { organizations: Organization[]; total: number }[]
      >({
        url: `${apiUrl}/getAllOrganizations`,
        method: 'POST',
        body: JSON.stringify({
          ...params,
          name: params?.search,
          page: params?.page ? params?.page - 1 : 0,
          size: 10
        } as OrganizationGetAllQuery),
        jwt: jwt
      })
      if (res) {
        return {
          organizations: res[0]?.organizations,
          totalPages: res[0]?.total
            ? Math.floor(res[0]?.total / 10) + 1
            : undefined
        }
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
      organizations={result?.organizations ?? []}
      totalPages={
        result?.totalPages && result?.totalPages > 1
          ? result?.totalPages
          : undefined
      }
      onFetchOrganizations={onFetchOrganizations}
      initialFiltersValues={initialFiltersValues}
      {...other}
    />
  )
}
