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
import { useTranslation } from 'react-i18next'

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
    ...other
  } = props
  const { t } = useTranslation()

  const columns = useMemo(
    (): Column<T>[] => [
      {
        Header: t('g2.organization'),
        accessor: 'name',
        Cell: ({ row }: CellProps<T>) => (
          <Presentation
            displayAvatar={false}
            label={row.original.name}
            imgSrc={row.original.logo}
          />
        )
      } as Column<T>,
      {
        Header: t('g2.address'),
        accessor: 'address',
        Cell: ({ row }: CellProps<T>) =>
          row.original.address ? (
            <Typography>
              {`${row.original.address.street} ${row.original.address.postalCode} ${row.original.address.city}`}
            </Typography>
          ) : undefined
      } as Column<T>,
      {
        Header: t('g2.website'),
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
    [t]
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
