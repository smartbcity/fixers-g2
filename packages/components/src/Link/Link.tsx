import React, { forwardRef } from 'react'
import { Link as MuiLink, LinkProps as MuiLinkProps } from  '@mui/material'
import {
  BasicProps,
  lowLevelStyles,
  MergeMuiElementProps
} from '@smartb/g2-themes'
import clsx from 'clsx'

const useStyles = lowLevelStyles()({
  link: {
    opacity: '0.9',
    textDecoration: 'underline',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  disabled: {
    cursor: 'default',
    opacity: '0.5'
  }
})

export interface LinkBasicProps<T extends object = {}> extends BasicProps {
  /**
   * The content of the link
   */
  children?: React.ReactNode
  /**
   * The href of the link
   */
  href?: string
  /**
   * The element that will be placed in the root element (a button by default)
   */
  component?: React.ElementType<any>
  /**
   * The additional props of the root element
   */
  componentProps?: T
  /**
   * Define if the component is disabled or note
   */
  disabled?: boolean
}

export type LinkProps<T extends object = {}> = MergeMuiElementProps<
  MuiLinkProps,
  LinkBasicProps<T>
>

export const LinkBase = <T extends object = {}>(
  props: LinkProps<T>,
  ref: React.ForwardedRef<HTMLElement>
) => {
  const { href, className, component, componentProps, disabled, ...other } =
    props
  const classes = useStyles()
  if (component)
    return (
      <MuiLink
        ref={ref}
        href={!disabled ? href : undefined}
        className={clsx(
          className,
          'AruiLink-root',
          classes.link,
          disabled && classes.disabled
        )}
        component={component}
        variant='body2'
        color='inherit'
        {...componentProps}
        {...other}
      />
    )
  return (
    <MuiLink
      ref={ref}
      href={!disabled ? href : undefined}
      className={clsx(
        className,
        'AruiLink-root',
        classes.link,
        disabled && classes.disabled
      )}
      variant='body2'
      color='inherit'
      {...other}
    />
  )
}

export const Link = forwardRef(LinkBase) as typeof LinkBase
