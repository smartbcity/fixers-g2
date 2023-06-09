import React from 'react'
import { G2ColumnDef } from '../TableV2'
import {
  TableCellContact,
  TableCellContactProps,
  TableCellDate,
  TableCellDateProps,
  TableCellLink,
  TableCellLinkProps,
  TableCellNumber,
  TableCellNumberProps,
  TableCellProfile,
  TableCellProfileProps,
  TableCellText,
  TableCellTextProps
} from './.'
import { Column } from '../Table'

type ColumnGeneratorParams<CellProps, Data, ColumnType> = Omit<
  ColumnType,
  'cell' | 'Cell'
> & {
  getCellProps: (row: Data) => CellProps
}

type ColumnGenerator<CellProps, Data, ColumnType> = (
  params: ColumnGeneratorParams<CellProps, Data, ColumnType>
) => ColumnType

const getColumnGenerator =
  <
    CellProps,
    Data extends {} = {},
    ColumnType extends G2ColumnDef<Data> | Column<Data> = any
  >(
    CellElement: React.ElementType
  ): ColumnGenerator<CellProps, Data, ColumnType> =>
  (params) => {
    const { getCellProps, ...other } = params
    //@ts-ignore
    return {
      ...other,
      cell: ({ row }) => <CellElement {...getCellProps(row.original)} />
    } as ColumnType
  }

export type ColumnGenerators<Data, ColumnType> = {
  contact: ColumnGenerator<TableCellContactProps, Data, ColumnType>
  date: ColumnGenerator<TableCellDateProps, Data, ColumnType>
  link: ColumnGenerator<TableCellLinkProps, Data, ColumnType>
  number: ColumnGenerator<TableCellNumberProps, Data, ColumnType>
  profile: ColumnGenerator<TableCellProfileProps, Data, ColumnType>
  text: ColumnGenerator<TableCellTextProps, Data, ColumnType>
}

export const columnsGenerators = {
  contact: getColumnGenerator<TableCellContactProps>(TableCellContact),
  date: getColumnGenerator<TableCellDateProps>(TableCellDate),
  link: getColumnGenerator<TableCellLinkProps>(TableCellLink),
  number: getColumnGenerator<TableCellNumberProps>(TableCellNumber),
  profile: getColumnGenerator<TableCellProfileProps>(TableCellProfile),
  text: getColumnGenerator<TableCellTextProps>(TableCellText)
}

export interface ColumnFactoryParams<Data extends {}> {
  /**
   * return the wanted columns witd the ColumnGenerators utility in parameter
   */
  generateColumns: (
    generators: ColumnGenerators<Data, G2ColumnDef<Data>>
  ) => Record<string, G2ColumnDef<Data>>
}

export const ColumnFactory = <Data extends {} = {}>(
  params: ColumnFactoryParams<Data>
): G2ColumnDef<Data>[] => {
  const { generateColumns } = params

  //@ts-ignore
  const columnsObject = generateColumns(columnsGenerators)
  let columns: G2ColumnDef<Data>[] = []

  for (const key in columnsObject) {
    const column = columnsObject[key]
    column.id = column.id ?? key
    columns.push(column)
  }

  return columns
}

export interface ColumnFactoryV1Params<Data extends {}> {
  /**
   * return the wanted columns witd the ColumnGenerators utility in parameter
   */
  generateColumns: (
    generators: ColumnGenerators<Data, Column<Data>>
  ) => Record<string, Column<Data>>
}

export const ColumnFactoryV1 = <Data extends {} = {}>(
  params: ColumnFactoryV1Params<Data>
): Column<Data>[] => {
  const { generateColumns } = params

  //@ts-ignore
  const columnsObject = generateColumns(columnsGenerators)
  let columns: Column<Data>[] = []

  for (const key in columnsObject) {
    const column = columnsObject[key]
    column.id = column.id ?? key
    //@ts-ignore
    column.Cell = column.cell
    //@ts-ignore
    delete column.cell
    columns.push(column)
  }

  return columns
}
