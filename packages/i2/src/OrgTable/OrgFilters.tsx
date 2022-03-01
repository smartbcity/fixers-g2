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
import { OrgTableBlockedFilters } from '.'

export type OrgFilters = {
  search?: string
  role?: string
}

export interface OrgFiltersBasicProps extends BasicProps {
  onSubmit: (values: OrgFilters) => void
  initialFiltersValues?: OrgFilters
  blockedFilters?: OrgTableBlockedFilters
  rolesOptions?: Option[]
  TableActions?: React.ReactNode
}

export type OrgFiltersProps = MergeMuiElementProps<
  Omit<FiltersProps, 'fields' | 'formState'>,
  OrgFiltersBasicProps
>

export const OrgFilters = (props: OrgFiltersProps) => {
  const {
    onSubmit,
    initialFiltersValues,
    blockedFilters,
    rolesOptions,
    TableActions,
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
                className: 'searchFilter'
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
                options: rolesOptions
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
      sx={{
        '& .searchFilter': {
          width: '150px'
        }
      }}
    >
      <Filters fields={fields} formState={formState} {...other} />
      {TableActions}
    </Stack>
  )
}
