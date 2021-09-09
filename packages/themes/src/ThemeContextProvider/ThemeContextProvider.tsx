import React, { createContext, useCallback, useContext } from 'react'
import { ThemeProvider, Theme as MuiTheme } from '@material-ui/core'
import { defaultMaterialUiTheme, defaultTheme, Theme } from './Theme'

import "./default.css"

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
  theme?: Theme | any
  customMuiTheme?: Partial<MuiTheme>
}

export const ThemeContextProvider = (props: ThemeContextProviderProps) => {
  const { children, customMuiTheme, theme } = props
  const [localTheme, setLocalTheme] = React.useState<Theme>({
    ...{...defaultTheme, ...theme},
    ...props.theme
  })
  const setPartialTheme = useCallback((partialTheme: Partial<Theme>) => {
    setLocalTheme((oldLocalTheme) => ({ ...oldLocalTheme, ...partialTheme }))
  }, [])
  const defaultMuiTheme = defaultMaterialUiTheme(localTheme, customMuiTheme)
  return (
    <ThemeContext.Provider
      value={{ theme: localTheme, changeTheme: setPartialTheme }}
    >
      <ThemeProvider theme={defaultMuiTheme}>{children}</ThemeProvider>
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
