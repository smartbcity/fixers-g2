import {
  AutocompleteRenderOptionState,
  createFilterOptions,
  FilterOptionsState,
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
import { Chip, ChipProps } from '@smartb/g2-components'

const useStyles = makeG2STyles()({
  list: {
    padding: '0px'
  }
})

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
   * return the label of the option
   * @param option
   */
  getOptionLabel?: (option: T) => string
  /**
   * pass this prop to false if your list is too big and creating performance issues
   * @default true
   */
  noFilterDisplayOptions?: boolean
  /**
   * pass this prop to true if you don't want to filters the options
   * @default false
   */
  noFilterOptions?: boolean
  /**
   * This props will tell how many options are alowed to be displayed in the result list. If you want no size restriction pass a negative number
   * @default -1
   */
  optionsResultLimit?: number
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
  /**
   * Tells whether or not to display the chekcbox in ths options
   *
   * @default true
   */
  withCheckbox?: boolean
  /**
   * Disable the default behavior of returning only the key of the object like a Select
   *
   * @default false
   */
  returnFullObject?: boolean
  /**
   * The props of the chip component used to display the selection if multiple
   */
  chipProps?: ChipProps
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
}

export type AutoCompleteProps<T = any> = MergeMuiElementProps<
  Omit<MuiAutocompleteProps<T, undefined, undefined, undefined>, 'renderInput'>,
  AutoCompleteBasicProps<T>
>

const defaultFilterOptions = createFilterOptions()
export const defaultGetOptionLabel =
  (options: any[], hasKey: boolean) => (option: any) => {
    if (typeof option === 'string' && hasKey) {
      const founded = options.find((el) => el.key === option)?.label
      if (founded) return founded
    }
    return typeof option === 'string' ? option : option.label ?? ''
  }

const AutoCompleteBase = function <T>(
  props: AutoCompleteProps<T>,
  ref: React.ForwardedRef<HTMLElement>
) {
  const {
    className,
    style,
    multiple = false,
    id,
    options = [],
    value,
    values,
    onChangeValue,
    onChangeValues,
    defaultValue = null,
    onSearch,
    getOptionLabel,
    textFieldProps,
    disabled,
    isOptionEqualToValue,
    noFilterDisplayOptions = true,
    noFilterOptions = false,
    optionsResultLimit = -1,
    error = false,
    errorMessage = '',
    withCheckbox = true,
    returnFullObject = false,
    chipProps,
    ...other
  } = props

  //@ts-ignore
  const hasKey = !!options[0]?.key

  const defaultOptionLabelMemo = useCallback(
    (option) => defaultGetOptionLabel(options, hasKey)(option),
    [options, hasKey]
  )

  const getOptionLabelMemo = getOptionLabel ?? defaultOptionLabelMemo

  const defaultStyles = useStyles()

  const onChangeMemoized = useCallback(
    (_: React.SyntheticEvent<Element, Event>, value: T | T[] | null) => {
      if (Array.isArray(value) && onChangeValues) {
        //@ts-ignore
        if (hasKey && !getOptionLabel && !returnFullObject) {
          //@ts-ignore
          onChangeValues(value.map((value) => value.key ?? value))
        } else {
          onChangeValues(value)
        }
      } else if (onChangeValue && !Array.isArray(value)) {
        //@ts-ignore
        if (!!value?.key && !getOptionLabel && !returnFullObject) {
          //@ts-ignore
          onChangeValue(value.key)
        } else {
          onChangeValue(value ?? undefined)
        }
      }
    },
    [onChangeValue, onChangeValues, getOptionLabel, returnFullObject, hasKey]
  )

  const renderTags = useCallback(
    (value: T[], getTagProps: AutocompleteGetTagProps) =>
      value.map((option: T, index: number) => {
        const { key, ...other } = getTagProps({ index })
        return (
          <Chip
            //@ts-ignore
            key={option.key ?? key}
            label={getOptionLabelMemo(option)}
            {...chipProps}
            {...other}
          />
        )
      }),
    [getOptionLabelMemo, chipProps]
  )

  const renderInput = useCallback(
    (params: AutocompleteRenderInputParams) => {
      return (
        <TextField
          {...textFieldProps}
          {...params}
          error={error}
          errorMessage={errorMessage}
          noCheckOrClearIcon
        />
      )
    },
    [textFieldProps, error, errorMessage]
  )

  const renderOption = useCallback(
    (
      props: React.HTMLAttributes<HTMLLIElement>,
      option: T,
      { selected }: AutocompleteRenderOptionState
    ) => {
      //@ts-ignore
      const { key, ...other } = props
      return (
        <ListItem
          //@ts-ignore
          key={option.key ?? key}
          className={defaultStyles.cx('AruiAutoComplete-option')}
          {...other}
        >
          {withCheckbox && <CheckBox checked={selected} />}
          <ListItemText primary={getOptionLabelMemo(option)} />
        </ListItem>
      )
    },
    [getOptionLabelMemo, withCheckbox]
  )

  const filterOptions = useCallback(
    (options: T[], state: FilterOptionsState<T>): T[] => {
      const inputTrimmed = state.inputValue.trim()
      if (!noFilterDisplayOptions && !inputTrimmed) return []
      const result = noFilterOptions
        ? options
        : (defaultFilterOptions(options, state) as T[])
      if (optionsResultLimit >= 0) {
        return result.splice(0, optionsResultLimit)
      }
      return result
    },
    [noFilterDisplayOptions, optionsResultLimit, noFilterOptions]
  )

  const defaultIsOptionEqualToValue = useCallback(
    //@ts-ignore
    (option: T, value: T) => option.key === value.key || option.key === value,
    []
  )

  return (
    <MuiAutocomplete<T, boolean, undefined, boolean>
      id={id}
      ref={ref}
      value={multiple ? values : value}
      limitTags={2}
      multiple={multiple}
      options={options}
      className={defaultStyles.cx('AruiAutoComplete-root', className)}
      getOptionLabel={getOptionLabelMemo}
      style={style}
      disabled={disabled}
      disableCloseOnSelect={multiple}
      onChange={onChangeMemoized}
      renderTags={renderTags}
      renderInput={renderInput}
      renderOption={renderOption}
      isOptionEqualToValue={
        isOptionEqualToValue ??
        (hasKey ? defaultIsOptionEqualToValue : undefined)
      }
      filterOptions={filterOptions}
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
