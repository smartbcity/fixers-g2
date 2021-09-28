import React, { useCallback, useEffect, useState, forwardRef } from 'react'
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
  CircularProgress
} from '@mui/material'
import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'
import { useTheme } from '@smartb/g2-themes'
import {
  CheckRounded,
  CloseRounded,
  ReportProblemOutlined
} from '@mui/icons-material'
import {
  containedUseStyles,
  outlinedUseStyles,
  textUseStyles
} from './buttonStyles'

export type Variant = 'contained' | 'outlined' | 'text'

export interface ButtonBasicProps<T = {}> extends BasicProps {
  /**
   * The class added to the root element of the component
   */
  style?: React.CSSProperties
  /**
   * The id added to the root element of the component
   */
  id?: string
  /**
   * The event called when the button is clicked
   */
  onClick?: (event: React.ChangeEvent<{}>) => void
  /**
   * Define if the button is disabled or not
   *
   * @default false
   */
  disabled?: boolean
  /**
   * The styles variations options
   *
   * @default 'contained'
   */
  variant?: 'contained' | 'outlined' | 'text'
  /**
   * The inner components
   */
  children?: React.ReactNode
  /**
   * The link to go to. Href has priority over onClick
   */
  href?: string
  /**
   * Change the button with preset style on icon to indicate an advertissement about the incoming action or the triggered one
   */
  warning?: boolean
  /**
   * Change the button with preset style on icon to indicate a success about the incoming action or the triggered one
   *
   * @default false
   */
  success?: boolean
  /**
   * Change the button with preset style on icon to indicate a failure about the incoming action or the triggered one
   *
   * @default false
   */
  fail?: boolean
  /**
   * Add the icon at the left of the children4
   *
   * @default false
   */
  icon?: React.ReactNode
  /**
   * Remove the icon from the component
   */
  noIcon?: boolean
  /**
   * By default if your **onClick** function is asynchronous the button will automatically make a loading icon appear and disable the button in order
   * to wait for the end of the action. But if you want to force that state you can set **isLoading** to `true`.
   *
   * @default false
   */
  isLoading?: boolean
  /**
   * The element that will be placed in the root element (a button by default)
   */
  component?: React.ElementType<any>
  /**
   * The additional props of the root element
   */
  componentProps?: T
}

export type ButtonProps<T = {}> = MergeMuiElementProps<
  MuiButtonProps,
  ButtonBasicProps<T>
>

type refType<T> = T extends [{}]
  ? React.ForwardedRef<HTMLAnchorElement>
  : React.ForwardedRef<T>

export const ButtonBase = function <T = {}>(
  props: ButtonProps<T>,
  ref: refType<T>
) {
  const {
    children,
    onClick,
    disabled = false,
    variant = 'contained',
    style,
    className,
    id,
    href,
    success = false,
    fail = false,
    warning = false,
    icon,
    noIcon,
    isLoading = false,
    component,
    componentProps,
    ...other
  } = props
  const theme = useTheme()
  const classes =
    variant === 'contained'
      ? containedUseStyles(theme)
      : variant === 'outlined'
      ? outlinedUseStyles(theme)
      : textUseStyles(theme)
  const forcedLoading = isLoading
  const [loading, setloading] = useState(false)

  useEffect(() => {
    if (success || fail) setloading(false)
  }, [success, fail])

  const onClickMemoisied = useCallback(
    async (event: React.ChangeEvent<{}>) => {
      if (!!onClick) {
        setloading(true)
        await onClick(event)
        setloading(false)
      }
    },
    [onClick]
  )

  if (component)
    return (
      <MuiButton<typeof component>
        ref={ref}
        style={style}
        disabled={loading || disabled || forcedLoading}
        className={`${classes.root} ${
          disabled && classes.disabled
        } AruiButton-root ${className} ${success ? classes.success : ''} ${
          fail ? classes.fail : ''
        } ${warning ? classes.advertissement : classes.defaultColor}`}
        onClick={(e: any) => !href && onClick && onClickMemoisied(e)}
        component={component}
        href={href}
        id={id}
        {...componentProps}
        {...other}
      >
        {!noIcon &&
          (loading || forcedLoading ? (
            <CircularProgress
              size={variant === 'contained' ? 26 : 20}
              className={classes.buttonProgress}
            />
          ) : success ? (
            <CheckRounded className={classes.icon} />
          ) : fail ? (
            <CloseRounded className={classes.icon} />
          ) : warning ? (
            <ReportProblemOutlined className={classes.icon} />
          ) : icon ? (
            icon
          ) : (
            ''
          ))}
        {children}
      </MuiButton>
    )

  return (
    <MuiButton
      component={href ? 'a' : 'button'}
      //@ts-ignore
      ref={ref}
      style={style}
      disabled={loading || disabled || forcedLoading}
      className={`${classes.root} ${
        disabled && classes.disabled
      } AruiButton-root ${className} ${success ? classes.success : ''} ${
        fail ? classes.fail : ''
      } ${warning ? classes.advertissement : classes.defaultColor}`}
      onClick={(e) => !href && onClick && onClickMemoisied(e)}
      href={href}
      id={id}
      {...other}
    >
      {!noIcon &&
        (loading || forcedLoading ? (
          <CircularProgress
            size={variant === 'contained' ? 26 : 20}
            className={classes.buttonProgress}
          />
        ) : success ? (
          <CheckRounded className={classes.icon} />
        ) : fail ? (
          <CloseRounded className={classes.icon} />
        ) : warning ? (
          <ReportProblemOutlined className={classes.icon} />
        ) : icon ? (
          icon
        ) : (
          ''
        ))}
      {children}
    </MuiButton>
  )
}

export const Button = forwardRef(ButtonBase) as typeof ButtonBase
