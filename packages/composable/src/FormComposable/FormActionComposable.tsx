import React, { FunctionComponent, useMemo } from 'react'
import { Actions } from '@smartb/g2-components'
import { FormComposableProps } from './FormComposable'

export const FormActionComposable: FunctionComponent<FormComposableProps> = (
  props: FormComposableProps
) => {
  const {
    actions,
    classes,
    styles,
    actionsPosition = 'below',
    actionsStackProps,
    isLoading = false,
    children
  } = props
  const actionsElement = useMemo(() => {
    if (!actions || actions.length === 0) return undefined
    return (
      <Actions
        actions={actions}
        classes={{
          button: 'AruiForm-button'
        }}
        styles={{ button: styles?.button }}
        {...actionsStackProps}
      />
    )
  }, [actions, classes?.button, styles?.button])

  return (
    <>
      {actionsPosition === 'above' && !isLoading && actionsElement}
      {children}
      {actionsPosition === 'below' && !isLoading && actionsElement}
    </>
  )
}
