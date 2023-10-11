import React from 'react'
import { TableCellTag, TableCellTagProps } from '../TableCellTag/TableCellTag'
export interface TableCellStatusProps
  extends Omit<TableCellTagProps, 'variant'> {}

export const TableCellStatus = (props: TableCellStatusProps) => {
  return <TableCellTag variant='status' {...props} />
}
