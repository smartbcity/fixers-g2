import { useSnackbar, enqueueSnackbar } from 'notistack'
import { useCallback } from 'react'
import { AlertProps } from '../Alert/Alert'

export const useAlertHub = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const pushAlert = useCallback(
    (alertProps: AlertProps & { persist?: boolean; key?: string }) =>
      //@ts-ignore
      enqueueSnackbar(alertProps.message ?? '', {
        variant: 'G2Alert',
        persist: alertProps.persist ?? true,
        ...alertProps
      }),
    [enqueueSnackbar]
  )

  return {
    pushAlert: pushAlert,
    closeAlert: closeSnackbar
  }
}

export const pushAlert = (alertProps: AlertProps & { persist?: boolean; key?: string }) => {
    //@ts-ignore
    return enqueueSnackbar(alertProps.message ?? '', {
      variant: 'G2Alert',
      persist: alertProps.persist ?? true,
      ...alertProps
    })
}
