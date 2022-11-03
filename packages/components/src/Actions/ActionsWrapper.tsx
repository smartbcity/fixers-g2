import React, { FunctionComponent } from 'react'
import {
  Actions,
  ActionsProps,
  ActionsClasses,
  ActionsStyles,
  Action
} from './Actions'
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
  actions?: Action[]
  /**
   * Determine wether the actions are placed above or below the content of the form
   *
   * @default "below"
   */
  position?: 'above' | 'below' | 'both'
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
  ActionsProps,
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
    isLoading = false,
    children,
    ...other
  } = props

  const actionsElement = (
    <Actions
      actions={actions ?? []}
      className='AruiActions-Wrapper'
      style={styles?.actions}
      classes={classes}
      styles={{ button: styles?.button }}
      {...other}
    />
  )

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
