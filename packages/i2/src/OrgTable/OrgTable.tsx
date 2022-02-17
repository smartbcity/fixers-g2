import { Box, Stack, Typography } from '@mui/material'
import { Link, MenuItem, MoreOptions } from '@smartb/g2-components'
import { Column, Table, TableProps, CellProps } from '@smartb/g2-layout'
import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'
import React, { useCallback, useMemo, useState } from 'react'
import { Organization } from '../OrgCreation/types'
import { OrgFilters, OrgFiltersProps } from './OrgFilters'

export interface OrgTableBasicProps extends BasicProps {
  /**
   * The organizations to pe parsed in the table
   */
  organizations: Organization[]
  /**
   * The initial values of the filters
   */
  initialFiltersValues?: { search?: string; page?: number }
  /**
   * The event called when the filters are submitted or when the pagination updates
   */
  onFetchOrganizations: (page: number, search?: string) => void
  /**
   * The props passes to the filters component
   */
  filtersProps?: Partial<OrgFiltersProps>
  /**
   * The actions available on a organization
   */
  getActions?: (org: Organization) => MenuItem<{}>[]
}

export type OrgTableProps = MergeMuiElementProps<
  Omit<TableProps<Organization>, 'columns' | 'data' | 'page' | 'onChangePage'>,
  OrgTableBasicProps
>

export const OrgTable = (props: OrgTableProps) => {
  const {
    organizations,
    initialFiltersValues,
    onFetchOrganizations,
    filtersProps,
    getActions,
    ...other
  } = props
  const [page, setPage] = useState(initialFiltersValues?.page ?? 1)
  const [filters, setFilters] = useState<{ search?: string } | undefined>(
    initialFiltersValues
  )

  const onFetch = useCallback(
    (pageNumber?: number, search?: string) => {
      onFetchOrganizations(pageNumber ?? page, search ?? filters?.search)
    },
    [onFetchOrganizations, filters?.search, page]
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
    (): Column<Organization>[] => [
      {
        Header: 'Organisation',
        accessor: 'name',
        Cell: ({ row }: CellProps<Organization>) => (
          <Stack
            display='flex'
            justifyContent='space-around'
            alignItems='center'
            direction='row'
            data-tag='___react-data-table-allow-propagation___'
          >
            {row.original.image && (
              <Box
                width='50px'
                data-tag='___react-data-table-allow-propagation___'
                marginRight='10px'
                sx={{
                  '& .companyImage': {
                    width: '50px',
                    marginTop: '3px',
                    borderRadius: '5px'
                  }
                }}
              >
                <img
                  data-tag='___react-data-table-allow-propagation___'
                  src={row.original.image}
                  alt={`Le logo de l'entreprise ${row.original.name}`}
                  className='companyImage'
                />
              </Box>
            )}
            <Typography
              data-tag='___react-data-table-allow-propagation___'
              align='left'
            >
              {row.original.name}
            </Typography>
          </Stack>
        )
      },
      {
        Header: 'Adresse',
        accessor: 'address',
        Cell: ({ row }: CellProps<Organization>) => (
          <Typography data-tag='___react-data-table-allow-propagation___'>
            {`${row.original.address.street}, ${row.original.address.postalCode} ${row.original.address.city}`}
          </Typography>
        )
      },
      {
        Header: 'Site web',
        accessor: 'website',
        Cell: ({ row }: CellProps<Organization>) => (
          <Link
            data-tag='___react-data-table-allow-propagation___'
            href={row.original.website}
          >
            {row.original.website}
          </Link>
        )
      },
      ...(!!getActions
        ? [
            {
              id: 'moreoptions',
              Cell: ({ row }: CellProps<Organization>) => (
                <MoreOptions options={getActions(row.original)} />
              )
            }
          ]
        : [])
    ],
    [getActions]
  )

  return (
    <>
      <OrgFilters onSubmit={onSubmitFilters} {...filtersProps} />
      <Table<Organization>
        page={page}
        handlePageChange={onChangePage}
        data={organizations}
        columns={columns}
        {...other}
      />
    </>
  )
}
