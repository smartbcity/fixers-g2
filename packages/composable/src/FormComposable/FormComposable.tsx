import React from 'react'
import { ContainerRenderer, ElementRenderersConfig } from '../ComposableRender'
import { cx } from '@emotion/css'
import { Stack, StackProps } from '@mui/material'
import { FormikProvider } from 'formik'
import {
  FormComposableField,
  FormComposableState,
  useFieldRenderProps
} from './type'
import { MergeReactElementProps } from '@smartb/g2-utils'
import { makeG2STyles } from '@smartb/g2-themes'
import { ActionsWrapper, ActionsWrapperProps } from '@smartb/g2-components'
import { FormAction } from '@smartb/g2-forms'
import { DefaultRenderer } from './factories/FormElementsRenderer'

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

interface FormComposableBasicProps<
  ELEMENT_PARAMS extends ElementRenderersConfig
> {
  customFactories?: ELEMENT_PARAMS
  /**
   * the actions displayed at the bottom of the component. To make a validation button you have to add an action with `type="submit"`
   */
  actions?: FormAction[]
  /**
   * the props given to the actions
   */
  actionsProps?: FormComposableActionsProps
  /**
   * the fields of the form
   */
  fields: FormComposableField<ELEMENT_PARAMS>[]
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

export type FormComposableProps<RENDERER extends ElementRenderersConfig = {}> =
  MergeReactElementProps<'form', FormComposableBasicProps<RENDERER>>

export const FormComposable = <RENDERER extends ElementRenderersConfig>(
  props: FormComposableProps<RENDERER>
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
  const fieldElement = useFieldRenderProps(props)
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
            <ContainerRenderer
              renderer={DefaultRenderer}
              rendererCustom={customFactories}
              elements={fieldElement}
            />
          </Stack>
        </ActionsWrapper>
      </form>
    </FormikProvider>
  )
}
