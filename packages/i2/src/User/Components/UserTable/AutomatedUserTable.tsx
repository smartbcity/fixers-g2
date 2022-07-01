import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'
import React, { useState } from 'react'
import { UserTable, UserTableProps } from './UserTable'
import { GetUsersOptions, useGetUsers } from '../../Api'
import { i2Config, useAuth } from '@smartb/g2-providers'
import { User } from '../../Domain'

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
   * Pass the current state of the filters
   */
  filters?: any
}

export type AutomatedUserTableProps<T extends User = User> = MergeMuiElementProps<
  Omit<UserTableProps<T>, 'users' | 'onFiltersChanged' | 'totalPages' | 'page' | 'setPage'>,
  AutomatedUserTableBasicProps
>

export const AutomatedUserTable = <T extends User = User>(props: AutomatedUserTableProps<T>) => {
  const {
    filters,
    getUsersOptions,
    ...other
  } = props

  const [page, setPage] = useState<number>(filters?.page ?? 1)

  const { keycloak } = useAuth()

  const getUsers = useGetUsers({
    apiUrl: i2Config().userUrl,
    jwt: keycloak.token,
    queryParams: {
      page,
      ...filters
    },
    options: getUsersOptions
  })

  return (
    <UserTable<T>
      page={page}
      setPage={setPage}
      isLoading={!getUsers.isSuccess}
      users={getUsers.data?.users ?? []}
      totalPages={
        getUsers.data?.totalPages && getUsers.data?.totalPages > 1
          ? getUsers.data?.totalPages
          : undefined
      }
      {...other}
    />
  )
}
