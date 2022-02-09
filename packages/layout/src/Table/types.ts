import React from 'react'
import {
  TableOptions,
  TableState,
  UseExpandedOptions,
  UseExpandedState,
  UseRowSelectOptions,
  UseRowSelectState,
  CellProps as BasicCellProps,
  Row as BasicRow,
  UseExpandedRowProps,
  UseRowSelectRowProps,
  TableInstance,
  UseExpandedInstanceProps,
  UseRowSelectInstanceProps,
  Column as BasicColumn,
  PluginHook,
  useTable
} from 'react-table'

export interface CompleteTableOptions<Data extends object>
  extends Omit<TableOptions<Data>, 'data' | 'columns'>,
    UseExpandedOptions<Data>,
    UseRowSelectOptions<Data> {}

export interface CompleteTableState<Data extends object>
  extends TableState<Data>,
    UseExpandedState<Data>,
    UseRowSelectState<Data> {}

export interface Row<Data extends object>
  extends BasicRow<Data>,
    UseExpandedRowProps<Data>,
    UseRowSelectRowProps<Data> {}

export interface CellProps<Data extends object> extends BasicCellProps<Data> {
  row: Row<Data>
}

export interface CompleteTableInstance<Data extends object>
  extends TableInstance<Data>,
    UseExpandedInstanceProps<Data>,
    UseRowSelectInstanceProps<Data> {
  state: CompleteTableState<Data>
  rows: Row<Data>[]
  selectedFlatRows: Row<Data>[]
}

export type Column<Data extends object> = BasicColumn<Data> & {
  className?: string
  style?: React.CSSProperties
}

export const UseCompleteTable = <Data extends object>(
  options: CompleteTableOptions<Data> & {
    data: Data[]
    columns: Column<Data>[]
  },
  ...plugins: PluginHook<Data>[]
): CompleteTableInstance<Data> => {
  //@ts-ignore
  return useTable(options, ...plugins)
}
