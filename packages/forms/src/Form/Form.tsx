import React, { useMemo } from 'react'
import { ButtonProps, Button } from "@smartb/g2-components"
import { InputForm } from '../InputForm'
import { SelectProps } from '../Select'
import { TextFieldProps } from '../TextField'
import { DatePickerProps } from '../DatePicker'
import { CheckBox, CheckBoxProps } from '../CheckBox'
import { BasicProps, lowLevelStyles, MergeReactElementProps } from '@smartb/g2-themes'
import { Box } from  '@mui/material'
import clsx from 'clsx'
import { FormState } from './useForm'

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
    type: "textfield" | "select" | "datepicker" | "checkbox"
    /**
     * the validator that takes the value of the input and return an error or undefined/nothing if the value is valid
     */
    validator: (value: any) => string | undefined | void
    /**
     * the props of the textfield if you choosed it
     */
    textFieldProps?: Partial<Omit<TextFieldProps, "value" | "onChange" | "label">>
    /**
     * the props of the select if you choosed it
     */
    selectProps?: Partial<Omit<SelectProps, "value" | "onChangeValue" | "onChangeValues" | "label">>
    /**
     * the props of the datepicker if you choosed it
     */
    datePickerProps?: Partial<Omit<DatePickerProps, "value" | "onChangeDate" | "label">>
    /**
     * the props of the checkbox if you choosed it
     */
    checkBoxProps?: Partial<Omit<CheckBoxProps, "checked" | "onChange" | "label">>
}

interface FormClasses {
    actions?: string
    button?: string
    field?: string
}

interface FormStyles {
    actions?: React.CSSProperties
    button?: React.CSSProperties
    field?: React.CSSProperties
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
    actions: Action[]
    /**
     * Determine wether the actions are placed above or below the content of the form
     * 
     * @default "below"
     */
    actionsPosition?: "above" | "below"
    /**
     * The classes applied to the different part of the component
     */
    classes?: FormClasses
    /**
     * The styles applied to the different part of the component
     */
    styles?: FormStyles
}

const useStyles = lowLevelStyles()({
    field: {
        margin: "20px 0",
    }
})

export type FormProps = MergeReactElementProps<"form", FormBasicProps>

export const Form = (props: FormProps) => {
    const { actions, fields, onSubmit, className, classes, styles, formState, actionsPosition = "below", ...other } = props
    const defaultClasses = useStyles()

    const fieldsMemoized = useMemo(() => fields.map((field) => {
        const commonProps = {
            key: field.key,
            id: field.key,
            label: field.label,
            name: field.name,
            error: !!formState.errors[field.name],
            errorMessage: formState.errors[field.name] as string,
            className: clsx(
                classes?.field,
                defaultClasses.field,
                field.checkBoxProps?.className,
                field.datePickerProps?.className,
                field.selectProps?.className,
                field.textFieldProps?.className,
                "AruiForm-field"
            ),
            style: styles?.field,
        }
        const textField = (
            <InputForm
                {...commonProps}
                inputType="textField"
                value={formState.values[field.name] ?? ""}
                onChange={(value: string) => formState.setFieldValue(field.name, value, false)}
                {...field.textFieldProps}
            />
        )
        switch (field.type) {
            case "textfield":
                return textField
            case "datepicker":
                return (
                    <InputForm
                        {...commonProps}
                        inputType="datePicker"
                        value={formState.values[field.name] ?? ""}
                        onChangeDate={(date) => formState.setFieldValue(field.name, date, false)}
                        {...field.datePickerProps}
                    />
                )
            case "select":
                return field.selectProps?.multiple === true ? (
                    <InputForm
                        {...commonProps}
                        inputType="select"
                        values={formState.values[field.name] ?? []}
                        onChangeValues={(values) => formState.setFieldValue(field.name, values, false)}
                        {...field.selectProps}
                    />
                ) : (
                    <InputForm
                        {...commonProps}
                        inputType="select"
                        value={formState.values[field.name] ?? ""}
                        onChangeValue={(value) => formState.setFieldValue(field.name, value, false)}
                        {...field.selectProps}
                    />
                )
            case "checkbox":
                return (
                    <CheckBox
                        {...commonProps}
                        checked={formState.values[field.name]}
                        onChange={formState.handleChange}
                        {...field.checkBoxProps}
                    />
                )
            default:
                return textField
        }
    }), [fields, formState.values, formState.handleChange, formState.errors, classes?.field, styles?.field])

    const actionsDisplay = useMemo(() => {
        if (actions.length === 0) return undefined
        return actions.map((action) => {
            const { key, label, className, ...other } = action
            return (
                <Button
                    key={key}
                    className={clsx(
                        'AruiForm-button',
                        classes?.button,
                        className
                    )}
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
            {actionsPosition === "above" && <Box
                className={clsx(
                    'AruiForm-actions',
                    classes?.actions
                )}
                style={styles?.actions}
            >
                {actionsDisplay}
            </Box>}
            {fieldsMemoized}
            {actionsPosition === "below" && <Box
                className={clsx(
                    'AruiForm-actions',
                    classes?.actions
                )}
                style={styles?.actions}
            >
                {actionsDisplay}
            </Box>}
        </form>
    )
}
