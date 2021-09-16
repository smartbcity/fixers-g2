import { FormikConfig, FormikHelpers, useFormik } from "formik"
import { useMemo } from "react"
import { Field } from "./Filters"

export type FiltersState = ReturnType<typeof useFormik>

interface useFiltersParams {
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
     * this prop allow you to add you custom config to the useFiltersik hook
     */
    formikConfig?: Omit<FormikConfig<any>, "initialValues" | "onSubmit" | "validate">
}

export const useFilters = (params: useFiltersParams): FiltersState => {
    const { fields, onSubmit, formikConfig } = params
    const initialValues = useMemo(() => {
        const obj = {}
        fields.forEach((field) => {
            obj[field.name] = field.defaultValue
        })
        return obj
    }, [])

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: onSubmit,
        ...formikConfig
    });

    return formik
}