import React, { useMemo } from 'react'
import {
  Filters,
  FiltersBasicProps,
  FiltersField,
  FiltersAction
} from '../Filters'
import { Meta } from '@storybook/react'
import { Story } from '@storybook/react/types-6-0'
import {
  ArgsTable,
  PRIMARY_STORY,
  Subtitle,
  Primary,
  Description,
  Stories
} from '@storybook/addon-docs'
import LinkTo from '@storybook/addon-links/react'
import { Typography } from '@mui/material'
import {
  ActionDoc,
  FieldDoc,
  EnhancedFiltersClasses,
  EnhancedFiltersStyles,
  EnhancedFiltersState
} from './docs'
import { useEnhancedFilters } from './useEnhancedFilters'
import { withDesign } from 'storybook-addon-designs'
import { Route } from 'react-router-dom'
import { Router as AruiRouter } from '@smartb/g2-providers/src'
import { AppProvider as AruiAppProvider } from '@smartb/g2-providers/src/AppProvider/AppProvider'
import { QueryClient } from 'react-query'

export default {
  title: 'Forms/EnhancedFilters',
  component: Filters,
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kgphqh0uVhoXt8TK3LlkGj/G2-%2F-Design-System?node-id=1097%3A177'
    },
    docs: {
      page: () => (
        <>
          <Primary />
          <Description>
            This components is made to display a basic group of enhancedFilters
            using [EnhancedFiltersik](https://formik.org/).
          </Description>
          <Description>
            If you want a complexe stack of enhancedFilters you will have to
            create it by your self. We recommand using
            [EnhancedFiltersik](https://formik.org/).
          </Description>
          <ArgsTable story={PRIMARY_STORY} />
          <Subtitle>References</Subtitle>
          <Typography variant='body2' style={{ marginBottom: '5px' }}>
            -{' '}
            <LinkTo kind='EnhancedFilters' story='Select'>
              Select
            </LinkTo>
          </Typography>
          <Typography variant='body2' style={{ marginBottom: '5px' }}>
            -{' '}
            <LinkTo kind='EnhancedFilters' story='TextField'>
              TextField
            </LinkTo>
          </Typography>
          <Typography variant='body2' style={{ marginBottom: '5px' }}>
            -{' '}
            <LinkTo kind='EnhancedFilters' story='DatePicker'>
              DatePicker
            </LinkTo>
          </Typography>
          <Typography variant='body2' style={{ marginBottom: '5px' }}>
            -{' '}
            <LinkTo kind='EnhancedFilters' story='CheckBox'>
              CheckBox
            </LinkTo>
          </Typography>
          <Description>
            You have to use the hook `useEnhancedFilters` that will intialise
            the enhancedFiltersState and return it to you. The
            `EnhancedFiltersState` equal to the return type of the hook
            useFormik.
          </Description>
          <Stories />
        </>
      )
    }
  },
  argTypes: {
    fields: {
      table: {
        type: {
          summary: 'Field[]',
          detail: FieldDoc
        }
      }
    },
    actions: {
      table: {
        type: {
          summary: 'Action[]',
          detail: ActionDoc
        }
      }
    },
    formState: {
      table: {
        type: {
          summary: 'EnhancedFiltersState',
          detail: EnhancedFiltersState
        }
      }
    },
    classes: {
      table: {
        type: {
          summary: 'EnhancedFiltersClasses',
          detail: EnhancedFiltersClasses
        }
      }
    },
    styles: {
      table: {
        type: {
          summary: 'EnhancedFiltersStyles',
          detail: EnhancedFiltersStyles
        }
      }
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
  const args = props.args

  const formState = useEnhancedFilters({
    fields: args.fields,
    onSubmit: (values) => {
      console.log('submitted')
      console.log(values)
    }
  })

  const actions = useMemo(
    (): FiltersAction[] => [
      {
        label: 'reset',
        key: 'resetEnhancedFiltersButton',
        variant: 'text',
        onClick: () => formState.resetForm()
      },
      {
        label: 'execute',
        key: 'executeEnhancedFiltersButton'
      }
    ],
    [formState.resetForm]
  )

  return (
    <AruiRouter>
      <Route
        path='/iframe.html'
        key='home'
        element={
          <>
            <Filters
              {...args}
              formState={formState}
              actions={actions}
              actionsPosition='right'
            />
          </>
        }
      ></Route>
    </AruiRouter>
  )
}

const fields: FiltersField[] = [
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
