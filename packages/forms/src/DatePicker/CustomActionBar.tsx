import { WrapperVariantContext } from '@mui/x-date-pickers/internals'
import { useUtils } from '@mui/x-date-pickers/internals/hooks/useUtils'
import { PickersActionBarProps } from '@mui/x-date-pickers/PickersActionBar'
import { Action, Actions } from '@smartb/g2-components'
import React, { useMemo } from 'react'

export const CustomActionBar = (props: PickersActionBarProps) => {
  const { onAccept, onClear, onCancel, onSetToday, actions } = props
  const wrapperVariant = React.useContext(WrapperVariantContext)
  const { locale } = useUtils()

  const actionsArray =
    typeof actions === 'function' ? actions(wrapperVariant) : actions

  if (actionsArray == null || actionsArray.length === 0) {
    return null
  }

  const actionsDisplay = useMemo(
    () =>
      actionsArray?.map((actionType): Action => {
        let action: (() => void) | undefined = undefined
        let text = ''
        let variant = 'contained'
        const lang: 'fr' | 'en-US' = locale.code
        switch (actionType) {
          case 'clear':
            action = onClear
            text = lang === 'fr' ? 'Vider' : 'Clear'
            break
          case 'cancel':
            action = onCancel
            text = lang === 'fr' ? 'Annuler' : 'Cancel'
            variant = 'text'
            break
          case 'accept':
            action = onAccept
            text = lang === 'fr' ? 'Valider' : 'Accept'
            break
          case 'today':
            action = onSetToday
            text = lang === 'fr' ? "Aujourd'hui" : 'Today'
            break
        }
        return {
          key: actionType,
          label: text,
          onClick: action,
          //@ts-ignore
          variant: variant
        }
      }),
    [actionsArray, locale]
  )

  return <Actions padding={1} actions={actionsDisplay} />
}
