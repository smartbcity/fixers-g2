import getGlobal from '../../globalRollup.config.js'

import packageJson from './package.json' assert { type: 'json' }

export default {
  input: 'src/index.ts',
  ...getGlobal(packageJson),
  external: [
    ...getGlobal(packageJson).external,
    '@mui/x-date-pickers/internals',
    '@mui/x-date-pickers/PickersActionBar',
    '@mui/x-date-pickers/AdapterDateFns',
    'leaflet/dist/leaflet.css',
    'date-fns/locale'
  ]
}
