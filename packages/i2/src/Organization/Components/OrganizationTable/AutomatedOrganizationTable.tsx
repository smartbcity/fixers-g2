import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'
import React, { useState } from 'react'
import { OrganizationTable, OrganizationTableProps } from './OrganizationTable'
import { useGetOrganizations, GetOrganizationsOptions } from '../../Api'
import { i2Config, useAuth } from '@smartb/g2-providers'
import { Organization } from '../OrganizationFactory'

export interface AutomatedOrganizationTableBasicProps<T extends Organization>
  extends BasicProps {
  /**
   * The getOrganizations hook options
   */
  getOrganizationsOptions?: GetOrganizationsOptions<T>
  /**
   * Pass the current state of the filters
   */
  filters?: any
}

export type AutomatedOrganizationTableProps<
  T extends Organization = Organization
> = MergeMuiElementProps<
  Omit<
    OrganizationTableProps<T>,
    'organizations' | 'onFetchOrganizations' | 'totalPages' | 'page' | 'setPage'
  >,
  AutomatedOrganizationTableBasicProps<T>
>

export const AutomatedOrganizationTable = <
  T extends Organization = Organization
>(
  props: AutomatedOrganizationTableProps<T>
) => {
  const { filters, getOrganizationsOptions, ...other } = props

  const [page, setPage] = useState<number>(filters?.page ?? 1)
  const { keycloak } = useAuth()

  const getOrganizations = useGetOrganizations<T>({
    apiUrl: i2Config().orgUrl,
    jwt: keycloak.token,
    queryParams: {
      page,
      ...filters
    },
    options: getOrganizationsOptions
  })

  return (
    <OrganizationTable<T>
      isLoading={!getOrganizations.isSuccess}
      organizations={getOrganizations.data?.items ?? []}
      totalPages={
        getOrganizations.data?.total && getOrganizations.data?.total > 1
          ? getOrganizations.data?.total
          : undefined
      }
      page={page}
      setPage={setPage}
      {...other}
    />
  )
}
