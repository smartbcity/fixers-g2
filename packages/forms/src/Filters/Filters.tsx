import React, { useMemo } from 'react'
import { ButtonProps, Button } from "@smartb/g2-components"
import { FilterSelectProps, FilterSelect } from '../FilterSelect'
import { FilterTextFieldProps, FilterTextField } from '../FilterTextField'
import { FilterDatePickerProps, FilterDatePicker } from '../FilterDatePicker'
import { BasicProps, lowLevelStyles, MergeReactElementProps } from '@smartb/g2-themes'
import { Box } from '@material-ui/core'
import clsx from 'clsx'
import { FiltersState } from './useFilters'

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
    type: "textfield" | "select" | "datepicker"
    /**
     * the props of the textfield if you choosed it
     */
    textFieldProps?: Partial<Omit<FilterTextFieldProps, "value" | "onChange">>
    /**
     * the props of the select if you choosed it
     */
    selectProps?: Partial<Omit<FilterSelectProps, "value" | "onChangeValue" | "onChangeValues">>
    /**
     * the props of the datepicker if you choosed it
     */
    datePickerProps?: Partial<Omit<FilterDatePickerProps, "value" | "onChangeDate">>
}

interface FiltersClasses {
    actions?: string
    fieldsContainer?: string
    button?: string
    field?: string
}

interface FiltersStyles {
    actions?: React.CSSProperties
    fieldsContainer?: React.CSSProperties
    button?: React.CSSProperties
    field?: React.CSSProperties
}

export interface FiltersBasicProps extends BasicProps {
    /**
     * the fields of the form
     */
    fields: Field[]
    /**
     * the state of the form provided by the hook `useFilters`
     */
    formState: FiltersState
    /**
     * the actions displayed at the bottom of the component. To make a validation button you have to add an action with `type="submit"`
     */
    actions: Action[]
    /**
     * Determine wether the actions are placed above or below the content of the form
     * 
     * @default left
     */
    actionsPosition?: "left" | "right"
    /**
     * Determine wether the default submit behavior describe below will be activated or not.
     * By default:
     * - the `onChange` event of the datepicker trigger the submit
     * - the `onClose` event of the select trigger the submit
     * - the `onSearch` event of the textfield trigger the submit
     * 
     * @default true
     */
    defaultSubmitBehavior?: boolean
    /**
     * The classes applied to the different part of the component
     */
    classes?: FiltersClasses
    /**
     * The styles applied to the different part of the component
     */
    styles?: FiltersStyles
}

const useStyles = lowLevelStyles()({
    field: {
        margin: "8px",
    },
    form: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center"
    },
    actionContainer: {
        display: "inline-flex",
        "& .AruiFilters-button": {
            padding: "3px"
        }
    },
    fieldsContainer: {
        display: "flex",
        justifyContent: "flex-end",
        flexWrap: "wrap"
    },
    button: {
        margin: "8px"
    }
})

export type FiltersProps = MergeReactElementProps<"form", FiltersBasicProps>

export const Filters = (props: FiltersProps) => {
    const { actions, fields, onSubmit, className, classes, styles, formState, actionsPosition = "left", defaultSubmitBehavior = true, ...other } = props
    const defaultClasses = useStyles()

    const fieldsMemoized = useMemo(() => fields.map((field) => {
        const commonProps = {
            key: field.key,
            id: field.key,
            label: field.label,
            name: field.name,
            className: clsx(
                classes?.field,
                defaultClasses.field,
                field.datePickerProps?.className,
                field.selectProps?.className,
                field.textFieldProps?.className,
                "AruiFilters-field"
            ),
            style: styles?.field,
        }
        const textField = (
            <FilterTextField
                {...commonProps}
                value={formState.values[field.name] ?? ""}
                onChange={(value) => formState.setFieldValue(field.name, value, false)}
                onRemove={() => formState.setFieldValue(field.name, "", false)}
                textFieldType="search"
                onSearch={() => defaultSubmitBehavior && formState.submitForm()}
                {...field.textFieldProps}
            />
        )
        switch (field.type) {
            case "textfield":
                return textField
            case "datepicker":
                return (
                    <FilterDatePicker
                        {...commonProps}
                        value={formState.values[field.name] ?? ""}
                        onChangeDate={(date) => {formState.setFieldValue(field.name, date, false); defaultSubmitBehavior && formState.submitForm()}}
                        onRemove={() => formState.setFieldValue(field.name, "", false)}
                        {...field.datePickerProps}
                    />
                )
            case "select":
                return field.selectProps?.multiple === true ? (
                    <FilterSelect
                        {...commonProps}
                        values={formState.values[field.name] ?? []}
                        onChangeValues={(values) => formState.setFieldValue(field.name, values, false)}
                        onRemove={() => formState.setFieldValue(field.name, [], false)}
                        onClose={() => defaultSubmitBehavior && formState.submitForm()}
                        {...field.selectProps}
                    />
                ) : (
                    <FilterSelect
                        {...commonProps}
                        value={formState.values[field.name] ?? ""}
                        onChangeValue={(value) => {formState.setFieldValue(field.name, value, false); formState.submitForm()}}
                        onRemove={() => formState.setFieldValue(field.name, "", false)}
                        onClose={() => defaultSubmitBehavior && formState.submitForm()}
                        {...field.selectProps}
                    />
                )
            default:
                return textField
        }
    }), [fields, formState.values, formState.handleChange, formState.errors, classes?.field, styles?.field, defaultSubmitBehavior])

    const actionsDisplay = useMemo(() => {
        if (actions.length === 0) return undefined
        return actions.map((action) => {
            const { key, label, className, ...other } = action
            return (
                <Button
                    key={key}
                    className={clsx(
                        'AruiFilters-button',
                        classes?.button,
                        defaultClasses.button,
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
            className={clsx(className, 'AruiFilters-root', defaultClasses?.form)}
            {...other}
        >
            {actionsPosition === "left" && <Box
                className={clsx(
                    'AruiFilters-actions',
                    classes?.actions,
                    defaultClasses.actionContainer
                )}
                style={styles?.actions}
            >
                {actionsDisplay}
            </Box>}
            <Box
            className={clsx(
                'AruiFilters-fieldsContainer',
                classes?.fieldsContainer,
                defaultClasses.fieldsContainer
            )}
            style={styles?.fieldsContainer}
            >
                {fieldsMemoized}
            </Box>
            {actionsPosition === "right" && <Box
                className={clsx(
                    'AruiFilters-actions',
                    classes?.actions,
                    defaultClasses.actionContainer
                )}
                style={styles?.actions}
            >
                {actionsDisplay}
            </Box>}
        </form>
    )
}
