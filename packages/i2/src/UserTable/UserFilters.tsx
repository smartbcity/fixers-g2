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
import { UserTableBlockedFilters } from '.'
import { OrganizationRef } from '..'

export type UserFilters = {
  search?: string
  organizationId?: string
  role?: string
}

export interface UserFiltersBasicProps extends BasicProps {
  onSubmit: (values: any) => void
  initialFiltersValues?: UserFilters
  organizationsRefs?: OrganizationRef[]
  rolesOptions?: Option[]
  blockedFilters?: UserTableBlockedFilters
  TableActions?: React.ReactNode
}

export type UserFiltersProps = MergeMuiElementProps<
  Omit<FiltersProps, 'fields' | 'formState'>,
  UserFiltersBasicProps
>

export const UserFilters = (props: UserFiltersProps) => {
  const {
    onSubmit,
    initialFiltersValues,
    organizationsRefs,
    blockedFilters,
    rolesOptions,
    TableActions,
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
      ...(!blockedFilters?.search
        ? [
            {
              key: 'search',
              name: 'search',
              label: 'Rechercher',
              defaultValue: initialFiltersValues?.search,
              type: 'textfield',
              textFieldProps: {
                textFieldType: 'search',
                className: 'searchFilter'
              }
            } as FiltersField
          ]
        : []),
      ...(!!orgsOptions && !blockedFilters?.organizationId
        ? [
            {
              key: 'organizationId',
              name: 'organizationId',
              label: 'Organization',
              defaultValue: initialFiltersValues?.organizationId,
              type: 'select',
              selectProps: {
                options: orgsOptions
              }
            } as FiltersField
          ]
        : []),
      ...(!!rolesOptions && !blockedFilters?.role
        ? [
            {
              key: 'role',
              name: 'role',
              label: 'Role',
              defaultValue: initialFiltersValues?.role,
              type: 'select',
              selectProps: {
                options: rolesOptions
              }
            } as FiltersField
          ]
        : [])
    ]
  }, [organizationsRefs, blockedFilters, rolesOptions, initialFiltersValues])

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
        }
      }}
    >
      <Filters fields={fields} formState={formState} {...other} />
      {TableActions}
    </Stack>
  )
}
