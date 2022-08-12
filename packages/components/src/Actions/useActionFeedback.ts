import React from 'react'

export interface Feedback {
  success: boolean
  fail: boolean
  setFeedback: (feedback: boolean | undefined) => void
}

export const useActionFeedback = (): Feedback => {
  const [feedback, setFeedback] = React.useState<boolean | undefined>(undefined)
  return {
    success: feedback !== undefined && feedback,
    fail: feedback !== undefined && !feedback,
    setFeedback
  }
}
