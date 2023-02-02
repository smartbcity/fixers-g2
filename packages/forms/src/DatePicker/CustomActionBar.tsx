import { WrapperVariantContext } from '@mui/x-date-pickers/internals'
import { PickersActionBarProps } from '@mui/x-date-pickers/PickersActionBar'
import { Action, Actions } from '@smartb/g2-components'
import React, { useMemo } from 'react'

export const CustomActionBar = (
  props: PickersActionBarProps & { locale: 'fr' | 'enUS' }
) => {
  const { onAccept, onClear, onCancel, onSetToday, actions, locale } = props
  const wrapperVariant = React.useContext(WrapperVariantContext)

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
        switch (actionType) {
          case 'clear':
            action = onClear
            text = locale === 'fr' ? 'Vider' : 'Clear'
            break
          case 'cancel':
            action = onCancel
            text = locale === 'fr' ? 'Annuler' : 'Cancel'
            variant = 'text'
            break
          case 'accept':
            action = onAccept
            text = locale === 'fr' ? 'Valider' : 'Accept'
            break
          case 'today':
            action = onSetToday
            text = locale === 'fr' ? "Aujourd'hui" : 'Today'
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
