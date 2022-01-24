import React, { useMemo } from 'react'
import { ButtonProps, Button } from '@smartb/g2-components'
import { InputForm } from '../InputForm'
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
import clsx from 'clsx'
import { FormState } from './useForm'
import { RadioChoicesProps } from '../RadioChoices'

export type Action = {
  label: React.ReactNode
  key: string
} & Omit<ButtonProps, 'children' | 'style'>

export type Field = {
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
   * the type of the field
   */
  type: 'textfield' | 'select' | 'datepicker' | 'radioChoices' | 'checkbox'
  /**
   * the validator that takes the value of the input and return an error or undefined/nothing if the value is valid
   */
  validator?: (value: any) => string | undefined
  /**
   * if you want to add other nodes around the input use this function
   */
  customDisplay?: (input: React.ReactNode) => React.ReactNode
  /**
   * the props of the textfield if you choosed it
   */
  textFieldProps?: Partial<
    Omit<TextFieldProps, 'value' | 'onChange' | 'label' | 'classes' | 'styles'>
  >
  /**
   * the props of the select if you choosed it
   */
  selectProps?: Partial<
    Omit<
      SelectProps,
      | 'value'
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
      DatePickerProps,
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
      RadioChoicesProps,
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
  fields: Field[]
  /**
   * the state of the form provided by the hook `useForm`
   */
  formState: FormState
  /**
   * the actions displayed at the bottom of the component. To make a validation button you have to add an action with `type="submit"`
   */
  actions?: Action[]
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
   * The classes applied to the different part of the component
   */
  classes?: FormClasses
  /**
   * The styles applied to the different part of the component
   */
  styles?: FormStyles
}

const useStyles = makeG2STyles()({
  field: {
    margin: '20px 0'
  }
})

export type FormProps = MergeReactElementProps<'form', FormBasicProps>

export const Form = (props: FormProps) => {
  const {
    actions,
    fields,
    onSubmit,
    className,
    classes,
    styles,
    formState,
    actionsPosition = 'below',
    actionsStackProps,
    fieldsStackProps,
    ...other
  } = props
  const defaultStyles = useStyles()

  const fieldsMemoized = useMemo(
    () =>
      fields.map((field) => {
        const input = getInput(
          field,
          formState,
          defaultStyles.classes.field,
          classes,
          styles
        )
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
      styles?.field
    ]
  )

  const actionsDisplay = useMemo(() => {
    if (!actions || actions.length === 0) return undefined
    return actions.map((action) => {
      const { key, label, className, ...other } = action
      return (
        <Button
          key={key}
          className={clsx('AruiForm-button', classes?.button, className)}
          style={styles?.button}
          {...other}
        >
          {label}
        </Button>
      )
    })
  }, [actions, classes?.button, styles?.button])

  return (
    <form
      onSubmit={formState.handleSubmit}
      className={clsx(className, 'AruiForm-root')}
      {...other}
    >
      {actionsPosition === 'above' && (
        <Stack
          direction='row'
          {...actionsStackProps}
          className={clsx('AruiForm-actions', classes?.actions)}
          style={styles?.actions}
        >
          {actionsDisplay}
        </Stack>
      )}
      <Stack
        {...fieldsStackProps}
        className={clsx('AruiForm-fieldsContainer', classes?.fieldsContainer)}
        style={styles?.fieldsContainer}
      >
        {fieldsMemoized}
      </Stack>
      {actionsPosition === 'below' && (
        <Stack
          {...actionsStackProps}
          className={clsx('AruiForm-actions', classes?.actions)}
          style={styles?.actions}
        >
          {actionsDisplay}
        </Stack>
      )}
    </form>
  )
}

const getInput = (
  field: Field,
  formState: FormState,
  fieldClassName: string,
  classes?: FormClasses,
  styles?: FormStyles
) => {
  const commonProps = {
    key: field.key,
    id: field.key,
    label: field.label,
    name: field.name,
    error: !!formState.errors[field.name],
    errorMessage: formState.errors[field.name] as string,
    className: clsx(
      classes?.field,
      fieldClassName,
      field.checkBoxProps?.className,
      field.datePickerProps?.className,
      field.selectProps?.className,
      field.textFieldProps?.className,
      'AruiForm-field'
    ),
    style: styles?.field
  }
  switch (field.type) {
    case 'datepicker':
      const date = new Date(formState.values[field.name])
      return (
        <InputForm
          {...commonProps}
          inputType='datePicker'
          value={
            !isNaN(date.getTime()) ? date : formState.values[field.name] ?? ''
          }
          onChangeDate={(date) => {
            formState.setFieldValue(
              field.name,
              date && !isNaN(date.getTime()) ? date : date?.toString(),
              false
            )
          }}
          {...field.datePickerProps}
        />
      )
    case 'select':
      return field.selectProps?.multiple === true ? (
        <InputForm
          {...commonProps}
          inputType='select'
          values={formState.values[field.name] ?? []}
          onChangeValues={(values) =>
            formState.setFieldValue(field.name, values, false)
          }
          {...field.selectProps}
        />
      ) : (
        <InputForm
          {...commonProps}
          inputType='select'
          value={formState.values[field.name] ?? ''}
          onChangeValue={(value) =>
            formState.setFieldValue(field.name, value, false)
          }
          {...field.selectProps}
        />
      )
    case 'checkbox':
      return (
        <CheckBox
          {...commonProps}
          checked={formState.values[field.name]}
          onChange={(_: React.ChangeEvent<HTMLInputElement>, value: boolean) =>
            formState.setFieldValue(field.name, value, false)
          }
          {...field.checkBoxProps}
        />
      )
    case 'radioChoices':
      return (
        <InputForm
          {...commonProps}
          inputType='radioChoices'
          value={formState.values[field.name] ?? ''}
          onChange={(_: React.ChangeEvent<HTMLInputElement>, value: string) =>
            formState.setFieldValue(field.name, value, false)
          }
          {...field.radioChoicesProps}
        />
      )
  }
  return (
    <InputForm
      {...commonProps}
      inputType='textField'
      value={formState.values[field.name] ?? ''}
      onChange={(value: string) =>
        formState.setFieldValue(field.name, value, false)
      }
      {...field.textFieldProps}
    />
  )
}
