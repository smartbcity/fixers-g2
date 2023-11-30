import { MergeMuiElementProps } from '@smartb/g2-themes'
import React from 'react'
import { Route, Routes, RoutesProps } from 'react-router-dom'
import { NoMatchPage, NoMatchPageProps } from './NoMatchPage'
import { Impersonate } from './Impersonate'

interface RouterBasicProps {
  /**
   * The component display by the root if the user is authorized and if the current route match the one you gave
   */
  children?: React.ReactElement | React.ReactElement[]
  /**
   * By default the noMatch redirection goes to the `NoMatchPage` component but you can override it with this prop
   *
   * @default NoMatchPage
   */
  noMatchComponent?: JSX.Element
  /**
   * The props of the default noMatchComponent
   */
  noMatchPageProps?: NoMatchPageProps
}

export type RouterProps = MergeMuiElementProps<RoutesProps, RouterBasicProps>

export const Router = (props: RouterProps) => {
  const { children, noMatchComponent, noMatchPageProps, ...other } = props
  return (
    <Routes {...other}>
      {children}
      <Route path='/impersonate' element={<Impersonate />} />
      <Route
        path='*'
        element={noMatchComponent || <NoMatchPage {...noMatchPageProps} />}
      />
    </Routes>
  )
}
