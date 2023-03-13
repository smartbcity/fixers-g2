import { cx } from '@emotion/css'
import { Box, Collapse, Typography } from '@mui/material'
import { Table, flexRender, Row } from '@tanstack/react-table'
import React, { Fragment, useMemo } from 'react'
import { TableClasses, TableStyles } from '../Table'

export interface ElevatedBaseProps<Data extends {}> {
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
  expandInRow: boolean
  renderRowHoveredComponent?: (row: Row<Data>) => JSX.Element
  toggleExpandOnRowClicked: boolean
  getRowId?: (row: Data) => string
  additionnalRowsProps?: Record<string, any>
}

export const ElevatedBase = <Data extends {}>(
  props: ElevatedBaseProps<Data>
) => {
  const {
    classes,
    onRowClicked,
    page,
    renderSubComponent,
    styles,
    tableState,
    withFooter,
    renderRowHoveredComponent,
    expandInRow,
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
          <Box
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
            <Box>
              {row.getVisibleCells().map((cell) => {
                const column = cell.column
                return (
                  <Box
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
                  </Box>
                )
              })}
              {!!renderRowHoveredComponent && (
                <Box
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
                </Box>
              )}
            </Box>
            {expandInRow && (
              <Collapse in={row.getIsExpanded()} timeout='auto' unmountOnExit>
                {renderSubComponent && renderSubComponent(row)}
              </Collapse>
            )}
          </Box>
          {!expandInRow && (
            <Box
              className={cx('AruiTable-tableRow', classes?.tableRow)}
              style={styles?.tableRow}
            >
              <Box
                className={cx('AruiTable-tableCell', classes?.tableCell)}
                style={styles?.tableCell}
                sx={{ paddingBottom: 0, paddingTop: 0 }}
              >
                <Collapse in={row.getIsExpanded()} timeout='auto' unmountOnExit>
                  {renderSubComponent && renderSubComponent(row)}
                </Collapse>
              </Box>
            </Box>
          )}
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
    expandInRow,
    toggleExpandOnRowClicked,
    additionnalRowsProps,
    getRowId
  ])

  const headerDisplay = useMemo(
    () =>
      tableState.getHeaderGroups().map((headerGroup) => (
        <Box
          className={cx('AruiTable-tableHeaderRow', classes?.tableHeaderRow)}
          style={styles?.tableHeaderRow}
          key={headerGroup.id}
        >
          {headerGroup.headers.map((header) => {
            const column = header.column
            return (
              <Box
                key={header.id}
                className={cx(
                  //@ts-ignore
                  column.className,
                  'AruiTable-tableHeaderCell',
                  classes?.tableHeaderCell
                )}
                //@ts-ignore
                style={{ ...column.style, ...styles?.tableHeaderCell }}
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
              </Box>
            )
          })}
        </Box>
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
            <Box
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
                  <Box
                    key={header.id}
                    className={cx(
                      //@ts-ignore
                      column.className,
                      'AruiTable-tableFooterCell',
                      classes?.tableFooterCell
                    )}
                    //@ts-ignore
                    style={{ ...column.style, ...styles?.tableFooterCell }}
                  >
                    {flexRender(
                      header.column.columnDef.footer,
                      header.getContext()
                    )}
                  </Box>
                )
              })}
            </Box>
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
    <Box
      className={cx('AruiTable-table', classes?.table)}
      style={styles?.table}
    >
      <Box
        className={cx('AruiTable-tableHead', classes?.tableHead)}
        style={styles?.tableHead}
      >
        {headerDisplay}
      </Box>
      <Box
        className={cx('AruiTable-tableBody', classes?.tableBody)}
        style={styles?.tableBody}
      >
        {rowsDisplay}
      </Box>
      {footerDisplay && (
        <Box
          className={cx('AruiTable-tableFooter', classes?.tableFooter)}
          style={styles?.tableFooter}
        >
          {footerDisplay}
        </Box>
      )}
    </Box>
  )
}
