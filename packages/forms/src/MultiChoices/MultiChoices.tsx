import React, { useCallback, useMemo } from 'react'
import {
  FormHelperText,
  FormControl,
  FormControlProps,
  FormGroup
} from '@mui/material'
import { useInputStyles } from '../style'
import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'
import { Option, SmartKey } from '../Select'
import { CheckBox } from '../CheckBox'

export interface MultiChoicesClasses {
  helperText?: string
  choice?: string
}

export interface MultiChoicesStyles {
  helperText?: React.CSSProperties
  choice?: React.CSSProperties
}

export interface MultiChoicesBasicProps extends BasicProps {
  /**
   * The values selected
   *
   * @default []
   */
  values?: SmartKey[]

  /**
   * The event called when the values of the input change
   */
  onChange?: (values: SmartKey[]) => void

  /**
   * List of options available in the option
   *
   * @default []
   */
  options?: Option[]

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
   * The helper message below the field
   */
  helperText?: string

  /**
   * The classes applied to the different part of the component
   */
  classes?: MultiChoicesClasses
  /**
   * The styles applied to the different part of the component
   */
  styles?: MultiChoicesStyles
}

export type MultiChoicesProps = MergeMuiElementProps<
  Omit<FormControlProps, 'ref'>,
  MultiChoicesBasicProps
>

export const MultiChoices = React.forwardRef(
  (props: MultiChoicesProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    const {
      values = [],
      options = [],
      className,
      onChange,
      style,
      id,
      error = false,
      errorMessage = '',
      classes,
      styles,
      helperText,
      ...other
    } = props

    const onChangeMemoized = useCallback(
      (key: SmartKey, checked: boolean) => {
        let valuesCopy = [...values]
        if (checked) valuesCopy.push(key)
        else {
          const index = values.findIndex((value) => key === value)
          valuesCopy.splice(index, 1)
        }
        onChange && onChange(valuesCopy)
      },
      [onChange, values]
    )
    const defaultStyles = useInputStyles()

    const choicesMemoized = useMemo(() => {
      return options.map((choice) => (
        <CheckBox
          key={choice.key.toString()}
          checked={values.includes(choice.key)}
          onChange={(_, checked) => onChangeMemoized(choice.key, checked)}
          label={choice.label}
          className={defaultStyles.cx(
            'AruiMultiChoices-choice',
            classes?.choice
          )}
          sx={{
            paddingLeft: 0
          }}
          style={styles?.choice}
        />
      ))
    }, [options, values, classes?.choice, styles?.choice, onChangeMemoized])

    const errorText = useMemo(
      () =>
        (errorMessage !== '' && error) || helperText ? (
          <FormHelperText
            className={defaultStyles.cx(
              errorMessage !== '' && error
                ? defaultStyles.classes.errorHelperText
                : defaultStyles.classes.helperText,
              'AruiMultiChoices-helperText',
              classes?.helperText
            )}
            style={styles?.helperText}
          >
            {error ? errorMessage ?? helperText : helperText}
          </FormHelperText>
        ) : (
          <></>
        ),
      [errorMessage, error, helperText]
    )
    return (
      <FormControl
        id={id}
        ref={ref}
        error={error}
        className={defaultStyles.cx('AruiMultiChoices-root', className)}
        style={style}
        variant='standard'
        {...other}
      >
        <FormGroup>{choicesMemoized}</FormGroup>
        {errorText}
      </FormControl>
    )
  }
)
