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
import { UserTableBlockedFilters } from './index'
import { OrganizationId, OrganizationRef } from '../../../Organization'

export type UserFilters = {
  search?: string
  organizationId?: OrganizationId
  role?: string
}

export interface UserFiltersStrings {
  /**
   * @default "Rechercher"
   */
  search?: string
  /**
   * @default "Organisation"
   */
  organization?: string
  /**
   * @default "Role"
   */
  role?: string
}

export interface UserFiltersBasicProps extends BasicProps {
  onSubmit: (values: any) => void
  initialFiltersValues?: UserFilters
  organizationsRefs?: OrganizationRef[]
  rolesOptions?: Option[]
  blockedFilters?: UserTableBlockedFilters
  tableActions?: React.ReactNode
  strings?: UserFiltersStrings
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
    tableActions,
    strings,
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
              label: strings?.search ?? 'Rechercher',
              defaultValue: initialFiltersValues?.search,
              type: 'textfield',
              textFieldProps: {
                textFieldType: 'search',
                className: 'searchFilter',
                color: 'secondary'
              }
            } as FiltersField
          ]
        : []),
      ...(!!orgsOptions && !blockedFilters?.organizationId
        ? [
            {
              key: 'organizationId',
              name: 'organizationId',
              label: strings?.organization ?? 'Organisation',
              defaultValue: initialFiltersValues?.organizationId,
              type: 'select',
              selectProps: {
                options: orgsOptions,
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
              label: strings?.role ?? 'Rôle',
              defaultValue: initialFiltersValues?.role,
              type: 'select',
              selectProps: {
                options: rolesOptions,
                color: 'secondary'
              }
            } as FiltersField
          ]
        : [])
    ]
  }, [
    organizationsRefs,
    blockedFilters,
    rolesOptions,
    initialFiltersValues,
    strings
  ])

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
