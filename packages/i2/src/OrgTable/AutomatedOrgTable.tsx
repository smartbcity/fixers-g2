import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'
import React, { useCallback, useEffect } from 'react'
import { request, useAsyncResponse } from 'utils'
import { Organization } from '../OrgCreation/OrgCreation'
import { OrgTable, OrgTableProps } from './OrgTable'

export interface AutomatedOrgTableBasicProps extends BasicProps {
  apiUrl: string
  jwt?: string
  initialFiltersValues?: { search?: string; page?: number }
}

export type AutomatedOrgTableProps = MergeMuiElementProps<
  Omit<OrgTableProps, 'organizations' | 'onFetchOrganizations'>,
  AutomatedOrgTableBasicProps
>

export const AutomatedOrgTable = (props: AutomatedOrgTableProps) => {
  const { apiUrl, jwt, initialFiltersValues, ...other } = props

  const getOrganizations = useCallback(
    async (params?: { page?: number; search?: string }) => {
      return request<Organization[]>({
        url: `${apiUrl}/getOrganizations`,
        method: 'POST',
        body: JSON.stringify(params),
        jwt: jwt
      })
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
    },
    [execute]
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
