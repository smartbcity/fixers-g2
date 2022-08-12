import React, { FunctionComponent } from 'react'
import { ComposableFactory } from '../ComposableFactory'
import { cx } from '@emotion/css'
import { Stack, StackProps } from '@mui/material'
import { FormAction } from '@smartb/g2-forms'
import { FormikProvider } from 'formik'
import { FormActionComposable } from './FormActionComposable'
import { withFieldElements } from './factories/withFieldElements'
import {
  DefaultFactories,
  FieldFactories
} from './factories/FormElementsFactories'
import { ComposableFormState } from './useFormFieldComposable'
import { ComposableFormField } from './type/FormField'
import { MergeReactElementProps } from '@smartb/g2-utils'

export interface FormClasses {
  actions?: string
  button?: string
  field?: string
  fieldsContainer?: string
}

export interface FormStyles {
  actions?: React.CSSProperties
  button?: React.CSSProperties
  field?: React.CSSProperties
  fieldsContainer?: React.CSSProperties
}

interface FormComposableBasicProps {
  customFactories?: FieldFactories<any, any>

  fields: ComposableFormField[]
  /**
   * the state of the form provided by the hook `useForm`
   */
  formState: ComposableFormState
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
   * The classes applied to the different part of the component
   */
  classes?: FormClasses
  /**
   * The styles applied to the different part of the component
   */
  styles?: FormStyles
}

export type FormComposableProps = MergeReactElementProps<
  'form',
  FormComposableBasicProps
>

export const FormComposable: FunctionComponent<FormComposableProps> = (
  props: FormComposableProps
) => {
  const {
    actions,
    fields,
    customFactories,
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
    ...other
  } = props
  const fieldElements = withFieldElements(props)
  return (
    <FormikProvider value={formState}>
      <form
        onSubmit={formState.handleSubmit}
        className={cx('AruiForm-root', className)}
        {...other}
      >
        <FormActionComposable {...props}>
          <Stack
            {...fieldsStackProps}
            className={cx('AruiForm-fieldsContainer', classes?.fieldsContainer)}
            style={styles?.fieldsContainer}
          >
            <ComposableFactory
              factories={DefaultFactories}
              customFactories={customFactories}
              elements={fieldElements}
            />
          </Stack>
        </FormActionComposable>
      </form>
    </FormikProvider>
  )
}
