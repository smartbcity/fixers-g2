import React, { useState } from 'react'
import { OidcProvider, OidcConfiguration } from '@axa-fr/react-oidc'
import { OidcProviderProps } from '@axa-fr/react-oidc/src/oidc/OidcProvider'
import { g2Config } from '../G2ConfigBuilder'

export type KeycloakProviderProps = Partial<OidcProviderProps>

export const KeycloakProvider = (props: KeycloakProviderProps) => {
  const { children, configuration } = props

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
    <OidcProvider configuration={configuration ?? defaultConfiguration}>
      {children}
    </OidcProvider>
  )
}
