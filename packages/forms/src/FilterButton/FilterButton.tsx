import { FilterAltOutlined } from '@mui/icons-material'
import { Button, ButtonProps } from '@smartb/g2-components'
import { MergeMuiElementProps, useTheme } from '@smartb/g2-themes'
import React, { useMemo } from 'react'
import { useFilterColorStyle } from '../style'

export interface FilterButtonBasicProps {
  /**
   * The color of the button
   *
   * @default 'primary'
   */
  color?: 'primary' | 'secondary' | 'default'

  /**
   * The variant of the button
   *
   * @default 'filled'
   */
  variant?: 'filled' | 'outlined'
}

export type FilterButtonProps = MergeMuiElementProps<
  ButtonProps,
  FilterButtonBasicProps
>

export const FilterButton = (props: FilterButtonProps) => {
  const {
    color = 'primary',
    variant = 'filled',
    sx,
    children,
    ...other
  } = props

  const theme = useTheme()

  const colorStyle = useFilterColorStyle({
    color,
    variant
  })

  const colorFinal = useMemo(() => {
    if (variant === 'filled') return colorStyle.color
    return '#353945'
  }, [colorStyle.color, variant, color])

  const background = useMemo(() => {
    if (variant === 'filled') {
      return color === 'default' ? '#F2F2F2' : theme.colors[color]
    }
    return
  }, [variant, color, theme])

  const borderColor = useMemo(() => {
    return color === 'default' ? '#BDBDBD' : theme.colors[color]
  }, [color, theme])

  return (
    <Button
      {...other}
      sx={{
        '& .MuiButton-startIcon': {
          margin: !children ? 'unset' : ''
        }
      }}
      style={{
        color: colorFinal,
        background: background,
        borderColor: borderColor,
        borderStyle: 'solid',
        borderWidth: '2px',
        padding: '7px 12px'
      }}
      variant={variant === 'outlined' ? variant : 'contained'}
      startIcon={<FilterAltOutlined sx={{ width: 24, height: 24 }} />}
      children={children}
    />
  )
}
