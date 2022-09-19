import React, { useCallback, useMemo, useState } from 'react'
import { ContainerRenderer, ElementRenderersConfig } from '../ComposableRender'
import { cx } from '@emotion/css'
import { Box, Stack, StackProps } from '@mui/material'
import { FormikProvider, useFormik } from 'formik'
import { useFilterRenderProps, FilterComposableField } from './type'
import { MergeReactElementProps, useIsOverflowing } from '@smartb/g2-utils'
import { makeG2STyles } from '@smartb/g2-themes'
import {
  Action,
  ActionsWrapper,
  ActionsWrapperProps
} from '@smartb/g2-components'
import { FilterButton, FilterButtonProps } from '@smartb/g2-forms'
import { DefaultRenderer } from './factories/FormElementsRenderer'
import {
  ResponsiveFiltersComposable,
  ResponsiveFiltersComposableBasicProps
} from './ResponsiveFiltersComposable'

export interface FiltersComposableClasses {
  actions?: string
  button?: string
  field?: string
  fieldsContainer?: string
}

export interface FiltersComposableStyles {
  actions?: React.CSSProperties
  button?: React.CSSProperties
  field?: React.CSSProperties
  fieldsContainer?: React.CSSProperties
}

export type FiltersComposableActionsProps = Omit<ActionsWrapperProps, 'actions'>

export interface FiltersComposableBasicProps<
  ELEMENT_PARAMS extends ElementRenderersConfig
> {
  customFactories?: ELEMENT_PARAMS
  /**
   * the actions displayed at the bottom of the component. To make a validation button you have to add an action with `type="submit"`
   */
  actions?: Action[]
  /**
   * the props given to the actions
   */
  actionsProps?: FiltersComposableActionsProps
  /**
   * the fields of the form
   */
  fields: FilterComposableField<ELEMENT_PARAMS>[]
  /**
   * the state of the form provided by the hook `useForm`
   */
  formState: ReturnType<typeof useFormik>
  /**
   * the props given to the fields stack container
   */
  fieldsStackProps?: StackProps
  /**
   * The classes applied to the different part of the component
   */
  classes?: FiltersComposableClasses
  /**
   * The styles applied to the different part of the component
   */
  styles?: FiltersComposableStyles
  /**
   * The global ui settings of the filters components
   */
  filterStyleProps?: {
    color?: 'primary' | 'secondary' | 'default'
    variant?: 'filled' | 'outlined'
  }
  /**
   * The props of the filter button appearing when the component is in responsive mode
   */
  filterButtonProps?: FilterButtonProps
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
   * if true the component will wrap into a button opening a drawer containing the filters when not enough space is left for it
   * @default true
   */
  responsive?: boolean
  /**
   * The props of the responsive component
   */
  responsiveFiltersProps?: ResponsiveFiltersComposableBasicProps
  /**
   * You should not use this prop it is used internally for the responsive filters mode
   * @default true
   */
  withFormikProvider?: boolean
}

const useStyles = makeG2STyles()({
  form: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  actionContainer: {
    display: 'inline-flex',
    '& .AruiFilters-button': {
      padding: '3px'
    }
  }
})

export type FiltersComposableProps<
  RENDERER extends ElementRenderersConfig = {}
> = MergeReactElementProps<'form', FiltersComposableBasicProps<RENDERER>>

export const FiltersComposable = <RENDERER extends ElementRenderersConfig>(
  props: FiltersComposableProps<RENDERER>
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
    defaultSubmitBehavior = true,
    responsive = true,
    filterButtonProps,
    withFormikProvider = true,
    filterStyleProps,
    ...other
  } = props
  const defaultStyles = useStyles()
  const [openDrawer, setOpenDrawer] = useState(false)
  const onCloseDrawer = useCallback(() => {
    setOpenDrawer(false)
  }, [])

  const onOpenDrawer = useCallback(() => {
    setOpenDrawer(true)
  }, [])

  const sortedFields = useMemo(() => {
    const allFields: FilterComposableField<RENDERER>[] = []
    const mandatoryFields: FilterComposableField<RENDERER>[] = []
    const nonMandatoryFields: FilterComposableField<RENDERER>[] = []
    fields.forEach((field) => {
      allFields.push(field)
      if (field.mandatory) {
        mandatoryFields.push(field)
      } else if (field.type !== 'spacer') {
        nonMandatoryFields.push(field)
      }
    })
    return {
      allFields,
      mandatoryFields,
      nonMandatoryFields
    }
  }, [fields])

  const { canRemoveContentContainer, containerRef, contentRef, isOverflowing } =
    useIsOverflowing()
  const elements = useFilterRenderProps({
    ...props,
    fields:
      isOverflowing && responsive
        ? sortedFields.mandatoryFields
        : sortedFields.allFields
  })

  const content = (
    <ActionsWrapper actions={actions} {...actionsProps}>
      <Stack
        direction='row'
        {...fieldsStackProps}
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          flexGrow: 1,
          flexWrap: !responsive ? 'wrap' : 'nowrap',
          gap: (theme) => theme.spacing(1),
          ...fieldsStackProps?.sx
        }}
        className={cx('AruiFilters-fieldsContainer', classes?.fieldsContainer)}
        style={styles?.fieldsContainer}
      >
        {isOverflowing && (
          <FilterButton
            onClick={onOpenDrawer}
            {...filterButtonProps}
            {...filterStyleProps}
          />
        )}
        <ContainerRenderer
          renderer={DefaultRenderer}
          rendererCustom={customFactories}
          elements={elements}
        />
      </Stack>
    </ActionsWrapper>
  )

  const form = (
    <form
      ref={containerRef}
      onSubmit={formState.handleSubmit}
      className={cx(defaultStyles.classes?.form, 'AruiFilters-root', className)}
      {...other}
    >
      {!canRemoveContentContainer && responsive ? (
        <Box
          ref={contentRef}
          sx={{
            width: 'fit-content',
            justifyContent: 'flex-end',
            alignItems: 'center',
            visibility: 'hidden',
            display: 'flex'
          }}
        >
          {content}
        </Box>
      ) : (
        content
      )}
      {isOverflowing && responsive && (
        <ResponsiveFiltersComposable
          openDrawer={openDrawer}
          onCloseDrawer={onCloseDrawer}
          {...props}
          fields={sortedFields.nonMandatoryFields}
        />
      )}
    </form>
  )
  if (withFormikProvider)
    return <FormikProvider value={formState}>{form}</FormikProvider>
  return form
}
