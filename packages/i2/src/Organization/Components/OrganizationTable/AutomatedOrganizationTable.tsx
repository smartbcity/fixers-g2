import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'
import React, { useCallback, useEffect } from 'react'
import { useAsyncResponse } from 'utils'
import { OrganizationTableFilters } from './index'
import { OrganizationTable, OrganizationTableProps } from './OrganizationTable'
import { useOrganizationPageQuery } from '../../Api'

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
  initialFiltersValues?: OrganizationTableFilters
  /**
   * The event called when the filters changes
   */
  submitted?: (params?: OrganizationTableFilters) => void
}

export type AutomatedOrganizationTableProps = MergeMuiElementProps<
  Omit<OrganizationTableProps, 'organizations' | 'onFetchOrganizations'>,
  AutomatedOrganizationTableBasicProps
>

export const AutomatedOrganizationTable = (
  props: AutomatedOrganizationTableProps
) => {
  const { apiUrl, jwt, initialFiltersValues, submitted, ...other } = props
  const getOrganizations = useOrganizationPageQuery(apiUrl, jwt)

  const { result, status, execute } = useAsyncResponse(getOrganizations, false)

  useEffect(() => {
    execute(initialFiltersValues)
  }, [execute, initialFiltersValues])

  const onFetchOrganizations = useCallback(
    (params?: OrganizationTableFilters) => {
      execute({
        page: params?.page,
        size: 10,
        name: params?.search
      })
      submitted && submitted(params)
    },
    [execute, submitted]
  )

  return (
    <OrganizationTable
      isLoading={status !== 'SUCCESS'}
      organizations={result?.organizations ?? []}
      totalPages={
        result?.total && result?.total > 1 ? result?.total : undefined
      }
      onFetchOrganizations={onFetchOrganizations}
      initialFiltersValues={initialFiltersValues}
      {...other}
    />
  )
}
