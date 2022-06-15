import React, { useMemo } from 'react'
import { Button, ButtonProps } from '../Buttons'
import {
  BasicProps,
  makeG2STyles,
  MergeMuiElementProps
} from '@smartb/g2-themes'
import { Stack, StackProps } from '@mui/material'
import { cx } from '@emotion/css'

export type Action = {
  label: React.ReactNode
  key: string
} & Omit<ButtonProps, 'children' | 'style'>

export interface ActionsClasses {
  actions?: string
  button?: string
}

export interface ActionsStyles {
  actions?: React.CSSProperties
  button?: React.CSSProperties
}

const useStyles = makeG2STyles()({
  button: {
    margin: '8px'
  }
})

export interface ActionsBasicProps extends BasicProps {
  actions?: Action[]
  classes?: ActionsClasses
  styles?: ActionsStyles
}

export type ActionsProps = MergeMuiElementProps<
  Omit<StackProps, 'classes' | 'styles'>,
  ActionsBasicProps
>

export const Actions = (props: ActionsProps) => {
  const { actions, classes, styles, ...stackProps } = props
  const defaultStyles = useStyles()
  const actionsDisplay = useMemo(() => {
    if (!actions || actions.length === 0) return undefined
    return actions.map((action) => {
      const { key, label, className, ...other } = action
      return (
        <Stack key={key}>
          <Button
            className={cx(
              defaultStyles.classes.button,
              'AruiActions-button',
              classes?.button,
              className
            )}
            style={styles?.button}
            {...other}
          >
            {label}
          </Button>
        </Stack>
      )
    })
  }, [actions, classes?.button, styles?.button])
  return (
    <Stack
      {...stackProps}
      className={cx('AruiActions-actions', classes?.actions)}
      style={styles?.actions}
    >
      {actionsDisplay}
    </Stack>
  )
}
