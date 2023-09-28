import { Box, InputLabel, SxProps, Theme } from '@mui/material'
import React, { useMemo } from 'react'
import { Select, SelectProps, SelectClasses, SelectStyles } from '../Select'
import {
  TextField,
  TextFieldProps,
  TextFieldClasses,
  TextFieldStyles
} from '../TextField'
import {
  DatePicker,
  DatePickerClasses,
  DatePickerStyles,
  DatePickerProps
} from '../DatePicker'
import { useInputStyles } from '../style'
import { BasicProps } from '@smartb/g2-themes'
import {
  RadioChoicesClasses,
  RadioChoicesProps,
  RadioChoicesStyles,
  RadioChoices
} from '../RadioChoices'
import { AutoComplete, AutoCompleteProps } from '../AutoComplete'
import { LoadingRenderer } from './LoadingRenderer'
import { ReadOnlyRenderer } from './ReadOnlyRenderer'
import { cx } from '@emotion/css'
import {
  MultiChoices,
  MultiChoicesClasses,
  MultiChoicesProps,
  MultiChoicesStyles
} from '../MultiChoices'

interface InputFormClasses {
  label?: string
  input?: string
}

interface InputFormStyles {
  label?: React.CSSProperties
  input?: React.CSSProperties
}

export type InputFormTypes =
  | 'select'
  | 'textField'
  | 'datePicker'
  | 'radioChoices'
  | 'multiChoices'
  | 'autoComplete'

export interface InputFormBasicProps<T extends InputFormTypes = 'textField'>
  extends BasicProps {
  /**
   * The label of the input
   */
  label?: React.ReactNode
  /**
   * If true the input will be disabled and forced on type 'textfield'
   * @default false
   */
  readOnly?: boolean
  /**
   * The input will be replaced by the solution choosed on readOnly.
   * If you choose the "text it will be displayed in a Typography.
   * If you choose "chip" it will be displayed in chips.
   * @default "text"
   */
  readOnlyType?: 'text' | 'chip' | 'customElement' | 'customContainer'
  /**
   * The orientation of the alignement of the label and the input
   * @default "vertical"
   */
  orientation?: 'horizontal' | 'vertical'
  /**
   * This function is used to attribute a chip color to the value to be displayed (if not provided the default color will be used)
   */
  getReadOnlyChipColor?: (value: string | number) => string | undefined
  /**
   * attribute a link to a readOnly text
   */
  getReadOnlyTextUrl?: (value: string | number) => string | undefined
  /**
   * The element rendered in readOnly if the `readOnlyType` is `"customElement" | "customContainer"` your element need to use the prop
   * `value: string` and `valueKey?: SmartKey` if `readOnlyType="customElement"` and also `values: Option[]` if `readOnlyType="customContainer"`
   */
  readOnlyElement?: React.ElementType
  /**
   * If you want to add additionals element near to the input use this prop
   */
  createInputContainer?: (input: JSX.Element) => JSX.Element
  /**
   * The default behavior is that an empty field won't appear in readOnly. If you want it to appear provide a value to put in it.
   * This will be passed as `value` to the `ReadOnlyRenderer` or as `values` if `multiple` is `true`
   */
  emptyValueInReadOnly?: any
  /**
   * Indicates if the data is currently loading
   *
   * @default false
   */
  isLoading?: boolean
  /**
   * The classes applied to the different part of the component
   */
  classes?: InputFormClasses
  /**
   * The styles applied to the different part of the component
   */
  styles?: InputFormStyles
  sx?: SxProps<Theme>
  /**
   * The classes applied to the different part of the input
   *
   * The type will be equal to the classes type of the input selected:
   * **See the reference below** ⬇️
   */
  inputClasses?: [T] extends ['textField']
    ? TextFieldClasses
    : [T] extends ['select']
    ? SelectClasses
    : [T] extends ['datePicker']
    ? DatePickerClasses
    : [T] extends ['multiChoices']
    ? MultiChoicesClasses
    : RadioChoicesClasses
  /**
   * The styles applied to the different part of the input
   *
   * The type will be equal to the classes type of the input selected:
   * **See the reference below** ⬇️
   */
  inputStyles?: [T] extends ['textField']
    ? TextFieldStyles
    : [T] extends ['select']
    ? SelectStyles
    : [T] extends ['datePicker']
    ? DatePickerStyles
    : [T] extends ['multiChoices']
    ? MultiChoicesStyles
    : RadioChoicesStyles
}

type RemoveMainProps<T> = Omit<T, keyof InputFormBasicProps>

type InputFormComponentProps<T extends InputFormTypes> =
  InputFormBasicProps<T> &
    ([T] extends ['select']
      ? RemoveMainProps<SelectProps>
      : [T] extends ['datePicker']
      ? RemoveMainProps<DatePickerProps>
      : [T] extends ['radioChoices']
      ? RemoveMainProps<RadioChoicesProps>
      : [T] extends ['autoComplete']
      ? RemoveMainProps<AutoCompleteProps>
      : [T] extends ['multiChoices']
      ? RemoveMainProps<MultiChoicesProps>
      : RemoveMainProps<TextFieldProps>)

interface InputFormComponent {
  <T extends InputFormTypes>(
    props: {
      inputType: T
    } & InputFormComponentProps<T>,
    ref: React.ForwardedRef<HTMLDivElement>
  ): JSX.Element
}

export type InputFormProps = InputFormBasicProps &
  Omit<TextFieldProps, keyof InputFormBasicProps> &
  Omit<SelectProps, keyof InputFormBasicProps> &
  Omit<DatePickerProps, keyof InputFormBasicProps> &
  Omit<AutoCompleteProps, keyof InputFormBasicProps> &
  Omit<MultiChoicesProps, keyof InputFormBasicProps> &
  Omit<RadioChoicesProps, keyof InputFormBasicProps> & {
    inputClasses?: SelectClasses | TextFieldClasses | DatePickerClasses
    inputStyles?: SelectStyles | TextFieldStyles | DatePickerStyles
    inputType: InputFormTypes
  }

//@ts-ignore
export const InputForm: InputFormComponent = React.forwardRef(
  (props: Partial<InputFormProps>, ref: React.ForwardedRef<HTMLDivElement>) => {
    const {
      inputType = 'textField',
      readOnly = false,
      className,
      style,
      label,
      id,
      classes,
      styles,
      inputClasses,
      inputStyles,
      size = 'medium',
      isLoading = false,
      createInputContainer,
      getReadOnlyChipColor,
      readOnlyType,
      getReadOnlyTextUrl,
      orientation = 'vertical',
      emptyValueInReadOnly,
      sx,
      ...other
    } = props

    const defaultStyles = useInputStyles()

    const labelUi = useMemo(() => {
      return label ? (
        <InputLabel
          htmlFor={id}
          className={defaultStyles.cx(
            size === 'small' && defaultStyles.classes.labelSmall,
            classes?.label,
            'AruiInputForm-label'
          )}
          style={styles?.label}
        >
          {label}
        </InputLabel>
      ) : null
    }, [label, classes?.label, id, styles?.label, size])

    const inputUi = useMemo(() => {
      const commonProps = {
        size,
        className: cx(classes?.input, 'AruiInputForm-input'),
        style: styles?.input,
        classes: inputClasses,
        styles: inputStyles,
        ref,
        id
      }
      return isLoading ? (
        <LoadingRenderer {...props} />
      ) : readOnly ? (
        <ReadOnlyRenderer {...props} />
      ) : inputType === 'textField' ? (
        <TextField {...other} {...commonProps} />
      ) : inputType === 'select' ? (
        <Select {...other} {...commonProps} />
      ) : inputType === 'radioChoices' ? (
        <RadioChoices {...other} {...commonProps} />
      ) : inputType === 'multiChoices' ? (
        <MultiChoices {...other} {...commonProps} />
      ) : inputType === 'autoComplete' ? (
        //@ts-ignore
        <AutoComplete {...other} {...commonProps} />
      ) : (
        <DatePicker {...other} {...commonProps} />
      )
    }, [
      readOnly,
      inputType,
      classes?.input,
      id,
      styles?.input,
      ref,
      size,
      emptyValueInReadOnly,
      Object.values({ ...other })
    ])

    const container = useMemo(
      () => (createInputContainer ? createInputContainer(inputUi) : undefined),
      [createInputContainer, inputUi]
    )

    const valuesIsEmpty =
      (props.value == undefined || props.value === '') &&
      (props.values == undefined || props.values.length === 0)
    if (
      readOnly &&
      valuesIsEmpty &&
      !isLoading &&
      emptyValueInReadOnly == undefined
    )
      return <></>
    return (
      <Box
        className={className}
        style={style}
        sx={
          orientation === 'horizontal'
            ? {
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: (theme) => theme.spacing(2),
                '& .MuiFormLabel-root': {
                  margin: 'unset'
                },
                '& .AruiInputForm-input': {
                  flexGrow: 1
                },
                ...sx
              }
            : sx
        }
      >
        {labelUi}
        {container ?? inputUi}
      </Box>
    )
  }
)
