import React, {
  useCallback,
  useEffect,
  useState,
  forwardRef,
  useRef,
  useMemo
} from 'react'
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
  CircularProgress
} from '@mui/material'
import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'
import {
  CheckRounded,
  CloseRounded,
  ReportProblemOutlined
} from '@mui/icons-material'
import { cx } from '@emotion/css'

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
   * Add the icon at the left of the children
   *
   * @deprecated use the mui native endIcon and startIcon props
   *
   * @default false
   */
  icon?: React.ReactNode
  /**
   * Remove the default icon from the component
   */
  noDefaultIcon?: boolean
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
    noDefaultIcon,
    isLoading = false,
    component,
    componentProps,
    startIcon,
    color,
    size = 'medium',
    ...other
  } = props

  const forcedLoading = isLoading
  const [loading, setloading] = useState(false)
  const isMounted = useRef(false)

  useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])

  useEffect(() => {
    if (success || fail) setloading(false)
  }, [success, fail])

  const onClickMemoisied = useCallback(
    async (event: React.ChangeEvent<{}>) => {
      if (!!onClick) {
        setloading(true)
        await onClick(event)
        if (isMounted.current) {
          setloading(false)
        }
      }
    },
    [onClick]
  )

  const startIconElement = useMemo(() => {
    if (loading || forcedLoading)
      return (
        <CircularProgress
          size={size === 'small' ? 23 : size === 'medium' ? 24 : 25}
          sx={{
            color: 'currentcolor',
            margin: '-4px 0'
          }}
        />
      )
    if (startIcon) return startIcon
    if (icon) return icon
    if (noDefaultIcon) return undefined
    return success ? (
      <CheckRounded />
    ) : fail ? (
      <CloseRounded />
    ) : warning ? (
      <ReportProblemOutlined />
    ) : undefined
  }, [
    noDefaultIcon,
    startIcon,
    icon,
    success,
    fail,
    warning,
    loading,
    forcedLoading
  ])

  const colorSelected = useMemo(() => {
    if (warning) return 'warning'
    if (success) return 'success'
    if (fail) return 'error'
    return color
  }, [color, warning, fail, success])

  if (component)
    return (
      <MuiButton<typeof component>
        ref={ref}
        style={style}
        color={colorSelected}
        disabled={loading || disabled || forcedLoading}
        className={cx('AruiButton-root ', className)}
        onClick={(e: any) => !href && onClick && onClickMemoisied(e)}
        component={component}
        href={href}
        id={id}
        startIcon={startIconElement}
        variant={variant}
        size={size}
        {...componentProps}
        {...other}
      >
        {children}
      </MuiButton>
    )

  return (
    <MuiButton
      component={href ? 'a' : 'button'}
      //@ts-ignore
      ref={ref}
      style={style}
      color={colorSelected}
      disabled={loading || disabled || forcedLoading}
      className={cx('AruiButton-root ', className)}
      onClick={(e) => !href && onClick && onClickMemoisied(e)}
      href={href}
      id={id}
      startIcon={startIconElement}
      variant={variant}
      size={size}
      {...other}
    >
      {children}
    </MuiButton>
  )
}

export const Button = forwardRef(ButtonBase) as typeof ButtonBase
