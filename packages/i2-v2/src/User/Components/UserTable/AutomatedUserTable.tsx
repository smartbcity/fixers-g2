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
export interface AutomatedUserTableBasicProps<T extends User = User>
  extends BasicProps {
  /**
   * The getUsers hook options
   */
  getUsersOptions?: GetUsersOptions<T>
  /**
   * Pass the current state of the filters
   */
  filters?: any
  /**
   * Override the default local page state
   */
  page?: number
  /**
   * the event called when the page changes
   */
  setPage?: (newPage: number) => void
}

export type AutomatedUserTableProps<T extends User = User> =
  MergeMuiElementProps<
    Omit<
      UserTableProps<T>,
      'users' | 'onFiltersChanged' | 'totalPages' | 'page' | 'setPage'
    >,
    AutomatedUserTableBasicProps<T>
  >

export const AutomatedUserTable = <T extends User = User>(
  props: AutomatedUserTableProps<T>
) => {
  const { filters, getUsersOptions, page, setPage, ...other } = props

  const [localPage, localSetPage] = useState<number>(1)

  const { keycloak } = useAuth()

  const getUsers = useGetUsers({
    apiUrl: i2Config().userUrl,
    jwt: keycloak.token,
    queryParams: {
      page: localPage - 1,
      ...filters
    },
    options: getUsersOptions
  })

  return (
    <UserTable<T>
      page={page ?? localPage}
      setPage={setPage ?? localSetPage}
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
