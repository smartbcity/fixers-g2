import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'
import React, { useCallback } from 'react'
import { UserTableFilters } from './index'
import { User, OrganizationRef } from '../../Domain'
import { UserTable, UserTableProps } from './UserTable'
import { UseQueryResult } from 'react-query'

export interface AutomatedUserTableBasicProps extends BasicProps {
  /**
   * The result of the hook `useGetUsers`
   */
  getUsers: UseQueryResult<
    {
      users: User[]
      totalPages: number
    },
    unknown
  >
  /**
   * The initial states of the filters
   */
  initialFiltersValues?: UserTableFilters
  /**
   * The organizationRefs for the filter organizations
   */
  organizationsRefs?: OrganizationRef[]
  /**
   * The event called when the filters changes
   */
  onSubmitFilters: (params?: UserTableFilters) => void
}

export type AutomatedUserTableProps = MergeMuiElementProps<
  Omit<UserTableProps, 'users' | 'onFetchUsers'>,
  AutomatedUserTableBasicProps
>

export const AutomatedUserTable = (props: AutomatedUserTableProps) => {
  const {
    getUsers,
    initialFiltersValues,
    organizationsRefs,
    onSubmitFilters,
    ...other
  } = props

  const onFetchUsers = useCallback(
    (params?: UserTableFilters) => {
      onSubmitFilters(params)
    },
    [onSubmitFilters]
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
      onFetchUsers={onFetchUsers}
      initialFiltersValues={initialFiltersValues}
      {...other}
    />
  )
}
