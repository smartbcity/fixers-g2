import React, { FunctionComponent, useMemo } from 'react'
import { FormAction } from '@smartb/g2-forms'
import { StackProps } from '@mui/material'
import { Actions, ActionsClasses, ActionsStyles } from './Actions'
import { BasicProps } from '@smartb/g2-themes/src'
import { MergeMuiElementProps } from '@smartb/g2-themes'

export interface ActionWrapperClasses extends ActionsClasses {
  actions?: string
  button?: string
}

export interface ActionWrapperStyles extends ActionsStyles {
  actions?: React.CSSProperties
  button?: React.CSSProperties
}

interface ActionsWrapperBasicProps extends BasicProps {
  /**
   * the actions displayed at the bottom of the component. To make a validation button you have to add an action with `type="submit"`
   */
  actions?: FormAction[]
  /**
   * Determine wether the actions are placed above or below the content of the form
   *
   * @default "below"
   */
  position?: 'above' | 'below' | 'both'
  /**
   * the props given to the actions stack container
   */
  stackProps?: StackProps
  /**
   * Indicates if the data is currently loading
   *
   * @default false
   */
  isLoading?: boolean
  /**
   * Indicates if the data is on readonly mode
   *
   * @default false
   */
  readonly?: boolean
  /**
   * The classes applied to the different part of the component
   */
  classes?: ActionWrapperClasses
  /**
   * The styles applied to the different part of the component
   */
  styles?: ActionWrapperStyles
}

export type ActionsWrapperProps = MergeMuiElementProps<
  StackProps,
  ActionsWrapperBasicProps
>

export const ActionsWrapper: FunctionComponent<ActionsWrapperProps> = (
  props: ActionsWrapperProps
) => {
  const {
    actions,
    classes,
    styles,
    position = 'below',
    stackProps,
    isLoading = false,
    children
  } = props

  const actionsElement = useMemo(() => {
    if (!actions || actions.length === 0) return undefined
    return (
      <Actions
        actions={actions}
        className='AruiActions-Wrapper'
        style={styles?.actions}
        classes={classes}
        styles={{ button: styles?.button }}
        sx={{
          marginTop: (theme) => theme.spacing(2),
          ...stackProps?.sx
        }}
        {...stackProps}
      />
    )
  }, [actions, classes?.button, styles?.button])

  return (
    <>
      {(position === 'above' || position === 'both') &&
        !isLoading &&
        actionsElement}
      {children}
      {(position === 'below' || position === 'both') &&
        !isLoading &&
        actionsElement}
    </>
  )
}
