import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'
import React, { useCallback, useEffect } from 'react'
import { request, useAsyncResponse } from 'utils'
import {
  Command,
  OrganizationGetAllQuery,
  Organization
} from '../OrgCreation/types'
import { OrgTable, OrgTableProps } from './OrgTable'

const commandBase: Command = {
  auth: {
    serverUrl: 'https://auth.smart-b.io/auth',
    realmId: 'master',
    clientId: 'admin-cli',
    redirectUrl: '',
    username: 'smartb',
    password: 'conorS'
  },
  realmId: 'test'
}

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
      const res = await request<{ organizations: Organization[] }[]>({
        url: `${apiUrl}/getAllOrganizations`,
        method: 'POST',
        body: JSON.stringify({
          ...params,
          ...commandBase,
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
