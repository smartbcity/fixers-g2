import { cx } from '@emotion/css'
import {
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import React, { Fragment, useMemo } from 'react'
import { HeaderGroup, IdType, TableProps, TableRowProps } from 'react-table'
import { TableClasses, TableStyles } from './Table'
import { Row } from './types'

export interface GroundedBaseProps<Data extends {}> {
  /**
   * The number of pages the table contain.
   *
   * ⚠️ if you want the pagination to appear you must provide this props and also `totalPages`
   */
  page?: number
  /**
   * the envent triggered when a sub components is called
   */
  renderSubComponent?: (row: Row<Data>, rowProps: TableRowProps) => JSX.Element
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
  rows: Row<Data>[]
  prepareRow: (row: Row<Data>) => void
  headerGroups: HeaderGroup<Data>[]
  footerGroups: HeaderGroup<Data>[]
  withFooter: boolean
  tableProps: TableProps
  selectedRowIds: Record<string, boolean>
  renderRowHoveredComponent?: (row: Row<Data>) => JSX.Element
  toggleExpandOnRowClicked: boolean
  toggleRowExpanded: (id: IdType<Data>[], value?: boolean | undefined) => void
  getRowId?: (row: Data) => string
  additionnalRowsProps?: Record<string, any>
}

export const GroundedBase = <Data extends {}>(
  props: GroundedBaseProps<Data>
) => {
  const {
    headerGroups,
    prepareRow,
    rows,
    classes,
    onRowClicked,
    page,
    renderSubComponent,
    styles,
    tableProps,
    selectedRowIds,
    footerGroups,
    withFooter,
    renderRowHoveredComponent,
    toggleExpandOnRowClicked,
    toggleRowExpanded,
    additionnalRowsProps = {},
    getRowId
  } = props
  const rowsDisplay = useMemo(() => {
    return rows.map((row) => {
      prepareRow(row)
      row.getRowProps()
      const rowProps = row.getRowProps()
      const extProps =
        additionnalRowsProps[getRowId ? getRowId(row.original) : ''] ??
        additionnalRowsProps?.all
      return (
        <Fragment key={rowProps.key}>
          <TableRow
            {...extProps}
            {...rowProps}
            onClick={() => {
              onRowClicked && onRowClicked(row)
              toggleExpandOnRowClicked && toggleRowExpanded([row.id])
            }}
            className={cx(
              rowProps.className,
              extProps?.className,
              'AruiTable-principaleTableRow',
              'AruiTable-tableRow',
              classes?.tableRow
            )}
            style={styles?.tableRow}
          >
            {row.cells.map((cell) => {
              const column = cell.column
              return (
                <TableCell
                  className={cx(
                    //@ts-ignore
                    column.className,
                    'AruiTable-tableCell',
                    classes?.tableCell
                  )}
                  //@ts-ignore
                  style={{ ...column.style, ...styles?.tableCell }}
                  {...cell.getCellProps()}
                >
                  {cell.render('Cell')}
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
              <Collapse in={row.isExpanded} timeout='auto' unmountOnExit>
                {renderSubComponent && renderSubComponent(row, rowProps)}
              </Collapse>
            </TableCell>
          </TableRow>
        </Fragment>
      )
    })
  }, [
    rows,
    renderSubComponent,
    prepareRow,
    renderRowHoveredComponent,
    classes?.rowHoveredComponentContainer,
    styles?.rowHoveredComponentContainer,
    classes?.tableRow,
    styles?.tableRow,
    classes?.tableCell,
    styles?.tableCell,
    onRowClicked,
    toggleExpandOnRowClicked,
    toggleRowExpanded,
    selectedRowIds,
    additionnalRowsProps,
    getRowId
  ])

  const headerDisplay = useMemo(
    () =>
      headerGroups.map((headerGroup) => (
        <TableRow
          className={cx('AruiTable-tableHeaderRow', classes?.tableHeaderRow)}
          style={styles?.tableHeaderRow}
          {...headerGroup.getHeaderGroupProps()}
        >
          {headerGroup.headers.map((column) => {
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
                {...column.getHeaderProps()}
              >
                {column.id !== 'selection' ? (
                  <Typography variant='subtitle1'>
                    {column.render('Header')}
                  </Typography>
                ) : (
                  column.render('Header')
                )}
              </TableCell>
            )
          })}
        </TableRow>
      )),
    [
      headerGroups,
      selectedRowIds,
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
        : footerGroups.map((footerGroup) => (
            <TableRow
              className={cx(
                'AruiTable-tableFooterRow',
                classes?.tableFooterRow
              )}
              style={styles?.tableFooterRow}
              {...footerGroup.getFooterGroupProps()}
            >
              {footerGroup.headers.map((column) => {
                return (
                  <TableCell
                    className={cx(
                      //@ts-ignore
                      column.className,
                      'AruiTable-tableFooterCell',
                      classes?.tableFooterCell
                    )}
                    //@ts-ignore
                    style={{ ...column.style, ...styles?.tableFooterCell }}
                    variant='body'
                    {...column.getFooterProps()}
                  >
                    {column.render('Footer')}
                  </TableCell>
                )
              })}
            </TableRow>
          )),
    [
      footerGroups,
      classes?.tableFooterRow,
      styles?.tableFooterRow,
      classes?.tableFooterCell,
      styles?.tableFooterCell,
      withFooter
    ]
  )

  return (
    <Table
      className={cx('AruiTable-table', classes?.table)}
      style={styles?.table}
      {...tableProps}
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
    </Table>
  )
}
