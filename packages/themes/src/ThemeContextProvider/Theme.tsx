import { createTheme as createMuiTheme, ThemeOptions } from '@mui/material'
import tinycolor from 'tinycolor2'

export interface Theme {
  name?: string
  colors: ThemeColors
  shadows: string[]
}

export interface ThemeColors {
  primary: string
  secondary: string
  tertiary: string
  error: string
  success: string
  warning: string
  info: string
}

export const defaultTheme: Theme = {
  name: 'default',
  colors: {
    primary: '#EDBA27',
    secondary: '#353945',
    tertiary: '#e0e0e0',
    error: '#E44258',
    success: '#00CA72',
    warning: '#FF9900',
    info: '#3C78D8'
  },
  shadows: [
    'none',
    '0px 3px 10px 0 rgba(0,0,0,0.1)',
    '0px 3.75px 12.5px 0px rgba(0,0,0,0.12)',
    '0px 4.5px 15px 0px rgba(0,0,0,0.14)',
    '0px 5.25px 17.5px 0px rgba(0,0,0,0.16)',
    '0px 6px 20px 0px rgba(0,0,0,0.18)',
    '0px 6.75px 22.5px 0px rgba(0,0,0,0.2)',
    '0px 7.5px 25px 0px rgba(0,0,0,0.22)',
    '0px 8.25px 27.5px 0px rgba(0,0,0,0.24)',
    '0px 9px 30px 0px rgba(0,0,0,0.26)',
    '0px 9.75px 32.5px 0px rgba(0,0,0,0.28)',
    '0px 10.5px 35px 0px rgba(0,0,0,0.3)',
    '0px 11.25px 37.5px 0px rgba(0,0,0,0.32)'
  ]
} //the archetypes theme (maybe not the final version)

export const defaultMaterialUiTheme = (
  theme: Theme,
  customMuiTheme?: Partial<ThemeOptions>
) => {
  const isPrymaryTooLight = tinycolor(theme.colors.primary).getLuminance() > 0.6
  const themeOverride: ThemeOptions = {
    //@ts-ignore
    shadows: [...theme.shadows, ...Array(12).fill('none')],
    components: {
      MuiTab: {
        styleOverrides: {
          root: {
            fontWeight: 600
          }
        }
      },
      MuiChip: {
        styleOverrides: {
          label: {
            fontWeight: 500
          }
        }
      },
      MuiButton: {
        styleOverrides: {
          root: {
            color: isPrymaryTooLight ? '#353945' : '#ffffff',
            '&.Mui-disabled': {
              color: isPrymaryTooLight ? '#353945' : '#ffffff'
            }
          }
        }
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            color: isPrymaryTooLight ? '#353945' : '#ffffff'
          }
        }
      }
    },
    palette: {
      primary: {
        main: theme.colors.primary
      },
      secondary: {
        main: theme.colors.secondary
      }
    },
    typography: {
      fontFamily: "'Montserrat', roboto",
      allVariants: {
        fontWeight: 500
      },
      subtitle2: {
        fontWeight: 600
      },
      subtitle1: {
        fontWeight: 600
      }
    }
  }

  return createMuiTheme(Object.assign(themeOverride, customMuiTheme))
}
