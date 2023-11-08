import { cx } from '@emotion/css'
import { NavigateNextRounded } from '@mui/icons-material'
import {
  Breadcrumbs as MuiBreadcrumbs,
  BreadcrumbsProps as MuiBreadcrumbsProps,
  Typography
} from '@mui/material'
import React, { useMemo } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Link } from '../Link'

interface BreadcrumbsClasses {
  link?: string
  currentPage?: string
}

interface BreadcrumbsStyles {
  link?: React.CSSProperties
  currentPage?: React.CSSProperties
}

export type Crumb = {
  label: string
  url: string
}

export interface BreadcrumbsProps extends MuiBreadcrumbsProps {
  /**
   * The crumbs to build the breadcrumbs
   */
  crumbs?: Crumb[]
  /**
   * The classes applied to the different part of the component
   */
  classes?: BreadcrumbsClasses
  /**
   * The styles applied to the different part of the component
   */
  styles?: BreadcrumbsStyles
}

export const Breadcrumbs = (props: BreadcrumbsProps) => {
  const { crumbs, sx, className, classes, styles, ...other } = props

  const crumbsDisplay = useMemo(
    () =>
      crumbs?.map((crumb, index) =>
        index !== crumbs.length - 1 ? (
          <Link
            component={RouterLink}
            componentProps={{
              to: crumb.url
            }}
            key={crumb.url}
            sx={{
              color: '#757575',
              textDecoration: 'none !important',
              '&:hover': {
                textDecoration: 'underline !important'
              }
            }}
            className={cx('AruiBreadcrumbs-link', classes?.link)}
            style={styles?.link}
          >
            {crumb.label}
          </Link>
        ) : (
          <Typography
            sx={{
              color: '#424242'
            }}
            key={crumb.url}
            className={cx('AruiBreadcrumbs-currentPage', classes?.currentPage)}
            style={styles?.currentPage}
          >
            {crumb.label}
          </Typography>
        )
      ),
    [crumbs, classes, styles]
  )

  return (
    <MuiBreadcrumbs
      separator={
        <NavigateNextRounded
          sx={{
            color: '#757575'
          }}
        />
      }
      {...other}
      className={cx('AruiBreadcrumbs-root', className)}
      sx={{
        '& .MuiBreadcrumbs-separator': {
          margin: '0 4px'
        },
        ...sx
      }}
      aria-label='breadcrumb'
    >
      {crumbsDisplay}
    </MuiBreadcrumbs>
  )
}
