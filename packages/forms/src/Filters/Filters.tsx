import React, { useLayoutEffect, useMemo, useState } from 'react'
import { Action, Actions } from '@smartb/g2-components'
import { FilterSelectProps, FilterSelect } from '../FilterSelect'
import { FilterTextFieldProps, FilterTextField } from '../FilterTextField'
import { FilterDatePickerProps, FilterDatePicker } from '../FilterDatePicker'
import {
  BasicProps,
  makeG2STyles,
  MergeReactElementProps
} from '@smartb/g2-themes'
import { Box, Stack, StackProps } from '@mui/material'
import { cx } from '@emotion/css'
import { FiltersState } from './useFilters'
import { useElementSize } from '@mantine/hooks'

export type FiltersAction = Action

export type FiltersField = {
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
  type: 'textfield' | 'select' | 'datepicker'
  /**
   * the props of the textfield if you choosed it
   */
  textFieldProps?: Partial<Omit<FilterTextFieldProps, 'value' | 'onChange'>>
  /**
   * the props of the select if you choosed it
   */
  selectProps?: Partial<
    Omit<FilterSelectProps, 'value' | 'onChangeValue' | 'onChangeValues'>
  >
  /**
   * the props of the datepicker if you choosed it
   */
  datePickerProps?: Partial<
    Omit<FilterDatePickerProps, 'value' | 'onChangeDate'>
  >
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
  fields: (FiltersField | 'spacer')[]
  /**
   * the state of the form provided by the hook `useFilters`
   */
  formState: FiltersState
  /**
   * the actions displayed at the bottom of the component. To make a validation button you have to add an action with `type="submit"`
   */
  actions?: FiltersAction[]
  /**
   * Determine wether the actions are placed above or below the content of the form
   *
   * @default left
   */
  actionsPosition?: 'left' | 'right'
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
   * the props given to the actions stack container
   */
  actionsStackProps?: StackProps
  /**
   * the props given to the fields stack container
   */
  fieldsStackProps?: StackProps
  /**
   * if true the component will wrap into a button opening a drawer containing the filters when not enough space is left for it
   * @default false
   */
  responsive?: boolean
  /**
   * The classes applied to the different part of the component
   */
  classes?: FiltersClasses
  /**
   * The styles applied to the different part of the component
   */
  styles?: FiltersStyles
}

const useStyles = makeG2STyles()({
  form: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  actionContainer: {
    display: 'inline-flex',
    '& .AruiFilters-button': {
      padding: '3px'
    }
  }
})

export type FiltersProps = MergeReactElementProps<'form', FiltersBasicProps>

export const Filters = (props: FiltersProps) => {
  const {
    actions,
    fields,
    onSubmit,
    className,
    classes,
    styles,
    formState,
    actionsPosition = 'left',
    defaultSubmitBehavior = true,
    actionsStackProps,
    fieldsStackProps,
    responsive = false,
    ...other
  } = props
  const defaultStyles = useStyles()
  const containerSize = useElementSize()
  const contentSize = useElementSize()
  const [renderedContentWidth, setRenderedContentWidth] = useState<
    undefined | number
  >(undefined)

  useLayoutEffect(() => {
    if (contentSize.width > 0) {
      setRenderedContentWidth(contentSize.width)
    }
  }, [contentSize.width])

  // const isOverflowing = useMemo(() => {
  //   if (!renderedContentWidth) return false
  //   if (renderedContentWidth > containerSize.width) return true
  //   return false
  // }, [renderedContentWidth, containerSize.width])

  const fieldsMemoized = useMemo(
    () =>
      fields.map((field) => {
        if (field === 'spacer') return <Box sx={{ flexGrow: 1 }} />

        const commonProps = {
          key: field.key,
          id: field.key,
          label: field.label,
          name: field.name,
          className: cx(
            classes?.field,
            'AruiFilters-field',
            field.datePickerProps?.className,
            field.selectProps?.className,
            field.textFieldProps?.className
          ),
          style: styles?.field
        }
        const textField = (
          <FilterTextField
            value={formState.values[field.name] ?? ''}
            onChange={(value) =>
              formState.setFieldValue(field.name, value, false)
            }
            onRemove={() => {
              formState.setFieldValue(field.name, '', false)
              defaultSubmitBehavior && formState.submitForm()
            }}
            textFieldType='search'
            onSearch={() => defaultSubmitBehavior && formState.submitForm()}
            {...field.textFieldProps}
            {...commonProps}
          />
        )
        switch (field.type) {
          case 'textfield':
            return textField
          case 'datepicker':
            return (
              <FilterDatePicker
                value={formState.values[field.name] ?? ''}
                onChangeDate={(date) => {
                  formState.setFieldValue(field.name, date, false)
                }}
                onRemove={() => {
                  formState.setFieldValue(field.name, '', false)
                  defaultSubmitBehavior && formState.submitForm()
                }}
                onClose={() => {
                  defaultSubmitBehavior && formState.submitForm()
                }}
                {...field.datePickerProps}
                {...commonProps}
              />
            )
          case 'select':
            return field.selectProps?.multiple === true ? (
              <FilterSelect
                values={formState.values[field.name] ?? []}
                onChangeValues={(values) =>
                  formState.setFieldValue(field.name, values, false)
                }
                onRemove={() => {
                  formState.setFieldValue(field.name, [], false)
                  defaultSubmitBehavior && formState.submitForm()
                }}
                onClose={() => defaultSubmitBehavior && formState.submitForm()}
                {...field.selectProps}
                {...commonProps}
              />
            ) : (
              <FilterSelect
                value={formState.values[field.name] ?? ''}
                onChangeValue={(value) => {
                  formState.setFieldValue(field.name, value, false)
                  formState.submitForm()
                }}
                onRemove={() => {
                  formState.setFieldValue(field.name, '', false)
                  defaultSubmitBehavior && formState.submitForm()
                }}
                onClose={() => defaultSubmitBehavior && formState.submitForm()}
                {...field.selectProps}
                {...commonProps}
              />
            )
          default:
            return textField
        }
      }),
    [
      fields,
      formState.values,
      formState.handleChange,
      formState.errors,
      classes?.field,
      styles?.field,
      defaultSubmitBehavior
    ]
  )
  const actionsDisplay = useMemo(() => {
    if (!actions || actions.length === 0) return <></>
    return (
      <Actions
        direction='row'
        actions={actions}
        className='AruiFilters-actions'
        style={styles?.actions}
        classes={{
          button: 'AruiFilters-button'
        }}
        styles={{ button: styles?.button }}
      />
    )
  }, [actions, classes?.button, styles?.button])

  const content = (
    <>
      {actionsPosition === 'left' && actionsDisplay}
      <Stack
        direction='row'
        {...fieldsStackProps}
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          flexGrow: 1,
          flexWrap: !responsive ? 'wrap' : 'nowrap',
          gap: (theme) => theme.spacing(1),
          ...fieldsStackProps?.sx
        }}
        className={cx('AruiFilters-fieldsContainer', classes?.fieldsContainer)}
        style={styles?.fieldsContainer}
      >
        {fieldsMemoized}
      </Stack>
      {actionsPosition === 'right' && actionsDisplay}
    </>
  )

  return (
    <form
      ref={containerSize.ref}
      onSubmit={formState.handleSubmit}
      className={cx(defaultStyles.classes?.form, 'AruiFilters-root', className)}
      {...other}
    >
      {!renderedContentWidth ? (
        <Box
          ref={contentSize.ref}
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
    </form>
  )
}
