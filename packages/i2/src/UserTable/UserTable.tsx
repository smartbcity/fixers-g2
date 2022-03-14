import { Avatar, Box, Stack, Typography } from '@mui/material'
import { Link, MenuItem, MoreOptions } from '@smartb/g2-components'
import { Column, Table, TableProps, CellProps } from '@smartb/g2-layout'
import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'
import React, { useCallback, useMemo, useState } from 'react'
import { UserFilters, UserFiltersProps } from './UserFilters'
import { stringToAvatarAttributs } from 'utils'
import { User, OrganizationRef } from '../UserFactory/types'
import { Option } from '@smartb/g2-forms'

export type UserTableFilters = {
  page?: number
} & UserFilters

export type UserTableBlockedFilters = {
  search?: boolean
  organizationId?: boolean
  role?: boolean
}

export interface UserTableBasicProps extends BasicProps {
  /**
   * The user to pe parsed in the table
   */
  users: User[]
  /**
   * The initial values of the filters
   */
  initialFiltersValues?: UserTableFilters
  /**
   * The filters that will be used in the api calls but not rendered for the user.
   * by default they are all set to false
   */
  blockedFilters?: UserTableBlockedFilters
  /**
   * The organizationRefs are essentials for the filter organizations
   */
  organizationsRefs?: OrganizationRef[]
  /**
   * The roles options needed to make the roles select.
   * The default role selected in the form will be the first of the list
   */
  rolesOptions?: Option[]
  /**
   * The actions place on the top near the filters
   */
  tableActions?: React.ReactNode
  /**
   * The event called when the filters are submitted or when the pagination updates
   */
  onFetchUsers: (params?: UserTableFilters) => void
  /**
   * Used for the pagination
   */
  totalPages?: number
  /**
   * The props passes to the filters component
   */
  filtersProps?: Partial<UserFiltersProps>
  /**
   * The actions available on a user
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
    organizationsRefs,
    blockedFilters,
    rolesOptions,
    tableActions,
    totalPages,
    ...other
  } = props
  const [page, setPage] = useState(initialFiltersValues?.page ?? 1)
  const [filters, setFilters] = useState<UserFilters | undefined>(
    initialFiltersValues
  )

  const onFetch = useCallback(
    (
      pageNumber?: number,
      search?: string,
      organizationId?: string,
      role?: string
    ) => {
      onFetchUsers({
        page: pageNumber ?? page,
        search: search ?? filters?.search,
        organizationId: organizationId ?? filters?.organizationId,
        role: role ?? filters?.role
      })
    },
    [onFetchUsers, filters, page]
  )

  const onSubmitFilters = useCallback(
    (values: UserFilters) => {
      setFilters(values)
      onFetch(undefined, values.search, values.organizationId, values.role)
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
        Cell: ({ row }: CellProps<User>) =>
          row.original.address ? (
            <Typography>
              {`${row.original.address.street}, ${row.original.address.postalCode} ${row.original.address.city}`}
            </Typography>
          ) : undefined,
        width: 200
      },
      {
        Header: 'Email',
        accessor: 'email',
        Cell: ({ row }: CellProps<User>) => (
          <Typography>{row.original.email}</Typography>
        ),
        width: 250
      },
      ...(!!users[0] && !!users[0].memberOf
        ? [
            {
              Header: 'Organization',
              accessor: 'memberOf',
              Cell: ({ row }: CellProps<User>) => {
                if (!!getOrganizationUrl && row.original.memberOf?.id) {
                  return (
                    <Link
                      href={getOrganizationUrl(row.original.memberOf?.id)}
                      target='_blank'
                    >
                      {row.original.memberOf?.name}
                    </Link>
                  )
                }
                return <Typography>{row.original.memberOf?.name}</Typography>
              },
              width: 150
            } as Column<User>
          ]
        : []),
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
    <Box
      sx={{
        '& .AruiTable-root': {
          borderRadius: '5px',
          boxShadow: 1,
          background: 'white',
          marginBottom: '20px'
        }
      }}
    >
      <Table<User>
        page={page}
        handlePageChange={onChangePage}
        totalPages={totalPages}
        data={users}
        columns={columns}
        variant='grounded'
        header={
          <UserFilters
            organizationsRefs={organizationsRefs}
            onSubmit={onSubmitFilters}
            initialFiltersValues={initialFiltersValues}
            blockedFilters={blockedFilters}
            rolesOptions={rolesOptions}
            tableActions={tableActions}
            {...filtersProps}
          />
        }
        {...other}
      />
    </Box>
  )
}
