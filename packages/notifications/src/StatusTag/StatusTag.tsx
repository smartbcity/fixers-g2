import { Chip, ChipProps } from '@material-ui/core'
import { BasicProps, lowLevelStyles, MergeMuiElementProps, useTheme } from '@smartb/g2-themes'
import clsx from 'clsx'
import React, { forwardRef, useMemo } from 'react'

const useStyles = lowLevelStyles<{ color: string }>()({
  tagWidth: {
    width: 'fit-content',
    padding: '0px 5px',
    '& .MuiChip-label': {
      color: ({ color }) => color
    },
    background: ({ color }) => `${color}26`,
    border: ({ color }) => `1.5px solid ${color}`,
  }
})

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
   */
  customColor?: string
}

export type StatusTagProps = MergeMuiElementProps<ChipProps, StatusTagBasicProps>

export const StatusTagBase = (props: StatusTagProps, ref: React.ForwardedRef<HTMLDivElement>) => {
  const { label, variant = 'info', customColor, className, ...other } = props
  const theme = useTheme()
  const color = useMemo(() => {
    if (customColor) return { color: customColor }
    return { color: theme.colors[variant] }
  }, [variant, customColor, theme])
  const classes = useStyles(color)
  return (
    <Chip
      ref={ref}
      label={label}
      className={clsx(classes.tagWidth, className, 'AruiStatusTag-root')}
      {...other}
    />
  )
}

export const StatusTag = forwardRef(StatusTagBase) as typeof StatusTagBase
