import { Box, IconButton } from '@mui/material'
import { CheckBox } from '@smartb/g2-forms'
import {
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
  TableOptions,
  ColumnDef,
  Table,
  RowModel,
  Row
} from '@tanstack/react-table'
import React, { useMemo } from 'react'
import { Arrow } from '../icons'

interface UseTableOptions<Data extends {}>
  extends Omit<TableOptions<Data>, 'getCoreRowModel'> {
  /**
   * @default false
   */
  isExpandable?: boolean
  /**
   * @default false
   */
  isSelectabale?: boolean
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
  /**
   * Do not display the checkbox return false.
   */
  isSelectableRow?: (rowIds: Row<Data>) => boolean
  getCoreRowModel?: (table: Table<any>) => () => RowModel<any>
}

export const useTable = <Data extends {}>(
  options: UseTableOptions<Data>
): Table<Data> => {
  const {
    columns,
    isExpandable = false,
    isSelectabale = false,
    expandIconPosition = 'start',
    expandIcon,
    noToggleAllPageRowsSelected = false,
    isSelectableRow,
    ...other
  } = options

  const extendedColumns = useMemo(() => {
    const expanderRow: ColumnDef<Data> = {
      id: 'expander',
      cell: ({ row }) => {
        return (
          <div onClick={(e) => e.stopPropagation()}>
            <IconButton className='AruiTable-actionColumn'>
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
      ...(isExpandable && expandIconPosition === 'start' ? [expanderRow] : []),
      ...(isSelectabale
        ? [
            {
              id: 'selection',
              accessor: 'selection',
              header: ({ table }) => {
                return noToggleAllPageRowsSelected ? (
                  <div />
                ) : (
                  <CheckBox
                    onChange={(_, value) =>
                      table.toggleAllPageRowsSelected(value)
                    }
                  />
                )
              },
              cell: ({ row }) => {
                const isSelectable = isSelectableRow
                  ? isSelectableRow(row)
                  : true
                return (
                  isSelectable && (
                    <CheckBox
                      onChange={(_, value) => row.toggleSelected(value)}
                      onClick={(event) => event.stopPropagation()}
                    />
                  )
                )
              },
              className: 'AruiTable-actionColumn'
            } as ColumnDef<Data>
          ]
        : []),
      ...columns,
      ...(isExpandable && expandIconPosition === 'end' ? [expanderRow] : [])
    ]
  }, [
    columns,
    isExpandable,
    isSelectabale,
    expandIconPosition,
    expandIcon,
    noToggleAllPageRowsSelected,
    isSelectableRow
  ])

  return useReactTable({
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    ...other,
    columns: extendedColumns
  })
}
