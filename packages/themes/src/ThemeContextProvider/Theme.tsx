import { createTheme as createMuiTheme, ThemeOptions } from '@material-ui/core'

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
    '0 0px 0px 0 rgba(0,0,0,0)',
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
  const themeOverride: ThemeOptions = {
    overrides: {
      MuiPaper: {
        elevation1: {
          boxShadow: theme.shadows[1]
        },
        elevation2: {
          boxShadow: theme.shadows[2]
        },
        elevation3: {
          boxShadow: theme.shadows[3]
        },
        elevation4: {
          boxShadow: theme.shadows[4]
        },
        elevation5: {
          boxShadow: theme.shadows[5]
        },
        elevation6: {
          boxShadow: theme.shadows[6]
        },
        elevation7: {
          boxShadow: theme.shadows[7]
        },
        elevation8: {
          boxShadow: theme.shadows[8]
        },
        elevation9: {
          boxShadow: theme.shadows[9]
        },
        elevation10: {
          boxShadow: theme.shadows[10]
        },
        elevation11: {
          boxShadow: theme.shadows[11]
        },
        elevation12: {
          boxShadow: theme.shadows[12]
        }
      },
      MuiTab: {
        root: {
          fontWeight: 600
        }
      },
      MuiChip: {
        label: {
          fontWeight: 500
        }
      }
    },
    palette: {
      primary: {
        main: '#EDBA27',
      },
      secondary: {
        main: '#353945',
      },
    },
    typography: {
      fontFamily: "'Montserrat', roboto",
      allVariants: {
        fontWeight: 500,
      },
      subtitle2: {
        fontWeight: 600
      }, 
      subtitle1: {
        fontWeight: 600
      }
    },
  }

  return createMuiTheme(Object.assign(themeOverride, customMuiTheme))
}
