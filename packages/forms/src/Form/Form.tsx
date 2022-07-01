import React, { useMemo } from 'react'
import { Action, Actions } from '@smartb/g2-components'
import { InputLabeled, InputLabeledBasicProps } from '../InputLabeled'
import { SelectProps } from '../Select'
import { TextFieldProps } from '../TextField'
import { DatePickerProps } from '../DatePicker'
import { CheckBox, CheckBoxProps } from '../CheckBox'
import {
  BasicProps,
  makeG2STyles,
  MergeReactElementProps
} from '@smartb/g2-themes'
import { StackProps, Stack } from '@mui/material'
import { cx } from '@emotion/css'
import { FormState } from './useForm'
import { RadioChoicesProps } from '../RadioChoices'
import { AutoCompleteProps } from '../AutoComplete'

export type FormAction = Action

export type FormField = {
  /**
   * the unique key of the field
   */
  key: string
  /**
   * the name of the field used to define it in the returned values
   */
  name: string
  /**
   * the displayed label of the field
   */
  label?: string
  /**
   * the default value of the field
   */
  defaultValue?: any
  /**
   * the event called when the value of the input change
   */
  onChange?: (value: any) => void
  /**
   * the type of the field
   */
  type:
    | 'textfield'
    | 'select'
    | 'datepicker'
    | 'radioChoices'
    | 'checkbox'
    | 'autoComplete'
  /**
   * the validator that takes the value of the input and return an error or undefined/nothing if the value is valid
   */
  validator?: (value: any, values: any) => string | undefined
  /**
   * if you want to add other nodes around the input use this function
   */
  customDisplay?: (input: React.ReactNode) => React.ReactNode
  /**
   * the props of the textfield if you choosed it
   */
  textFieldProps?: Partial<
    Omit<
      TextFieldProps & InputLabeledBasicProps<'textField'>,
      'value' | 'onChange' | 'label' | 'classes' | 'styles'
    >
  >
  /**
   * the props of the select if you choosed it
   */
  selectProps?: Partial<
    Omit<
      SelectProps & InputLabeledBasicProps<'select'>,
      | 'value'
      | 'values'
      | 'onChangeValue'
      | 'onChangeValues'
      | 'label'
      | 'classes'
      | 'styles'
    >
  >
  /**
   * the props of the select if you choosed it
   */
  autoCompleteProps?: Partial<
    Omit<
      AutoCompleteProps & InputLabeledBasicProps<'autoComplete'>,
      | 'value'
      | 'values'
      | 'onChangeValue'
      | 'onChangeValues'
      | 'label'
      | 'classes'
      | 'styles'
    >
  >
  /**
   * the props of the datepicker if you choosed it
   */
  datePickerProps?: Partial<
    Omit<
      DatePickerProps & InputLabeledBasicProps<'datePicker'>,
      'value' | 'onChangeDate' | 'label' | 'classes' | 'styles'
    >
  >
  /**
   * the props of the checkbox if you choosed it
   */
  checkBoxProps?: Partial<
    Omit<CheckBoxProps, 'checked' | 'onChange' | 'label' | 'classes' | 'styles'>
  >
  /**
   * the props of the checkbox if you choosed it
   */
  radioChoicesProps?: Partial<
    Omit<
      RadioChoicesProps & InputLabeledBasicProps<'radioChoices'>,
      'value' | 'onChange' | 'label' | 'classes' | 'styles'
    >
  >
}

interface FormClasses {
  actions?: string
  button?: string
  field?: string
  fieldsContainer?: string
}

interface FormStyles {
  actions?: React.CSSProperties
  button?: React.CSSProperties
  field?: React.CSSProperties
  fieldsContainer?: React.CSSProperties
}

export interface FormBasicProps extends BasicProps {
  /**
   * the fields of the form
   */
  fields: FormField[]
  /**
   * the state of the form provided by the hook `useForm`
   */
  formState: FormState
  /**
   * the actions displayed at the bottom of the component. To make a validation button you have to add an action with `type="submit"`
   */
  actions?: FormAction[]
  /**
   * Determine wether the actions are placed above or below the content of the form
   *
   * @default "below"
   */
  actionsPosition?: 'above' | 'below'
  /**
   * the props given to the actions stack container
   */
  actionsStackProps?: StackProps
  /**
   * the props given to the fields stack container
   */
  fieldsStackProps?: StackProps
  /**
   * Indicates if the data is currently loading
   *
   * @default false
   */
  isLoading?: boolean
  /**
   * Indicates if the data is on readonly mode
   *
   * @default false
   */
   readonly?: boolean
  /**
   * The classes applied to the different part of the component
   */
  classes?: FormClasses
  /**
   * The styles applied to the different part of the component
   */
  styles?: FormStyles
}

const useStyles = makeG2STyles()((theme) => ({
  fieldContainer: {
    gap: theme.spacing * 3
  }
}))

export type FormProps = MergeReactElementProps<'form', FormBasicProps>

export const Form = (props: FormProps) => {
  const {
    actions,
    fields,
    onSubmit,
    className,
    onChange,
    classes,
    styles,
    formState,
    actionsPosition = 'below',
    actionsStackProps,
    fieldsStackProps,
    isLoading = false,
    readonly = false,
    ...other
  } = props
  const defaultStyles = useStyles()

  const fieldsMemoized = useMemo(
    () =>
      fields.map((field) => {
        const input = getInput(field, formState, classes, styles, isLoading)
        if (!!field.customDisplay) {
          return field.customDisplay(input)
        }
        return input
      }),
    [
      fields,
      formState.values,
      formState.handleChange,
      formState.errors,
      classes?.field,
      styles?.field,
      isLoading,
      readonly
    ]
  )

  const actionsDisplay = useMemo(() => {
    if (!actions || actions.length === 0) return undefined
    return (
      <Actions
        actions={actions}
        className='AruiForm-actions'
        style={styles?.actions}
        classes={{
          button: 'AruiForm-button'
        }}
        styles={{ button: styles?.button }}
        sx={{
          marginTop: (theme) => theme.spacing(2),
          ...actionsStackProps?.sx
        }}
        {...actionsStackProps}
      />
    )
  }, [actions, classes?.button, styles?.button])

  return (
    <form
      onSubmit={formState.handleSubmit}
      className={cx('AruiForm-root', className)}
      {...other}
    >
      {actionsPosition === 'above' && !isLoading && actionsDisplay}
      <Stack
        {...fieldsStackProps}
        className={cx(
          defaultStyles.classes.fieldContainer,
          'AruiForm-fieldsContainer',
          classes?.fieldsContainer
        )}
        style={styles?.fieldsContainer}
      >
        {fieldsMemoized}
      </Stack>
      {actionsPosition === 'below' && !isLoading && actionsDisplay}
    </form>
  )
}

const getInput = (
  field: FormField,
  formState: FormState,
  classes?: FormClasses,
  styles?: FormStyles,
  isLoading?: boolean,
  readonly?: boolean,
) => {
  const commonProps = {
    key: field.key,
    id: field.key,
    label: field.label,
    name: field.name,
    error: !!formState.errors[field.name],
    errorMessage: formState.errors[field.name] as string,
    isLoading: isLoading,
    readonly: readonly,
    className: cx(
      classes?.field,
      'AruiForm-field',
      field.checkBoxProps?.className,
      field.datePickerProps?.className,
      field.selectProps?.className,
      field.autoCompleteProps?.className,
      field.radioChoicesProps?.className,
      field.textFieldProps?.className
    ),
    style: {
      ...styles?.field,
      ...field.checkBoxProps?.style,
      ...field.datePickerProps?.style,
      ...field.selectProps?.style,
      ...field.autoCompleteProps?.style,
      ...field.radioChoicesProps?.style,
      ...field.textFieldProps?.style
    }
  }
  switch (field.type) {
    case 'datepicker': {
      const date = new Date(formState.getFieldProps(field.name).value)
      return (
        <InputLabeled
          inputType='datePicker'
          value={
            !isNaN(date.getTime())
              ? date
              : formState.getFieldProps(field.name).value ?? ''
          }
          onChangeDate={(date) => {
            formState.setFieldValue(
              field.name,
              date && !isNaN(date.getTime()) ? date : date?.toString(),
              false
            )
            !!field.onChange && field.onChange(date)
          }}
          {...commonProps}
          {...field.datePickerProps}
        />
      )
    }
    case 'select':
      return field.selectProps?.multiple === true ? (
        <InputLabeled
          inputType='select'
          values={formState.getFieldProps(field.name).value ?? []}
          onChangeValues={(values: string[]) => {
            formState.setFieldValue(field.name, values, false)
            !!field.onChange && field.onChange(values)
          }}
          {...commonProps}
          {...field.selectProps}
        />
      ) : (
        <InputLabeled
          inputType='select'
          value={formState.getFieldProps(field.name).value ?? ''}
          onChangeValue={(value: string) => {
            formState.setFieldValue(field.name, value, false)
            !!field.onChange && field.onChange(value)
          }}
          {...commonProps}
          {...field.selectProps}
        />
      )
    case 'autoComplete':
      return field.autoCompleteProps?.multiple === true ? (
        // @ts-ignore
        <InputLabeled
          inputType='autoComplete'
          values={formState.getFieldProps(field.name).value ?? []}
          onChangeValues={(values) => {
            formState.setFieldValue(field.name, values, false)
            !!field.onChange && field.onChange(values)
          }}
          {...commonProps}
          {...field.autoCompleteProps}
        />
      ) : (
        // @ts-ignore
        <InputLabeled
          inputType='autoComplete'
          value={formState.getFieldProps(field.name).value ?? ''}
          onChangeValue={(value) => {
            formState.setFieldValue(field.name, value, false)
            !!field.onChange && field.onChange(value)
          }}
          {...commonProps}
          {...field.autoCompleteProps}
        />
      )
    case 'checkbox':
      return (
        <CheckBox
          checked={formState.getFieldProps(field.name).value}
          onChange={(
            _: React.ChangeEvent<HTMLInputElement>,
            value: boolean
          ) => {
            formState.setFieldValue(field.name, value, false)
            !!field.onChange && field.onChange(value)
          }}
          {...commonProps}
          {...field.checkBoxProps}
        />
      )
    case 'radioChoices':
      return (
        <InputLabeled
          inputType='radioChoices'
          value={formState.getFieldProps(field.name).value ?? ''}
          onChange={(_: React.ChangeEvent<HTMLInputElement>, value: string) => {
            formState.setFieldValue(field.name, value, false)
            !!field.onChange && field.onChange(value)
          }}
          {...commonProps}
          {...field.radioChoicesProps}
        />
      )
  }
  return (
    <InputLabeled
      inputType='textField'
      value={formState.getFieldProps(field.name).value ?? ''}
      onChange={(value: string) => {
        formState.setFieldValue(field.name, value, false)
        !!field.onChange && field.onChange(value)
      }}
      {...commonProps}
      {...field.textFieldProps}
    />
  )
}
