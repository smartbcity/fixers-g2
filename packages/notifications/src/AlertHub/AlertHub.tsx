import React, { forwardRef, useCallback } from 'react'
import { SnackbarProvider, useSnackbar, SnackbarProviderProps } from 'notistack'
import { Alert, AlertProps } from '../Alert/Alert'
import { Grow } from '@mui/material'
import { makeG2STyles } from '@smartb/g2-themes'
import clsx from 'clsx'

const useSytles = makeG2STyles()({
  alert: {
    position: 'relative',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  }
})

export interface AlertHubProps extends SnackbarProviderProps {
  /**
   * The rest of the app inside the provider
   */
  children: React.ReactNode
}

export const AlertHub = (props: AlertHubProps) => {
  const { children, ...other } = props
  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      Components={{
        customAlert: ClosableAlert
      }}
      maxSnack={3}
      //@ts-ignore
      TransitionComponent={Grow}
      {...other}
    >
      {children}
    </SnackbarProvider>
  )
}

const ClosableAlert = forwardRef<HTMLElement, Omit<AlertProps, 'onClose'>>(
  (props, ref) => {
    const { key, id = key, className, ...other } = props
    const { classes } = useSytles()
    const { closeSnackbar } = useSnackbar()
    const handleClose = useCallback(() => closeSnackbar(id), [id])
    return (
      <Alert
        key={key}
        id={id}
        className={clsx(className, classes.alert)}
        onClose={handleClose}
        ref={ref}
        {...other}
      />
    )
  }
)
