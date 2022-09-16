import { useTheme } from '@smartb/g2-themes'
import { useMemo } from 'react'
import tinycolor from 'tinycolor2'

export interface useFilterColorStyleParams {
  color: 'primary' | 'secondary' | 'default'
  variant: 'filled' | 'outlined'
}

export const useFilterColorStyle = (params: useFilterColorStyleParams) => {
  const { color, variant } = params
  const theme = useTheme()
  const colorStyle = useMemo(() => {
    if (variant === 'outlined') return {}
    if (color === 'primary') {
      const isPrimaryDark = tinycolor(theme.colors.primary).isDark()
      if (isPrimaryDark) return { color: 'white' }
    }
    if (color === 'secondary') {
      const isSecondaryDark = tinycolor(theme.colors.secondary).isDark()
      if (isSecondaryDark) return { color: 'white' }
    }
    return {}
  }, [color, theme.colors.primary, theme.colors.secondary, variant])
  return colorStyle
}
