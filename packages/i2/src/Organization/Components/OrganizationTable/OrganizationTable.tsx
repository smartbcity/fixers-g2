import { Typography } from '@mui/material'
import { Link, MenuItem, Presentation } from '@smartb/g2-components'
import { Column, Table, TableProps, CellProps } from '@smartb/g2-layout'
import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'
import React, { useMemo } from 'react'
import { ExtandedColumnsParams, useExtendedColumns } from '../../../Commons/useExtendedColumns'
import { Organization } from '../OrganizationFactory'
import {
  OrganizationFilters,
} from './OrganizationFilters'

export type OrganizationTableFilters = {
  page?: number
  size?: number
} & OrganizationFilters

export type OrganizationTableBlockedFilters = {
  search?: boolean
  role?: boolean
}

export interface OrganizationTableBasicProps<T extends Organization> extends BasicProps {
  /**
   * The organizations to pe parsed in the table
   */
  organizations: T[]
  /**
   * The current page
   */
  page: number
  /**
   * The current page
   */
  setPage: (newPage: number) => void
  /**
   * The actions place on the top near the filters
   */
  tableActions?: React.ReactNode
  /**
   * Used for the pagination
   */
  totalPages?: number
  /**
   * The column extander module 
   */
  columnsExtander?: Omit<ExtandedColumnsParams<T>, "initialColumns">
  /**
   * The actions available on a organization
   */
  getActions?: (org: Organization) => MenuItem<{}>[]
}

export type OrganizationTableProps<T extends Organization = Organization> = MergeMuiElementProps<
  Omit<TableProps<T>, 'columns' | 'data' | 'page' | 'onChangePage'>,
  OrganizationTableBasicProps<T>
>

export const OrganizationTable = <T extends Organization = Organization>(props: OrganizationTableProps<T>) => {
  const {
    organizations,
    getActions,
    page,
    setPage,
    tableActions,
    totalPages,
    columnsExtander,
    ...other
  } = props

  const columns = useMemo(
    (): Column<T>[] => [
      {
        Header: 'Organisation',
        accessor: 'name',
        Cell: ({ row }: CellProps<T>) => (
          <Presentation label={row.original.name} />
        )
      },
      {
        Header: 'Adresse',
        accessor: 'address',
        Cell: ({ row }: CellProps<T>) =>
          row.original.address ? (
            <Typography>
              {`${row.original.address.street} ${row.original.address.postalCode} ${row.original.address.city}`}
            </Typography>
          ) : undefined
      },
      {
        Header: 'Site web',
        accessor: 'website',
        Cell: ({ row }: CellProps<T>) => (
          <Link
            href={row.original.website}
            onClick={(e) => e.stopPropagation()}
          >
            {row.original.website}
          </Link>
        )
      },
    ],
    []
  )

  const completeColumns = useExtendedColumns({
    initialColumns: columns,
    ...columnsExtander
  })

  return (
    <Table<T>
      page={page}
      handlePageChange={setPage}
      data={organizations}
      columns={completeColumns}
      totalPages={totalPages}
      variant='grounded'
      {...other}
    />
  )
}
