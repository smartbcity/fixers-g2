import React, { useEffect, useState } from 'react'
import { OidcProvider, OidcConfiguration } from '@axa-fr/react-oidc'
import type { OidcProviderProps } from '@axa-fr/react-oidc/dist/OidcProvider'
import { VanillaOidc } from '@axa-fr/oidc-client'
import { g2Config } from '../G2ConfigBuilder'
import { LoadingProviders } from '../LoadingProviders'

export type KeycloakProviderProps = Partial<OidcProviderProps>

export const KeycloakProvider = (props: KeycloakProviderProps) => {
  const { children, configuration, ...others } = props

  const [defaultConfiguration] = useState<OidcConfiguration>({
    client_id: g2Config().keycloak.clientId,
    redirect_uri: window.location.origin + '/authentication/callback',
    silent_redirect_uri:
      window.location.origin + '/authentication/silent-callback',
    scope: 'openid',
    authority: g2Config().keycloak.url + '/realms/' + g2Config().keycloak.realm
    // service_worker_relative_url:'/OidcServiceWorker.js',
    // service_worker_only:true,
  })

  return (
    <OidcProvider
      configuration={configuration ?? defaultConfiguration}
      loadingComponent={LoadingProviders}
      authenticatingComponent={LoadingProviders}
      callbackSuccessComponent={LoadingProviders}
      sessionLostComponent={() => {
        useEffect(() => {
          VanillaOidc.get('default')?.loginAsync()
        }, [])

        return <></>
      }}
      {...others}
    >
      {children}
    </OidcProvider>
  )
}
