import React, { createContext, useCallback, useContext, useMemo } from 'react'
import { ThemeProvider, ThemeOptions } from '@mui/material'
import { defaultMaterialUiTheme, defaultTheme, Theme } from './Theme'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import { TssCacheProvider } from 'tss-react'
import { mergeDeepRight } from 'ramda'

//@ts-ignore
declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

export interface ThemeContextProps {
  theme: Theme
  changeTheme: (theme: Partial<Theme>) => void
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: defaultTheme,
  changeTheme: () => {}
})

export interface ThemeContextProviderProps {
  children: React.ReactNode
  theme?: Theme
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

  return (
    <ThemeContext.Provider
      value={{ theme: localTheme, changeTheme: setPartialTheme }}
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
