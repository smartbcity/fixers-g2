import { Typography } from '@mui/material'
import { Link as G2Link, Presentation } from '@smartb/g2-components'
import { Column, Table, TableProps, CellProps } from '@smartb/g2-layout'
import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'
import React, { useMemo } from 'react'
import { User } from '../../Domain'
import { OrganizationId } from '../../../Organization'
import {
  ExtandedColumnsParams,
  useExtendedColumns
} from '../../../Commons/useExtendedColumns'
import { Link, LinkProps } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export interface UserTableBasicProps<T extends User> extends BasicProps {
  /**
   * The user to pe parsed in the table
   */
  users: T[]
  /**
   * Used for the pagination
   */
  totalPages?: number
  /**
   * The current page
   */
  page: number
  /**
   * The current page
   */
  setPage: (newPage: number) => void
  /**
   * The column extander module
   */
  columnsExtander?: Omit<ExtandedColumnsParams<T>, 'initialColumns'>
  /**
   * If you want the columns organization to contain links redirecting to the organization page provide this prop
   */
  getOrganizationUrl?: (organizationId: OrganizationId) => string
  /**
   * Force the display of the organization over the user list (if the first user of the list has no organization)
   *
   * @default false
   */
  hasOrganizations?: boolean
  /**
   * The component to displauy if no user is found
   */
  noDataComponent?: JSX.Element
}

export type UserTableProps<T extends User = User> = MergeMuiElementProps<
  Omit<TableProps<T>, 'columns' | 'data' | 'page' | 'onChangePage'>,
  UserTableBasicProps<T>
>

export const UserTable = <T extends User = User>(props: UserTableProps<T>) => {
  const {
    users,
    getOrganizationUrl,
    totalPages,
    hasOrganizations = false,
    columnsExtander,
    page,
    setPage,
    noDataComponent,
    isLoading,
    ...other
  } = props
  const { t } = useTranslation()
  const columns = useMemo(
    (): Column<T>[] => [
      {
        Header: t('g2.user'),
        accessor: 'givenName',
        Cell: ({ row }: CellProps<T>) => (
          <Presentation
            label={`${row.original.givenName} ${row.original.familyName}`}
          />
        ),
        maxWidth: 220,
        width: 170
      } as Column<T>,
      {
        Header: t('g2.address'),
        accessor: 'address',
        Cell: ({ row }: CellProps<T>) =>
          row.original.address ? (
            <Typography>
              {`${row.original.address.street} ${row.original.address.postalCode} ${row.original.address.city}`}
            </Typography>
          ) : undefined,
        width: 200
      } as Column<T>,
      {
        Header: t('g2.email'),
        accessor: 'email',
        Cell: ({ row }: CellProps<T>) => (
          <Typography>{row.original.email}</Typography>
        ),
        width: 250
      } as Column<T>,
      ...((!!users[0] && !!users[0].memberOf) || hasOrganizations
        ? [
            {
              Header: t('g2.organization'),
              accessor: 'memberOf',
              Cell: ({ row }: CellProps<T>) => {
                if (!!getOrganizationUrl && row.original.memberOf?.id) {
                  return (
                    <G2Link<LinkProps>
                      componentProps={{
                        to: getOrganizationUrl(row.original.memberOf?.id)
                      }}
                      onClick={(e) => e.stopPropagation()}
                      component={Link}
                      sx={{ color: '#676879' }}
                    >
                      {row.original.memberOf?.name}
                    </G2Link>
                  )
                }
                return <Typography>{row.original.memberOf?.name}</Typography>
              },
              width: 150
            } as Column<T>
          ]
        : [])
    ],
    [getOrganizationUrl, t, hasOrganizations]
  )

  const completeColumns = useExtendedColumns<T>({
    initialColumns: columns,
    ...columnsExtander
  })

  if (users.length === 0 && noDataComponent && !isLoading)
    return noDataComponent
  return (
    <Table<T>
      page={page}
      handlePageChange={setPage}
      totalPages={totalPages}
      data={users}
      columns={completeColumns}
      variant='grounded'
      isLoading={isLoading}
      {...other}
    />
  )
}
