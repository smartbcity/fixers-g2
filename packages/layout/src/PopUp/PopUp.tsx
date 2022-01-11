import React, { forwardRef, useMemo } from 'react'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps
} from '@mui/material'
import { Button, ButtonProps } from '@smartb/g2-components'
import {
  MergeMuiElementProps,
  BasicProps,
  makeG2STyles
} from '@smartb/g2-themes'
import clsx from 'clsx'
import { CloseRounded } from '@mui/icons-material'

const useStyles = makeG2STyles()({
  paper: {
    borderRadius: '16px'
  },
  actionsContainer: {
    padding: '20px',
    paddingTop: '0px'
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    cursor: 'pointer',
    width: 20,
    height: 20,
    color: '#676879'
  },
  content: {
    padding: '40px'
  },
  button: {
    margin: '5px'
  }
})

export type Action = {
  label: React.ReactNode
  key: string
} & Omit<ButtonProps, 'children' | 'style'>

interface PopUpClasses {
  content?: string
  actions?: string
  button?: string
  closeIcon?: string
}

interface PopUpStyles {
  content?: React.CSSProperties
  actions?: React.CSSProperties
  button?: React.CSSProperties
  closeIcon?: React.CSSProperties
}

export interface PopUpBasicProps extends BasicProps {
  /**
   * Define if the po-up is open
   */
  open: boolean
  /**
   * The event called when the user request to close the pop-up
   */
  onClose: (event: React.ChangeEvent<{}>) => void
  /**
   * The list of the actions that will be displayed at the bottom f the pop-up
   */
  actions?: Action[]
  /**
   * The content that will be displayed in the body of the pop-up
   */
  children?: React.ReactNode
  /**
   * The classes applied to the different part of the component
   */
  classes?: PopUpClasses
  /**
   * The styles applied to the different part of the component
   */
  styles?: PopUpStyles
}

export type PopUpProps = MergeMuiElementProps<DialogProps, PopUpBasicProps>

const PopUpBase = (
  props: PopUpProps,
  ref: React.ForwardedRef<HTMLDivElement>
) => {
  const {
    open,
    onClose,
    actions = [],
    children,
    style,
    className,
    id,
    classes,
    styles,
    ...other
  } = props
  const defaultStyles = useStyles()

  const actionsDisplay = useMemo(() => {
    if (actions.length === 0) return undefined
    return actions.map((action) => {
      const { key, label, className, ...other } = action
      return (
        <Button
          key={key}
          className={clsx(
            'AruiPopUp-button',
            classes?.button,
            className,
            defaultStyles.classes.button
          )}
          style={styles?.button}
          {...other}
        >
          {label}
        </Button>
      )
    })
  }, [actions, classes?.button, styles?.button])

  return (
    <Dialog
      ref={ref}
      open={open}
      onClose={onClose}
      style={style}
      id={id}
      PaperProps={{
        elevation: 12,
        className: defaultStyles.classes.paper
      }}
      className={clsx(className, 'AruiPopUp-root')}
      {...other}
    >
      <CloseRounded
        className={clsx(
          classes?.closeIcon,
          'AruiPopUp-closeIcon',
          defaultStyles.classes.closeIcon
        )}
        style={styles?.closeIcon}
        onClick={onClose}
      />
      <DialogContent
        className={clsx(
          classes?.content,
          'AruiPopUp-content',
          defaultStyles.classes.content
        )}
        style={styles?.content}
      >
        {children}
      </DialogContent>
      {actionsDisplay !== undefined && (
        <DialogActions
          className={clsx(
            'AruiPopUp-actions',
            classes?.actions,
            defaultStyles.classes.actionsContainer
          )}
          style={styles?.actions}
        >
          {actionsDisplay}
        </DialogActions>
      )}
    </Dialog>
  )
}

export const PopUp = forwardRef(PopUpBase) as typeof PopUpBase
