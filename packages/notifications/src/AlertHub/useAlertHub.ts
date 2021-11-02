import { useSnackbar } from 'notistack'
import { useCallback } from 'react'
import { AlertProps } from '../Alert/Alert'

export const useAlertHub = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const pushAlert = useCallback(
    (alertProps: AlertProps & { persist?: boolean; key?: string }) =>
      //@ts-ignore
      enqueueSnackbar(alertProps.message ?? '', {
        variant: 'customAlert',
        persist: true,
        ...alertProps
      }),
    [enqueueSnackbar]
  )

  return {
    pushAlert: pushAlert,
    closeAlert: closeSnackbar
  }
}
