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
import { OrganizationRef } from '..'

export interface UserFiltersBasicProps extends BasicProps {
  onSubmit: (values: { search?: string }) => void
  defaultSearch?: string
  defaultOrganizationId?: string
  organizationsRefs?: OrganizationRef[]
}

export type UserFiltersProps = MergeMuiElementProps<
  Omit<FiltersProps, 'fields' | 'formState'>,
  UserFiltersBasicProps
>

export const UserFilters = (props: UserFiltersProps) => {
  const {
    onSubmit,
    defaultOrganizationId,
    defaultSearch,
    organizationsRefs,
    ...other
  } = props

  const fields = useMemo((): FiltersField[] => {
    const orgsOptions =
      !!organizationsRefs && organizationsRefs.length > 0
        ? organizationsRefs.map(
            (orgRef): Option => ({
              key: orgRef.id,
              label: orgRef.name
            })
          )
        : undefined
    return [
      {
        key: 'search',
        name: 'search',
        label: 'Rechercher',
        defaultValue: defaultSearch,
        type: 'textfield',
        textFieldProps: {
          textFieldType: 'search',
          className: 'searchFilter'
        }
      },
      ...(!!orgsOptions
        ? [
            {
              key: 'organizationId',
              name: 'organizationId',
              label: 'Organization',
              defaultValue: defaultOrganizationId,
              type: 'select',
              selectProps: {
                options: orgsOptions
              }
            } as FiltersField
          ]
        : [])
    ]
  }, [organizationsRefs])

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
