import { Avatar, Stack, Typography } from '@mui/material'
import { Link, MenuItem, MoreOptions } from '@smartb/g2-components'
import { Column, Table, TableProps, CellProps } from '@smartb/g2-layout'
import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'
import React, { useCallback, useMemo, useState } from 'react'
import { UserFilters, UserFiltersProps } from './UserFilters'
import { stringToAvatarAttributs } from 'utils'
import { User } from '../UserCreation/types'

export interface UserTableBasicProps extends BasicProps {
  /**
   * The user to pe parsed in the table
   */
  users: User[]
  /**
   * The initial values of the filters
   */
  initialFiltersValues?: { search?: string; page?: number }
  /**
   * The event called when the filters are submitted or when the pagination updates
   */
  onFetchUsers: (page: number, search?: string) => void
  /**
   * The props passes to the filters component
   */
  filtersProps?: Partial<UserFiltersProps>
  /**
   * The actions available on a useranization
   */
  getActions?: (user: User) => MenuItem<{}>[]
  /**
   * If you want the columns organization to contain links redirecting to the organization page provide this prop
   */
  getOrganizationUrl?: (organizationId: string) => string
}

export type UserTableProps = MergeMuiElementProps<
  Omit<TableProps<User>, 'columns' | 'data' | 'page' | 'onChangePage'>,
  UserTableBasicProps
>

export const UserTable = (props: UserTableProps) => {
  const {
    users,
    initialFiltersValues,
    onFetchUsers,
    filtersProps,
    getActions,
    getOrganizationUrl,
    ...other
  } = props
  const [page, setPage] = useState(initialFiltersValues?.page ?? 1)
  const [filters, setFilters] = useState<{ search?: string } | undefined>(
    initialFiltersValues
  )

  const onFetch = useCallback(
    (pageNumber?: number, search?: string) => {
      onFetchUsers(pageNumber ?? page, search ?? filters?.search)
    },
    [onFetchUsers, filters?.search, page]
  )

  const onSubmitFilters = useCallback(
    (values: { search?: string }) => {
      setFilters(values)
      onFetch(undefined, values.search)
    },
    [onFetch]
  )

  const onChangePage = useCallback(
    (page: number) => {
      setPage(page)
      onFetch(page)
    },
    [onFetch]
  )

  const columns = useMemo(
    (): Column<User>[] => [
      {
        Header: 'User',
        accessor: 'givenName',
        Cell: ({ row }: CellProps<User>) => {
          const attr = stringToAvatarAttributs(
            `${row.original.givenName} ${row.original.familyName}`
          )
          return (
            <Stack
              display='flex'
              justifyContent='flex-start'
              alignItems='center'
              direction='row'
            >
              <Avatar
                sx={{
                  bgcolor: attr.color,
                  marginRight: '10px'
                }}
              >
                {attr.label}
              </Avatar>
              <Stack>
                <Typography align='left'>{row.original.givenName}</Typography>
                <Typography align='left'>{row.original.familyName}</Typography>
              </Stack>
            </Stack>
          )
        },
        maxWidth: 220,
        width: 170
      },
      {
        Header: 'Adresse',
        accessor: 'address',
        Cell: ({ row }: CellProps<User>) => (
          <Typography>
            {`${row.original.address.street}, ${row.original.address.postalCode} ${row.original.address.city}`}
          </Typography>
        ),
        width: 200
      },
      {
        Header: 'Email',
        accessor: 'mail',
        Cell: ({ row }: CellProps<User>) => (
          <Typography>{row.original.mail}</Typography>
        ),
        width: 250
      },
      {
        Header: 'Organization',
        accessor: 'memberOf',
        Cell: ({ row }: CellProps<User>) => {
          if (!!getOrganizationUrl) {
            return (
              <Link href={getOrganizationUrl(row.original.memberOf.id)}>
                {row.original.memberOf.name}
              </Link>
            )
          }
          return <Typography>{row.original.memberOf.name}</Typography>
        },
        width: 150
      },
      ...(!!getActions
        ? [
            {
              id: 'moreoptions',
              Cell: ({ row }: CellProps<User>) => (
                <MoreOptions options={getActions(row.original)} />
              )
            }
          ]
        : [])
    ],
    [getActions, getOrganizationUrl]
  )

  return (
    <>
      <UserFilters onSubmit={onSubmitFilters} {...filtersProps} />
      <Table<User>
        page={page}
        handlePageChange={onChangePage}
        data={users}
        columns={columns}
        {...other}
      />
    </>
  )
}
