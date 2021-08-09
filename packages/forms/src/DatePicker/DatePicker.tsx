import {
  DatePicker as MuiDatePicker,
  DatePickerProps as MuiDatePickerProps,
  DatePickerView,
  MuiPickersUtilsProvider
} from '@material-ui/pickers'
import React, { forwardRef, useCallback, useMemo } from 'react'
import { useInputStyles } from '../style'
import {
  BasicProps,
  lowLevelStyles,
  useTheme
} from '@smartb/archetypes-ui-themes'
import { isMobile } from 'react-device-detect'
import { TextField, TextFieldProps } from '../TextField'
import DateFnsUtils from '@date-io/date-fns'
import { format as formatFnc } from 'date-fns'
import * as dateFnsLocales from 'date-fns/locale'
import clsx from 'clsx'
import { Clear } from '@material-ui/icons'

const useStyles = lowLevelStyles()({
  root: {
    position: 'relative'
  },
  input: {
    width: '100%'
  }
})

export interface DatePickerProps extends BasicProps {
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
   * The type of the date picker
   *
   * @default 'date'
   */
  type?: 'month' | 'date'
  /**
   * Place Holder Message
   *
   * @default ''
   */
  placeholder?: string
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
   * By default the picker will be native when a mobile browser is detected. You can set this prop to `true`
   * to have the native picker appearing all the time or you can set it to `false` to always use the material-ui picker even on phone
   */
  native?: boolean
  /**
   * The reference of the input
   */
  ref?: React.ForwardedRef<HTMLDivElement>
  /**
   * The props passed to the native datePicker
   */
  nativeDatePickerProps?: Partial<TextFieldProps>
  /**
   * The props passed to the material-ui datePicker
   */
  muiDatePickerProps?: Partial<MuiDatePickerProps>
  name?: string
}

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
    type = 'date',
    placeholder = '',
    size = 'medium',
    locale = 'fr',
    native,
    name,
    muiDatePickerProps,
    nativeDatePickerProps,
    onRemove
  } = props
  const theme = useTheme()
  const defaultClasses = useInputStyles(theme)
  const classes = useStyles()

  const format = useMemo(() => {
    if (locale === 'fr') return 'dd/MM/yyyy'
    return 'yyyy/MM/dd'
  }, [locale])

  const formatedNativeDates = useMemo(() => {
    const formatType = type === 'date' ? 'yyyy-MM-dd' : 'yyyy-MM'
    return {
      value: value ? formatFnc(value, formatType) : '',
      minDate: minDate ? formatFnc(minDate, formatType) : '',
      maxDate: maxDate ? formatFnc(maxDate, formatType) : ''
    }
  }, [value, type, minDate, maxDate])

  const dateType: {
    views: DatePickerView[]
    openTo: DatePickerView
  } = useMemo(() => {
    if (type === 'date')
      return {
        views: ['year', 'month', 'date'],
        openTo: 'date'
      }
    return {
      views: ['year', 'month'],
      openTo: 'month'
    }
  }, [])

  const onPCChange = useCallback(
    (date: Date | null) => {
      onChangeDate && onChangeDate(date ? new Date(date) : undefined)
    },
    [onChangeDate]
  )

  const onMobileChange = useCallback(
    (value: string) => {
      onChangeDate && onChangeDate(new Date(value))
    },
    [onChangeDate]
  )

  const rightIcon = useMemo(() => {
    if (!value) return undefined
    if (onRemove && !disabled)
      return (
        <Clear
          onClick={onRemove}
          className={clsx(defaultClasses.clear, 'AruiDatePicker-clearIcon')}
        />
      )
    return undefined
  }, [value, onRemove, defaultClasses.clear, disabled])

  if (native === true || (native !== false && isMobile))
    return (
      <TextField
        //@ts-ignore
        textFieldType={type}
        ref={ref}
        className={clsx(className, 'AruiDatePicker-datePicker')}
        style={style}
        id={id}
        value={formatedNativeDates.value}
        onChange={onMobileChange}
        placeholder={placeholder}
        disabled={disabled}
        onRemove={onRemove}
        size={size}
        InputProps={{
          inputProps: {
            min: formatedNativeDates.minDate,
            max: formatedNativeDates.maxDate
          }
        }}
        {...nativeDatePickerProps}
      />
    )

  return (
    <MuiPickersUtilsProvider
      utils={DateFnsUtils}
      locale={dateFnsLocales[locale]}
    >
      <div
        className={clsx(classes.root, className, 'AruiDatePicker-root')}
        style={style}
      >
        <MuiDatePicker
          views={dateType.views}
          openTo={dateType.openTo}
          variant='inline'
          format={format}
          minDate={minDate}
          maxDate={maxDate}
          placeholder={placeholder}
          className={clsx(
            defaultClasses.input,
            classes.input,
            size === 'large' && defaultClasses.inputLarge,
            size === 'medium' && defaultClasses.inputMedium,
            size === 'small' && defaultClasses.inputSmall,
            disabled && defaultClasses.inputDisabled,
            'AruiDatePicker-datePicker'
          )}
          InputProps={{
            disableUnderline: true,
            ref: ref,
            id: id,
            name: name
          }}
          disabled={disabled}
          value={value ? value : null}
          onChange={onPCChange}
          {...muiDatePickerProps}
        />
        {rightIcon}
      </div>
    </MuiPickersUtilsProvider>
  )
}

export const DatePicker = forwardRef(DatePickerBase) as typeof DatePickerBase
