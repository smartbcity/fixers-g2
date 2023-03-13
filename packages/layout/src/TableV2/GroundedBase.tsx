import { cx } from '@emotion/css'
import {
  Collapse,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import React, { Fragment, useMemo } from 'react'
import { flexRender, Table, Row } from '@tanstack/react-table'
import { TableClasses, TableStyles } from '../Table/Table'

export interface GroundedBaseProps<Data extends {}> {
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
  withFooter: boolean
  renderRowHoveredComponent?: (row: Row<Data>) => JSX.Element
  toggleExpandOnRowClicked: boolean
  getRowId?: (row: Data) => string
  additionnalRowsProps?: Record<string, any>
}

export const GroundedBase = <Data extends {}>(
  props: GroundedBaseProps<Data>
) => {
  const {
    tableState,
    classes,
    onRowClicked,
    page,
    renderSubComponent,
    styles,
    withFooter,
    renderRowHoveredComponent,
    toggleExpandOnRowClicked,
    additionnalRowsProps = {},
    getRowId
  } = props
  const rowsDisplay = useMemo(() => {
    return tableState.getRowModel().rows.map((row) => {
      const extProps =
        additionnalRowsProps[getRowId ? getRowId(row.original) : ''] ??
        additionnalRowsProps?.all
      return (
        <Fragment key={row.id}>
          <TableRow
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
          >
            {row.getVisibleCells().map((cell) => {
              const column = cell.column
              return (
                <TableCell
                  key={cell.id}
                  className={cx(
                    //@ts-ignore
                    column.className,
                    'AruiTable-tableCell',
                    classes?.tableCell
                  )}
                  //@ts-ignore
                  style={{ ...column.style, ...styles?.tableCell }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              )
            })}
            {!!renderRowHoveredComponent && (
              <TableCell
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
          </TableRow>
          <TableRow
            className={cx('AruiTable-tableRow', classes?.tableRow)}
            style={styles?.tableRow}
          >
            <TableCell sx={{ paddingBottom: 0, paddingTop: 0 }} colSpan={100}>
              <Collapse in={row.getIsExpanded()} timeout='auto' unmountOnExit>
                {renderSubComponent && renderSubComponent(row)}
              </Collapse>
            </TableCell>
          </TableRow>
        </Fragment>
      )
    })
  }, [
    tableState,
    renderSubComponent,
    renderRowHoveredComponent,
    classes?.rowHoveredComponentContainer,
    styles?.rowHoveredComponentContainer,
    classes?.tableRow,
    styles?.tableRow,
    classes?.tableCell,
    styles?.tableCell,
    onRowClicked,
    toggleExpandOnRowClicked,
    additionnalRowsProps,
    getRowId
  ])

  const headerDisplay = useMemo(
    () =>
      tableState.getHeaderGroups().map((headerGroup) => (
        <TableRow
          key={headerGroup.id}
          className={cx('AruiTable-tableHeaderRow', classes?.tableHeaderRow)}
          style={styles?.tableHeaderRow}
        >
          {headerGroup.headers.map((header) => {
            const column = header.column
            return (
              <TableCell
                className={cx(
                  //@ts-ignore
                  column.className,
                  'AruiTable-tableHeaderCell',
                  classes?.tableHeaderCell
                )}
                //@ts-ignore
                style={{ ...column.style, ...styles?.tableHeaderCell }}
                variant='head'
              >
                {header.id !== 'selection' ? (
                  <Typography variant='subtitle1'>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </Typography>
                ) : (
                  flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )
                )}
              </TableCell>
            )
          })}
        </TableRow>
      )),
    [
      tableState,
      page,
      classes?.tableHeaderRow,
      styles?.tableHeaderRow,
      classes?.tableHeaderCell,
      styles?.tableHeaderCell
    ]
  )

  const footerDisplay = useMemo(
    () =>
      !withFooter
        ? undefined
        : tableState.getFooterGroups().map((footerGroup) => (
            <TableRow
              key={footerGroup.id}
              className={cx(
                'AruiTable-tableFooterRow',
                classes?.tableFooterRow
              )}
              style={styles?.tableFooterRow}
            >
              {footerGroup.headers.map((header) => {
                const column = header.column
                return (
                  <TableCell
                    key={header.id}
                    className={cx(
                      //@ts-ignore
                      column.className,
                      'AruiTable-tableFooterCell',
                      classes?.tableFooterCell
                    )}
                    //@ts-ignore
                    style={{ ...column.style, ...styles?.tableFooterCell }}
                    variant='body'
                  >
                    {flexRender(
                      header.column.columnDef.footer,
                      header.getContext()
                    )}
                  </TableCell>
                )
              })}
            </TableRow>
          )),
    [
      tableState,
      classes?.tableFooterRow,
      styles?.tableFooterRow,
      classes?.tableFooterCell,
      styles?.tableFooterCell,
      withFooter
    ]
  )

  return (
    <MuiTable
      className={cx('AruiTable-table', classes?.table)}
      style={styles?.table}
    >
      <TableHead
        className={cx('AruiTable-tableHead', classes?.tableHead)}
        style={styles?.tableHead}
      >
        {headerDisplay}
      </TableHead>
      <TableBody
        className={cx('AruiTable-tableBody', classes?.tableBody)}
        style={styles?.tableBody}
      >
        {rowsDisplay}
      </TableBody>
      {footerDisplay && (
        <TableFooter
          className={cx('AruiTable-tableFooter', classes?.tableFooter)}
          style={styles?.tableFooter}
        >
          {footerDisplay}
        </TableFooter>
      )}
    </MuiTable>
  )
}
