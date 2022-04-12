import { KeycloakConfig } from '@smartb/g2-providers'

export interface ConfigWithI2 {
  i2: I2Config
}

export interface I2Config {
  orgUrl?: string
  userUrl?: string
  keycloak: KeycloakConfig
}

export const i2Config: () => ConfigWithI2 = () => {
  // @ts-ignore
  return window._env_?.config
}

export const I2ConfigBuilder = (config: I2Config) => {
  // @ts-ignore
  window._env_ = {
    // @ts-ignore
    ...window._env_,
    config: {
      // @ts-ignore
      ...window._env_?.config,
      i2: config
    }
  }
}
