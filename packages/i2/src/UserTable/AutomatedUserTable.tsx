import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'
import React, { useCallback, useEffect } from 'react'
import { request, useAsyncResponse } from 'utils'
import { User } from '../UserCreation/types'
import { UserTable, UserTableProps } from './UserTable'

export interface AutomatedUserTableBasicProps extends BasicProps {
  apiUrl: string
  jwt?: string
  initialFiltersValues?: { search?: string; page?: number }
}

export type AutomatedUserTableProps = MergeMuiElementProps<
  Omit<UserTableProps, 'users' | 'onFetchUsers'>,
  AutomatedUserTableBasicProps
>

export const AutomatedUserTable = (props: AutomatedUserTableProps) => {
  const { apiUrl, jwt, initialFiltersValues, ...other } = props

  const getUsers = useCallback(
    async (params?: { page?: number; search?: string }) => {
      const res = await request<{ users: User[] }[]>({
        url: `${apiUrl}/getAllUsers`,
        method: 'POST',
        body: JSON.stringify({
          ...params,
          size: 10
        }),
        jwt: jwt
      })
      if (res) {
        return res[0].users
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
    (page: number, search?: string | undefined) => {
      execute({ page: page, search: search })
    },
    [execute]
  )

  return (
    <UserTable
      isLoading={status !== 'SUCCESS'}
      users={result ?? []}
      onFetchUsers={onFetchUsers}
      {...other}
    />
  )
}
