import {
  DatePicker as MuiDatePicker,
  DatePickerProps as MuiDatePickerProps,
  LocalizationProvider
} from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import React, { forwardRef, useCallback, useMemo } from 'react'
import { useInputStyles } from '../style'
import {
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps
} from '@mui/material'
import {
  BasicProps,
  lowLevelStyles,
  MergeMuiElementProps,
  Theme,
  useTheme
} from '@smartb/g2-themes'
import * as dateFnsLocales from 'date-fns/locale'
import clsx from 'clsx'

const useStyles = lowLevelStyles<Theme>()({
  dialog: {
    '& .MuiButton-root': {
      background: (theme) => theme.colors.primary,
      padding: '3px 5px',
      textTransform: 'lowercase'
    }
  }
})

export interface DatePickerClasses {
  input?: string
  helperText?: string
}

export interface DatePickerStyles {
  input?: React.CSSProperties
  helperText?: React.CSSProperties
}

export interface DatePickerBasicProps extends BasicProps {
  /**
   * The Date entered in the input
   */
  value?: Date
  /**
   * The event called when the value of the input changed
   */
  onChangeDate?: (date?: Date) => void
  /**
   * The event called when the value of the input is removed
   */
  onRemove?: () => void
  /**
   * The min Date that the user can choose
   */
  minDate?: Date
  /**
   * The max Date that the user can choose
   */
  maxDate?: Date
  /**
   * If true, the checkbox will be disabled
   *
   * @default false
   */
  disabled?: boolean
  /**
   * Placeholder Message.
   *
   * @default 'jj/MM/yyyy'
   */
  placeholder?: string
  /**
   * Define if the value of the input is valid or not
   *
   * @default false
   */
  error?: boolean

  /**
   * The message displayed when the input value is wrong
   */
  errorMessage?: string
  /**
   * The locale language use in the date picker
   *
   * @default 'fr'
   */
  locale?: keyof typeof dateFnsLocales
  /**
   * The size of the input
   *
   * @default 'medium'
   */
  size?: 'large' | 'medium' | 'small'
  /**
   * The props to the textfield element
   *
   */
  textFieldProps?: Partial<MuiTextFieldProps>
  /**
   * The name passed tothe input
   *
   */
  name?: string
  /**
   * The classes applied to the different part of the component
   */
  classes?: DatePickerClasses
  /**
   * The styles applied to the different part of the component
   */
  styles?: DatePickerStyles
}

export type DatePickerProps = MergeMuiElementProps<
  Omit<MuiDatePickerProps, 'onChange' | 'renderInput'>,
  DatePickerBasicProps
>

const DatePickerBase = (
  props: DatePickerProps,
  ref: React.ForwardedRef<HTMLDivElement>
) => {
  const {
    value,
    onChangeDate,
    className,
    style,
    id,
    minDate,
    maxDate,
    disabled = false,
    placeholder = 'jj/MM/yyyy',
    size = 'medium',
    locale = 'fr',
    onRemove,
    textFieldProps,
    name,
    error,
    errorMessage,
    classes,
    styles,
    ...other
  } = props
  const theme = useTheme()
  const defaultClasses = useInputStyles(theme)
  const classesLocal = useStyles(theme)

  const format = useMemo(() => {
    if (locale === 'fr') return { format: 'dd/MM/yyyy', mask: '__/__/____' }
    return { format: 'yyyy/MM/dd', mask: '____/__/__' }
  }, [locale])

  const onChange = useCallback(
    (date: Date | null) => {
      onChangeDate && onChangeDate(date ? new Date(date) : undefined)
    },
    [onChangeDate]
  )

  const formHelperProps = useMemo(() => {
    return {
      className: clsx(
        defaultClasses.helperText,
        classes?.helperText,
        'AruiTextfield-helperText'
      ),
      style: styles?.helperText
    }
  }, [classes?.helperText, styles?.helperText])

  const renderInput = useCallback(
    (props) => {
      if (placeholder) {
        delete props.inputProps?.placeholder
      }
      //@ts-ignore
      return (
        <MuiTextField
          {...textFieldProps}
          {...props}
          id={id}
          name={name}
          variant='filled'
          error={error}
          className={clsx(
            className,
            defaultClasses.input,
            size === 'large' && defaultClasses.inputLarge,
            size === 'medium' && defaultClasses.inputMedium,
            size === 'small' && defaultClasses.inputSmall,
            disabled && defaultClasses.inputDisabled,
            error && defaultClasses.inputError,
            'AruiDatePicker-datePicker'
          )}
          style={style}
          helperText={error ? errorMessage : ''}
          color='primary'
          InputProps={{
            disableUnderline: true,
            style: styles?.input,
            className: clsx(classes?.input, 'AruiDatePicker-input'),
            ...textFieldProps?.InputProps,
            ...props.InputProps
          }}
          FormHelperTextProps={formHelperProps}
          placeholder={placeholder}
        />
      )
    },
    [
      id,
      name,
      error,
      errorMessage,
      style,
      className,
      classes?.input,
      styles?.input,
      textFieldProps,
      formHelperProps
    ]
  )
  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      locale={dateFnsLocales[locale]}
    >
      <MuiDatePicker
        ref={ref}
        views={['day', 'month', 'year']}
        openTo='day'
        inputFormat={format.format}
        mask={format.mask}
        minDate={minDate}
        maxDate={maxDate}
        clearable
        DialogProps={{ className: classesLocal.dialog }}
        disabled={disabled}
        value={value ? value : null}
        onChange={onChange}
        renderInput={renderInput}
        {...other}
      />
    </LocalizationProvider>
  )
}

export const DatePicker = forwardRef(DatePickerBase) as typeof DatePickerBase
