import { Box, IconButton } from '@mui/material'
import { CheckBox } from '@smartb/g2-forms'
import {
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
  TableOptions,
  ColumnDef,
  Table,
  RowModel
} from '@tanstack/react-table'
import React, { useMemo } from 'react'
import { Arrow } from '../icons'

export type G2ColumnDef<Data extends {}> = ColumnDef<Data> & {
  className?: string
  style?: React.CSSProperties
}

export interface UseTableOptions<Data extends {}>
  extends Omit<TableOptions<Data>, 'getCoreRowModel' | 'columns'> {
  /**
   * The columns to display in the table
   */
  columns: G2ColumnDef<Data>[]
  /**
   * The poistion in the row of the expand icon
   * @default 'start'
   */
  expandIconPosition?: 'start' | 'end'
  /**
   * You optionnal custom icon used to indicate the expand status of a row
   */
  expandIcon?: JSX.Element
  /**
   * Indicates if there shouldn't be a checkbox to check or uncheck all the rows on the current page at the same time
   * @default false
   */
  noToggleAllPageRowsSelected?: boolean
  getCoreRowModel?: (table: Table<any>) => () => RowModel<any>
}

export const useTable = <Data extends {}>(
  options: UseTableOptions<Data>
): Table<Data> => {
  const {
    columns,
    enableExpanding = false,
    enableRowSelection = false,
    expandIconPosition = 'start',
    expandIcon,
    noToggleAllPageRowsSelected = false,
    ...other
  } = options

  const extendedColumns = useMemo(() => {
    const expanderRow: G2ColumnDef<Data> = {
      id: 'expander',
      cell: ({ row }) => {
        return (
          <div onClick={(e) => e.stopPropagation()}>
            <IconButton
              className='AruiTable-actionColumn'
              onClick={() => row.toggleExpanded()}
            >
              <Box
                sx={{
                  transform:
                    row.getIsExpanded() && expandIconPosition === 'start'
                      ? 'rotate(-180deg)'
                      : row.getIsExpanded() && expandIconPosition === 'end'
                      ? 'rotate(180deg)'
                      : '',
                  transition: '0.2s',
                  display: 'flex'
                }}
              >
                {expandIcon || (
                  <Arrow
                    key='expanderIcon'
                    color='#353945'
                    width='20px'
                    height='20px'
                    style={{
                      transform: 'rotate(-90deg)'
                    }}
                  />
                )}
              </Box>
            </IconButton>
          </div>
        )
      },
      className: 'AruiTable-actionColumn'
    }
    return [
      ...(enableExpanding && expandIconPosition === 'start'
        ? [expanderRow]
        : []),
      ...(enableRowSelection
        ? [
            {
              id: 'selection',
              accessor: 'selection',
              header: ({ table }) => {
                return noToggleAllPageRowsSelected ? (
                  <div />
                ) : (
                  <CheckBox
                    onChange={(_, value) => {
                      table.toggleAllPageRowsSelected(value)
                    }}
                    checked={table.getIsAllRowsSelected()}
                  />
                )
              },
              cell: ({ row }) => {
                if (!row.getCanSelect()) return undefined
                return (
                  <CheckBox
                    onChange={(_, value) => row.toggleSelected(value)}
                    checked={row.getIsSelected()}
                    onClick={(event) => event.stopPropagation()}
                  />
                )
              },
              className: 'AruiTable-actionColumn'
            } as G2ColumnDef<Data>
          ]
        : []),
      ...columns,
      ...(enableExpanding && expandIconPosition === 'end' ? [expanderRow] : [])
    ]
  }, [
    columns,
    enableExpanding,
    enableRowSelection,
    expandIconPosition,
    expandIcon,
    noToggleAllPageRowsSelected
  ])

  return useReactTable({
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    enableExpanding,
    enableRowSelection,
    ...other,
    columns: extendedColumns
  })
}
