import React, { useMemo } from 'react'
import { KeycloakConfig, KeycloakInitOptions } from 'keycloak-js'
import { ReactKeycloakProvider } from '@react-keycloak/web'
import { KeycloakAuth, KeycloakAuthFactory } from './KeycloakAuth'

export interface KeycloakProviderProps {
  /**
   * The keycloack connection configuration
   */
  children?: React.ReactNode
  /**
   * The keycloack connection configuration or a string url to a json containing the keycloak config
   */
  config?: KeycloakConfig | string
  /**
   * The keycloack options
   * **See the reference below** ⬇️
   *
   * @default { checkLoginIframe: false }
   */
  initOptions?: KeycloakInitOptions
  /**
   * The keycloack instance, if set config and initOptions will not be used
   *
   */
  instance?: KeycloakAuth
  /**
   * The component that will be displayed when keycloack is initializing
   */
  loadingComponent: JSX.Element
}

export const KeycloakProvider = (props: KeycloakProviderProps) => {
  const { config, initOptions, loadingComponent, children, instance } = props

  const instanceMemo = useMemo(() => {
    return instance || KeycloakAuthFactory(config!!, initOptions)
  }, [config])

  return (
    <ReactKeycloakProvider
      authClient={instanceMemo.instance}
      LoadingComponent={loadingComponent}
      initOptions={instanceMemo.initOptions}
    >
      {children}
    </ReactKeycloakProvider>
  )
}
