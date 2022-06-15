import { Route, RouteProps } from 'react-router-dom'
import React from 'react'
import { MergeMuiElementProps } from '@smartb/g2-themes'
import { useAuth } from '../KeycloakProvider'
import { NoMatchPage } from './NoMatchPage'

interface PrivateRouteBasicProps<Roles extends string = string> {
  /**
   * The roles that the user must have one of them to access the route
   *
   * It must be the same roles type you passed to the useAuth hook configuration
   */
  roles: Roles[]
  /**
   * By default the unauthorized redirection goes to the `NoMatchPage` component but you can override it with this prop
   *
   * @default NoMatchPage
   */
  unauthorizedComponent?: JSX.Element
}

export type PrivateRouteProps<Roles extends string = string> =
  MergeMuiElementProps<RouteProps, PrivateRouteBasicProps<Roles>>

export const PrivateRoute = <Roles extends string = string>(
  props: PrivateRouteProps<Roles>
): JSX.Element => {
  const { roles, unauthorizedComponent, ...other } = props
  const { service } = useAuth<Roles>()
  return service.isAuthorized(roles) ? (
    <Route {...other} />
  ) : (
    unauthorizedComponent || <NoMatchPage />
  )
}
