import React, { createContext, useContext, useState } from 'react'
import { HeaderProps } from '../Header'
import { ActionsProps } from '@smartb/g2-components'

export interface PageContextProps {
  /**
   * the props passed to the header
   */
  headerProps?: HeaderProps
  /**
   * the actions displayed at the bottom of the component.
   */
  bottomActionsProps?: ActionsProps
}

export const pageDefaultContext = {
  headerProps: undefined,
  bottomActionsProps: undefined,
  setPageContext: () => {}
}

export const PageContext = createContext<
  PageContextProps & { setPageContext: (context: PageContextProps) => void }
>(pageDefaultContext)

export interface PageContextProviderProps extends PageContextProps {
  children: React.ReactNode
}

export const PageContextProvider = (props: PageContextProviderProps) => {
  const { children, ...other } = props
  const [pageState, setPageState] = useState<PageContextProps>({
    ...other,
    ...props
  })
  return (
    <PageContext.Provider
      value={{ ...pageState, setPageContext: setPageState }}
    >
      {children}
    </PageContext.Provider>
  )
}

export const usePage = () => {
  return useContext(PageContext)
}
