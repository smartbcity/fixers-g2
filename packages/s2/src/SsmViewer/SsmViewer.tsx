import React, { useMemo } from 'react'
import { SSM } from './SSM'
import { AutomateViewerProps, Transition, AutomateViewer } from '../Automate'

export interface SsmViewerProps extends AutomateViewerProps {
  /**
   * The automate that wil be displayed in the viewer
   */
  automate: SSM
}

export const SsmViewer = (props: SsmViewerProps) => {
  const { automate, ...other } = props

  const transitions: Transition[] = useMemo(
    () =>
      automate.transtions.map(
        (transition): Transition => ({
          ...transition,
          label: transition.role + ': ' + transition.action
        })
      ),
    [automate]
  )

  return <AutomateViewer {...other} transitions={transitions} />
}
