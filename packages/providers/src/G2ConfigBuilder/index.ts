import { KeycloakConfig } from '../KeycloakProvider'

export interface I2Config {
  orgUrl: string
  userUrl: string
}

export const i2Config: () => I2Config = () => {
  // @ts-ignore
  return window._env_?.config?.i2
}

export interface FsConfig {
  url: string
}

export const fsConfig: () => FsConfig = () => {
  // @ts-ignore
  return window._env_?.config?.fs
}

export interface G2Config {
  keycloak: KeycloakConfig
  i2: I2Config
  fs: FsConfig
}

export const G2ConfigBuilder = (config: G2Config) => {
  // @ts-ignore
  window._env_ = {
    // @ts-ignore
    ...window._env_,
    config: {
      // @ts-ignore
      ...window._env_?.config,
      ...config
    }
  }
}

export const g2Config: () => G2Config = () => {
  // @ts-ignore
  return window._env_?.config
}
