import {
  MobileDatePicker as MuiMobileDatePicker,
  DatePickerProps as MuiDatePickerProps,
  LocalizationProvider
} from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import React, { forwardRef, useCallback, useMemo, useState } from 'react'
import { useFilterInputStyles } from '../style'
import {
  BasicProps,
  makeG2STyles,
  MergeMuiElementProps,
  useTheme
} from '@smartb/g2-themes'
import clsx from 'clsx'
import {
  InputAdornment,
  InputLabelProps,
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps
} from '@mui/material'
import { Calendar } from '../assets/icons'
import tinycolor from 'tinycolor2'
import { ClearRounded } from '@mui/icons-material'
import { fr, enUS } from 'date-fns/locale'
const dateFnsLocales = [fr, enUS]

const useStyles = makeG2STyles()((theme) => ({
  root: {
    position: 'relative',
    width: 'fit-content'
  },
  input: {
    width: '100%',
    '& .MuiInputBase-root': {
      minWidth: '115px',
      paddingRight: '8px'
    }
  },
  inputWithRemove: {
    width: '100%',
    '& .MuiInputBase-root': {
      minWidth: '130px',
      paddingRight: '8px'
    }
  },
  calendarIcon: {
    width: '17px',
    height: '17px',
    cursor: 'pointer',
    color: 'currentColor',
    stroke: 'currentColor'
  },
  dialog: {
    '& .MuiButton-root': {
      background: theme.colors.primary,
      padding: '3px 5px',
      textTransform: 'lowercase'
    }
  },
  clear: {
    right: '26px'
  }
}))

export interface FilterDatePickerClasses {
  input?: string
  textField?: string
  label?: string
  calendarIcon?: string
  clearIcon?: string
}

export interface FilterDatePickerStyles {
  input?: React.CSSProperties
  textField?: React.CSSProperties
  label?: React.CSSProperties
  calendarIcon?: React.CSSProperties
  clearIcon?: React.CSSProperties
}

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
   * The props to the textfield element
   *
   */
  textFieldProps?: Partial<MuiTextFieldProps>
  /**
   * The porps given to the label component
   */
  InputLabelProps?: Partial<InputLabelProps>
  /**
   * The name passed tothe input
   *
   */
  name?: string
  /**
   * The classes applied to the different part of the component
   */
  classes?: FilterDatePickerClasses
  /**
   * The styles applied to the different part of the component
   */
  styles?: FilterDatePickerStyles
}

export type FilterDatePickerProps = MergeMuiElementProps<
  Omit<MuiDatePickerProps, 'onChange' | 'renderInput'>,
  FilterDatePickerBasicProps
>

const FilterDatePickerBase = (
  props: FilterDatePickerProps,
  ref: React.ForwardedRef<HTMLDivElement>
) => {
  const {
    value,
    onChangeDate,
    onRemove,
    className,
    style,
    id,
    minDate,
    maxDate,
    disabled = false,
    label = 'jj/MM/yyyy',
    color = 'primary',
    variant = 'filled',
    locale = 'fr',
    textFieldProps,
    name,
    classes,
    styles,
    InputLabelProps,
    ...other
  } = props
  const theme = useTheme()
  const defaultStyles = useFilterInputStyles()
  const localStyles = useStyles()
  const [open, setOpen] = useState(false)

  const colorStyle = useMemo(() => {
    if (color === 'primary') {
      const isPrimaryDark = tinycolor(theme.colors.primary).isDark()
      if (isPrimaryDark) return { color: 'white' }
    }
    if (color === 'secondary') {
      const isSecondaryDark = tinycolor(theme.colors.secondary).isDark()
      if (isSecondaryDark) return { color: 'white' }
    }
    return {}
  }, [color, theme.colors.primary, theme.colors.secondary])

  const onOpen = useCallback(() => setOpen(true), [])

  const onClose = useCallback(() => setOpen(false), [])

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

  const getVariantColorClass = useCallback(() => {
    if (variant === 'outlined') {
      switch (color) {
        case 'primary':
          return defaultStyles.classes.inputOutlinedPrimaryColor
        case 'secondary':
          return defaultStyles.classes.inputOutlinedSecondaryColor
        case 'default':
          return defaultStyles.classes.inputOutlinedGreyColor
      }
    }
    switch (color) {
      case 'primary':
        return defaultStyles.classes.inputFilledPrimaryColor
      case 'secondary':
        return defaultStyles.classes.inputFilledSecondaryColor
      case 'default':
        return defaultStyles.classes.inputFilledGreyColor
      default:
        return defaultStyles.classes.inputFilledGreyColor
    }
  }, [variant, color])

  const rightIcon = useMemo(() => {
    if (!value) return undefined
    if (onRemove && !disabled)
      return (
        <ClearRounded
          onClick={onRemove}
          className={clsx(
            defaultStyles.classes.clear,
            'AruiFilterDatePicker-clearIcon',
            localStyles.classes.clear,
            classes?.clearIcon
          )}
          style={styles?.clearIcon}
        />
      )
    return undefined
  }, [
    value,
    onRemove,
    defaultStyles.classes.clear,
    disabled,
    localStyles.classes.clear,
    classes?.clearIcon,
    styles?.clearIcon
  ])

  const renderInput = (props: any) => {
    const InputProps = {
      endAdornment: (
        <InputAdornment
          style={variant === 'filled' ? colorStyle : undefined}
          component='div'
          position='end'
        >
          <Calendar
            onClick={onOpen}
            className={clsx(
              localStyles.classes.calendarIcon,
              classes?.calendarIcon,
              'AruiFilterDatePicker-calendarIcon'
            )}
            style={styles?.calendarIcon}
          />
        </InputAdornment>
      ),
      disableUnderline: true,
      style:
        variant === 'filled'
          ? { ...styles?.input, ...colorStyle }
          : styles?.input,
      className: clsx(classes?.input, 'AruiDatePicker-input'),
      ...textFieldProps?.InputProps,
      ...props.InputProps
    }

    delete props.inputProps?.placeholder
    return (
      <MuiTextField
        {...textFieldProps}
        {...props}
        id={id}
        name={name}
        placeholder={variant === 'filled' ? label : undefined}
        color={color !== 'default' ? color : undefined}
        className={clsx(
          classes?.textField,
          defaultStyles.classes.input,
          !!rightIcon
            ? localStyles.classes.inputWithRemove
            : localStyles.classes.input,
          getVariantColorClass(),
          'AruiFilterDatePicker-datePicker'
        )}
        style={styles?.textField}
        variant='outlined'
        InputProps={InputProps}
        InputLabelProps={{
          ...InputLabelProps,
          className: clsx(
            defaultStyles.classes.label,
            'AruiFilterDatePicker-label',
            classes?.label
          ),
          style: styles?.label,
          shrink: true
        }}
        inputProps={{
          size: '5',
          ...textFieldProps?.inputProps,
          ...props.inputProps
        }}
      />
    )
  }

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      locale={dateFnsLocales[locale]}
    >
      <div
        className={clsx(
          localStyles.classes.root,
          className,
          'AruiFilterDatePicker-root'
        )}
        style={variant === 'filled' ? { ...style, ...colorStyle } : style}
      >
        <MuiMobileDatePicker
          ref={ref}
          label={variant === 'outlined' ? label : undefined}
          views={['day', 'month', 'year']}
          openTo='day'
          open={open}
          onOpen={onOpen}
          onClose={onClose}
          inputFormat={format.format}
          mask={format.mask}
          minDate={minDate}
          maxDate={maxDate}
          DialogProps={{ className: localStyles.classes.dialog }}
          clearable
          disabled={disabled}
          value={value ? value : null}
          onChange={onChange}
          renderInput={renderInput}
          {...other}
        />
        {rightIcon}
      </div>
    </LocalizationProvider>
  )
}
export const FilterDatePicker = forwardRef(
  FilterDatePickerBase
) as typeof FilterDatePickerBase
