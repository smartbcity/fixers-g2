import { cx } from '@emotion/css'
import {
  Table as MuiTable,
  Box,
  Collapse,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import { Table, flexRender, Row } from '@tanstack/react-table'
import React, { Fragment } from 'react'
import { TableClasses, TableStyles } from '../Table'
import { G2ColumnDef } from './useTable'

export interface TableBaseProps<Data extends {}> {
  /**
   * The number of pages the table contain.
   *
   * ⚠️ if you want the pagination to appear you must provide this props and also `totalPages`
   */
  page?: number
  /**
   * The tableState returned by the useTable
   */
  tableState: Table<Data>
  /**
   * the envent triggered when a sub components is called
   */
  renderSubComponent?: (row: Row<Data>) => JSX.Element
  /**
   * the envent triggered when a row is clicked
   */
  onRowClicked?: (row: Row<Data>) => void
  /**
   * The classes applied to the different part of the component
   */
  classes?: TableClasses
  /**
   * The styles applied to the different part of the component
   */
  styles?: TableStyles
  /**
   * The variants of the style of the table
   */
  variant: 'grounded' | 'elevated'
  withFooter: boolean
  expandInRow: boolean
  renderRowHoveredComponent?: (row: Row<Data>) => JSX.Element
  toggleExpandOnRowClicked: boolean
  getRowId?: (row: Data) => string
  additionnalRowsProps?: Record<string, any>
}

export const TableBase = <Data extends {}>(props: TableBaseProps<Data>) => {
  const {
    classes,
    onRowClicked,
    renderSubComponent,
    styles,
    tableState,
    withFooter,
    renderRowHoveredComponent,
    expandInRow,
    toggleExpandOnRowClicked,
    additionnalRowsProps = {},
    variant,
    getRowId
  } = props

  const TableComponent: React.ElementType =
    variant === 'elevated' ? Box : MuiTable
  const TableHeadComponent: React.ElementType =
    variant === 'elevated' ? Box : TableHead
  const TableBodyComponent: React.ElementType =
    variant === 'elevated' ? Box : TableBody
  const TableFooterComponent: React.ElementType =
    variant === 'elevated' ? Box : TableFooter
  const TableRowComponent: React.ElementType =
    variant === 'elevated' ? Box : TableRow
  const TableCellComponent: React.ElementType =
    variant === 'elevated' ? Box : TableCell

  const rowsDisplay = tableState.getRowModel().rows.map((row) => {
    const cell = (
      <>
        {row.getVisibleCells().map((cell) => {
          const column = cell.column.columnDef as G2ColumnDef<Data>
          return (
            <TableCellComponent
              key={cell.id}
              className={cx(
                column.className,
                'AruiTable-tableCell',
                classes?.tableCell
              )}
              style={{ ...column.style, ...styles?.tableCell }}
              sx={
                variant === 'elevated'
                  ? {
                      flex: '100 0 auto',
                      width: '100px'
                    }
                  : undefined
              }
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCellComponent>
          )
        })}
        {!!renderRowHoveredComponent && (
          <TableCellComponent
            sx={{
              padding: 0,
              position: 'absolute',
              width: '100%',
              height: '100%'
            }}
            className={cx(
              'AruiTable-rowHoveredComponentContainer',
              classes?.rowHoveredComponentContainer
            )}
            style={styles?.rowHoveredComponentContainer}
          >
            {renderRowHoveredComponent(row)}
          </TableCellComponent>
        )}
      </>
    )
    const extProps =
      additionnalRowsProps[getRowId ? getRowId(row.original) : ''] ??
      additionnalRowsProps?.all
    return (
      <Fragment key={row.id}>
        <TableRowComponent
          {...extProps}
          onClick={() => {
            onRowClicked && onRowClicked(row)
            toggleExpandOnRowClicked && row.toggleExpanded()
          }}
          className={cx(
            extProps?.className,
            'AruiTable-principaleTableRow',
            'AruiTable-tableRow',
            classes?.tableRow
          )}
          style={styles?.tableRow}
          sx={
            variant === 'elevated'
              ? {
                  display:
                    expandInRow && variant === 'elevated' ? undefined : 'flex'
                }
              : undefined
          }
        >
          {expandInRow && variant === 'elevated' ? (
            <Box
              sx={{
                display: 'flex'
              }}
            >
              {cell}
            </Box>
          ) : (
            cell
          )}
          {expandInRow && variant === 'elevated' && (
            <Collapse in={row.getIsExpanded()} timeout='auto' unmountOnExit>
              {renderSubComponent && renderSubComponent(row)}
            </Collapse>
          )}
        </TableRowComponent>
        {(!expandInRow || variant === 'grounded') && (
          <TableRowComponent
            className={cx('AruiTable-tableRow', classes?.tableRow)}
            style={styles?.tableRow}
          >
            <TableCellComponent
              className={cx('AruiTable-tableCell', classes?.tableCell)}
              style={styles?.tableCell}
              sx={{ paddingBottom: 0, paddingTop: 0 }}
              colSpan={variant === 'grounded' ? 100 : undefined}
            >
              <Collapse in={row.getIsExpanded()} timeout='auto' unmountOnExit>
                {renderSubComponent && renderSubComponent(row)}
              </Collapse>
            </TableCellComponent>
          </TableRowComponent>
        )}
      </Fragment>
    )
  })

  const headerDisplay = tableState.getHeaderGroups().map((headerGroup) => (
    <TableRowComponent
      className={cx('AruiTable-tableHeaderRow', classes?.tableHeaderRow)}
      style={styles?.tableHeaderRow}
      key={headerGroup.id}
      sx={
        variant === 'elevated'
          ? {
              display: 'flex'
            }
          : undefined
      }
    >
      {headerGroup.headers.map((header) => {
        const column = header.column.columnDef as G2ColumnDef<Data>
        return (
          <TableCellComponent
            key={header.id}
            className={cx(
              column.className,
              'AruiTable-tableHeaderCell',
              classes?.tableHeaderCell
            )}
            style={{ ...column.style, ...styles?.tableHeaderCell }}
            sx={
              variant === 'elevated'
                ? {
                    flex: '100 0 auto',
                    width: '100px'
                  }
                : undefined
            }
            variant={variant === 'grounded' ? 'head' : undefined}
          >
            {header.id !== 'selection' ? (
              <Typography variant='subtitle1'>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </Typography>
            ) : (
              flexRender(header.column.columnDef.header, header.getContext())
            )}
          </TableCellComponent>
        )
      })}
    </TableRowComponent>
  ))

  const footerDisplay = !withFooter
    ? undefined
    : tableState.getFooterGroups().map((footerGroup) => (
        <TableRowComponent
          key={footerGroup.id}
          className={cx('AruiTable-tableFooterRow', classes?.tableFooterRow)}
          style={styles?.tableFooterRow}
          sx={
            variant === 'elevated'
              ? {
                  display: 'flex'
                }
              : undefined
          }
        >
          {footerGroup.headers.map((header) => {
            const column = header.column.columnDef as G2ColumnDef<Data>
            return (
              <TableCellComponent
                key={header.id}
                className={cx(
                  column.className,
                  'AruiTable-tableFooterCell',
                  classes?.tableFooterCell
                )}
                style={{ ...column.style, ...styles?.tableFooterCell }}
                sx={
                  variant === 'elevated'
                    ? {
                        flex: '100 0 auto',
                        width: '100px'
                      }
                    : undefined
                }
                variant={variant === 'grounded' ? 'body' : undefined}
              >
                {flexRender(
                  header.column.columnDef.footer,
                  header.getContext()
                )}
              </TableCellComponent>
            )
          })}
        </TableRowComponent>
      ))

  return (
    <TableComponent
      className={cx('AruiTable-table', classes?.table)}
      style={styles?.table}
    >
      <TableHeadComponent
        className={cx('AruiTable-tableHead', classes?.tableHead)}
        style={styles?.tableHead}
      >
        {headerDisplay}
      </TableHeadComponent>
      <TableBodyComponent
        className={cx('AruiTable-tableBody', classes?.tableBody)}
        style={styles?.tableBody}
      >
        {rowsDisplay}
      </TableBodyComponent>
      {footerDisplay && (
        <TableFooterComponent
          className={cx('AruiTable-tableFooter', classes?.tableFooter)}
          style={styles?.tableFooter}
        >
          {footerDisplay}
        </TableFooterComponent>
      )}
    </TableComponent>
  )
}
