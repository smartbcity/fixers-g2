import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'
import React, { useCallback, useEffect } from 'react'
import { request, useAsyncResponse } from 'utils'
import { UserTableFilters } from '.'
import { User, OrganizationRef } from '../UserFactory/types'
import { UserTable, UserTableProps } from './UserTable'

export interface AutomatedUserTableBasicProps extends BasicProps {
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
  initialFiltersValues?: UserTableFilters
  /**
   * The organizationRefs for the filter organizations
   */
  organizationsRefs?: OrganizationRef[]
  /**
   * The event called when the filters changes
   */
  submitted?: (params?: UserTableFilters) => void
}

export type AutomatedUserTableProps = MergeMuiElementProps<
  Omit<UserTableProps, 'users' | 'onFetchUsers'>,
  AutomatedUserTableBasicProps
>

export const AutomatedUserTable = (props: AutomatedUserTableProps) => {
  const {
    apiUrl,
    jwt,
    initialFiltersValues,
    organizationsRefs,
    submitted,
    ...other
  } = props

  const getUsers = useCallback(
    async (params?: UserTableFilters) => {
      const res = await request<{ users: User[]; total: number }[]>({
        url: `${apiUrl}/getAllUsers`,
        method: 'POST',
        body: JSON.stringify({
          ...params,
          page: params?.page ? params?.page - 1 : 0,
          size: 10
        }),
        jwt: jwt
      })
      if (res) {
        return {
          users: res[0]?.users,
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

  const { result, status, execute } = useAsyncResponse(getUsers, false)

  useEffect(() => {
    execute(initialFiltersValues)
  }, [execute, initialFiltersValues])

  const onFetchUsers = useCallback(
    (params?: UserTableFilters) => {
      execute(params)
      submitted && submitted(params)
    },
    [execute, submitted]
  )

  return (
    <UserTable
      organizationsRefs={organizationsRefs}
      isLoading={status !== 'SUCCESS'}
      users={result?.users ?? []}
      totalPages={
        result?.totalPages && result?.totalPages > 1
          ? result?.totalPages
          : undefined
      }
      onFetchUsers={onFetchUsers}
      initialFiltersValues={initialFiltersValues}
      {...other}
    />
  )
}
