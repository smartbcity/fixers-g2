import React, { useCallback, useMemo } from 'react'
import {
  Filters,
  FiltersBasicProps,
  FiltersField,
  FiltersAction
} from '../Filters'
import { Meta } from '@storybook/react'
import { Story } from '@storybook/react/types-6-0'

import { Typography } from '@mui/material'
import { useEnhancedFilters } from './useEnhancedFilters'
import { withDesign } from 'storybook-addon-designs'
import { Route } from 'react-router-dom'
import {
  Router as AruiRouter,
  AppProvider as AruiAppProvider
} from '@smartb/g2-providers'
import { QueryClient } from '@tanstack/react-query'
import { Button } from '@smartb/g2-components'

export default {
  title: 'Forms/EnhancedFilters',
  component: Filters,
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kgphqh0uVhoXt8TK3LlkGj/G2-%2F-Design-System?node-id=1097%3A177'
    }
  }
} as Meta

const queryClient = new QueryClient()

export const EnhancedFiltersStory: Story<FiltersBasicProps> = (
  args: FiltersBasicProps
) => {
  interface Languages {
    fr: string
    en: string
  }

  const languages: Languages = {
    fr: 'fr-FR',
    en: 'en-US'
  }

  return (
    <AruiAppProvider<Languages>
      languages={languages}
      loadingComponent={<Typography>Loading ...</Typography>}
      queryClient={queryClient}
    >
      <Router args={args} />
    </AruiAppProvider>
  )
}

const Router = (props) => {
  return (
    <AruiRouter>
      <Route
        path='/iframe.html'
        key='home'
        element={<Example {...props} />}
      ></Route>
    </AruiRouter>
  )
}

const Example = (props) => {
  const args = props.args

  const {
    formFilters,
    additionalFilters,
    setAdditionalFilters,
    submittedFilters
  } = useEnhancedFilters<{ page: number }>({
    fields: args.fields,
    initAdditionalFilters: {
      page: 0
    }
  })

  //pass the submittedFilters to your api calls
  console.log(submittedFilters)

  const incrementPage = useCallback(() => {
    setAdditionalFilters((old) => ({
      ...old,
      page: old.page + 1
    }))
  }, [setAdditionalFilters])

  const actions = useMemo(
    (): FiltersAction[] => [
      {
        label: 'reset',
        key: 'resetEnhancedFiltersButton',
        variant: 'text',
        onClick: () => {
          formFilters.setValues({})
          formFilters.submitForm()
        }
      },
      {
        label: 'execute',
        key: 'executeEnhancedFiltersButton'
      }
    ],
    [formFilters.setValues, formFilters.submitForm]
  )

  return (
    <>
      <Filters
        {...args}
        formState={formFilters}
        actions={actions}
        actionsPosition='right'
      />
      <Typography>{`current page: ${additionalFilters.page + 1}`}</Typography>
      <Button onClick={incrementPage}>+1 to page</Button>
    </>
  )
}

const fields: (FiltersField | 'spacer')[] = [
  {
    key: 'storybook-enhanced-filters-field-from',
    name: 'from',
    label: 'From',
    type: 'datepicker',
    datePickerProps: { variant: 'outlined' }
  },
  {
    key: 'storybook-enhanced-filters-field-to',
    name: 'to',
    label: 'To',
    type: 'datepicker',
    datePickerProps: { variant: 'outlined' }
  },
  {
    key: 'storybook-enhanced-filters-field-keyword',
    name: 'keyword',
    label: 'Keyword',
    type: 'textfield',
    textFieldProps: { textFieldType: 'search', variant: 'outlined' }
  },
  {
    key: 'storybook-enhanced-filters-field-fruits',
    name: 'fruits',
    label: 'Fruits',
    type: 'select',
    selectProps: {
      options: [
        { key: 'pomme', label: 'Pomme' },
        { key: 'banane', label: 'Banane' },
        { key: 'orange', label: 'Orange' },
        { key: 'kiwi', label: 'Kiwi' },
        { key: 'fraise', label: 'fraise' }
      ],
      variant: 'outlined',
      multiple: true
    }
  },
  {
    key: 'storybook-enhanced-filters-field-country',
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

EnhancedFiltersStory.args = {
  fields: fields
}

EnhancedFiltersStory.storyName = 'EnhancedFilters'
