import { cx } from '@emotion/css'
import {
  styled,
  ToggleButton,
  ToggleButtonGroup,
  ToggleButtonGroupProps
} from '@mui/material'
import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'
import React, { useCallback, useMemo } from 'react'

export type ToggleOption = {
  key: string | number
  content: React.ReactNode
}

interface ToggleButtonsClasses {
  button?: string
}

interface ToggleButtonsStyles {
  button?: React.CSSProperties
}

export interface ToggleButtonsBasicProps extends BasicProps {
  /**
   * The options of the toggle
   */
  options: ToggleOption[]
  /**
   * The key of the button selected when the prop `exclusive` is set to true
   */
  value?: string | number
  /**
   * The keys of the buttons selected when the prop `exclusive` is set to false
   */
  values?: (string | number)[]
  /**
   * The event trigered when the toggle state changes and the prop `exclusive` is set to true
   */
  onChangeExclusive?: (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    key: string | number
  ) => void
  /**
   * The event trigered when the toggle state changes and the prop `exclusive` is set to false
   */
  onChangeNonExclusive?: (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    keys: (string | number)[]
  ) => void
  /**
   * The classes applied to the different part of the component
   */
  classes?: ToggleButtonsClasses
  /**
   * The styles applied to the different part of the component
   */
  styles?: ToggleButtonsStyles
}

export type ToggleButtonsProps = MergeMuiElementProps<
  ToggleButtonGroupProps,
  ToggleButtonsBasicProps
>

export const ToggleButtons = styled((props: ToggleButtonsProps) => {
  const {
    onChangeExclusive,
    onChangeNonExclusive,
    options,
    exclusive,
    className,
    value,
    values = [],
    classes,
    styles,
    ...other
  } = props

  const onChangeMemoized = useCallback(
    (event: React.MouseEvent<HTMLElement, MouseEvent>, value: any) => {
      if (exclusive) {
        onChangeExclusive && onChangeExclusive(event, value)
      } else {
        onChangeNonExclusive && onChangeNonExclusive(event, value)
      }
    },
    [exclusive, onChangeExclusive, onChangeNonExclusive]
  )

  const buttons = useMemo(
    () =>
      options.map((option) => (
        <ToggleButton
          className={cx('AruiToggleButtons-button', classes?.button)}
          style={styles?.button}
          key={option.key}
          value={option.key}
        >
          {option.content}
        </ToggleButton>
      )),
    [options, classes?.button, styles?.button]
  )

  return (
    <ToggleButtonGroup
      color='primary'
      className={cx('AruiToggleButtons-root', className)}
      onChange={onChangeMemoized}
      value={exclusive ? value : values}
      exclusive={exclusive}
      {...other}
    >
      {buttons}
    </ToggleButtonGroup>
  )
})(({ theme }) => ({
  borderRadius: '5px',
  '& .MuiToggleButtonGroup-grouped': {
    border: `2px solid ${theme.palette.primary.main}`,
    color: theme.palette.primary.main,
    textTransform: 'none'
  },
  '& .MuiToggleButtonGroup-grouped:hover': {
    background: `${theme.palette.primary.main}4D`
  },
  '& .MuiToggleButtonGroup-grouped.Mui-selected:hover': {
    background: `${theme.palette.primary.main}B3`
  },
  '& .MuiToggleButtonGroup-grouped.Mui-selected': {
    color: 'white',
    background: theme.palette.primary.main
  }
}))
