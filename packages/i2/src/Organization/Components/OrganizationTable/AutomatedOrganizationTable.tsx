import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'
import React, { useCallback, useState } from 'react'
import { OrganizationTableFilters } from './index'
import { OrganizationTable, OrganizationTableProps } from './OrganizationTable'
import { useGetOrganizations, GetOrganizationsOptions } from '../../Api'
import { i2Config, useAuth } from '@smartb/g2-providers'

export interface AutomatedOrganizationTableBasicProps extends BasicProps {
  /**
   * The getOrganizations hook options
   */
  getOrganizationsOptions?: GetOrganizationsOptions
  /**
   * The initial states of the filters
   */
  initialFiltersValues?: OrganizationTableFilters
  /**
   * The event called when the filters changes
   */
  onSubmitFilters?: (params?: OrganizationTableFilters) => void
}

export type AutomatedOrganizationTableProps = MergeMuiElementProps<
  Omit<OrganizationTableProps, 'organizations' | 'onFetchOrganizations'>,
  AutomatedOrganizationTableBasicProps
>

export const AutomatedOrganizationTable = (
  props: AutomatedOrganizationTableProps
) => {
  const {
    initialFiltersValues,
    onSubmitFilters,
    getOrganizationsOptions,
    ...other
  } = props

  const { keycloak } = useAuth()

  const [queryParams, setQueryParams] = useState<
    OrganizationTableFilters | undefined
  >(initialFiltersValues)

  const getOrganizations = useGetOrganizations({
    apiUrl: i2Config().orgUrl,
    jwt: keycloak.token,
    queryParams: queryParams,
    options: getOrganizationsOptions
  })

  const onSubmitFiltersMemoized = useCallback(
    (params: OrganizationTableFilters) => {
      setQueryParams(params)
      onSubmitFilters && onSubmitFilters(params)
    },
    [onSubmitFilters]
  )

  return (
    <OrganizationTable
      isLoading={!getOrganizations.isSuccess}
      organizations={getOrganizations.data?.organizations ?? []}
      totalPages={
        getOrganizations.data?.total && getOrganizations.data?.total > 1
          ? getOrganizations.data?.total
          : undefined
      }
      onFetchOrganizations={onSubmitFiltersMemoized}
      initialFiltersValues={initialFiltersValues}
      {...other}
    />
  )
}
