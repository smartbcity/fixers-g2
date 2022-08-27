import React from 'react'

export interface ActionFeedback {
  success: boolean
  fail: boolean
  setFeedback: (feedback: boolean | undefined) => void
}

export const useActionFeedback = (): ActionFeedback => {
  const [feedback, setFeedback] = React.useState<boolean | undefined>(undefined)
  return {
    success: feedback !== undefined && feedback,
    fail: feedback !== undefined && !feedback,
    setFeedback
  }
}
