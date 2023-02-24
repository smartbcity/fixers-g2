import React, { useMemo } from 'react'
import { SSM } from './SSM'
import { AutomateViewerProps, Transition, AutomateViewer } from '../Automate'

export interface SsmViewerProps
  extends Omit<AutomateViewerProps, 'transitions'> {
  /**
   * The automate that wil be displayed in the viewer
   */
  automate: SSM
}

export const SsmViewer = (props: SsmViewerProps) => {
  const { automate, ...other } = props

  const transitions: Transition[] = useMemo(
    () =>
      automate.transitions.map(
        (transition): Transition => ({
          from: transition.from?.position,
          to: transition.to.position,
          label: transition.role.name + ': ' + transition.action.name
        })
      ),
    [automate]
  )

  return <AutomateViewer {...other} transitions={transitions} />
}
