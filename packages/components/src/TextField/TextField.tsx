import React from 'react'
import {
  InputLabel,
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps
} from '@material-ui/core'

import {
  BasicProps,
  MergeMuiElementProps,
  lowLevelStyles
} from '@smartb/g2-themes'
import clsx from 'clsx'

/**
 * @deprecated
 */
export interface TextFieldClasses {
  label?: string
  input?: string
}

/**
 * @deprecated
 */
export interface TextFieldStyles {
  label?: React.CSSProperties
  input?: React.CSSProperties
}

/**
 * @deprecated
 */
export interface TextFieldBasicProps extends BasicProps {
  /**
   * The default value displayed
   */
  defaultValue: string
  /**
   * The label of the input
   */
  label: string
  /**
   * The event called when the value of the input change
   * @param value
   */
  onChange: (value: string) => void
  /**
   * Define if the value of the input is valid or not
   */
  isValid?: boolean
  /**
   * The message displayed when the input value is wrong
   */
  errorMessage?: string
  /**
   * The type of the input
   */
  type?: string
  /**
   * Define if the input is disabled or not
   */
  disabled?: boolean
  /**
   * The classes applied to the different part of the component
   */
  classes?: TextFieldClasses
  /**
   * The styles applied to the different part of the component
   */
  styles?: TextFieldStyles
}

const useStyles = lowLevelStyles()({
  formControl: {
    width: '100%',
    borderRadius: '21.6px',
    boxShadow: '0 4px 16px 0 rgba(0, 0, 0, 0.09)',
    backgroundColor: '#ffffff',
    fontSize: '14px',
    color: '#535353',
    padding: '7px 13px',
    marginBottom: '8px',
    minHeight: '20px',
    '&::before': {
      content: 'none'
    }
  },
  label: {
    margin: '8px 16px'
  },
  helperText: {
    marginLeft: '3px'
  }
})

/**
 * @deprecated
 */
export type TextFieldProps = MergeMuiElementProps<
  MuiTextFieldProps,
  TextFieldBasicProps
>

/**
 * @deprecated
 */
export const TextField = (props: TextFieldProps) => {
  const {
    defaultValue,
    label,
    onChange,
    isValid = true,
    errorMessage,
    type = 'text',
    disabled = false,
    id,
    style,
    className,
    classes,
    styles,
    ...other
  } = props
  const defaultClasses = useStyles()

  // https://github.com/mui-org/material-ui/issues/20716
  const fixedTextFieldProps: Partial<MuiTextFieldProps> = {
    ...other,
    variant: 'standard'
  }
  return (
    <div style={style} className={clsx(className, 'AruiTextField-root')}>
      <InputLabel
        htmlFor={id}
        className={clsx(
          defaultClasses.label,
          'AruiTextField-label',
          classes?.label
        )}
      >
        {label}
      </InputLabel>
      <MuiTextField
        required
        className={clsx(
          defaultClasses.formControl,
          'AruiTextField-nput',
          classes?.input
        )}
        fullWidth
        value={defaultValue}
        margin='none'
        type={type}
        onChange={(it) => onChange(it.target.value)}
        error={!isValid}
        helperText={!isValid && errorMessage}
        FormHelperTextProps={{ classes: { root: defaultClasses.helperText } }}
        disabled={disabled}
        InputProps={{ disableUnderline: true, id: id }}
        {...fixedTextFieldProps}
      />
    </div>
  )
}
