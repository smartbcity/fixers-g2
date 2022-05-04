import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'
import React, { useCallback, useState } from 'react'
import { UserTableFilters } from './index'
import { UserTable, UserTableProps } from './UserTable'
import { GetUsersOptions, useGetUsers } from '../../Api'
import { OrganizationRef } from '../../../Organization'
import { i2Config, useAuth } from '@smartb/g2-providers'

// TODO Automated should be without getUsers and organizationsRefs
// we could use a parameter to disable organizationsRefs if needed
// jwt should be get by useAuth
// apiUrl should be a configuration out side of the components
export interface AutomatedUserTableBasicProps extends BasicProps {
  /**
   * The getUsers hook options
   */
  getUsersOptions?: GetUsersOptions
  /**
   * The initial states of the filters
   */
  initialFiltersValues?: UserTableFilters
  /**
   * The event called when the filters changes
   */
  onFiltersChanged?: (params?: UserTableFilters) => void
  /**
   * The organizationRefs for the filter organizations
   */
  organizationsRefs?: OrganizationRef[]
}

export type AutomatedUserTableProps = MergeMuiElementProps<
  Omit<UserTableProps, 'users' | 'onFiltersChanged'>,
  AutomatedUserTableBasicProps
>

export const AutomatedUserTable = (props: AutomatedUserTableProps) => {
  const {
    initialFiltersValues,
    onFiltersChanged,
    organizationsRefs,
    getUsersOptions,
    ...other
  } = props

  const [queryParams, setQueryParams] = useState<UserTableFilters | undefined>(
    initialFiltersValues
  )

  const { keycloak } = useAuth()

  const getUsers = useGetUsers({
    apiUrl: i2Config().userUrl,
    jwt: keycloak.token,
    queryParams: queryParams,
    options: getUsersOptions
  })

  const onSubmitFiltersMemoized = useCallback(
    (params: UserTableFilters) => {
      setQueryParams(params)
      onFiltersChanged && onFiltersChanged(params)
    },
    [onFiltersChanged]
  )

  return (
    <UserTable
      organizationsRefs={organizationsRefs}
      isLoading={!getUsers.isSuccess}
      users={getUsers.data?.users ?? []}
      totalPages={
        getUsers.data?.totalPages && getUsers.data?.totalPages > 1
          ? getUsers.data?.totalPages
          : undefined
      }
      onFiltersChanged={onSubmitFiltersMemoized}
      initialFiltersValues={initialFiltersValues}
      {...other}
    />
  )
}
