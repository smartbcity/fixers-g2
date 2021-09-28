import { Box } from  '@mui/material'
import React, { useCallback } from 'react'
import { Pagination as MuiPagination } from '@mui/material';
import { PaginationProps as MuiPaginationProps } from '@mui/lab';
import {
  BasicProps,
  MergeMuiElementProps
} from '@smartb/g2-themes'
import clsx from 'clsx'

interface PaginationClasses {
  pagination?: string
}

interface PaginationStyles {
  pagination?: React.CSSProperties
}

export interface PaginationBasicProps extends BasicProps {
  /**
   * Thecurrent selected page
   */
  page: number
  /**
   * The number total of pages
   */
  totalPage: number
  /**
   * The event triggered when the current page change
   */
  onPageChange?: (newPageNumber: number) => void
  /**
   * The classes applied to the different part of the component
   */
  classes?: PaginationClasses
  /**
   * The styles applied to the different part of the component
   */
  styles?: PaginationStyles
}

export type PaginationProps = MergeMuiElementProps<
  MuiPaginationProps,
  PaginationBasicProps
>

export const Pagination = (props: PaginationProps) => {
  const {
    onPageChange,
    page,
    totalPage,
    id,
    style,
    className,
    styles,
    classes,
    ...other
  } = props

  const onChangePage = useCallback(
    (_: React.ChangeEvent<unknown>, page: number) => {
      onPageChange && onPageChange(page)
    },
    [onPageChange]
  )

  return (
    <Box
      position='relative'
      display='flex'
      justifyContent='flex-end'
      marginTop='10px'
      className={clsx(className, 'AruiPagination-root')}
      style={style}
      id={id}
    >
      <MuiPagination
        page={page}
        className={clsx(
          'AruiPagination-pagination',
          classes?.pagination
        )}
        style={styles?.pagination}
        count={totalPage}
        onChange={onChangePage}
        shape='rounded'
        size='small'
        color='secondary'
        siblingCount={0}
        boundaryCount={1}
        {...other}
      />
    </Box>
  )
}
