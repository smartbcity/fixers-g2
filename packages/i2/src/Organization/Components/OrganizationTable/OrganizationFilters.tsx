import { Stack } from '@mui/material'
import {
  Filters,
  FiltersField,
  useFilters,
  FiltersProps,
  Option
} from '@smartb/g2-forms'
import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'
import React, { useMemo } from 'react'

export type OrganizationFilters = {
  search?: string
  role?: string
}

export interface OrganizationFiltersBasicProps extends BasicProps {
  onSubmit: (values: OrganizationFilters) => void
  initialFiltersValues?: OrganizationFilters
  blockedFilters?: Record<keyof OrganizationFilters, boolean>
  rolesOptions?: Option[]
  tableActions?: React.ReactNode
}

export type OrganizationFiltersProps = MergeMuiElementProps<
  Omit<FiltersProps, 'fields' | 'formState'>,
  OrganizationFiltersBasicProps
>

export const OrganizationFilters = (props: OrganizationFiltersProps) => {
  const {
    onSubmit,
    initialFiltersValues,
    blockedFilters,
    rolesOptions,
    tableActions,
    ...other
  } = props

  const fields = useMemo(
    (): FiltersField[] => [
      ...(!blockedFilters?.search
        ? [
            {
              key: 'search',
              name: 'search',
              defaultValue: initialFiltersValues?.search,
              label: 'Rechercher',
              type: 'textfield',
              textFieldProps: {
                textFieldType: 'search',
                className: 'searchFilter',
                color: 'secondary'
              }
            } as FiltersField
          ]
        : []),
      ...(!!rolesOptions && !blockedFilters?.role
        ? [
            {
              key: 'role',
              name: 'role',
              label: 'Type',
              defaultValue: initialFiltersValues?.role,
              type: 'select',
              selectProps: {
                options: rolesOptions,
                color: 'secondary'
              }
            } as FiltersField
          ]
        : [])
    ],
    [initialFiltersValues, rolesOptions, blockedFilters]
  )

  const formState = useFilters({
    fields: fields,
    onSubmit: onSubmit
  })

  return (
    <Stack
      direction='row'
      justifyContent='space-between'
      alignItems='center'
      sx={{
        '& .searchFilter': {
          width: '150px'
        },
        padding: '10px 20px'
      }}
    >
      <Filters fields={fields} formState={formState} {...other} />
      {tableActions}
    </Stack>
  )
}
