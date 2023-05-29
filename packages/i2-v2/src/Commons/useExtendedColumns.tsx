import React from 'react'
import { MenuItem, MoreOptions } from '@smartb/g2-components'
import { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'

export interface ExtandedColumnsParams<T extends object> {
  initialColumns: ColumnDef<T>[]
  /**
   * The additional columns to add to the table
   */
  additionalColumns?: ColumnDef<T>[]
  /**
   * The id or the accessor of the columns you want to block
   */
  blockedColumns?: string[]
  /**
   * The actions available on a organization
   */
  getActions?: (org: T) => MenuItem<{}>[]
}

export const useExtendedColumns = <T extends object>(
  extandParams: ExtandedColumnsParams<T>
) => {
  const {
    initialColumns,
    additionalColumns = [],
    blockedColumns,
    getActions
  } = extandParams
  const columns = useMemo(() => {
    const actions = getActions
      ? [
          {
            id: 'moreoptions',
            Cell: ({ row }) => (
              <MoreOptions
                options={getActions(row.original)}
                onClick={(e) => e.stopPropagation()}
              />
            )
          } as ColumnDef<T>
        ]
      : []
    const columns: ColumnDef<T>[] = [
      ...initialColumns,
      ...additionalColumns,
      ...actions
    ]
    const columnsFiltered = blockedColumns
      ? columns.filter((col) => !blockedColumns.includes(col.id as string))
      : columns
    return columnsFiltered
  }, [initialColumns, additionalColumns, blockedColumns, getActions])
  return columns
}
