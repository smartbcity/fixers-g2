import {
  createTheme as createMuiTheme,
  ThemeOptions,
  Theme as MuiTheme,
  Breakpoint
} from '@mui/material'
import tinycolor from 'tinycolor2'
import { mergeDeepRight } from 'ramda'

export interface Theme {
  name?: string
  colors: ThemeColors
  borderRadius: number
  spacing: number
  drawerWidth: number
  /**
   * Here you can pass the header put to the right in the page component and above the drawer menu.
   * It should use the prop openDrawer and toggleOpenDrawer to update the drawer state.
   * It will be place in a container of the width `drawerWidth`
   */
  permanentHeader?: React.ElementType<any>
  /**
   * The breakpoint where the drawer becom absolute above the main content when opened
   * @default "md"
   */
  drawerAbsolutePositionBreakpoint?: number | Breakpoint | 'always'
  /**
   * the url of the logo of the platform
   */
  logoUrl?: string
  shadows: string[]
}

export interface ThemeColors {
  primary: string
  secondary: string
  /**
   * Not really used in g2 but transfered to the mui theme as the divider color
   */
  tertiary: string
  background: string
  error: string
  success: string
  warning: string
  info: string
}

export const defaultTheme: Theme = {
  name: 'default',
  borderRadius: 8,
  spacing: 8,
  drawerWidth: 234,
  colors: {
    primary: '#EDBA27',
    secondary: '#353945',
    tertiary: '#e0e0e0',
    background: '#EEEEEE',
    error: '#E44258',
    success: '#159D50',
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
  ],
  drawerAbsolutePositionBreakpoint: 'md'
} // the archetypes theme (maybe not the final version)

export const defaultMaterialUiTheme = (
  theme: Theme,
  customMuiTheme?: Partial<ThemeOptions>
) => {
  const isPrimaryTooLight = tinycolor(theme.colors.primary).getLuminance() > 0.5
  const isSecondaryTooLight =
    tinycolor(theme.colors.secondary).getLuminance() > 0.5
  const isWarningTooLight = tinycolor(theme.colors.warning).getLuminance() > 0.5
  const isErrorTooLight = tinycolor(theme.colors.error).getLuminance() > 0.5
  const isSuccessTooLight = tinycolor(theme.colors.success).getLuminance() > 0.5
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
          containedPrimary: {
            color: isPrimaryTooLight ? '#353945' : '#ffffff',
            '&:hover': {
              backgroundColor: theme.colors.primary
            }
          },
          containedSecondary: {
            color: isSecondaryTooLight ? '#353945' : '#ffffff',
            '&:hover': {
              backgroundColor: theme.colors.secondary
            }
          },
          containedWarning: {
            color: isWarningTooLight ? '#353945' : '#ffffff',
            '&:hover': {
              backgroundColor: theme.colors.warning
            }
          },
          containedError: {
            color: isErrorTooLight ? '#353945' : '#ffffff',
            '&:hover': {
              backgroundColor: theme.colors.error
            }
          },
          containedSuccess: {
            color: isSuccessTooLight ? '#353945' : '#ffffff',
            '&:hover': {
              backgroundColor: theme.colors.success
            }
          },
          contained: {
            boxShadow: 'unset',
            '&:hover': {
              boxShadow: theme.shadows[1]
            }
          },
          text: {
            background: 'transparent',
            '&:hover': {
              backgroundColor: `rgba(0, 0, 0, 0.04)`
            },
            color: '#828282',
            '&.Mui-disabled': {
              color: '#828282',
              opacity: 0.7
            }
          },
          textError: {
            color: theme.colors.error
          },
          textWarning: {
            color: theme.colors.warning
          },
          textSuccess: {
            color: theme.colors.success
          },
          sizeLarge: {
            padding: '12px 16px'
          },
          sizeMedium: {
            padding: '8px 14px',
            borderRadius: theme.borderRadius * 0.75
          },
          sizeSmall: {
            padding: '5px 10px',
            borderRadius: theme.borderRadius * 0.75
          },
          outlinedSizeLarge: {
            padding: '12px 16px'
          },
          outlinedSizeMedium: {
            padding: '8px 14px'
          },
          outlinedSizeSmall: {
            padding: '4px 10px'
          },
          root: {
            '& .MuiSvgIcon-root ': {
              margin: '-2px 0'
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
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            padding: '12px'
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
      background: {
        default: theme.colors.background
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
        fontWeight: 600,
        textTransform: 'none',
        fontSize: '0.875rem',
        lineHeight: 'unset'
      },
      subtitle2: {
        fontWeight: 600
      },
      subtitle1: {
        fontWeight: 600
      }
    },
    shape: {
      borderRadius: theme.borderRadius
    },
    spacing: theme.spacing
  }
  if (customMuiTheme) {
    return createMuiTheme(
      mergeDeepRight(themeOverride, customMuiTheme) as MuiTheme
    )
  }
  return createMuiTheme(themeOverride)
}
