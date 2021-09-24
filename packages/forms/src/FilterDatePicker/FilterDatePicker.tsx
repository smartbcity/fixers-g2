import {
  DatePicker as MuiDatePicker,
  LocalizationProvider,
} from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import React, { forwardRef, useCallback, useMemo } from 'react'
import { useFilterInputStyles } from '../style'
import {
  BasicProps,
  lowLevelStyles,
  MergeMuiElementProps,
  useTheme
} from '@smartb/g2-themes'
import { format as formatFnc } from 'date-fns'
import * as dateFnsLocales from 'date-fns/locale'
import clsx from 'clsx'
import { Clear } from '@mui/icons-material'
import { FilterTextField, FilterTextFieldProps } from '../FilterTextField'
import tinycolor from "tinycolor2"
import { Calendar } from '../assets/icons'
import { DatePickerView } from '@mui/lab/DatePicker/shared'

const useStyles = lowLevelStyles()({
  root: {
    position: 'relative',
    width: "fit-content",
  },
  input: {
    width: "100%",
    "& .MuiInputBase-root": {
      minWidth: "115px"
    }
  },
  inputWithRemove: {
    width: "100%",
    "& .MuiInputBase-root": {
      minWidth: "130px"
    }
  },
  calendarIcon: {
    width: "17px",
    height: "17px",
    cursor: "pointer",
    color: "currentColor",
    stroke: "currentColor",
  },
  clear: {
    right: "26px"
  }
})

export interface FilterDatePickerBasicProps extends BasicProps {
  /**
  * The label of the input
  */
  label?: string
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
   * The locale language use in the date picker
   *
   * @default 'fr'
   */
  locale?: keyof typeof dateFnsLocales

  /**
  * The color of the input
  * 
  * @default 'primary'
  */
  color?: 'primary' | 'secondary' | 'default'

  /**
  * The variant of the input
  * 
  * @default 'filled'
  */
  variant?: 'filled' | 'outlined'

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


export type FilterDatePickerProps = MergeMuiElementProps<Partial<Omit<FilterTextFieldProps, "ref">>, FilterDatePickerBasicProps>

const FilterDatePickerBase = (
  props: FilterDatePickerProps,
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
    label,
    locale = 'fr',
    native,
    name,
    color = 'primary',
    variant = 'filled',
    onRemove,
    ...other
  } = props
  const theme = useTheme()
  const defaultClasses = useFilterInputStyles(theme)
  const classes = useStyles()
  const colorStyle = useMemo(() => {
    if (color === "primary") {
      const isPrimaryDark = tinycolor(theme.colors.primary).isDark()
      if (isPrimaryDark) return { color: "white" }
    }
    if (color === "secondary") {
      const isSecondaryDark = tinycolor(theme.colors.secondary).isDark()
      if (isSecondaryDark) return { color: "white" }
    }
    return {}
  }, [color, theme.colors.primary, theme.colors.secondary])

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

  const getVariantColorClass = () => {
    if (variant === "outlined") {
      switch (color) {
        case 'primary':
          return defaultClasses.inputOutlinedPrimaryColor
        case 'secondary':
          return defaultClasses.inputOutlinedSecondaryColor
        case 'default':
          return defaultClasses.inputOutlinedGreyColor
      }
    }
    switch (color) {
      case 'primary':
        return defaultClasses.inputFilledPrimaryColor
      case 'secondary':
        return defaultClasses.inputFilledSecondaryColor
      case 'default':
        return defaultClasses.inputFilledGreyColor
      default:
        return defaultClasses.inputFilledGreyColor
    }
  }

  const rightIcon = useMemo(() => {
    if (!value) return undefined
    if (onRemove && !disabled)
      return (
        <Clear
          onClick={onRemove}
          className={clsx(defaultClasses.clear, 'AruiFilterDatePicker-clearIcon', classes.clear)}
        />
      )
    return undefined
  }, [value, onRemove, defaultClasses.clear, disabled, classes.clear])

  if (native)
    return (
      <FilterTextField
        //@ts-ignore
        textFieldType={type}
        ref={ref}
        className={clsx(className, 'AruiFilterDatePicker-datePicker')}
        style={style}
        id={id}
        value={formatedNativeDates.value}
        onChange={onMobileChange}
        variant={variant}
        color={color}
        label={label}
        InputLabelProps={{ shrink: true }}
        disabled={disabled}
        onRemove={onRemove}
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
      locale={locale}
    >
      <div
        className={clsx(classes.root, className, 'AruiFilterDatePicker-root')}
        style={variant === "filled" ? { ...style, ...colorStyle } : style}
      >
        <MuiDatePicker
          views={dateType.views}
          openTo={dateType.openTo}
          inputFormat={format}
          minDate={minDate}
          maxDate={maxDate}
          label={variant === "outlined" ? label : undefined}
          className={clsx(
            defaultClasses.input,
            onRemove ? classes.inputWithRemove : classes.input,
            getVariantColorClass(),
            'AruiFilterDatePicker-datePicker'
          )}
          disabled={disabled}
          value={value ? value : null}
          onChange={onPCChange}
          renderInput={(props) =>
            <FilterTextField
              ref={props.ref}
              inputProps={{...props.inputProps, size: "5"}}
              variant={variant}
              color={color}
              label={label}
              disabled={disabled}
              id={id}
              onRemove={onRemove}
              iconPosition="end"
              inputIcon={<Calendar className={clsx(classes.calendarIcon, "AruiTextfield-calendarIcon")} />}
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

export const FilterDatePicker = forwardRef(FilterDatePickerBase) as typeof FilterDatePickerBase
