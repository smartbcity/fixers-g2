import { cx } from '@emotion/css'
import { Chip, ChipProps } from '@mui/material'
import { BasicProps, MergeMuiElementProps, useTheme } from '@smartb/g2-themes'
import React, { forwardRef, useMemo } from 'react'

export interface StatusTagBasicProps extends BasicProps {
  /**
   * The label of the status
   */
  label: string
  /**
   * The variant of the color used to style the component. This props is override by `customColor`
   *
   * @default 'info'
   */
  variant?: 'info' | 'success' | 'error' | 'warning'
  /**
   * The hexadecimal color you want to style the status tag
   * @deprecated use `color` instead
   */
  customColor?: string
  /**
   * The hexadecimal color you want to style the status tag
   */
  color?: string
}

export type StatusTagProps = MergeMuiElementProps<
  ChipProps,
  StatusTagBasicProps
>

export const StatusTagBase = (
  props: StatusTagProps,
  ref: React.ForwardedRef<HTMLDivElement>
) => {
  const {
    label,
    variant = 'info',
    customColor,
    color,
    className,
    ...other
  } = props

  const theme = useTheme()
  const colorSelection = useMemo(() => {
    if (customColor || color) return color ?? customColor
    return theme.colors[variant]
  }, [variant, customColor, color, theme])
  return (
    <Chip
      ref={ref}
      label={label}
      className={cx('AruiStatusTag-root', className)}
      sx={{
        width: 'fit-content',
        '& .MuiChip-label': {
          color: colorSelection,
          WebkitLineClamp: 2,
          lineClamp: '2',
          display: 'box',
          //@ts-ignore
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          textOverflow: 'ellipsis',
          overflow: 'hidden'
        },
        background: `${colorSelection}26`,
        border: `1.5px solid ${colorSelection}`,
        height: 'unset',
        padding: '5px',
        borderRadius: '200px'
      }}
      {...other}
    />
  )
}

export const StatusTag = forwardRef(StatusTagBase) as typeof StatusTagBase
