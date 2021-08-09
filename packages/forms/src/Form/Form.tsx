import React, { useCallback, useMemo } from 'react'
import { FormikHelpers, useFormik } from "formik"
import { ButtonProps, Button } from "@smartb/archetypes-ui-components"
import { InputForm } from '../InputForm'
import { SelectProps } from '../Select'
import { TextFieldProps } from '../TextField'
import { DatePickerProps } from '../DatePicker'
import { CheckBox, CheckBoxProps } from '../CheckBox'
import { BasicProps, lowLevelStyles, MergeReactElementProps } from '@smartb/archetypes-ui-themes'
import { Box } from '@material-ui/core'
import clsx from 'clsx'

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
    textFieldProps?: Partial<Omit<TextFieldProps, "value" | "onChange">>
    /**
     * the props of the select if you choosed it
     */
    selectProps?: Partial<Omit<SelectProps, "value" | "onChangeValue" | "onChangeValues">>
    /**
     * the props of the datepicker if you choosed it
     */
    datePickerProps?: Partial<Omit<DatePickerProps, "value" | "onChangeDate">>
    /**
     * the props of the checkbox if you choosed it
     */
    checkBoxProps?: Partial<Omit<CheckBoxProps, "checked" | "onChange">>
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
     * the callback called when the form is being validated by the user
     * please use the `setSubmitting` in the formikHelpers object to inform about any asynchronous task 
     * before the end of the submission
     */
    onSubmit: (values: { [key: string]: any }, formikHelpers: FormikHelpers<any>) => void | Promise<any>
    /**
     * the actions displayed at the bottom of the component. To make a validation button you have to add an action with `type="submit"`
     */
    actions: Action[]
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
    const { actions, fields, onSubmit, className, classes, styles, ...other } = props
    const defaultClasses = useStyles()

    const initialValues = useMemo(() => {
        const obj = {}
        fields.forEach((field) => {
            obj[field.name] = field.defaultValue
        })
        return obj
    }, [])

    const validate = useCallback(
        (values) => {
            const errors = {}
            fields.forEach((field) => {
                const error = field.validator(values[field.name])
                if (error) errors[field.name] = error
            })
            return errors
        },
        [fields],
    )

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: onSubmit,
        validate
    });

    const fieldsMemoized = useMemo(() => fields.map((field) => {
        const commonProps = {
            key: field.key,
            id: field.key,
            label: field.label,
            name: field.name,
            error: !!formik.errors[field.name],
            errorMessage: formik.errors[field.name] as string,
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
            //@ts-ignore
            <InputForm
                {...commonProps}
                inputType="textField"
                value={formik.values[field.name]}
                onChange={(value) => formik.setFieldValue(field.name, value, false)}
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
                        value={formik.values[field.name]}
                        onChangeDate={(date) => formik.setFieldValue(field.name, date, false)}
                        {...field.datePickerProps}
                    />
                )
            case "select":
                return field.selectProps?.multiple === true ? (
                    //@ts-ignore
                    <InputForm
                        {...commonProps}
                        inputType="select"
                        values={formik.values[field.name]}
                        onChangeValues={(values) => formik.setFieldValue(field.name, values, false)}
                        {...field.selectProps}
                    />
                ) : (
                    //@ts-ignore
                    <InputForm
                        {...commonProps}
                        inputType="select"
                        value={formik.values[field.name]}
                        onChangeValue={(value) => formik.setFieldValue(field.name, value, false)}
                        {...field.selectProps}
                    />
                )
            case "checkbox":
                return (
                    <CheckBox
                        {...commonProps}
                        checked={formik.values[field.name]}
                        onChange={formik.handleChange}
                        {...field.checkBoxProps}
                    />
                )
            default:
                return textField
        }
    }), [fields, formik.values, formik.handleChange, formik.errors, classes?.field, styles?.field])

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
            onSubmit={formik.handleSubmit}
            className={clsx(className, 'AruiForm-root')}
            {...other}
        >
            {fieldsMemoized}
            <Box
                className={clsx(
                    'AruiForm-actions',
                    classes?.actions
                )}
                style={styles?.actions}
            >
                {actionsDisplay}
            </Box>
        </form>
    )
}
