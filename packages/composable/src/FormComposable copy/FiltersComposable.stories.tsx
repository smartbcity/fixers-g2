import React, { ReactNode } from 'react'
import { Meta } from '@storybook/react'
import { Story } from '@storybook/react/types-6-0'
import {
  ArgsTable,
  PRIMARY_STORY,
  Primary,
  Description,
  Stories
} from '@storybook/addon-docs'
import {
  FiltersComposableBasicProps,
  FiltersComposable
} from './FiltersComposable'
import { useFiltersComposable } from './.'

export default {
  title: 'Composable/FiltersComposable',
  component: FiltersComposable,
  parameters: {
    docs: {
      page: () => (
        <>
          <Primary />
          <Description>
            This components is made to display a simple form using
            [Formik](https://formik.org/).
          </Description>
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </>
      )
    }
  }
} as Meta

export const FiltersStory: Story<FiltersComposableBasicProps<any>> = (
  args: FiltersComposableBasicProps<any>
) => {
  const formState = useFiltersComposable({
    formikConfig: {
      initialValue: {}
    }
  })

  const actions = useMemo(
    (): FiltersAction[] => [
      {
        label: 'reset',
        key: 'resetFiltersButton',
        variant: 'text',
        onClick: () => formState.resetForm()
      },
      {
        label: 'execute',
        key: 'executeFiltersButton'
      }
    ],
    [formState.resetForm]
  )

  return (
    <Filters
      {...args}
      formState={formState}
      actions={actions}
      actionsPosition='right'
    />
  )
}

const fields: FiltersField[] = [
  {
    key: 'storybook-filters-field-from',
    name: 'from',
    label: 'From',
    type: 'datepicker',
    datePickerProps: { variant: 'outlined' }
  },
  {
    key: 'storybook-filters-field-to',
    name: 'to',
    label: 'To',
    type: 'datepicker',
    datePickerProps: { variant: 'outlined' }
  },
  {
    key: 'storybook-filters-field-keyword',
    name: 'keyword',
    label: 'Keyword',
    type: 'textfield',
    textFieldProps: { textFieldType: 'search', variant: 'outlined' }
  },
  {
    key: 'storybook-filters-field-country',
    name: 'country',
    label: 'Country',
    type: 'select',
    selectProps: {
      options: [
        { key: 'paris', label: 'Paris' },
        { key: 'lyon', label: 'Lyon' },
        { key: 'nice', label: 'Nice' },
        { key: 'marseille', label: 'Marseille' },
        { key: 'montpellier', label: 'Montpellier' }
      ],
      variant: 'outlined'
    }
  }
]

FiltersStory.args = {
  fields: fields
}

FiltersStory.storyName = 'Filters'
