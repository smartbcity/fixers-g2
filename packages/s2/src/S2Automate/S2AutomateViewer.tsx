import React, { useMemo } from 'react'
import { S2Automate, S2Transition } from './S2AutomateType'
import { AutomateViewerProps, Transition, AutomateViewer } from '../Automate'

export interface S2AutomateViewerProps
  extends Omit<AutomateViewerProps, 'transitions'> {
  /**
   * The automate that wil be displayed in the viewer
   */
  automate: S2Automate
}

export const S2AutomateViewer = (props: S2AutomateViewerProps) => {
  const { automate, ...other } = props

  const statesTransitions = [automate.init, ...automate.transitions]

  const transitions: Transition[] = useMemo(
    () =>
      statesTransitions.map(
        (stateTransition: S2Transition): Transition => ({
          from: !!stateTransition.from
            ? (stateTransition.from.position ||
                stateTransition.from.nodePosition()) + 1
            : 0,
          to: !!stateTransition.to
            ? (stateTransition.to.position ||
                stateTransition.to.nodePosition()) + 1
            : 0,
          label:
            stateTransition.role.toString() +
            ': ' +
            stateTransition.command.toString()
        })
      ),
    [automate]
  )

  return <AutomateViewer {...other} transitions={transitions} />
}
