import { Chip } from  '@mui/material'
import { Autocomplete as MuiAutocomplete, AutocompleteProps as MuiAutocompleteProps, AutocompleteGetTagProps, AutocompleteRenderInputParams } from '@material-ui/lab'
import React, { forwardRef, useCallback } from 'react'
import { BasicProps, lowLevelStyles, MergeMuiElementProps } from '@smartb/g2-themes'
import { TextField, TextFieldProps } from '../TextField'
import clsx from 'clsx'

const useStyles = lowLevelStyles()({
  chip: {
    backgroundColor: '#EBEBEC',
    borderRadius: '5px',
    border: 'none'
  }
})

export interface AutoCompleteBasicProps<T> extends BasicProps {
  /**
   * If true, the menu will support multiple selections.
   */
  multiple?: boolean
  /**
   * List of option available in the option
   */
  options: T[]
  /**
   * The event called when selected element change.
   * @param value the new selected elements
   */
  onChangeSelectedElement?: (value: T | T[]) => void
  /**
   * The default element value.
   */
  defaultValue?: T | T[]
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

export type AutoCompleteProps<T> = MergeMuiElementProps<Omit<MuiAutocompleteProps<T, undefined, undefined, undefined>, "renderInput">, AutoCompleteBasicProps<T>>

const AutoCompleteBase = function <T>(props: AutoCompleteProps<T>, ref: React.ForwardedRef<HTMLElement>) {
  const {
    className,
    style,
    multiple = false,
    id,
    options,
    onChangeSelectedElement,
    defaultValue = null,
    onSearch,
    noOptionsText,
    getOptionLabel,
    textFieldProps,
    disabled,
    ...other
  } = props

  const defaultClasses = useStyles()

  const onChangeElementMemoized = useCallback(
    (_, newValue) => onChangeSelectedElement && onChangeSelectedElement(newValue || []),
    [onChangeSelectedElement]
  )

  const renderTags = useCallback(
    (value: T[], getTagProps: AutocompleteGetTagProps) =>
      value.map((option: T, index: number) => (
        <Chip classes={{root: clsx(defaultClasses.chip, "AruiAutoComplete-chip")}} label={getOptionLabel(option)} {...getTagProps({ index })} />
      )),
    [getOptionLabel],
  )

  const renderInput = useCallback(
    (params: AutocompleteRenderInputParams) => {
      return (
        <TextField
          {...textFieldProps}
          {...params}
        />
      )
    },
    [textFieldProps],
  )

  return (
    <MuiAutocomplete<T, boolean, undefined, undefined>
      id={id}
      ref={ref}
      filterSelectedOptions
      limitTags={2}
      multiple={multiple}
      options={options}
      className={clsx(className, "AruiAutoComplete-root")}
      defaultValue={defaultValue}
      forcePopupIcon={false}
      getOptionLabel={getOptionLabel}
      style={style}
      disabled={disabled}
      noOptionsText={noOptionsText}
      onChange={onChangeElementMemoized}
      renderTags={renderTags}
      renderInput={renderInput}
      {...other}
    />
  )
}

export const AutoComplete = forwardRef(AutoCompleteBase) as typeof AutoCompleteBase
