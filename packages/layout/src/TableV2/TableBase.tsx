import { cx } from '@emotion/css'
import {
  Table as MuiTable,
  Box,
  Collapse,
  TableBody,
  TableCell,
  TableCellBaseProps,
  TableFooter,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import { Table, flexRender, Row } from '@tanstack/react-table'
import React, { Fragment } from 'react'
import { Link, LinkProps } from 'react-router-dom'
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
   * use this prop to make every rows a clickable link
   */
  getRowLink?: (row: Row<Data>) => LinkProps
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
  additionalRowsProps?: Record<string, any>
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
    additionalRowsProps = {},
    variant,
    getRowLink
  } = props

  //@ts-ignore
  const TableComponent: React.ElementType =
    variant === 'elevated' ? 'div' : undefined
  //@ts-ignore
  const TableHeadComponent: React.ElementType =
    variant === 'elevated' ? 'div' : undefined
  //@ts-ignore
  const TableBodyComponent: React.ElementType =
    variant === 'elevated' ? 'div' : undefined
  //@ts-ignore
  const TableFooterComponent: React.ElementType =
    variant === 'elevated' ? 'div' : undefined
  //@ts-ignore
  const TableRowComponent: React.ElementType =
    variant === 'elevated' ? 'div' : undefined
  //@ts-ignore
  const TableCellComponent: React.ElementType<TableCellBaseProps> =
    variant === 'elevated' ? 'div' : undefined

  const rowsDisplay = tableState.getRowModel().rows.map((row) => {
    const cell = (
      <>
        {row.getVisibleCells().map((cell) => {
          const column = cell.column.columnDef as G2ColumnDef<Data>
          return (
            <TableCell
              component={TableCellComponent}
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
              {flexRender(column.cell, cell.getContext())}
            </TableCell>
          )
        })}
        {!!renderRowHoveredComponent && (
          <TableCell
            component={TableCellComponent}
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
          </TableCell>
        )}
      </>
    )
    const extProps =
      additionalRowsProps[tableState._getRowId(row.original, row.index)] ??
      additionalRowsProps?.all
    return (
      <Fragment key={row.id}>
        <TableRow
          component={TableRowComponent}
          {...extProps}
          onClick={() => {
            onRowClicked && onRowClicked(row)
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
          {getRowLink && (
            <TableCell
              component={TableCellComponent}
              sx={{
                padding: 0,
                position: 'absolute',
                width: '100%',
                height: '100%',
                zIndex: 1,
                top: 0,
                left: 0
              }}
              className='AruiTable-rowLinkContainer'
            >
              <Link
                {...getRowLink(row)}
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%'
                }}
              />
            </TableCell>
          )}
        </TableRow>
        {(!expandInRow || variant === 'grounded') && (
          <TableRow
            component={TableRowComponent}
            className={cx('AruiTable-tableRow', classes?.tableRow)}
            style={styles?.tableRow}
          >
            <TableCell
              component={TableCellComponent}
              className={cx('AruiTable-tableCell', classes?.tableCell)}
              style={styles?.tableCell}
              sx={{ paddingBottom: 0, paddingTop: 0 }}
              colSpan={variant === 'grounded' ? 100 : undefined}
            >
              <Collapse in={row.getIsExpanded()} timeout='auto' unmountOnExit>
                {renderSubComponent && renderSubComponent(row)}
              </Collapse>
            </TableCell>
          </TableRow>
        )}
      </Fragment>
    )
  })

  const headerDisplay = tableState.getHeaderGroups().map((headerGroup) => (
    <TableRow
      component={TableRowComponent}
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
          <TableCell
            component={TableCellComponent}
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
                {flexRender(column.header, header.getContext())}
              </Typography>
            ) : (
              flexRender(column.header, header.getContext())
            )}
          </TableCell>
        )
      })}
    </TableRow>
  ))

  const footerDisplay = !withFooter
    ? undefined
    : tableState.getFooterGroups().map((footerGroup) => (
        <TableRow
          component={TableRowComponent}
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
              <TableCell
                component={TableCellComponent}
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
                {flexRender(column.footer, header.getContext())}
              </TableCell>
            )
          })}
        </TableRow>
      ))

  return (
    <MuiTable
      component={TableComponent}
      className={cx('AruiTable-table', classes?.table)}
      style={styles?.table}
    >
      <TableHead
        component={TableHeadComponent}
        className={cx('AruiTable-tableHead', classes?.tableHead)}
        style={styles?.tableHead}
      >
        {headerDisplay}
      </TableHead>
      <TableBody
        component={TableBodyComponent}
        className={cx('AruiTable-tableBody', classes?.tableBody)}
        style={styles?.tableBody}
      >
        {rowsDisplay}
      </TableBody>
      {footerDisplay && (
        <TableFooter
          component={TableFooterComponent}
          className={cx('AruiTable-tableFooter', classes?.tableFooter)}
          style={styles?.tableFooter}
        >
          {footerDisplay}
        </TableFooter>
      )}
    </MuiTable>
  )
}
