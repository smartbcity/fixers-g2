import { useSnackbar } from 'notistack'
import { useCallback } from 'react'
import { AlertProps } from '../Alert/Alert'

export const useAlertHub = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const pushAlert = useCallback(
    //@ts-ignore
    (alertProps: AlertProps & { persist?: boolean; key?: string }) =>
      enqueueSnackbar(alertProps.message ?? '', {
        //@ts-ignore
        variant: 'alert',
        ...alertProps
      }),
    [enqueueSnackbar]
  )

  return {
    pushAlert: pushAlert,
    closeAlert: closeSnackbar
  }
}
