import React, { ComponentPropsWithRef, useMemo } from 'react'
import { ContainerRenderer, ElementRenderersConfig } from '../ComposableRender'
import { cx } from '@emotion/css'
import { Stack, StackProps, styled, SxProps, Theme } from '@mui/material'
import { FormikProvider } from 'formik'
import {
  FormComposableField,
  FormComposableState,
  useFieldRenderProps
} from './type'
import { MergeMuiElementProps } from '@smartb/g2-themes'
import { ActionsWrapper, ActionsWrapperProps } from '@smartb/g2-components'
import { FormAction } from '@smartb/g2-forms'
import { DefaultRenderer } from './factories/FormElementsRenderer'
import { MUIStyledCommonProps } from '@mui/system'
import { evalDisplayConditions } from './type/conditionResolver'
import { getIn } from '@smartb/g2-utils'

const Form = styled('form')({})

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
  fields: FormComposableField<string, ELEMENT_PARAMS>[]
  /**
   * the state of the form provided by the hook `useForm`
   */
  formState: FormComposableState
  /**
   * The display of the fieldContainer
   *
   * @default "flex"
   */
  display?: 'flex' | 'grid'
  /**
   * The number of column in a grid display
   *
   * @default 2
   */
  gridColumnNumber?: number
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
   * Indicates if the data is on readOnly mode
   *
   * @default false
   */
  readOnly?: boolean
  /**
   * The classes applied to the different part of the component
   */
  classes?: FormComposableClasses
  /**
   * The styles applied to the different part of the component
   */
  styles?: FormComposableStyles
}

export type FormComposableProps<RENDERER extends ElementRenderersConfig = {}> =
  MergeMuiElementProps<
    MUIStyledCommonProps & ComponentPropsWithRef<'form'>,
    FormComposableBasicProps<RENDERER>
  >

export const FormComposable = <RENDERER extends ElementRenderersConfig>(
  props: FormComposableProps<RENDERER>
) => {
  const {
    actions,
    actionsProps,
    fields,
    customFactories,
    className,
    onChange,
    classes,
    styles,
    formState,
    fieldsStackProps,
    isLoading = false,
    readOnly = false,
    display = 'flex',
    gridColumnNumber = 2,
    sx,
    children,
    ...other
  } = props

  const filteredFields = useMemo(
    () =>
      fields.filter((field) =>
        evalDisplayConditions(
          field.conditions,
          getIn(formState.values, field.name),
          formState.values
        )
      ),
    [fields, formState.values]
  )

  console.log(filteredFields)

  const fieldElement = useFieldRenderProps({
    ...props,
    fields: filteredFields
  })

  const fieldContainerSx = useMemo(
    (): SxProps<Theme> =>
      display === 'grid'
        ? {
            display: 'grid',
            gridTemplateColumns: {
              sm: '1fr',
              md: `repeat(${gridColumnNumber}, minmax(0px, 1fr))`
            },
            gap: (theme) => theme.spacing(3)
          }
        : {
            gap: (theme) => theme.spacing(3)
          },
    [gridColumnNumber, display]
  )

  return (
    <FormikProvider value={formState}>
      {/* @ts-ignore */}
      <Form
        onSubmit={formState.handleSubmit}
        className={cx('AruiForm-root', className)}
        sx={{
          gap: (theme) => theme.spacing(3),
          display: 'flex',
          flexDirection: 'column',
          ...sx
        }}
        {...other}
      >
        <ActionsWrapper actions={actions} {...actionsProps}>
          <Stack
            {...fieldsStackProps}
            className={cx('AruiForm-fieldsContainer', classes?.fieldsContainer)}
            //@ts-ignore
            sx={{
              ...fieldContainerSx,
              ...fieldsStackProps?.sx
            }}
            style={styles?.fieldsContainer}
          >
            <ContainerRenderer
              renderer={DefaultRenderer}
              rendererCustom={customFactories}
              elements={fieldElement}
            />
          </Stack>
          {children}
        </ActionsWrapper>
      </Form>
    </FormikProvider>
  )
}
