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
import { ReadonlyRenderer } from './ReadonlyRenderer'
import { cx } from '@emotion/css'

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
  | 'autoComplete'

export interface InputFormBasicProps<T extends InputFormTypes = 'textField'>
  extends BasicProps {
  /**
   * The label of the input
   */
  label?: string
  /**
   * If true the input will be disabled and forced on type 'textfield'
   * @default false
   */
  readonly?: boolean
  /**
   * The input will be replaced by the solution choosed on readonly.
   * If you choose the "text it will be displayed in a Typography.
   * If you choose "chip" it will be displayed in chips.
   * @default "text"
   */
  readonlyType?: 'text' | 'chip'
  /**
   * The orientation of the alignement of the label and the input
   * @default "vertical"
   */
  orientation?: 'horizontal' | 'vertical'
  /**
   * This function is used to attribute a chip color to the value to be displayed (if not provided the default color will be used)
   */
  getReadonlyChipColor?: (value: string | number) => string | undefined
  /**
   * attribute a link to a readonly text
   */
  getReadonlyTextUrl?: (value: string | number) => string | undefined
  /**
   * If you want to add additionnals element near to the input use this prop
   */
  createInputContainer?: (input: JSX.Element) => JSX.Element
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
    : RadioChoicesStyles
}

type RemoveMainProps<T> = Omit<T, keyof InputFormBasicProps>

type InputFormComponentProps<
  T extends InputFormTypes,
  R extends boolean
> = InputFormBasicProps<T> &
  ([R] extends [true]
    ? RemoveMainProps<TextFieldProps>
    : [T] extends ['select']
    ? RemoveMainProps<SelectProps>
    : [T] extends ['datePicker']
    ? RemoveMainProps<DatePickerProps>
    : [T] extends ['radioChoices']
    ? RemoveMainProps<RadioChoicesProps>
    : [T] extends ['autoComplete']
    ? RemoveMainProps<AutoCompleteProps>
    : RemoveMainProps<TextFieldProps>)

interface InputFormComponent {
  <T extends InputFormTypes, R extends boolean>(
    props: {
      inputType: T
      readonly?: R
    } & InputFormComponentProps<T, R>,
    ref: React.ForwardedRef<HTMLDivElement>
  ): JSX.Element
}

export type InputFormProps = InputFormBasicProps &
  Omit<TextFieldProps, keyof InputFormBasicProps> &
  Omit<SelectProps, keyof InputFormBasicProps> &
  Omit<DatePickerProps, keyof InputFormBasicProps> &
  Omit<AutoCompleteProps, keyof InputFormBasicProps> &
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
      readonly = false,
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
      getReadonlyChipColor,
      readonlyType,
      getReadonlyTextUrl,
      orientation = 'vertical',
      sx,
      ...other
    } = props

    const defaultStyles = useInputStyles()

    const labelUi = useMemo(() => {
      return label ? (
        <InputLabel
          htmlFor={id}
          className={defaultStyles.cx(
            defaultStyles.classes.label,
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
      ) : readonly ? (
        <ReadonlyRenderer {...props} />
      ) : inputType === 'textField' ? (
        <TextField {...other} {...commonProps} />
      ) : inputType === 'select' ? (
        <Select {...other} {...commonProps} />
      ) : inputType === 'radioChoices' ? (
        <RadioChoices {...other} {...commonProps} />
      ) : inputType === 'autoComplete' ? (
        //@ts-ignore
        <AutoComplete {...other} {...commonProps} />
      ) : (
        <DatePicker {...other} {...commonProps} />
      )
    }, [
      readonly,
      inputType,
      classes?.input,
      id,
      styles?.input,
      ref,
      size,
      Object.values({ ...other })
    ])

    const container = useMemo(
      () => (createInputContainer ? createInputContainer(inputUi) : undefined),
      [createInputContainer, inputUi]
    )

    const valuesIsEmpty =
      (props.value == undefined || props.value === '') &&
      (props.values == undefined || props.values.length === 0)
    if (readonly && valuesIsEmpty && !isLoading) return <></>
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
