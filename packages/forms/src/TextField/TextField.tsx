import React, { useCallback, useMemo } from 'react'
import {
  InputAdornment,
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps
} from '@mui/material'
import { CheckRounded, ClearRounded } from '@mui/icons-material'
import { useInputStyles } from '../style'
import {
  BasicProps,
  makeG2STyles,
  MergeMuiElementProps
} from '@smartb/g2-themes'
import clsx from 'clsx'
import { SearchIcon } from '../assets/icons'

const useStyles = makeG2STyles()({
  root: {
    position: 'relative'
  },
  input: {
    width: '100%'
  },
  withIconStart: {
    '& .MuiInputBase-input': {
      paddingLeft: '0px !important',
      paddingRight: '8px !important'
    }
  },
  withIconEnd: {
    '& .MuiInputBase-input': {
      paddingLeft: '5px !important'
    }
  },
  withIconEndOnRemove: {
    '& .MuiInputBase-input': {
      paddingLeft: '5px !important',
      paddingRight: '20px !important'
    }
  },
  searchIcon: {
    width: '20px',
    height: '20px',
    cursor: 'pointer'
  }
})

export interface TextFieldClasses {
  textfield?: string
  input?: string
  helperText?: string
  clearIcon?: string
  validIcon?: string
  searchIcon?: string
}

export interface TextFieldStyles {
  textfield?: React.CSSProperties
  input?: React.CSSProperties
  helperText?: React.CSSProperties
  clearIcon?: React.CSSProperties
  validIcon?: React.CSSProperties
  searchIcon?: React.CSSProperties
}

export interface TextFieldBasicProps extends BasicProps {
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
   * The size of the input
   *
   * @default 'medium'
   */
  size?: 'large' | 'medium' | 'small'

  /**
   * Define if the value of the input has been validated
   *
   * @default false
   */
  validated?: boolean

  /**
   * The event called when the value of the input change
   */
  onChange?: (value: string) => void

  /**
   * The text to display as place holder
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
   * The icon of the icon
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
   * pass this prop to true if the check or clear icons are bothering you
   *
   * @default false
   */
  noCheckOrClearIcon?: boolean

  /**
   * The event called when a search request is send when the `textFieldType` is equal to 'search'
   */
  onSearch?: () => void
  /**
   * The classes applied to the different part of the component
   */
  classes?: TextFieldClasses
  /**
   * The styles applied to the different part of the component
   */
  styles?: TextFieldStyles
}

export type TextFieldProps = MergeMuiElementProps<
  Omit<MuiTextFieldProps, 'ref'>,
  TextFieldBasicProps
>

export const TextField = React.forwardRef(
  (props: TextFieldProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    const {
      className,
      error = false,
      errorMessage = '',
      label = '',
      id = '',
      onChange,
      placeholder = '',
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
      size = 'medium',
      validated = false,
      onSearch,
      InputProps,
      noCheckOrClearIcon = false,
      ...other
    } = props

    const defaultStyles = useInputStyles()
    const localStyles = useStyles()

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
      if (textFieldType === 'search') {
        if (iconPosition === 'start') {
          return {
            startAdornment: (
              <InputAdornment component='div' position='start'>
                <SearchIcon
                  color='#323338'
                  onClick={onSearch}
                  className={clsx(
                    localStyles.classes.searchIcon,
                    classes?.searchIcon,
                    'AruiTextfield-searchIcon'
                  )}
                  style={styles?.searchIcon}
                />
              </InputAdornment>
            )
          }
        } else {
          return {
            endAdornment: (
              <InputAdornment component='div' position='end'>
                <SearchIcon
                  color='#323338'
                  onClick={onSearch}
                  className={clsx(
                    localStyles.classes.searchIcon,
                    classes?.searchIcon,
                    'AruiTextfield-searchIcon'
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
              <InputAdornment component='div' position='start'>
                {inputIcon}
              </InputAdornment>
            )
          }
        } else if (inputIcon) {
          return {
            endAdornment: (
              <InputAdornment component='div' position='end'>
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
      onSearch
    ])

    const formHelperProps = useMemo(() => {
      return {
        className: clsx(
          defaultStyles.classes.helperText,
          classes?.helperText,
          'AruiTextfield-helperText'
        ),
        style: styles?.helperText
      }
    }, [classes?.helperText, styles?.helperText])

    const rightIcon = useMemo(() => {
      if (noCheckOrClearIcon) return
      if (validated)
        return (
          <CheckRounded
            className={clsx(
              defaultStyles.classes.validated,
              classes?.validIcon,
              'AruiTextfield-validIcon'
            )}
            style={{
              ...styles?.validIcon,
              right: inputAdornment.endAdornment ? '30px' : ''
            }}
          />
        )
      if (!value || value === '') return undefined
      if ((onRemove || error) && !disabled)
        return (
          <ClearRounded
            onClick={onRemove}
            className={clsx(
              defaultStyles.classes.clear,
              error && defaultStyles.classes.clearError,
              classes?.clearIcon,
              'AruiTextfield-clearIcon'
            )}
            style={{
              ...styles?.clearIcon,
              right: inputAdornment.endAdornment ? '30px' : ''
            }}
          />
        )
      return undefined
    }, [
      value,
      onRemove,
      classes?.clearIcon,
      styles?.clearIcon,
      classes?.validIcon,
      styles?.validIcon,
      inputAdornment.endAdornment,
      noCheckOrClearIcon,
      error,
      disabled
    ])

    const inputClasses = () => {
      if (inputIcon && iconPosition === 'start') {
        return localStyles.classes.withIconStart
      }
      if (inputIcon && iconPosition === 'end') {
        if (onRemove) {
          return localStyles.classes.withIconEndOnRemove
        }
        return localStyles.classes.withIconEnd
      }
      return ''
    }

    return (
      <div
        className={clsx(
          className,
          localStyles.classes.root,
          'AruiTextfield-root'
        )}
        style={style}
      >
        <MuiTextField
          {...other}
          ref={ref}
          id={id}
          value={value}
          onChange={onChangeMemoized}
          placeholder={placeholder}
          type={textFieldType === 'search' ? 'text' : textFieldType}
          defaultValue={defaultValue}
          className={clsx(
            defaultStyles.classes.input,
            localStyles.classes.input,
            validated && defaultStyles.classes.inputValidated,
            size === 'large' && defaultStyles.classes.inputLarge,
            size === 'medium' && defaultStyles.classes.inputMedium,
            size === 'small' && defaultStyles.classes.inputSmall,
            disabled && defaultStyles.classes.inputDisabled,
            error && defaultStyles.classes.inputError,
            onRemove &&
              inputAdornment.endAdornment &&
              textFieldType === 'search' &&
              defaultStyles.classes.inputWithClear,
            classes?.textfield,
            'AruiTextfield-Textfield'
          )}
          style={styles?.textfield}
          variant='filled'
          error={error}
          disabled={disabled}
          helperText={error ? errorMessage : ''}
          color='primary'
          InputProps={{
            ...inputAdornment,
            disableUnderline: true,
            onKeyUp: upHandler,
            style: {
              ...styles?.input,
              paddingRight:
                (onRemove || validated) &&
                value &&
                value !== '' &&
                !inputAdornment.endAdornment
                  ? '27px'
                  : ''
            },
            className: clsx(
              inputClasses(),
              classes?.input,
              'AruiTextfield-input'
            ),
            ...InputProps
          }}
          FormHelperTextProps={formHelperProps}
        />
        {rightIcon}
      </div>
    )
  }
)
