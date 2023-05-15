import React, { useCallback, useEffect, useMemo } from 'react'
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
import { useFiltersComposable, FilterComposableField } from './.'
import { Action, Button } from '@smartb/g2-components'
import {
  Router as AruiRouter,
  AppProvider as AruiAppProvider
} from '@smartb/g2-providers'
import { Typography } from '@mui/material'
import { Route } from 'react-router-dom'
import { QueryClient } from 'react-query'
import { ArrowRightAltRounded, SortByAlphaRounded } from '@mui/icons-material'

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

const queryClient = new QueryClient()

export const FiltersStory: Story<FiltersComposableBasicProps<any>> = (
  args: FiltersComposableBasicProps<any>
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
      <Router {...args} />
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

const Example = (args: any) => {
  const onSubmit = useCallback((values: any, submittedFilters: any) => {
    if (values.page === submittedFilters.page) return { ...values, page: 0 }
  }, [])
  const { formState, setAdditionalFilter, submittedFilters } =
    useFiltersComposable({
      onSubmit,
      formikConfig: {
        initialValues: {
          page: 0
        }
      }
    })

  const incrementPage = useCallback(() => {
    setAdditionalFilter('page', submittedFilters.page + 1)
  }, [submittedFilters.page, setAdditionalFilter])

  const actions = useMemo(
    (): Action[] => [
      {
        label: 'reset',
        key: 'resetFiltersButton',
        variant: 'text',
        onClick: () => {
          formState.setValues({ page: submittedFilters.page })
          formState.submitForm()
        }
      },
      {
        label: 'execute',
        key: 'executeFiltersButton'
      }
    ],
    [formState.setValues, formState.submitForm]
  )

  useEffect(() => {
    console.log(submittedFilters)
  }, [submittedFilters])

  return (
    <>
      <FiltersComposable
        {...args}
        filterStyleProps={{ color: 'default', variant: 'filled' }}
        formState={formState}
        actions={actions}
        sortField={{
          name: 'sort',
          type: 'select',
          label: 'Sort',
          params: {
            startAdornment: <SortByAlphaRounded fontSize='small' />,
            displaySelected: true,
            options: [
              {
                key: 'ascDate',
                label: 'Date',
                icon: (
                  <ArrowRightAltRounded
                    fontSize='small'
                    sx={{ transform: 'rotate(-90deg)' }}
                  />
                )
              },
              {
                key: 'descDate',
                label: 'Date',
                icon: (
                  <ArrowRightAltRounded
                    fontSize='small'
                    sx={{ transform: 'rotate(90deg)' }}
                  />
                )
              },
              {
                key: 'ascPrice',
                label: 'Price',
                icon: (
                  <ArrowRightAltRounded
                    fontSize='small'
                    sx={{ transform: 'rotate(-90deg)' }}
                  />
                )
              },
              {
                key: 'descPrice',
                label: 'Price',
                icon: (
                  <ArrowRightAltRounded
                    fontSize='small'
                    sx={{ transform: 'rotate(90deg)' }}
                  />
                )
              }
            ]
          }
        }}
      />
      <Typography>{`current page: ${submittedFilters.page + 1}`}</Typography>
      <Button onClick={incrementPage}>+1 to page</Button>
    </>
  )
}

const fields: FilterComposableField[] = [
  {
    name: 'from',
    label: 'From',
    type: 'datePicker'
  },
  {
    name: 'to',
    label: 'To',
    type: 'datePicker'
  },
  {
    name: 'spacer',
    type: 'spacer'
  },
  {
    name: 'keyword',
    label: 'Keyword',
    type: 'textField',
    params: { textFieldType: 'search' },
    mandatory: true
  },
  {
    name: 'country',
    label: 'Country',
    type: 'select',
    params: {
      multiple: true,
      options: [
        { key: 'paris', label: 'Paris' },
        { key: 'lyon', label: 'Lyon' },
        { key: 'nice', label: 'Nice' },
        { key: 'marseille', label: 'Marseille' },
        { key: 'montpellier', label: 'Montpellier' }
      ]
    }
  }
]

FiltersStory.args = {
  fields: fields
}

FiltersStory.storyName = 'Filters'
