import {useState} from "react";


export interface Feedback {
  success: boolean
  fail: boolean
  setFeedback: (feedback: boolean | undefined) => void
}

export const useFeedback = (): Feedback => {
  const [feedback, setFeedback] = useState<boolean | undefined>(undefined)
  return {
    success: feedback !== undefined && feedback,
    fail: feedback !== undefined && !feedback,
    setFeedback
  }
}
