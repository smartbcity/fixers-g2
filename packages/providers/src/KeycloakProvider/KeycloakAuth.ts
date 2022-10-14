import Keycloak, { KeycloakInitOptions, KeycloakConfig } from 'keycloak-js'

export interface KeycloakAuth {
  instance: Keycloak
  initOptions: KeycloakInitOptions
}

let keycloakSingleton: KeycloakAuth | undefined

const instanceBuilder = (
  config: KeycloakConfig | string,
  initOptions?: KeycloakInitOptions
): KeycloakAuth => {
  keycloakSingleton = {
    instance: new Keycloak(config),
    initOptions: initOptions || initOptionsDefault
  }
  return keycloakSingleton
}

const initOptionsDefault: KeycloakInitOptions = {
  checkLoginIframe: false,
  onLoad: 'login-required'
}

export const KeycloakAuthFactory = (
  config: KeycloakConfig | string,
  initOption?: KeycloakInitOptions
): KeycloakAuth => keycloakSingleton || instanceBuilder(config, initOption)

export const keycloakAuth: () => KeycloakAuth | undefined = () =>
  keycloakSingleton
