import { FilterTextField, FilterTextFieldProps } from '@smartb/g2-forms'
import React from 'react'
import { FieldRenderProps } from '../type'
import { ElementRendererFunction } from '../../ComposableRender'

export type FilterTextFieldExtendProps = Partial<
  Omit<FilterTextFieldProps, 'value' | 'onChange'>
>

export type FilterTextFieldRenderProps = FieldRenderProps<
  'textField',
  FilterTextFieldExtendProps
>

export const FilterTextFieldRender: ElementRendererFunction<
  FilterTextFieldRenderProps
> = (props: FilterTextFieldRenderProps) => {
  const { element, formState, basicProps, defaultSubmitBehavior } = props
  const { params } = element
  const value = formState.values[basicProps.name]
  return (
    <FilterTextField
      value={value ?? ''}
      onChange={(value) =>
        formState.setFieldValue(basicProps.name, value, false)
      }
      onRemove={() => {
        formState.setFieldValue(basicProps.name, '', false)
        defaultSubmitBehavior && formState.submitForm()
      }}
      textFieldType='search'
      onSearch={() => defaultSubmitBehavior && formState.submitForm()}
      {...params}
      {...basicProps}
    />
  )
}
