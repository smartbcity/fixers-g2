import Keycloak, { KeycloakInitOptions, KeycloakConfig } from 'keycloak-js'

export interface KeycloakAuth {
  instance: Keycloak.KeycloakInstance
  initOptions: KeycloakInitOptions
}

let keykcloakSingleton: KeycloakAuth

const instanceBuilder = (
  config: KeycloakConfig | string,
  initOptions?: KeycloakInitOptions
): KeycloakAuth => {
  keykcloakSingleton = {
    instance: Keycloak(config),
    initOptions: initOptions || initOptionsDefault
  }
  return keykcloakSingleton
}

const initOptionsDefault: KeycloakInitOptions = {
  checkLoginIframe: false,
  onLoad: 'login-required'
}

export const KeycloakAuthFactory = (
  config: KeycloakConfig | string,
  initOption?: KeycloakInitOptions
): KeycloakAuth => keykcloakSingleton || instanceBuilder(config, initOption)
