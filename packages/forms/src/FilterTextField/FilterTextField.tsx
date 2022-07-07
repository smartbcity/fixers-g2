import React, { useCallback, useMemo } from 'react'
import {
  InputAdornment,
  TextField as MuiTextField,
  OutlinedTextFieldProps as MuiOutlinedTextFieldProps,
  InputLabelProps
} from '@mui/material'
import { useFilterInputStyles } from '../style'
import {
  BasicProps,
  makeG2STyles,
  MergeMuiElementProps,
  useTheme
} from '@smartb/g2-themes'
import { SearchIcon } from '../assets/icons'
import { ClearRounded } from '@mui/icons-material'
import tinycolor from 'tinycolor2'

const useStyles = makeG2STyles()({
  root: {
    position: 'relative',
    width: 'fit-content',
    '& .MuiInputBase-input': {
      minWidth: '60px'
    }
  },
  searchIcon: {
    width: '17px',
    height: '17px',
    cursor: 'pointer',
    color: 'currentColor',
    fill: 'currentColor'
  },
  input: {
    width: '100%'
  },
  withIconEndOnRemove: {
    '& .MuiInputBase-input': {
      paddingRight: '22px !important'
    }
  },
  inputWithEndAbornment: {
    paddingRight: '20px'
  },
  clearWithEndAbornment: {
    right: 33
  }
})

export interface FilterTextFieldClasses {
  label?: string
  textfield?: string
  input?: string
  clearIcon?: string
  searchIcon?: string
}

export interface FilterTextFieldStyles {
  label?: React.CSSProperties
  textfield?: React.CSSProperties
  input?: React.CSSProperties
  clearIcon?: React.CSSProperties
  searchIcon?: React.CSSProperties
}

export interface FilterTextFieldBasicProps extends BasicProps {
  /**
   * The value displayed
   */
  value?: string | number

  /**
   * The type of the input
   *
   * @default 'text'
   */
  textFieldType?: 'number' | 'text' | 'email' | 'password' | 'search'

  /**
   * The label of the input
   */
  label?: string

  /**
   * The event called when the value of the input change
   */
  onChange?: (value: string) => void

  /**
   * The default value displayed. Usefull if the input is uncontrolled
   */
  defaultValue?: string | number

  /**
   * Define if the input is disabled or not
   *
   * @default false
   */
  disabled?: boolean

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
   * The icon of the input
   */
  inputIcon?: React.ReactNode

  /**
   * The event called when the value of the input is removed
   */
  onRemove?: () => void

  /**
   * The position of the icon
   *
   * @default 'start'
   */
  iconPosition?: 'start' | 'end'

  /**
   * The event called when a search request is send when the `textFieldType` is equal to 'search'
   */
  onSearch?: () => void

  /**
   * The classes applied to the different part of the component
   */
  classes?: FilterTextFieldClasses
  /**
   * The styles applied to the different part of the component
   */
  styles?: FilterTextFieldStyles
  /**
   * The porps given to the label component
   */
  InputLabelProps?: Partial<InputLabelProps>
}

export type FilterTextFieldProps = MergeMuiElementProps<
  Omit<MuiOutlinedTextFieldProps, 'ref'>,
  FilterTextFieldBasicProps
>

export const FilterTextField = React.forwardRef(
  (props: FilterTextFieldProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    const {
      className,
      error = false,
      label = '',
      id = '',
      onChange,
      style,
      textFieldType = 'text',
      defaultValue,
      value,
      disabled = false,
      inputIcon,
      onRemove,
      classes,
      styles,
      iconPosition = 'start',
      onSearch,
      InputProps,
      color = 'primary',
      variant = 'filled',
      inputProps,
      InputLabelProps,
      ...other
    } = props
    const theme = useTheme()
    const defaultStyles = useFilterInputStyles()
    const localStyles = useStyles()
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

    const onChangeMemoized = useCallback(
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        onChange && onChange(e.target.value),
      [onChange]
    )

    const upHandler = useCallback(
      (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (event.key === 'Enter') {
          event.currentTarget.blur()
          onSearch && onSearch()
        }
      },
      [onSearch]
    )

    const inputAdornment = useMemo(() => {
      const abordementStyles = variant === 'filled' ? colorStyle : undefined
      if (textFieldType === 'search') {
        if (iconPosition === 'start') {
          return {
            startAdornment: (
              <InputAdornment
                style={abordementStyles}
                component='div'
                position='start'
              >
                <SearchIcon
                  onClick={onSearch}
                  className={defaultStyles.cx(
                    localStyles.classes.searchIcon,
                    'AruiTextfield-searchIcon',
                    classes?.searchIcon
                  )}
                  style={styles?.searchIcon}
                />
              </InputAdornment>
            )
          }
        } else {
          return {
            endAdornment: (
              <InputAdornment
                style={abordementStyles}
                component='div'
                position='end'
              >
                <SearchIcon
                  onClick={onSearch}
                  className={defaultStyles.cx(
                    localStyles.classes.searchIcon,
                    'AruiTextfield-searchIcon',
                    classes?.searchIcon
                  )}
                  style={styles?.searchIcon}
                />
              </InputAdornment>
            )
          }
        }
      } else {
        if (inputIcon && iconPosition === 'start') {
          return {
            startAdornment: (
              <InputAdornment
                style={abordementStyles}
                component='div'
                position='start'
              >
                {inputIcon}
              </InputAdornment>
            )
          }
        } else if (inputIcon) {
          return {
            endAdornment: (
              <InputAdornment
                style={abordementStyles}
                component='div'
                position='end'
              >
                {inputIcon}
              </InputAdornment>
            )
          }
        }
        return {}
      }
    }, [
      textFieldType,
      inputIcon,
      iconPosition,
      classes?.searchIcon,
      styles?.searchIcon,
      onSearch,
      colorStyle,
      variant
    ])

    const rightIcon = useMemo(() => {
      if (!value || value === '') return undefined
      if (onRemove && !disabled)
        return (
          <ClearRounded
            onClick={onRemove}
            className={defaultStyles.cx(
              defaultStyles.classes.clear,
              inputAdornment.endAdornment &&
                localStyles.classes.clearWithEndAbornment,
              'AruiTextfield-clearIcon',
              classes?.clearIcon
            )}
            style={styles?.clearIcon}
          />
        )
      return undefined
    }, [
      value,
      onRemove,
      classes?.clearIcon,
      styles?.clearIcon,
      inputAdornment.endAdornment,
      disabled
    ])

    const getVariantColorClass = () => {
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
    }

    return (
      <div
        className={defaultStyles.cx(
          localStyles.classes.root,
          'AruiTextfield-root',
          className
        )}
        style={variant === 'filled' ? { ...style, ...colorStyle } : style}
      >
        <MuiTextField
          {...other}
          ref={ref}
          id={id}
          label={variant === 'outlined' ? label : undefined}
          InputLabelProps={{
            ...InputLabelProps,
            className: defaultStyles.cx(
              defaultStyles.classes.label,
              'AruiTextfield-label',
              classes?.label
            ),
            style: styles?.label
          }}
          placeholder={variant === 'filled' ? label : undefined}
          variant='outlined'
          color={color !== 'default' ? color : undefined}
          value={value}
          onChange={onChangeMemoized}
          type={textFieldType === 'search' ? 'text' : textFieldType}
          defaultValue={defaultValue}
          className={defaultStyles.cx(
            defaultStyles.classes.input,
            variant !== 'outlined' && defaultStyles.classes.inputWithoutLabel,
            localStyles.classes.input,
            onRemove &&
              inputAdornment.endAdornment &&
              textFieldType === 'search' &&
              defaultStyles.classes.inputWithClear,
            getVariantColorClass(),
            'AruiTextfield-Textfield',
            classes?.textfield
          )}
          style={styles?.textfield}
          disabled={disabled}
          inputProps={{ size: '5', ...inputProps }}
          InputProps={{
            ...inputAdornment,
            onKeyUp: upHandler,
            style:
              variant === 'filled'
                ? { ...styles?.input, ...colorStyle }
                : styles?.input,
            className: defaultStyles.cx(
              inputAdornment.endAdornment &&
                onRemove &&
                localStyles.classes.withIconEndOnRemove,
              !!onRemove &&
                !!value &&
                value !== '' &&
                !inputAdornment.endAdornment &&
                localStyles.classes.inputWithEndAbornment,
              'AruiTextfield-input',
              classes?.input
            ),
            ...InputProps
          }}
        />
        {rightIcon}
      </div>
    )
  }
)
