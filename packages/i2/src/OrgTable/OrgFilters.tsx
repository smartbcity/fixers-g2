import { Stack } from '@mui/material'
import {
  Filters,
  FiltersField,
  useFilters,
  FiltersProps
} from '@smartb/g2-forms'
import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'
import React, { useMemo } from 'react'

export interface OrgFiltersBasicProps extends BasicProps {
  onSubmit: (values: { search?: string }) => void
  defaultSearch?: string
}

export type OrgFiltersProps = MergeMuiElementProps<
  Omit<FiltersProps, 'fields' | 'formState'>,
  OrgFiltersBasicProps
>

export const OrgFilters = (props: OrgFiltersProps) => {
  const { onSubmit, defaultSearch, ...other } = props

  const fields = useMemo(
    (): FiltersField[] => [
      {
        key: 'search',
        name: 'search',
        defaultValue: defaultSearch,
        label: 'Rechercher',
        type: 'textfield',
        textFieldProps: {
          textFieldType: 'search',
          className: 'searchFilter'
        }
      }
    ],
    [defaultSearch]
  )

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
      <Filters fields={fields} formState={formState} {...other} />
    </Stack>
  )
}
