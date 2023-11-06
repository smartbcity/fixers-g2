import * as React from 'react'
import { Table, Row } from '@tanstack/react-table'
import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'
import { TableContainerProps } from '@mui/material'
import { TableContainer } from '../Table/TableContainer'
import { cx } from '@emotion/css'
import { ElevatedLoading } from '../Table/ElevatedLoading'
import { GroundedLoading } from '../Table/GroundedLoading'
import { TableBase } from './TableBase'
import { Pagination } from '@smartb/g2-components'
import { TableClasses, TableStyles } from '../Table/Table'
import { LinkProps } from 'react-router-dom'

export type TableState<Data extends {}> = Table<Data>

export type G2Row<Data extends {}> = Row<Data>

export interface TableV2BasicProps<Data extends {}> extends BasicProps {
  /**
   * The tableState returned by the useTable
   */
  tableState: TableState<Data>
  /**
   * The variants of the style of the table
   * @default grounded
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
  onRowClicked?: (row: G2Row<Data>) => void
  /**
   * use this prop to make every rows a clickable link
   */
  getRowLink?: (row: G2Row<Data>) => LinkProps
  /**
   * Provide this function if you want to have a subcomponent for the rows
   */
  renderSubComponent?: (row: G2Row<Data>) => JSX.Element
  /**
   * Provide this function if you want to have a component appearing over the rows on hover
   */
  renderRowHoveredComponent?: (row: G2Row<Data>) => JSX.Element
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
   * You can pass additional props to some rows by giving the id of the row as the key in the object or to all
   * the rows by giving the key "all" to your props
   */
  additionalRowsProps?: Record<string, any>
  /**
   * Pass this props to true if you want the expandable row to be expanded in the row when the `variant` is 'elevated'
   * @default false
   */
  expandInElevatedRow?: boolean
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
    variant = 'grounded',
    renderSubComponent,
    className,
    classes,
    styles,
    withFooter = false,
    onRowClicked,
    renderRowHoveredComponent,
    header,
    expectedSize = 10,
    expandInElevatedRow = false,
    additionalRowsProps,
    tableState,
    getRowLink,
    sx,
    ...other
  } = props

  const isPaginated = !!page && !!totalPages && totalPages > 1

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
                  !!onRowClicked || !!getRowLink
                    ? {
                        borderColor: 'secondary.main',
                        cursor: 'pointer'
                      }
                    : {},
                ...sx
              }
            : {
                '& .AruiTable-principaleTableRow:hover':
                  !!onRowClicked || !!getRowLink
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
        {!isLoading && (
          <TableBase
            getRowLink={getRowLink}
            tableState={tableState}
            withFooter={withFooter}
            classes={classes}
            onRowClicked={onRowClicked}
            variant={variant}
            renderSubComponent={renderSubComponent}
            renderRowHoveredComponent={renderRowHoveredComponent}
            styles={styles}
            expandInRow={expandInElevatedRow}
            additionalRowsProps={additionalRowsProps}
          />
        )}
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
