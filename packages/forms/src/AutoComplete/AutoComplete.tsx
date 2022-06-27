import {
  AutocompleteRenderOptionState,
  Chip,
  ListItem,
  ListItemText
} from '@mui/material'
import {
  Autocomplete as MuiAutocomplete,
  AutocompleteProps as MuiAutocompleteProps,
  AutocompleteGetTagProps,
  AutocompleteRenderInputParams
} from '@mui/material'
import React, { forwardRef, useCallback } from 'react'
import {
  BasicProps,
  makeG2STyles,
  MergeMuiElementProps
} from '@smartb/g2-themes'
import { TextField, TextFieldProps } from '../TextField'
import { CheckBox } from '../CheckBox'

const useStyles = makeG2STyles()((theme) => ({
  chip: {
    backgroundColor: '#EBEBEC',
    borderRadius: theme.borderRadius,
    border: 'none'
  },
  list: {
    padding: '0px'
  }
}))

export interface AutoCompleteBasicProps<T> extends BasicProps {
  /**
   * The value selected
   */
  value?: T
  /**
   * The values of selected. ⚠️ This prop is used only if `multiple` is true
   *
   * @default []
   */
  values?: T[]
  /**
   * The event called when the value of the slect change
   */
  onChangeValue?: (value?: T) => void
  /**
   * The event called when the values of the multiple select change
   */
  onChangeValues?: (values: T[]) => void
  /**
   * If true, the menu will support multiple selections.
   */
  multiple?: boolean
  /**
   * List of option available in the option
   */
  options: T[]
  /**
   * The event called when search value change.
   * @param value
   */
  onSearch?: (value: string) => void
  /**
   * Message displayed when select has no options
   */
  noOptionsText?: string
  /**
   * this props name need to be changed
   * @param option
   */
  getOptionLabel: (option: T) => string
  /**
   * If true the input will be disabled
   *
   * @default false
   */
  disabled?: boolean
  /**
   * If props given to the textField in the autoComplete
   */
  textFieldProps?: TextFieldProps
}

export type AutoCompleteProps<T = any> = MergeMuiElementProps<
  Omit<MuiAutocompleteProps<T, undefined, undefined, undefined>, 'renderInput'>,
  AutoCompleteBasicProps<T>
>

const AutoCompleteBase = function <T>(
  props: AutoCompleteProps<T>,
  ref: React.ForwardedRef<HTMLElement>
) {
  const {
    className,
    style,
    multiple = false,
    id,
    options,
    value,
    values,
    onChangeValue,
    onChangeValues,
    defaultValue = null,
    onSearch,
    noOptionsText,
    getOptionLabel,
    textFieldProps,
    disabled,
    ...other
  } = props

  const defaultStyles = useStyles()

  const onChangeMemoized = useCallback(
    (_: React.SyntheticEvent<Element, Event>, value: T | T[] | null) => {
      if (Array.isArray(value)) {
        onChangeValues && onChangeValues(value)
      } else {
        onChangeValue && onChangeValue(value ?? undefined)
      }
    },
    [onChangeValue, onChangeValues]
  )

  const renderTags = useCallback(
    (value: T[], getTagProps: AutocompleteGetTagProps) =>
      value.map((option: T, index: number) => (
        <Chip
          classes={{
            root: defaultStyles.cx(
              defaultStyles.classes.chip,
              'AruiAutoComplete-chip'
            )
          }}
          label={getOptionLabel(option)}
          {...getTagProps({ index })}
        />
      )),
    [getOptionLabel]
  )

  const renderInput = useCallback(
    (params: AutocompleteRenderInputParams) => {
      return <TextField {...textFieldProps} {...params} />
    },
    [textFieldProps]
  )

  const renderOption = useCallback(
    (
      props: React.HTMLAttributes<HTMLLIElement>,
      option: T,
      { selected }: AutocompleteRenderOptionState
    ) => {
      return (
        <ListItem
          className={defaultStyles.cx('AruiAutoComplete-option')}
          {...props}
        >
          <CheckBox checked={selected} />
          <ListItemText primary={getOptionLabel(option)} />
        </ListItem>
      )
    },
    [getOptionLabel]
  )

  return (
    <MuiAutocomplete<T, boolean, undefined, undefined>
      id={id}
      ref={ref}
      value={multiple ? values : value}
      limitTags={2}
      multiple={multiple}
      options={options}
      className={defaultStyles.cx('AruiAutoComplete-root', className)}
      getOptionLabel={getOptionLabel}
      style={style}
      disabled={disabled}
      noOptionsText={noOptionsText}
      disableCloseOnSelect={multiple}
      onChange={onChangeMemoized}
      renderTags={renderTags}
      renderInput={renderInput}
      renderOption={renderOption}
      classes={{
        listbox: defaultStyles.classes.list
      }}
      {...other}
    />
  )
}

export const AutoComplete = forwardRef(
  AutoCompleteBase
) as typeof AutoCompleteBase
