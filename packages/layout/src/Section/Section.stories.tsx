import React, { useMemo } from 'react'
import { Section as AruiSection, SectionBasicProps } from './Section'
import { Meta } from '@storybook/react'
import { Story } from '@storybook/react/types-6-0'
import { Filters, useFilters, FiltersField } from '@smartb/g2-forms'
import { Action, Button } from '@smartb/g2-components'
import { Box, Typography } from '@mui/material'
import { Header, HeaderProps } from '../Header'

export default {
  title: 'Layout/Section',
  component: AruiSection,
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

export const Section: Story<SectionBasicProps> = (args: SectionBasicProps) => {
  const fields = useMemo(
    (): FiltersField[] => [
      {
        key: 'storybook-filters-field-city',
        name: 'city',
        label: 'City',
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

  const headerProps = useMemo((): HeaderProps => {
    return {
      content: [
        {
          leftPart: [
            <Typography key='page-title' variant='h6'>
              Section Example
            </Typography>,
            <Filters key='page-filters' fields={fields} formState={formState} />
          ],
          rightPart: [<Button key='page-cerateUser'>Create user</Button>]
        }
      ]
    }
  }, [formState, fields])

  return (
    <Box
      sx={{
        display: 'flex',
        height: '95vh',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: (theme) => theme.palette.background.default
      }}
    >
      <AruiSection
        headerProps={headerProps}
        bottomActionsProps={{
          actions: actions
        }}
        flexContent
        sx={{
          maxHeight: '70vh',
          width: '600px'
        }}
        {...args}
      />
    </Box>
  )
}

Section.args = {
  children: (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '90vh',
        background: 'grey'
      }}
    >
      je suis la section
    </Box>
  )
}

Section.storyName = 'Section'

Section.parameters = {
  docs: {
    source: {
      code: 'no code on this component because it was causing an issue'
    }
  }
}
