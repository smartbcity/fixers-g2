import React, { useMemo } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { Organization } from '../../Domain'
import { useTranslation } from 'react-i18next'
import {
  ExtandedColumnsParams,
  useExtendedColumns
} from '../../../Commons/useExtendedColumns'
import { TableCellText, UseTableOptions, useTable } from '@smartb/g2-layout'
import { Link, Presentation } from '@smartb/g2-components'

export interface useOrganizationTableStateParams<T extends Organization>
  extends Partial<UseTableOptions<T>> {
  /**
   * The column extander module
   */
  columnsExtander?: Omit<ExtandedColumnsParams<T>, 'initialColumns'>
  /**
   * The tableState returned by the useTable
   */
  organizations: T[]
}

export const useOrganizationTableState = <
  T extends Organization = Organization
>(
  params?: useOrganizationTableStateParams<T>
) => {
  const { columnsExtander, organizations = [], ...other } = params ?? {}
  const { t } = useTranslation()
  const columns = useMemo(
    (): ColumnDef<T>[] => [
      {
        header: t('g2.organization'),
        id: 'name',
        cell: ({ row }) => (
          <Presentation
            displayAvatar={false}
            label={row.original.name}
            imgSrc={row.original.logo}
          />
        )
      },
      {
        header: t('g2.address'),
        id: 'address',
        cell: ({ row }) =>
          row.original.address ? (
            <TableCellText
              value={`${row.original.address.street} ${row.original.address.postalCode} ${row.original.address.city}`}
            />
          ) : undefined
      },
      {
        header: t('g2.website'),
        id: 'website',
        cell: ({ row }) => (
          <Link
            href={row.original.website}
            onClick={(e) => e.stopPropagation()}
          >
            {row.original.website}
          </Link>
        )
      }
    ],
    [t]
  )

  const completeColumns = useExtendedColumns({
    initialColumns: columns,
    ...columnsExtander
  })

  return useTable({
    data: organizations,
    columns: completeColumns,
    getRowId: (row) => row.id,
    ...other
  })
}
