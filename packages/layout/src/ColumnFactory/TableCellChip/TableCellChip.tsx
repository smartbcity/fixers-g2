import React from 'react'
import { TableCellTag, TableCellTagProps } from '../TableCellTag/TableCellTag'
export interface TableCellChipProps
  extends Omit<TableCellTagProps, 'variant'> {}

export const TableCellChip = (props: TableCellChipProps) => {
  return <TableCellTag variant='chip' {...props} />
}
