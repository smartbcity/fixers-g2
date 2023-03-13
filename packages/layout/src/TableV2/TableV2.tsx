import * as React from 'react'
import { Table, Row } from '@tanstack/react-table'
import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'
import { TableContainerProps } from '@mui/material'
import { TableContainer } from '../Table/TableContainer'
import { cx } from '@emotion/css'
import { ElevatedLoading } from '../Table/ElevatedLoading'
import { GroundedLoading } from '../Table/GroundedLoading'
import { ElevatedBase } from './ElevatedBase'
import { GroundedBase } from './GroundedBase'
import { Pagination } from '@smartb/g2-components'
import { TableClasses, TableStyles } from '../Table/Table'

export interface TableV2BasicProps<Data extends {}> extends BasicProps {
  /**
   * The tableState returned by the useTable
   */
  tableState: Table<Data>
  /**
   * The variants of the style of the table
   * @default elevated
   */
  variant?: 'grounded' | 'elevated'
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
   * The event triggered when a row is clicked
   */
  onRowClicked?: (row: Row<Data>) => void
  /**
   * Provide this function if you want to have a subcomponent for the rows
   */
  renderSubComponent?: (row: Row<Data>) => JSX.Element
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
   * You can pass additionnal props to some rows by giving the id of the row as the key in the object or to all
   * the rows by giving the key "all" to your props
   */
  additionnalRowsProps?: Record<string, any>
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

export type TableV2Props<Data extends {}> = MergeMuiElementProps<
  TableContainerProps,
  TableV2BasicProps<Data>
>

export const TableV2 = <Data extends {}>(props: TableV2Props<Data>) => {
  const {
    page,
    handlePageChange,
    onPageChange,
    isLoading,
    totalPages,
    variant = 'elevated',
    renderSubComponent,
    className,
    classes,
    styles,
    withFooter = false,
    onRowClicked,
    renderRowHoveredComponent,
    header,
    getRowId,
    expectedSize = 10,
    expandInElevatedRow = false,
    toggleExpandOnRowClicked = false,
    additionnalRowsProps,
    tableState,
    ...other
  } = props

  const isPaginated = !!page && !!totalPages

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
                '& .AruiTable-principaleTableRow:hover': onRowClicked
                  ? {
                      borderColor: 'secondary.main',
                      cursor: 'pointer'
                    }
                  : {}
              }
            : {
                '& .AruiTable-principaleTableRow:hover': onRowClicked
                  ? {
                      background: '#D9DBE14D',
                      cursor: 'pointer'
                    }
                  : {}
              }
        }
        variant={variant}
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
              tableState={tableState}
              withFooter={withFooter}
              classes={classes}
              onRowClicked={onRowClicked}
              page={page}
              renderSubComponent={renderSubComponent}
              renderRowHoveredComponent={renderRowHoveredComponent}
              styles={styles}
              expandInRow={expandInElevatedRow}
              toggleExpandOnRowClicked={toggleExpandOnRowClicked}
              getRowId={getRowId}
              additionnalRowsProps={additionnalRowsProps}
            />
          ) : (
            <GroundedBase
              tableState={tableState}
              withFooter={withFooter}
              page={page}
              classes={classes}
              onRowClicked={onRowClicked}
              renderSubComponent={renderSubComponent}
              renderRowHoveredComponent={renderRowHoveredComponent}
              styles={styles}
              toggleExpandOnRowClicked={toggleExpandOnRowClicked}
              getRowId={getRowId}
              additionnalRowsProps={additionnalRowsProps}
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
