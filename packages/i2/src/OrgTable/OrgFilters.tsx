import { Stack } from '@mui/material'
import { Filters, FiltersField, useFilters } from '@smartb/g2-forms'
import React from 'react'

export interface OrgFiltersProps {
  onSubmit: (values: { search?: string }) => void
}

export const OrgFilters = (props: OrgFiltersProps) => {
  const { onSubmit } = props

  const fields: FiltersField[] = [
    {
      key: 'search',
      name: 'search',
      label: 'Rechercher',
      type: 'textfield',
      textFieldProps: {
        textFieldType: 'search',
        className: 'searchFilter'
      }
    }
  ]

  const formState = useFilters({
    fields: fields,
    onSubmit: onSubmit
  })

  return (
    <Stack
      direction='row'
      justifyContent='flex-end'
      sx={{
        '& .searchFilter': {
          width: '150px'
        }
      }}
    >
      <Filters fields={fields} formState={formState} />
    </Stack>
  )
}
