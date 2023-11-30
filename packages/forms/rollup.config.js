import getGlobal from '../../globalRollup.config.js'

import packageJson from './package.json' assert { type: 'json' }

export default {
  input: 'src/index.ts',
  ...getGlobal(packageJson),
  external: [
    ...getGlobal(packageJson).external,
    '@mui/x-date-pickers/internals/index.js',
    '@mui/x-date-pickers/PickersActionBar/index.js',
    '@mui/x-date-pickers/AdapterDateFns/index.js',
    'leaflet/dist/leaflet.css',
    'date-fns/locale/index.js'
  ]
}
