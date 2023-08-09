import React, { useMemo } from 'react'
import { Page as AruiPage, PageBasicProps } from './Page'
import { Meta, StoryFn } from '@storybook/react'
import { Filters, useFilters, FiltersField } from '@smartb/g2-forms'
import { Action, Button } from '@smartb/g2-components'
import { Box, Typography } from '@mui/material'
import { Header, HeaderProps } from '../Header'

export default {
  title: 'Layout/Page',
  component: AruiPage,
  argTypes: {
    headerProps: {
      control: {
        type: null
      }
    },
    children: {
      control: {
        type: null
      }
    }
  }
} as Meta

export const Page: StoryFn<PageBasicProps> = (args: PageBasicProps) => {
  const fields = useMemo(
    (): FiltersField[] => [
      {
        key: 'storybook-filters-field-from',
        name: 'from',
        label: 'From',
        type: 'datepicker'
      },
      {
        key: 'storybook-filters-field-to',
        name: 'to',
        label: 'To',
        type: 'datepicker'
      },
      {
        key: 'storybook-filters-field-keyword',
        name: 'keyword',
        label: 'Keyword',
        type: 'textfield',
        textFieldProps: { textFieldType: 'search' }
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
          multiple: true
        }
      }
    ],
    []
  )

  const actions: Action[] = [
    {
      label: 'Cancel',
      key: 'cancelButton',
      variant: 'text'
    },
    {
      label: 'validate',
      key: 'validateFormButton',
      type: 'submit'
    }
  ]

  const formState = useFilters({
    fields: fields,
    onSubmit: (values) => {
      console.log('submitted')
      console.log(values)
    }
  })

  const filtersActions = useMemo(
    (): Action[] => [
      {
        label: 'reset',
        key: 'resetFiltersButton',
        variant: 'text',
        onClick: () => formState.resetForm()
      }
    ],
    [formState.resetForm]
  )

  const headerProps = useMemo((): HeaderProps => {
    console.log('re-render')
    return {
      content: [
        {
          leftPart: [
            <Typography key='page-title' variant='h5'>
              Page Example
            </Typography>,
            <Filters
              key='page-filters'
              fields={fields}
              formState={formState}
              actions={filtersActions}
              actionsPosition='right'
            />
          ],
          rightPart: [<Button key='page-cerateUser'>Create user</Button>]
        }
      ]
    }
  }, [formState, filtersActions, fields])

  return (
    <AruiPage
      headerProps={headerProps}
      bottomActionsProps={{
        actions: actions
      }}
      {...args}
    />
  )
}

Page.args = {
  children: (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '120vh',
        background: 'grey'
      }}
    >
      je suis la page
    </Box>
  )
}

Page.storyName = 'Page'

Page.parameters = {
  docs: {
    source: {
      code: 'no code on this component because it was causing an issue'
    }
  }
}
