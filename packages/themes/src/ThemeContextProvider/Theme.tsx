import {
  createTheme as createMuiTheme,
  ThemeOptions,
  Theme as MuiTheme
} from '@mui/material'
import tinycolor from 'tinycolor2'
import { mergeDeepRight } from 'ramda'

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
    '0px 4px 8px rgba(0, 0, 0, 0.2)',
    '0px 5px 12px rgba(0, 0, 0, 0.21)',
    '0px 6px 16px rgba(0, 0, 0, 0.22)',
    '0px 7px 20px rgba(0, 0, 0, 0.23)',
    '0px 8px 24px rgba(0, 0, 0, 0.24)',
    '0px 9px 28px rgba(0, 0, 0, 0.25)',
    '0px 10px 32px rgba(0, 0, 0, 0.26)',
    '0px 11px 36px rgba(0, 0, 0, 0.27)',
    '0px 12px 40px rgba(0, 0, 0, 0.28)',
    '0px 13px 44px rgba(0, 0, 0, 0.29)',
    '0px 14px 48px rgba(0, 0, 0, 0.3)',
    '0px 15px 52px rgba(0, 0, 0, 0.31)'
  ]
} // the archetypes theme (maybe not the final version)

export const defaultMaterialUiTheme = (
  theme: Theme,
  customMuiTheme?: Partial<ThemeOptions>
) => {
  const isPrimaryTooLight = tinycolor(theme.colors.primary).getLuminance() > 0.6
  const themeOverride: ThemeOptions = {
    // @ts-ignore
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
            color: isPrimaryTooLight ? '#353945' : '#ffffff',
            '&.Mui-disabled': {
              color: isPrimaryTooLight ? '#353945' : '#ffffff'
            }
          }
        }
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            color: isPrimaryTooLight ? '#353945' : '#ffffff'
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
      },
      divider: theme.colors.tertiary,
      success: {
        main: theme.colors.success
      },
      warning: {
        main: theme.colors.warning
      },
      info: {
        main: theme.colors.info
      },
      error: {
        main: theme.colors.error
      }
    },
    typography: {
      fontFamily: "'Montserrat', roboto",
      allVariants: {
        fontWeight: 500
      },
      button: {
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
  if (customMuiTheme) {
    return createMuiTheme(
      mergeDeepRight(themeOverride, customMuiTheme) as MuiTheme
    )
  }
  return createMuiTheme(themeOverride)
}
