import { cx } from '@emotion/css'
import { Box, Collapse, Typography } from '@mui/material'
import { Pagination } from '@smartb/g2-components'
import React, { Fragment, useMemo } from 'react'
import { HeaderGroup, TableProps, TableRowProps } from 'react-table'
import { TableClasses, TableStyles } from './Table'
import { Row, BasicData } from './types'

export interface ElevatedBaseProps<Data extends BasicData> {
  /**
   * The number of pages the table contain.
   *
   * ⚠️ if you want the pagination to appear you must provide this props and also `totalPages`
   */
  page?: number
  /**
   * The number of pages the table contain.
   *
   * ⚠️ if you want the pagination to appear you must provide this props and also **page**
   */
  totalPages?: number
  /**
   * the envent triggered when the current page has to change
   */
  handlePageChange?: (page: number) => void
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
}

export const ElevatedBase = <Data extends BasicData>(
  props: ElevatedBaseProps<Data>
) => {
  const {
    headerGroups,
    prepareRow,
    rows,
    classes,
    handlePageChange,
    onRowClicked,
    page,
    renderSubComponent,
    styles,
    totalPages,
    tableProps,
    selectedRowIds,
    footerGroups,
    withFooter,
    renderRowHoveredComponent
  } = props
  const isPaginated = !!page && !!totalPages
  const rowsDisplay = useMemo(() => {
    return rows.map((row) => {
      prepareRow(row)
      row.getRowProps()
      const rowProps = row.getRowProps()
      return (
        <Fragment key={rowProps.key}>
          <Box
            onClick={() => onRowClicked && onRowClicked(row)}
            className={cx(
              'AruiTable-principaleTableRow',
              'AruiTable-tableRow',
              classes?.tableRow
            )}
            style={styles?.tableRow}
            {...row.getRowProps()}
          >
            {row.cells.map((cell) => {
              const column = cell.column
              return (
                <Box
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
          <Box
            className={cx('AruiTable-tableRow', classes?.tableRow)}
            style={styles?.tableRow}
          >
            <Box
              className={cx('AruiTable-tableCell', classes?.tableCell)}
              style={styles?.tableCell}
              sx={{ paddingBottom: 0, paddingTop: 0 }}
            >
              <Collapse in={row.isExpanded} timeout='auto' unmountOnExit>
                {renderSubComponent && renderSubComponent(row, rowProps)}
              </Collapse>
            </Box>
          </Box>
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
    onRowClicked
  ])

  const headerDisplay = useMemo(
    () =>
      headerGroups.map((headerGroup) => (
        <Box
          className={cx('AruiTable-tableHeaderRow', classes?.tableHeaderRow)}
          style={styles?.tableHeaderRow}
          {...headerGroup.getHeaderGroupProps()}
        >
          {headerGroup.headers.map((column) => (
            <Box
              className={cx(
                //@ts-ignore
                column.className,
                'AruiTable-tableHeaderCell',
                classes?.tableHeaderCell
              )}
              //@ts-ignore
              style={{ ...column.style, ...styles?.tableHeaderCell }}
              {...column.getHeaderProps()}
            >
              {column.id !== 'selection' ? (
                <Typography variant='subtitle1'>
                  {column.render('Header')}
                </Typography>
              ) : (
                column.render('Header')
              )}
            </Box>
          ))}
        </Box>
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
            <Box
              className={cx(
                'AruiTable-tableFooterRow',
                classes?.tableFooterRow
              )}
              style={styles?.tableFooterRow}
              {...footerGroup.getFooterGroupProps()}
            >
              {footerGroup.headers.map((column) => {
                return (
                  <Box
                    className={cx(
                      //@ts-ignore
                      column.className,
                      'AruiTable-tableFooterCell',
                      classes?.tableFooterCell
                    )}
                    //@ts-ignore
                    style={{ ...column.style, ...styles?.tableFooterCell }}
                    {...column.getFooterProps()}
                  >
                    {column.render('Footer')}
                  </Box>
                )
              })}
            </Box>
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
    <>
      <Box
        className={cx('AruiTable-table', classes?.table)}
        style={styles?.table}
        {...tableProps}
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
      {isPaginated ? (
        <Pagination
          className='AruiTable-pagination'
          onPageChange={handlePageChange}
          page={page}
          totalPage={totalPages}
        />
      ) : undefined}
    </>
  )
}
