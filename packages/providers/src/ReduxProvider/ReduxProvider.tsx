import React from 'react'
import { Provider } from 'react-redux'
import { AnyAction, Store } from 'redux'

export interface ReduxProviderProps {
  /**
   * The application that will be provided
   */
  children?: React.ReactNode
  /**
   * The instance of the redux store
   */
  reduxStore: Store<any, AnyAction>
}

export const ReduxProvider = (props: ReduxProviderProps) => {
  const { reduxStore, children } = props
  return <Provider store={reduxStore}>{children}</Provider>
}
