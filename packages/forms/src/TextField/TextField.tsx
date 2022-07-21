import React, { useCallback, useMemo, useState } from 'react'
import {
  CircularProgress,
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
      paddingLeft: '0px'
    }
  },
  withIconEnd: {
    '& .MuiInputBase-input': {
      paddingRight: '0px'
    }
  },
  withIconEndOnRemove: {
    '& .MuiInputBase-input': {
      paddingRight: '20px'
    }
  },
  withOnRemove: {
    '& .MuiInputBase-input': {
      paddingRight: '35px'
    }
  },
  searchIcon: {
    width: '20px',
    height: '20px',
    cursor: 'pointer'
  },
  searchIconDisabled: {
    cursor: 'default',
    fill: 'rgba(0, 0, 0, 0.26)'
  },
  endAdornmentWithInputIcon: {
    right: '36px'
  },
  paddingMultiline: {
    '& .MuiInputBase-root': {
      padding: '10px 0px'
    }
  }
})

export interface TextFieldClasses {
  textfield?: string
  input?: string
  helperText?: string
  clearIcon?: string
  validIcon?: string
  loadingIcon?: string
  searchIcon?: string
}

export interface TextFieldStyles {
  textfield?: React.CSSProperties
  input?: React.CSSProperties
  helperText?: React.CSSProperties
  clearIcon?: React.CSSProperties
  validIcon?: React.CSSProperties
  loadingIcon?: React.CSSProperties
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
  textFieldType?:
  | 'number'
  | 'text'
  | 'email'
  | 'password'
  | 'search'
  | 'search-number'

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
   * By default if your **onSearch** function is asynchronous the textfield will automatically make a loading icon appear in order
   * to indicate the loading status. But if you want to force that state you can set **isLoading** to `true`.
   *
   * @default false
   */
  searchLoading?: boolean

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
   * The icon of the icon. It happen sometimes when your icon is to large that the clear icon overflow the input icon.
   * To change that you can use the props `styles` or `classes` to move it on the side or you can use `noCheckOrClearIcon` to supress it.
   */
  inputIcon?: React.ReactNode

  /**
   * The event called when the value of the input is removed
   */
  onRemove?: () => void

  /**
   * The position of the icon
   *
   * @default 'end'
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
      iconPosition = 'end',
      size = 'medium',
      validated = false,
      onSearch,
      InputProps,
      noCheckOrClearIcon = false,
      multiline = false,
      searchLoading = false,
      ...other
    } = props

    const defaultStyles = useInputStyles()
    const localStyles = useStyles()

    const [loading, setloading] = useState(false)

    const onChangeMemoized = useCallback(
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onChange && onChange(e.target.value)
      },
      [onChange]
    )

    const onSearchMemoisied = useCallback(
      async () => {
        if (!!onSearch) {
          setloading(true)
          await onSearch()
          setloading(false)
        }
      },
      [onSearch]
    )

    const downHandler = useCallback(
      (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (
          (textFieldType === 'search' || textFieldType === 'search-number') &&
          event.key === 'Enter'
        ) {
          event.currentTarget.blur()
          onSearchMemoisied && onSearchMemoisied()
        }
      },
      [onSearchMemoisied, textFieldType]
    )

    const inputAdornment = useMemo(() => {
      const getIcon = () => {
        if (textFieldType === 'search' || textFieldType === 'search-number') {
          return (
            <SearchIcon
              color='#323338'
              onClick={!disabled ? onSearchMemoisied : undefined}
              className={defaultStyles.cx(
                localStyles.classes.searchIcon,
                disabled && localStyles.classes.searchIconDisabled,
                'AruiTextfield-searchIcon',
                classes?.searchIcon
              )}
              style={styles?.searchIcon}
            />
          )
        }
        return inputIcon
      }

      const icon = getIcon()

      if (icon) {
        if (iconPosition === 'start') {
          return {
            startAdornment: (
              <InputAdornment component='div' position='start'>
                {icon}
              </InputAdornment>
            )
          }
        } else {
          return {
            endAdornment: (
              <InputAdornment component='div' position='end'>
                {icon}
              </InputAdornment>
            )
          }
        }
      }
      return {}
    }, [
      textFieldType,
      inputIcon,
      iconPosition,
      classes?.searchIcon,
      styles?.searchIcon,
      disabled,
      onSearchMemoisied,
    ])

    const formHelperProps = useMemo(() => {
      return {
        className: defaultStyles.cx(
          defaultStyles.classes.helperText,
          'AruiTextfield-helperText',
          classes?.helperText
        ),
        style: styles?.helperText
      }
    }, [classes?.helperText, styles?.helperText])

    const rightIcon = useMemo(() => {
      if (noCheckOrClearIcon) return
      if (loading || searchLoading) {
        return (
          <CircularProgress
            size={20}
            className={defaultStyles.cx(
              defaultStyles.classes.clear,
              defaultStyles.classes.loading,
              inputAdornment.endAdornment &&
              localStyles.classes.endAdornmentWithInputIcon,
              'AruiTextfield-loadingIcon',
              classes?.loadingIcon
            )}
            style={styles?.loadingIcon}
          />
        )
      }
      if (validated)
        return (
          <CheckRounded
            className={defaultStyles.cx(
              defaultStyles.classes.validated,
              inputAdornment.endAdornment &&
              localStyles.classes.endAdornmentWithInputIcon,
              'AruiTextfield-validIcon',
              classes?.validIcon
            )}
            style={styles?.validIcon}
          />
        )
      if ((!value || value === '') && !error) return undefined
      if ((onRemove || error) && !disabled) {
        return (
          <ClearRounded
            onClick={onRemove}
            className={defaultStyles.cx(
              defaultStyles.classes.clear,
              inputAdornment.endAdornment &&
              localStyles.classes.endAdornmentWithInputIcon,
              error && defaultStyles.classes.clearError,
              'AruiTextfield-clearIcon',
              classes?.clearIcon
            )}
            style={styles?.clearIcon}
          />
        )
      }
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
      disabled,
      searchLoading,
      loading
    ])

    const inputClasses = () => {
      if (!!rightIcon) {
        if (inputAdornment.endAdornment) {
          return localStyles.classes.withIconEndOnRemove
        } else {
          return localStyles.classes.withOnRemove
        }
      }
      return ''
    }

    return (
      <div
        className={defaultStyles.cx(
          localStyles.classes.root,
          'AruiTextfield-root',
          className
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
          type={
            textFieldType === 'search'
              ? 'text'
              : textFieldType === 'search-number'
                ? 'number'
                : textFieldType
          }
          defaultValue={defaultValue}
          className={defaultStyles.cx(
            defaultStyles.classes.input,
            localStyles.classes.input,
            validated && defaultStyles.classes.inputValidated,
            size === 'large' && defaultStyles.classes.inputLarge,
            size === 'medium' && defaultStyles.classes.inputMedium,
            size === 'small' && defaultStyles.classes.inputSmall,
            multiline && localStyles.classes.paddingMultiline,
            disabled && defaultStyles.classes.inputDisabled,
            error && defaultStyles.classes.inputError,
            inputAdornment.startAdornment && localStyles.classes.withIconStart,
            inputAdornment.endAdornment && localStyles.classes.withIconEnd,
            inputClasses(),
            'AruiTextfield-Textfield',
            classes?.textfield
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
            onKeyDown: downHandler,
            style: {
              ...styles?.input
            },
            className: defaultStyles.cx(
              'AruiTextfield-input',
              classes?.input
            ),
            ...InputProps
          }}
          FormHelperTextProps={formHelperProps}
          multiline={multiline}
        />
        {rightIcon}
      </div>
    )
  }
)
