import { Typography } from '@mui/material'
import { Link, MenuItem, Presentation } from '@smartb/g2-components'
import { Column, Table, TableProps, CellProps } from '@smartb/g2-layout'
import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'
import React, { useMemo } from 'react'
import {
  ExtandedColumnsParams,
  useExtendedColumns
} from '../../../Commons/useExtendedColumns'
import { Organization } from '../../Domain'

export interface OrganizationTableStrings {
  /**
   * @default "Oganisation"
   */
  organization?: string
  /**
   * @default "Adresse"
   */
  adress?: string
  /**
   * @default "Site web"
   */
  website?: string
}

export interface OrganizationTableBasicProps<T extends Organization>
  extends BasicProps {
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
  columnsExtander?: Omit<ExtandedColumnsParams<T>, 'initialColumns'>
  /**
   * The actions available on a organization
   */
  getActions?: (org: Organization) => MenuItem<{}>[]
  /**
   * The component to displauy if no user is found
   */
  noDataComponent?: JSX.Element
  /**
   * The prop to use to add custom translation to the component
   */
  strings?: OrganizationTableStrings
}

export type OrganizationTableProps<T extends Organization = Organization> =
  MergeMuiElementProps<
    Omit<TableProps<T>, 'columns' | 'data' | 'page' | 'onChangePage'>,
    OrganizationTableBasicProps<T>
  >

export const OrganizationTable = <T extends Organization = Organization>(
  props: OrganizationTableProps<T>
) => {
  const {
    organizations,
    getActions,
    page,
    setPage,
    tableActions,
    totalPages,
    columnsExtander,
    noDataComponent,
    isLoading,
    strings,
    ...other
  } = props

  const columns = useMemo(
    (): Column<T>[] => [
      {
        Header: strings?.organization ?? 'Organisation',
        accessor: 'name',
        Cell: ({ row }: CellProps<T>) => (
          <Presentation displayAvatar={false} label={row.original.name} />
        )
      } as Column<T>,
      {
        Header: strings?.adress ?? 'Adresse',
        accessor: 'address',
        Cell: ({ row }: CellProps<T>) =>
          row.original.address ? (
            <Typography>
              {`${row.original.address.street} ${row.original.address.postalCode} ${row.original.address.city}`}
            </Typography>
          ) : undefined
      } as Column<T>,
      {
        Header: strings?.website ?? 'Site web',
        accessor: 'website',
        Cell: ({ row }: CellProps<T>) => (
          <Link
            href={row.original.website}
            onClick={(e) => e.stopPropagation()}
          >
            {row.original.website}
          </Link>
        )
      } as Column<T>
    ],
    [strings]
  )

  const completeColumns = useExtendedColumns({
    initialColumns: columns,
    ...columnsExtander
  })

  if (organizations.length === 0 && noDataComponent && !isLoading)
    return noDataComponent
  return (
    <Table<T>
      page={page}
      handlePageChange={setPage}
      data={organizations}
      columns={completeColumns}
      totalPages={totalPages}
      variant='grounded'
      isLoading={isLoading}
      {...other}
    />
  )
}
