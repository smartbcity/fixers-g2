import React, { useMemo } from 'react'
import { Button, ButtonProps } from '../Buttons'
import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'
import { Stack, StackProps } from '@mui/material'
import { cx } from '@emotion/css'

export type Action = {
  label: React.ReactNode
  key: string
  variant?: 'contained' | 'outlined' | 'text' | 'deletion' | 'cancellation'
  showIf?: () => boolean
} & Omit<ButtonProps, 'children' | 'style' | 'variant'>

export interface ActionsClasses {
  button?: string
}

export interface ActionsStyles {
  button?: React.CSSProperties
}

export interface ActionsBasicProps extends BasicProps {
  actions?: Action[]
  classes?: ActionsClasses
  styles?: ActionsStyles
}

export type ActionsProps = MergeMuiElementProps<StackProps, ActionsBasicProps>

export const Actions = (props: ActionsProps) => {
  const { actions, classes, styles, className, sx, ...stackProps } = props
  const actionsDisplay = useMemo(() => {
    if (!actions || actions.length === 0) return undefined
    return actions
      .filter(({ showIf = () => true }) => {
        return showIf()
      })
      .map((action) => {
        const { key, label, showIf, className, variant, ...other } = action
        const variantProps: Partial<ButtonProps> =
          variant === 'deletion'
            ? {
                variant: 'outlined',
                color: 'error'
              }
            : variant === 'cancellation'
            ? {
                variant: 'outlined'
              }
            : {
                variant: 'contained'
              }
        return (
          <Button
            key={key}
            className={cx('AruiActions-button', classes?.button, className)}
            style={styles?.button}
            {...variantProps}
            {...other}
          >
            {label}
          </Button>
        )
      })
  }, [actions, classes?.button, styles?.button])
  return (
    <Stack
      {...stackProps}
      className={cx('AruiActions-root', className)}
      sx={{
        gap: (theme) => theme.spacing(1),
        flexDirection: 'row',
        justifyContent: 'flex-end',
        ...sx
      }}
    >
      {actionsDisplay}
    </Stack>
  )
}
