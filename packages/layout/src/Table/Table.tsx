import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableFooter,
  TableContainerProps,
  IconButton,
  Collapse,
  Typography
} from '@mui/material'
import {
  useRowSelect,
  useExpanded,
  TableRowProps,
  HeaderProps,
  Hooks
} from 'react-table'
import React, { useEffect, useMemo, Fragment, useCallback } from 'react'
import { Pagination } from '@smartb/g2-components/src'
import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'
import { CheckBox } from '@smartb/g2-forms'
import { Arrow } from '@smartb/g2-components/src/icons'
import {
  CompleteTableOptions,
  CellProps,
  Row,
  Column,
  UseCompleteTable
} from './types'
import { cx } from '@emotion/css'
import { TableContainer } from './TableContainer'

export interface TableClasses {
  table?: string
  tableHead?: string
  tableBody?: string
  tableFooter?: string
  tableHeaderRow?: string
  tableRow?: string
  tableCell?: string
  tableHeaderCell?: string
  Pagination?: string
}

export interface TableStyles {
  table?: React.CSSProperties
  tableHead?: React.CSSProperties
  tableBody?: React.CSSProperties
  tableFooter?: React.CSSProperties
  tableHeaderRow?: React.CSSProperties
  tableRow?: React.CSSProperties
  tableCell?: React.CSSProperties
  tableHeaderCell?: React.CSSProperties
  Pagination?: React.CSSProperties
}

export interface TableBasicProps<Data extends object> extends BasicProps {
  /**
   * An array of the data that will be displayed in the table
   */
  data: Data[]
  /**
   * The columns of the table build with the data
   */
  columns: Column<Data>[]
  /**
   * The variants of the style of the table
   * @default "elevated"
   */
  variant?: 'grounded' | 'elevated'
  /**
   * The table options refered here https://react-table.tanstack.com/docs/api/useTable#table-options
   */
  tableOptions?: CompleteTableOptions<Data>
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
   * the envent triggered when the selectedRows state changes
   */
  setSelectedRows?: (rows: Row<Data>[]) => void
  /**
   * the envent triggered when a sub components is called
   */
  renderSubComponent?: (row: Row<Data>, rowProps: TableRowProps) => JSX.Element
  /**
   * the envent triggered when a row is clicked
   */
  onRowClicked?: (row: Row<Data>) => void
  /**
   * Indicates if the data is currently loading
   */
  isLoading?: boolean
  /**
   * The classes applied to the different part of the component
   */
  classes?: TableClasses
  /**
   * The styles applied to the different part of the component
   */
  styles?: TableStyles
}

export type TableProps<Data extends object> = MergeMuiElementProps<
  TableContainerProps,
  TableBasicProps<Data>
>

export const Table = <Data extends object = {}>(props: TableProps<Data>) => {
  const {
    data,
    columns,
    tableOptions,
    page,
    handlePageChange,
    isLoading,
    totalPages,
    setSelectedRows,
    variant = 'elevated',
    renderSubComponent,
    className,
    classes,
    styles,
    onRowClicked,
    ...other
  } = props
  const isPaginated = !!page && !!totalPages
  const isSelectabale = !!setSelectedRows
  const isExpandable = !!renderSubComponent

  const useVariableHooks = useCallback(
    (hooks: Hooks<Data>) => {
      hooks.allColumns.push((columns) => [
        ...(isExpandable
          ? [
              {
                id: 'expander',
                accessor: 'expander',
                Cell: ({ row }: CellProps<Data>) => (
                  <IconButton {...row.getToggleRowExpandedProps()}>
                    <Arrow
                      key='expanderIcon'
                      color='#353945'
                      width='20px'
                      height='20px'
                      style={{
                        transform: row.isExpanded
                          ? 'rotate(90deg)'
                          : 'rotate(-90deg)',
                        transition: '0.2s'
                      }}
                    />
                  </IconButton>
                ),
                className: 'AruiTable-actionColumn'
              } as Column<Data>
            ]
          : []),
        ...(isSelectabale
          ? [
              {
                id: 'selection',
                accessor: 'selection',
                //@ts-ignore
                Header: ({
                  getToggleAllRowsSelectedProps
                }: HeaderProps<Data>) => {
                  console.log(getToggleAllRowsSelectedProps())
                  return (
                    <div>
                      <CheckBox {...getToggleAllRowsSelectedProps()} />
                    </div>
                  )
                },
                Cell: ({ row }: CellProps<Data>) => {
                  console.log(row.getToggleRowSelectedProps())
                  return (
                    <div>
                      <CheckBox {...row.getToggleRowSelectedProps()} />
                    </div>
                  )
                },
                className: 'AruiTable-actionColumn'
              } as Column<Data>
            ]
          : []),
        ...columns
      ])
    },
    [isSelectabale, isExpandable]
  )

  const { getTableProps, headerGroups, rows, prepareRow, selectedFlatRows } =
    UseCompleteTable<Data>(
      { data, columns, ...tableOptions },
      useExpanded,
      useRowSelect,
      useVariableHooks
    )

  useEffect(() => {
    setSelectedRows && setSelectedRows(selectedFlatRows)
  }, [selectedFlatRows, setSelectedRows])

  const rowsDisplay = useMemo(() => {
    return rows.map((row) => {
      prepareRow(row)
      row.getRowProps()
      const rowProps = row.getRowProps()
      return (
        <Fragment key={rowProps.key}>
          <TableRow
            onClick={() => onRowClicked && onRowClicked(row)}
            sx={{ '& > *': { borderBottom: 'unset ' } }}
            className={cx('AruiTable-tableRow', classes?.tableRow)}
            style={styles?.tableRow}
            {...row.getRowProps()}
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
          </TableRow>
          <TableRow
            className={cx('AruiTable-tableRow', classes?.tableRow)}
            style={styles?.tableRow}
          >
            <TableCell
              className={cx('AruiTable-tableCell', classes?.tableCell)}
              style={styles?.tableCell}
              sx={{ paddingBottom: 0, paddingTop: 0 }}
              colSpan={6}
            >
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
    classes?.tableRow,
    styles?.tableRow,
    classes?.tableCell,
    styles?.tableCell,
    onRowClicked
  ])

  const headerDisplay = useMemo(
    () =>
      headerGroups.map((headerGroup) => (
        <TableRow
          className={cx('AruiTable-tableHeaderRow', classes?.tableHeaderRow)}
          style={styles?.tableHeaderRow}
          {...headerGroup.getHeaderGroupProps()}
        >
          {headerGroup.headers.map((column) => (
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
              <Typography variant='subtitle1'>
                {column.render('Header')}
              </Typography>
            </TableCell>
          ))}
        </TableRow>
      )),
    [
      headerGroups,
      classes?.tableRow,
      styles?.tableRow,
      classes?.tableHeaderCell,
      styles?.tableHeaderCell
    ]
  )

  const tableProps = useMemo(() => getTableProps(), [getTableProps])

  return (
    <TableContainer
      className={cx('AruiTable-root', className)}
      sx={{
        '& .AruiTable-tableRow:hover': !!onRowClicked
          ? {
              background: '#D9DBE1',
              cursor: 'pointer'
            }
          : {}
      }}
      variant={variant}
      {...other}
    >
      <MuiTable
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
        <TableFooter
          className={cx('AruiTable-tableFooter', classes?.tableFooter)}
          style={styles?.tableFooter}
        >
          {isPaginated ? (
            <TableRow>
              <Pagination
                onPageChange={handlePageChange}
                page={page}
                totalPage={totalPages}
              />
            </TableRow>
          ) : undefined}
        </TableFooter>
      </MuiTable>
    </TableContainer>
  )
}
