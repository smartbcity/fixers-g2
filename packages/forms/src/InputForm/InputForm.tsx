import { Box, InputLabel } from  '@mui/material'
import React, { useMemo } from 'react'
import { Select, SelectProps, SelectClasses, SelectStyles } from '../Select'
import { TextField, TextFieldProps, TextFieldClasses, TextFieldStyles } from '../TextField'
import { DatePicker, DatePickerProps } from '../DatePicker'
import { useInputStyles } from '../style'
import { BasicProps, useTheme } from '@smartb/g2-themes'
import clsx from 'clsx'

interface InputFormClasses {
  label?: string
  input?: string
}

interface InputFormStyles {
  label?: React.CSSProperties
  input?: React.CSSProperties
}

export interface InputFormBasicProps<T extends 'select' | 'textField' | 'datePicker' = 'textField'> extends BasicProps {
  /**
   * The label of the input
   */
  label?: string
  /**
   * The type of the input
   * @default "textField"
   */
  inputType: 'select' | 'textField' | 'datePicker'
  /**
   * If true the input will be disabled and forced on type 'textfield'
   * @default false
   */
  readonly?: boolean
  /**
 * The classes applied to the different part of the component
 */
  classes?: InputFormClasses
  /**
   * The styles applied to the different part of the component
   */
  styles?: InputFormStyles
  /**
 * The classes applied to the different part of the input
 * 
 * The type will be equal to the classes type of the input selected:
 * **See the reference below** ⬇️
 */
  inputClasses?: [T] extends ['textField'] ? TextFieldClasses : [T] extends ['select'] ? SelectClasses : {}
  /**
   * The styles applied to the different part of the input
   * 
   * The type will be equal to the classes type of the input selected:
   * **See the reference below** ⬇️
   */
  inputStyles?: [T] extends ['textField'] ? TextFieldStyles : [T] extends ['select'] ? SelectStyles : {}
}

type RemoveMainProps<T> = Omit<T, keyof InputFormBasicProps>

type InputFormComponentProps<T extends 'select' | 'textField' | 'datePicker' = never, R extends Boolean = false> =
  InputFormBasicProps & ([R] extends [true] ? RemoveMainProps<TextFieldProps> : [T] extends ['select'] ? RemoveMainProps<SelectProps> : [T] extends ['datePicker'] ? RemoveMainProps<DatePickerProps> : RemoveMainProps<TextFieldProps>);

interface InputFormComponent {
  <T extends 'select' | 'textField' | 'datePicker', R extends Boolean = false>(
    props: {
      inputType: T
      readonly?: R
    } & InputFormComponentProps<T, R>,
    ref: React.ForwardedRef<HTMLDivElement>
  ): JSX.Element;
}

export type InputFormProps = InputFormBasicProps & Omit<TextFieldProps, keyof InputFormBasicProps> & Omit<SelectProps, keyof InputFormBasicProps> & Omit<DatePickerProps, keyof InputFormBasicProps> & {
  inputClasses?: SelectClasses | TextFieldClasses
  inputStyles?: SelectStyles | TextFieldStyles
}

//@ts-ignore
export const InputForm: InputFormComponent = React.forwardRef((props: Partial<InputFormProps>, ref: React.ForwardedRef<HTMLDivElement>) => {
  const {
    inputType = "textField",
    readonly = false,
    className,
    style,
    label,
    id,
    classes,
    styles,
    inputClasses,
    inputStyles,
    size,
    ...other
  } = props
  const theme = useTheme()
  const defaultClasses = useInputStyles(theme)

  const labelUi = useMemo(() => {
    return label ? (
      <InputLabel htmlFor={id} className={clsx(defaultClasses.label, classes?.label, size === "small" && defaultClasses.labelSmall)} style={styles?.label}>
        {label}
      </InputLabel>
    ) : null;
  }, [label, classes?.label, id, styles?.label, size])

  const inputUi = useMemo(() => {
    return readonly ? (
      <TextField
        {...other}
        className={classes?.input}
        style={styles?.input}
        classes={inputClasses}
        styles={inputStyles}
        ref={ref}
        id={id}
        disabled={true}
      />
    ) : inputType === 'textField' ? (
      <TextField
        {...other}
        className={classes?.input}
        style={styles?.input}
        classes={inputClasses}
        styles={inputStyles}
        ref={ref}
        id={id}
      />
    ) : inputType === 'select' ? (
      <Select
        {...other}
        className={classes?.input}
        style={styles?.input}
        classes={inputClasses}
        styles={inputStyles}
        ref={ref}
        id={id}
      />
    ) : (
      <DatePicker
        {...other}
        className={classes?.input}
        style={styles?.input}
        ref={ref}
        id={id}
      />
    )
  }, [readonly, inputType, classes?.input, id, styles?.input, ref, Object.values({ ...other })])

  return (
    <Box className={className} style={style}>
      {labelUi}
      {inputUi}
    </Box>
  )
})
