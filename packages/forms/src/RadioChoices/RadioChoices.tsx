import React, { useCallback, useEffect, useMemo, useState } from 'react'
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
import { Option, SmartKey } from '../Select'
import { extractNumberOrBooleanFromString } from '@smartb/g2-utils'
import { TextField, TextFieldProps } from '../TextField'

export type Choice = Option & {
  props?: FormControlLabelProps
  /**
   * set this to `true` if you want the label to appear as an editable textfield. The value returned when selected will be the value entered by the user
   */
  editableLabel?: boolean
  editableLabelProps?: Omit<TextFieldProps, 'value' | 'onChange'>
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
   * The event called when the value of the input change
   */
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    value: SmartKey
  ) => void

  /**
   * @deprecated use `options` instead
   * List of options available in the option
   *
   * @default []
   */
  choices?: Choice[]

  /**
   * List of options available in the option
   *
   * @default []
   */
  options?: Choice[]

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
      choices,
      options = [],
      className,
      onChange,
      style,
      id,
      error = false,
      errorMessage = '',
      classes,
      styles,
      ...other
    } = props

    const [editableLabels, setEditableLabels] = useState({})

    useEffect(() => {
      options.forEach((choice) => {
        if (choice.editableLabel && !editableLabels[choice.key.toString()]) {
          setEditableLabels((old) => ({
            ...old,
            [choice.key.toString()]: choice.label
          }))
        }
      })
    }, [options])

    const editedLabelKey = useMemo(() => {
      for (let key in editableLabels) {
        if (editableLabels[key] === value) {
          return key
        }
      }
      return undefined
    }, [value])

    const onChangeMemoized = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
        const edited = editableLabels[value]
        onChange &&
          onChange(event, edited ?? extractNumberOrBooleanFromString(value))
      },
      [onChange, editableLabels]
    )

    const defaultStyles = useInputStyles()

    const choicesMemoized = useMemo(() => {
      return (choices ?? options).map((choice) => (
        <FormControlLabel
          key={choice.key.toString()}
          value={choice.key}
          label={
            choice.editableLabel ? (
              <TextField
                {...choice.editableLabelProps}
                value={editableLabels[choice.key.toString()]}
                onChange={(value) =>
                  setEditableLabels((old) => ({
                    ...old,
                    [choice.key.toString()]: value
                  }))
                }
              />
            ) : (
              choice.label
            )
          }
          {...choice.props}
          control={<Radio />}
          color='primary'
          className={defaultStyles.cx(
            'AruiRadioChoices-choice',
            classes?.choice
          )}
          style={styles?.choice}
        />
      ))
    }, [choices, options, classes?.choice, styles?.choice, editableLabels])

    const errorText = useMemo(
      () =>
        errorMessage !== '' && error ? (
          <FormHelperText
            className={defaultStyles.cx(
              defaultStyles.classes.helperText,
              classes?.helperText,
              'AruiRadioChoices-helperText'
            )}
            style={{ ...styles?.helperText, marginTop: -3 }}
          >
            {errorMessage}
          </FormHelperText>
        ) : (
          <></>
        ),
      [errorMessage, error]
    )
    return (
      <div
        className={defaultStyles.cx(
          defaultStyles.classes.root,
          'AruiRadioChoices-root',
          className
        )}
        style={style}
      >
        <RadioGroup
          id={id}
          ref={ref}
          value={editedLabelKey ?? value}
          onChange={onChangeMemoized}
          name={name}
          className={defaultStyles.cx('AruiRadioChoices-root', className)}
          style={style}
          {...other}
        >
          {choicesMemoized}
          {errorText}
        </RadioGroup>
      </div>
    )
  }
)
