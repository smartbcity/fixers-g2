import { TableContainerProps, IconButton, Box } from '@mui/material'
import {
  useRowSelect,
  useExpanded,
  TableRowProps,
  HeaderProps,
  Hooks,
  usePagination
} from 'react-table'
import React, { useEffect, useMemo, useCallback } from 'react'
import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'
import { CheckBox } from '@smartb/g2-forms'
import { Arrow } from '../icons'
import {
  CompleteTableOptions,
  CellProps,
  Row,
  Column,
  UseCompleteTable
} from './types'
import { cx } from '@emotion/css'
import { TableContainer } from './TableContainer'
import { GroundedBase } from './GroundedBase'
import { ElevatedBase } from './ElevatedBase'
import { ElevatedLoading } from './ElevatedLoading'
import { GroundedLoading } from './GroundedLoading'
import { Pagination } from '@smartb/g2-components'
import { LinkProps } from 'react-router-dom'

export interface TableClasses {
  table?: string
  tableHead?: string
  tableBody?: string
  tableFooter?: string
  tableHeaderRow?: string
  tableRow?: string
  tableFooterRow?: string
  tableCell?: string
  tableHeaderCell?: string
  tableFooterCell?: string
  rowHoveredComponentContainer?: string
  Pagination?: string
}

export interface TableStyles {
  table?: React.CSSProperties
  tableHead?: React.CSSProperties
  tableBody?: React.CSSProperties
  tableFooter?: React.CSSProperties
  tableHeaderRow?: React.CSSProperties
  tableRow?: React.CSSProperties
  tableFooterRow?: React.CSSProperties
  tableCell?: React.CSSProperties
  tableHeaderCell?: React.CSSProperties
  tableFooterCell?: React.CSSProperties
  rowHoveredComponentContainer?: React.CSSProperties
  Pagination?: React.CSSProperties
}

export interface TableBasicProps<Data extends {}> extends BasicProps {
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
   * @default elevated
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
   * @Deprecated ⚠ The method onPageChanged must be used.
   */
  handlePageChange?: (page: number) => void
  /**
   * The event triggered when the page is changed
   */
  onPageChange?: (page: number) => void
  /**
   * The event triggered when the selectedRows state changes
   */
  setSelectedRowIds?: (rowIds: Record<string, boolean>) => void
  /**
   * Do not display the checkbox return false.
   */
  isSelectableRow?: (rowIds: Row<Data>) => boolean
  /**
   * The event triggered when a row is clicked
   */
  onRowClicked?: (row: Row<Data>) => void
  /**
   * use this prop to make every rows a clickable link
   */
  getRowLink?: (row: Row<Data>) => LinkProps
  /**
   * Provide this function if you want to have a subcomponent for the rows
   */
  renderSubComponent?: (row: Row<Data>, rowProps: TableRowProps) => JSX.Element
  /**
   * Provide this function if you want to have a component appearing over the rows on hover
   */
  renderRowHoveredComponent?: (row: Row<Data>) => JSX.Element
  /**
   * Indicates if the data is currently loading
   */
  isLoading?: boolean
  /**
   * Used for the loading state. Indicates the expected number of rows in the table after the loading
   * so that the loading component has the same size than the loaded table
   * @default 10
   */
  expectedSize?: number
  /**
   * The component to render in the table header
   */
  header?: React.ReactNode
  /**
   * Indicates if there shouldn't be a checkbox to check or uncheck all the rows on the current page at the same time
   * @default false
   */
  noToggleAllPageRowsSelected?: boolean
  /**
   * Indicates if your `columns` include footers. This prop is here to avoid processing footers node for nothing
   * @default false
   */
  withFooter?: boolean
  /**
   * Only used if you have a paginated table with a persistant select
   * @default false
   */
  getRowId?: (row: Data) => string
  /**
   * You can pass additional props to some rows by giving the id of the row as the key in the object or to all
   * the rows by giving the key "all" to your props
   */
  additionalRowsProps?: Record<string, any>
  /**
   * You optionnal custom icon used to indicate the expand status of a row
   */
  expandIcon?: JSX.Element
  /**
   * The poistion in the row of the expand icon
   * @default 'start'
   */
  expandIconPosition?: 'start' | 'end'
  /**
   * Pass this props to true if you want the expandable row to be expanded in the row when the `variant` is 'elevated'
   * @default false
   */
  expandInElevatedRow?: boolean
  /**
   * Pass this props to true if you want to expand the row when it's clicked (and not only on the expand icon)
   * @default false
   */
  toggleExpandOnRowClicked?: boolean
  /**
   * The classes applied to the different part of the component
   */
  classes?: TableClasses
  /**
   * The styles applied to the different part of the component
   */
  styles?: TableStyles
}

const defaultColumn: Partial<Column<{ id: string }>> = {
  width: 100
}

export type TableProps<Data extends {}> = MergeMuiElementProps<
  TableContainerProps,
  TableBasicProps<Data>
>

export const Table = <Data extends {}>(props: TableProps<Data>) => {
  const {
    data,
    columns,
    tableOptions,
    page,
    handlePageChange,
    onPageChange,
    isLoading,
    totalPages,
    setSelectedRowIds,
    isSelectableRow,
    variant = 'elevated',
    renderSubComponent,
    className,
    classes,
    styles,
    withFooter = false,
    onRowClicked,
    noToggleAllPageRowsSelected = false,
    renderRowHoveredComponent,
    header,
    getRowId,
    expectedSize = 10,
    expandIcon,
    expandIconPosition = 'start',
    expandInElevatedRow = false,
    toggleExpandOnRowClicked = false,
    additionalRowsProps,
    getRowLink,
    sx,
    ...other
  } = props
  const isSelectabale = !!setSelectedRowIds
  const isExpandable = !!renderSubComponent
  const isPaginated = !!page && !!totalPages && totalPages > 1

  const useVariableHooks = useCallback(
    (hooks: Hooks<Data>) => {
      const expanderRow: Column<Data> = {
        id: 'expander',
        accessor: 'expander',
        Cell: ({ row }: CellProps<Data>) => {
          return (
            <div onClick={(e) => e.stopPropagation()}>
              <IconButton {...row.getToggleRowExpandedProps()}>
                <Box
                  sx={{
                    transform:
                      row.isExpanded && expandIconPosition === 'start'
                        ? 'rotate(-180deg)'
                        : row.isExpanded && expandIconPosition === 'end'
                        ? 'rotate(180deg)'
                        : '',
                    transition: '0.2s',
                    display: 'flex'
                  }}
                >
                  {expandIcon || (
                    <Arrow
                      key='expanderIcon'
                      color='#353945'
                      width='20px'
                      height='20px'
                      style={{
                        transform: 'rotate(-90deg)'
                      }}
                    />
                  )}
                </Box>
              </IconButton>
            </div>
          )
        },
        maxWidth: 50,
        className: 'AruiTable-actionColumn'
      } as Column<Data>
      // @ts-ignore
      hooks.allColumns.push((columns) => [
        ...(isExpandable && expandIconPosition === 'start'
          ? [expanderRow]
          : []),
        ...(isSelectabale
          ? [
              {
                id: 'selection',
                accessor: 'selection',
                Header: ({
                  // @ts-ignore
                  getToggleAllPageRowsSelectedProps
                }: HeaderProps<Data>) => {
                  return noToggleAllPageRowsSelected ? (
                    <div />
                  ) : (
                    <CheckBox {...getToggleAllPageRowsSelectedProps()} />
                  )
                },
                Cell: ({ row }: CellProps<Data>) => {
                  const isSelectable = isSelectableRow
                    ? isSelectableRow(row)
                    : true
                  return (
                    isSelectable && (
                      <CheckBox
                        {...row.getToggleRowSelectedProps()}
                        onClick={(event) => event.stopPropagation()}
                      />
                    )
                  )
                },
                maxWidth: 50,
                className: 'AruiTable-actionColumn'
              } as Column<Data>
            ]
          : []),
        ...columns,
        ...(isExpandable && expandIconPosition === 'end' ? [expanderRow] : [])
      ])
    },
    [
      isSelectabale,
      isExpandable,
      noToggleAllPageRowsSelected,
      expandIcon,
      expandIconPosition
    ]
  )

  const {
    getTableProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    state: { selectedRowIds },
    toggleRowExpanded,
    selectedFlatRows
  } = UseCompleteTable<Data>(
    variant,
    {
      data,
      columns,
      initialState: { pageIndex: 0, pageSize: data.length },
      manualPagination: true,
      pageCount: totalPages,
      autoResetSelectedRows: false,
      getRowId: getRowId,
      // @ts-ignore
      defaultColumn: defaultColumn as Partial<Column<Data>>,
      ...tableOptions
    },
    useExpanded,
    usePagination,
    useRowSelect,
    useVariableHooks
  )

  useEffect(() => {
    const selectedOptions: Record<string, boolean> = selectedRowIds
    // In same case selectedFlatRows contains only the rows of the current page.
    // When ToggleAllPageRowsSelected is checked, we need to unselect not selectable rows
    selectedFlatRows.forEach((d) => {
      const val = getRowId ? getRowId(d.original) : d.id
      const isRowSelected = isSelectableRow ? isSelectableRow(d) : true
      if (isRowSelected) {
        selectedOptions[val] = true
      } else {
        delete selectedOptions[val]
      }
    })
    setSelectedRowIds && setSelectedRowIds(selectedOptions)
  }, [selectedFlatRows, selectedRowIds, setSelectedRowIds])

  const tableProps = useMemo(() => getTableProps(), [getTableProps])

  return (
    <>
      <TableContainer
        className={cx('AruiTable-root', className)}
        sx={
          variant === 'elevated'
            ? {
                padding: (theme) => `0px ${theme.spacing(1.5)}`,
                paddingBottom: (theme) => `${theme.spacing(1.5)}`,
                boxSizing: 'border-box',
                '& .AruiTable-principaleTableRow:hover':
                  onRowClicked || getRowLink
                    ? {
                        borderColor: 'secondary.main',
                        cursor: 'pointer'
                      }
                    : {},
                ...sx
              }
            : {
                '& .AruiTable-principaleTableRow:hover':
                  onRowClicked || getRowLink
                    ? {
                        background: '#D9DBE14D',
                        cursor: 'pointer'
                      }
                    : {},
                ...sx
              }
        }
        variant={variant}
        getRowLink={getRowLink}
        expandInElevatedRow={expandInElevatedRow}
        {...other}
      >
        {header}
        {isLoading &&
          (variant === 'elevated' ? (
            <ElevatedLoading expectedSize={expectedSize} />
          ) : (
            <GroundedLoading expectedSize={expectedSize} />
          ))}
        {!isLoading &&
          (variant === 'elevated' ? (
            <ElevatedBase
              headerGroups={headerGroups}
              footerGroups={footerGroups}
              withFooter={withFooter}
              getRowLink={getRowLink}
              prepareRow={prepareRow}
              rows={rows}
              tableProps={tableProps}
              classes={classes}
              onRowClicked={onRowClicked}
              selectedRowIds={selectedRowIds}
              page={page}
              renderSubComponent={renderSubComponent}
              renderRowHoveredComponent={renderRowHoveredComponent}
              styles={styles}
              expandInRow={expandInElevatedRow}
              toggleRowExpanded={toggleRowExpanded}
              toggleExpandOnRowClicked={toggleExpandOnRowClicked}
              getRowId={getRowId}
              additionalRowsProps={additionalRowsProps}
            />
          ) : (
            <GroundedBase
              withFooter={withFooter}
              headerGroups={headerGroups}
              footerGroups={footerGroups}
              selectedRowIds={selectedRowIds}
              page={page}
              prepareRow={prepareRow}
              getRowLink={getRowLink}
              rows={rows}
              tableProps={tableProps}
              classes={classes}
              onRowClicked={onRowClicked}
              renderSubComponent={renderSubComponent}
              renderRowHoveredComponent={renderRowHoveredComponent}
              styles={styles}
              toggleRowExpanded={toggleRowExpanded}
              toggleExpandOnRowClicked={toggleExpandOnRowClicked}
              getRowId={getRowId}
              additionalRowsProps={additionalRowsProps}
            />
          ))}
      </TableContainer>
      {isPaginated ? (
        <Pagination
          className='AruiTable-pagination'
          onPageChange={onPageChange || handlePageChange}
          page={page}
          totalPage={totalPages}
        />
      ) : undefined}
    </>
  )
}
