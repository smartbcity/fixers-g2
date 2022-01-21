import { Box, Stack, Typography } from '@mui/material'
import { Link, Table, TableProps } from '@smartb/g2-components'
import { MergeMuiElementProps } from '@smartb/g2-themes'
import React, { useCallback, useMemo, useState } from 'react'
import { Organization } from '../OrgCreation/OrgCreation'
import { OrgFilters } from './OrgFilters'

export interface OrgTableBasicProps {
  organizations: Organization[]
  initialFiltersValues?: { search?: string; page?: number }
  onFetchOrganizations: (page: number, search?: string) => void
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
    () => [
      {
        name: 'Organisation',
        cell: (row: Organization) => (
          <Stack
            display='flex'
            justifyContent='space-around'
            alignItems='center'
            direction='row'
            data-tag='___react-data-table-allow-propagation___'
          >
            {row.image && (
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
                  src={row.image}
                  alt={`Le logo de l'entreprise ${row.name}`}
                  className='companyImage'
                />
              </Box>
            )}
            <Typography
              data-tag='___react-data-table-allow-propagation___'
              align='left'
            >
              {row.name}
            </Typography>
          </Stack>
        )
      },
      {
        name: 'Adresse',
        cell: (row: Organization) => (
          <Typography data-tag='___react-data-table-allow-propagation___'>
            {`${row.address}, ${row.postalCode} ${row.city}`}
          </Typography>
        )
      },
      {
        name: 'Site web',
        cell: (row: Organization) => (
          <Link
            data-tag='___react-data-table-allow-propagation___'
            href={row.webSite}
          >
            {row.webSite}
          </Link>
        )
      }
    ],
    []
  )

  return (
    <>
      <OrgFilters onSubmit={onSubmitFilters} />
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
