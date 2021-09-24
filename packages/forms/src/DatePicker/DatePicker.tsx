import {
  DatePicker as MuiDatePicker,
  LocalizationProvider,
} from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import React, { forwardRef, useCallback, useMemo } from 'react'
import { useInputStyles } from '../style'
import {
  BasicProps,
  lowLevelStyles,
  MergeMuiElementProps,
  useTheme
} from '@smartb/g2-themes'
import { TextField, TextFieldProps } from '../TextField'
import { format as formatFnc } from 'date-fns'
import * as dateFnsLocales from 'date-fns/locale'
import clsx from 'clsx'
import { Clear } from '@mui/icons-material'
import { DatePickerView } from '@mui/lab/DatePicker/shared'

const useStyles = lowLevelStyles()({
  root: {
    position: 'relative'
  },
  input: {
    width: '100%'
  }
})

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
}

export type DatePickerProps = MergeMuiElementProps<Partial<Omit<TextFieldProps, "ref">>, DatePickerBasicProps>

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
    onRemove,
    ...other
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
        views: ['year', 'month', 'day'],
        openTo: 'day'
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

  if (native)
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
        {...other}
      />
    )

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      locale={dateFnsLocales[locale]}
    >
      <div
        className={clsx(classes.root, className, 'AruiDatePicker-root')}
        style={style}
      >
        <MuiDatePicker
          views={dateType.views}
          openTo={dateType.openTo}
          inputFormat={format}
          minDate={minDate}
          maxDate={maxDate}
          className={clsx(
            classes.input,
            'AruiDatePicker-datePicker'
          )}
          disabled={disabled}
          value={value ? value : null}
          onChange={onPCChange}
          renderInput={(props) =>
            <TextField
              ref={props.ref}
              inputProps={props.inputProps}
              placeholder={placeholder}
              textFieldType="text"
              disabled={disabled}
              id={id}
              onRemove={onRemove}
              size={size}
              InputProps={{
                ref: ref,
                id: id,
                name: name
              }}
              {...other}
            />
          }
        />
        {rightIcon}
      </div>
    </LocalizationProvider>
  )
}

export const DatePicker = forwardRef(DatePickerBase) as typeof DatePickerBase
