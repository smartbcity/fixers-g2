import React, { useMemo } from 'react'
import {
  FormHelperText,
  RadioGroup,
  RadioGroupProps as MuiRadioGroupProps,
  FormControlLabelProps,
  Radio,
  FormControlLabel
} from '@mui/material'
import { useInputStyles } from '../style'
import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'
import clsx from 'clsx'

export type Choice = {
  key: string | number
  label: string | number
  props?: FormControlLabelProps
}

export interface RadioChoicesClasses {
  helperText?: string
  choice?: string
}

export interface RadioChoicesStyles {
  helperText?: React.CSSProperties
  choice?: React.CSSProperties
}

export interface RadioChoicesBasicProps extends BasicProps {
  /**
   * The value selected
   *
   * @default ''
   */
  value?: string

  /**
   * The event called when the value of the slect change
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void

  /**
   * List of options available in the option
   *
   * @default []
   */
  choices?: Choice[]

  /**
   * Define if the value of the input is valid or not
   *
   * @default false
   */
  error?: boolean

  /**
   * The message displayed when `error` is true
   */
  errorMessage?: string
  /**
   * The classes applied to the different part of the component
   */
  classes?: RadioChoicesClasses
  /**
   * The styles applied to the different part of the component
   */
  styles?: RadioChoicesStyles
}

export type RadioChoicesProps = MergeMuiElementProps<
  Omit<MuiRadioGroupProps, 'ref'>,
  RadioChoicesBasicProps
>

export const RadioChoices = React.forwardRef(
  (props: RadioChoicesProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    const {
      value = '',
      name,
      choices = [],
      className,
      placeholder = '',
      onChange,
      style,
      id,
      error = false,
      errorMessage = '',
      classes,
      styles,
      ...other
    } = props

    const defaultStyles = useInputStyles()

    const choicesMemoized = useMemo(() => {
      return choices.map((choice) => (
        <FormControlLabel
          key={choice.key}
          value={choice.key}
          label={choice.label}
          {...choice.props}
          control={<Radio />}
          color='primary'
          className={clsx(classes?.choice, 'AruiRadioChoices-choice')}
          style={styles?.choice}
        />
      ))
    }, [choices, classes?.choice, styles?.choice])

    return (
      <RadioGroup
        id={id}
        ref={ref}
        value={value}
        onChange={onChange}
        name={name}
        className={clsx(className, 'AruiRadioChoices-root')}
        style={style}
        {...other}
      >
        {choicesMemoized}
        {errorMessage !== '' && error && (
          <FormHelperText
            className={clsx(
              defaultStyles.classes.helperText,
              classes?.helperText,
              'AruiRadioChoices-helperText'
            )}
            style={styles?.helperText}
          >
            {errorMessage}
          </FormHelperText>
        )}
      </RadioGroup>
    )
  }
)
