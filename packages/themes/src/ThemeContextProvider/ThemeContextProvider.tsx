import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import { ThemeProvider, ThemeOptions, useMediaQuery } from '@mui/material'
import { defaultMaterialUiTheme, defaultTheme, Theme } from './Theme'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import { TssCacheProvider } from 'tss-react'
import { mergeDeepRight } from 'ramda'
import { DeepPartial } from '@smartb/g2-utils'

//@ts-ignore
declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

export interface ThemeContextProps {
  theme: Theme
  changeTheme: (theme: Partial<Theme>) => void
  openDrawer: boolean
  toggleOpenDrawer: () => void
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: defaultTheme,
  changeTheme: () => {},
  openDrawer: false,
  toggleOpenDrawer: () => {}
})

export interface ThemeContextProviderProps {
  children: React.ReactNode
  theme?: DeepPartial<Theme>
  customMuiTheme?: Partial<ThemeOptions>
}

export const muiCache = createCache({
  key: 'mui',
  prepend: true
})

export const tssCache = createCache({
  key: 'tss',
  prepend: false
})

export const ThemeContextProvider = (props: ThemeContextProviderProps) => {
  const { children, customMuiTheme, theme } = props
  const [localTheme, setLocalTheme] = React.useState<Theme>(
    theme ? mergeDeepRight(defaultTheme, theme as any) : defaultTheme
  )

  const setPartialTheme = useCallback((partialTheme: Theme) => {
    setLocalTheme((oldLocalTheme) =>
      mergeDeepRight(oldLocalTheme, partialTheme as any)
    )
  }, [])
  const defaultMuiTheme = useMemo(
    () => defaultMaterialUiTheme(localTheme, customMuiTheme),
    [customMuiTheme, localTheme]
  )

  const isMobile = useMediaQuery(defaultMuiTheme.breakpoints.down('md'))

  const [openDrawer, setOpenDrawer] = useState(!isMobile)

  useEffect(() => {
    if (isMobile) {
      setOpenDrawer(false)
    } else {
      setOpenDrawer(true)
    }
  }, [isMobile])

  const toggleOpenDrawer = useCallback(() => {
    setOpenDrawer((prevOpen) => !prevOpen)
  }, [])

  return (
    <ThemeContext.Provider
      value={{
        theme: localTheme,
        changeTheme: setPartialTheme,
        openDrawer,
        toggleOpenDrawer
      }}
    >
      <TssCacheProvider value={tssCache}>
        <CacheProvider value={muiCache}>
          <ThemeProvider theme={defaultMuiTheme}>{children}</ThemeProvider>
        </CacheProvider>
      </TssCacheProvider>
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const themeContext = useContext(ThemeContext)
  return themeContext.theme
}

export const useThemeContext = () => {
  return useContext(ThemeContext)
}
