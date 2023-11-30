import { WrapperVariantContext } from '@mui/x-date-pickers/internals/index.js'
import { PickersActionBarProps } from '@mui/x-date-pickers/PickersActionBar/index.js'
import { Action, Actions } from '@smartb/g2-components'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

export const CustomActionBar = (props: PickersActionBarProps) => {
  const { onAccept, onClear, onCancel, onSetToday, actions } = props
  const wrapperVariant = React.useContext(WrapperVariantContext)
  const { t } = useTranslation()

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
            text = t('g2.clear')
            break
          case 'cancel':
            action = onCancel
            text = t('g2.cancel')
            variant = 'text'
            break
          case 'accept':
            action = onAccept
            text = t('g2.accept')
            break
          case 'today':
            action = onSetToday
            text = t('g2.today')
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
    [actionsArray, t]
  )

  return <Actions padding={1} actions={actionsDisplay} />
}
