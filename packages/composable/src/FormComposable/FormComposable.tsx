import React, { FunctionComponent } from 'react'
import { ComposableFactory } from '../ComposableFactory'
import { cx } from '@emotion/css'
import { Stack, StackProps } from '@mui/material'
import { FormikProvider } from 'formik'
import { useFieldRenderProps } from './factories/useFieldRenderProps'
import {
  DefaultRenderer,
  FieldRenderer
} from './factories/FormElementsRenderer'
import { FormComposableField } from './type/FormComposableField'
import { MergeReactElementProps } from '@smartb/g2-utils'
import { FormComposableState } from './type/FormComposableState'
import { makeG2STyles } from '@smartb/g2-themes'
import {
  ActionsWrapper,
  ActionsWrapperProps
} from '@smartb/g2-components/src/Actions/ActionsWrapper'
import { FormAction } from '@smartb/g2-forms'

export interface FormComposableClasses {
  actions?: string
  button?: string
  field?: string
  fieldsContainer?: string
}

export interface FormComposableStyles {
  actions?: React.CSSProperties
  button?: React.CSSProperties
  field?: React.CSSProperties
  fieldsContainer?: React.CSSProperties
}

export type FormComposableActionsProps = Omit<ActionsWrapperProps, 'actions'>

interface FormComposableBasicProps {
  customFactories?: FieldRenderer<any, any>
  /**
   * the actions displayed at the bottom of the component. To make a validation button you have to add an action with `type="submit"`
   */
  actions?: FormAction[]
  /**
   * the props given to the actions
   */
  actionsProps: FormComposableActionsProps
  /**
   * the fields of the form
   */
  fields: FormComposableField[]
  /**
   * the state of the form provided by the hook `useForm`
   */
  formState: FormComposableState
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
  classes?: FormComposableClasses
  /**
   * The styles applied to the different part of the component
   */
  styles?: FormComposableStyles
}

const useStyles = makeG2STyles()((theme) => ({
  fieldContainer: {
    gap: theme.spacing * 3
  }
}))

export type FormComposableProps = MergeReactElementProps<
  'form',
  FormComposableBasicProps
>

export const FormComposable: FunctionComponent<FormComposableProps> = (
  props: FormComposableProps
) => {
  const {
    actions,
    actionsProps,
    fields,
    customFactories,
    onSubmit,
    className,
    onChange,
    classes,
    styles,
    formState,
    fieldsStackProps,
    isLoading = false,
    readonly = false,
    ...other
  } = props
  const defaultStyles = useStyles()
  const fieldElements = useFieldRenderProps(props)
  return (
    <FormikProvider value={formState}>
      <form
        onSubmit={formState.handleSubmit}
        className={cx('AruiForm-root', className)}
        {...other}
      >
        <ActionsWrapper actions={actions} {...actionsProps}>
          <Stack
            {...fieldsStackProps}
            className={cx(
              defaultStyles.classes.fieldContainer,
              'AruiForm-fieldsContainer',
              classes?.fieldsContainer
            )}
            style={styles?.fieldsContainer}
          >
            <ComposableFactory
              factories={DefaultRenderer}
              customFactories={customFactories}
              elements={fieldElements}
            />
          </Stack>
        </ActionsWrapper>
      </form>
    </FormikProvider>
  )
}
