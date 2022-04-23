import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'
import React from 'react'
import { OrganizationTableFilters } from './index'
import { OrganizationTable, OrganizationTableProps } from './OrganizationTable'
import { OrganizationPageQueryResult } from '../../Api'
import { UseQueryResult } from 'react-query'

export interface AutomatedOrganizationTableBasicProps extends BasicProps {
  /**
   * The result of the hook `useGetOrganizations`
   */
  getOrganizations: UseQueryResult<OrganizationPageQueryResult, unknown>
  /**
   * The initial states of the filters
   */
  initialFiltersValues?: OrganizationTableFilters
  /**
   * The event called when the filters changes
   */
  onSubmitFilters: (params?: OrganizationTableFilters) => void
}

export type AutomatedOrganizationTableProps = MergeMuiElementProps<
  Omit<OrganizationTableProps, 'organizations' | 'onFetchOrganizations'>,
  AutomatedOrganizationTableBasicProps
>

export const AutomatedOrganizationTable = (
  props: AutomatedOrganizationTableProps
) => {
  const { getOrganizations, initialFiltersValues, onSubmitFilters, ...other } =
    props

  return (
    <OrganizationTable
      isLoading={!getOrganizations.isSuccess}
      organizations={getOrganizations.data?.organizations ?? []}
      totalPages={
        getOrganizations.data?.total && getOrganizations.data?.total > 1
          ? getOrganizations.data?.total
          : undefined
      }
      onFetchOrganizations={onSubmitFilters}
      initialFiltersValues={initialFiltersValues}
      {...other}
    />
  )
}
