import { Stack } from '@mui/material'
import {
  Filters,
  FiltersField,
  useFilters,
  FiltersProps
} from '@smartb/g2-forms'
import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'
import React from 'react'

export interface UserFiltersBasicProps extends BasicProps {
  onSubmit: (values: { search?: string }) => void
}

export type UserFiltersProps = MergeMuiElementProps<
  Omit<FiltersProps, 'fields' | 'formState'>,
  UserFiltersBasicProps
>

export const UserFilters = (props: UserFiltersProps) => {
  const { onSubmit, ...other } = props

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
      <Filters fields={fields} formState={formState} {...other} />
    </Stack>
  )
}
