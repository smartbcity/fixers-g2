import getGlobal from '../../globalRollup.config.js'

import packageJson from './package.json' assert { type: 'json' }

export default {
  input: 'src/index.ts',
  ...getGlobal(packageJson),
  external: [
    ...getGlobal(packageJson).external,
    '@axa-fr/react-oidc/dist/OidcProvider'
  ]
}
