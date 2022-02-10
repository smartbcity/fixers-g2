import React from 'react'
import {
  TableOptions,
  TableState,
  UseExpandedOptions,
  UseExpandedState,
  UseRowSelectOptions,
  UsePaginationOptions,
  UseRowSelectState,
  UsePaginationState,
  CellProps as BasicCellProps,
  Row as BasicRow,
  UseExpandedRowProps,
  UseRowSelectRowProps,
  TableInstance,
  UseExpandedInstanceProps,
  UseRowSelectInstanceProps,
  UsePaginationInstanceProps,
  Column as BasicColumn,
  PluginHook,
  useTable,
  useFlexLayout
} from 'react-table'

export interface CompleteTableOptions<Data extends BasicData>
  extends Omit<TableOptions<Data>, 'data' | 'columns'>,
    UseExpandedOptions<Data>,
    UseRowSelectOptions<Data>,
    UsePaginationOptions<Data> {}

export interface CompleteTableState<Data extends BasicData>
  extends TableState<Data>,
    UseExpandedState<Data>,
    UseRowSelectState<Data>,
    UsePaginationState<Data> {}

export interface Row<Data extends BasicData>
  extends BasicRow<Data>,
    UseExpandedRowProps<Data>,
    UseRowSelectRowProps<Data> {}

export interface CellProps<Data extends BasicData>
  extends BasicCellProps<Data> {
  row: Row<Data>
}

export interface CompleteTableInstance<Data extends BasicData>
  extends TableInstance<Data>,
    UseExpandedInstanceProps<Data>,
    UseRowSelectInstanceProps<Data>,
    UsePaginationInstanceProps<Data> {
  state: CompleteTableState<Data>
  rows: Row<Data>[]
  selectedFlatRows: Row<Data>[]
}

export type BasicData = {
  id: string | number
}

export type Column<Data extends BasicData> = BasicColumn<Data> & {
  className?: string
  style?: React.CSSProperties
}

export const UseCompleteTable = <Data extends BasicData>(
  variant: 'grounded' | 'elevated',
  options: CompleteTableOptions<Data> & {
    data: Data[]
    columns: Column<Data>[]
    initialState?: Partial<CompleteTableState<Data>>
  },
  ...plugins: PluginHook<Data>[]
): CompleteTableInstance<Data> => {
  if (variant === 'grounded') {
    //@ts-ignore
    return useTable(options, ...plugins)
  } else {
    //@ts-ignore
    return useTable(options, ...plugins, useFlexLayout)
  }
}

export const customCellExample = `
{
  Header: 'Name',
  accessor: 'name',
  Cell: ({ row }: CellProps<Data>) => (
    <Typography>{row.original.name}</Typography>
  )
}
`
export const classes = `
export interface TableClasses {
  table?: string
  tableHead?: string
  tableBody?: string
  tableFooter?: string
  tableHeaderRow?: string
  tableRow?: string
  tableCell?: string
  tableHeaderCell?: string
  Pagination?: string
}
`
export const styles = `
export interface TableStyles {
  table?: React.CSSProperties
  tableHead?: React.CSSProperties
  tableBody?: React.CSSProperties
  tableFooter?: React.CSSProperties
  tableHeaderRow?: React.CSSProperties
  tableRow?: React.CSSProperties
  tableCell?: React.CSSProperties
  tableHeaderCell?: React.CSSProperties
  Pagination?: React.CSSProperties
}
`
