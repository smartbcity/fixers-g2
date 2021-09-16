
export const ActionDoc = `
type Action = {
    label: React.ReactNode
    key: string
} & Omit<ButtonProps, 'children' | 'style'>
`

export const FieldDoc = `
type Field = {
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
`

export const FiltersClasses = `
interface FiltersClasses {
    actions?: string
    button?: string
    field?: string
}
`

export const FiltersStyles = `
interface FiltersStyles {
    actions?: React.CSSProperties
    button?: React.CSSProperties
    field?: React.CSSProperties
}
`

export const FiltersState = `
export type FiltersState = ReturnType<typeof useFiltersik>
`

