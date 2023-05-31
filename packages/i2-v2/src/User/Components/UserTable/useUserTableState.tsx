import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import {
  ExtandedColumnsParams,
  useExtendedColumns
} from '../../../Commons/useExtendedColumns'
import {
  G2ColumnDef,
  TableCellLink,
  TableCellProfile,
  TableCellText,
  UseTableOptions,
  useTable
} from '@smartb/g2-layout'
import { User } from '../../Domain'
import { OrganizationId } from '../../../Organization'

export type userTableColumns = 'givenName' | 'address' | 'email' | 'memberOf'

export interface useUserTableStateParams<T extends User>
  extends Partial<UseTableOptions<T>> {
  /**
   * The column extander module
   */
  columnsExtander?: Omit<
    ExtandedColumnsParams<T, userTableColumns>,
    'initialColumns'
  >
  /**
   * If you want the columns organization to contain links redirecting to the organization page provide this prop
   */
  getOrganizationUrl?: (organizationId: OrganizationId) => string
  /**
   * Force the display of the organization over the user list (if the first user of the list has no organization)
   *
   * @default false
   */
  hasOrganizations?: boolean
  /**
   * The user to pe parsed in the table
   */
  users: T[]
}

export const useUserTableState = <T extends User = User>(
  params?: useUserTableStateParams<T>
) => {
  const {
    columnsExtander,
    users = [],
    getOrganizationUrl,
    hasOrganizations = false,
    ...other
  } = params ?? {}

  const { t } = useTranslation()
  const columns = useMemo(
    (): G2ColumnDef<T>[] => [
      {
        header: t('g2.user'),
        id: 'givenName',
        cell: ({ row }) => (
          <TableCellProfile
            familyName={row.original.familyName}
            givenName={row.original.givenName}
          />
        ),
        className: 'givenNameColumn'
      },
      {
        header: t('g2.address'),
        id: 'address',
        cell: ({ row }) =>
          row.original.address ? (
            <TableCellText
              value={`${row.original.address.street} ${row.original.address.postalCode} ${row.original.address.city}`}
            />
          ) : undefined,
        className: 'addressColumn'
      },
      {
        header: t('g2.email'),
        id: 'email',
        cell: ({ row }) => <TableCellText value={row.original.email} />,
        className: 'emailColumn'
      },
      ...((!!users[0] && !!users[0].memberOf) || hasOrganizations
        ? [
            {
              header: t('g2.organization'),
              id: 'memberOf',
              cell: ({ row }) => {
                if (!!getOrganizationUrl && row.original.memberOf?.id) {
                  return (
                    <TableCellLink
                      href={getOrganizationUrl(row.original.memberOf?.id)}
                      label={row.original.memberOf?.name}
                    />
                  )
                }
                return <TableCellText value={row.original.memberOf?.name} />
              },
              className: 'memberOfColumn'
            } as G2ColumnDef<T>
          ]
        : [])
    ],
    [users, getOrganizationUrl, t, hasOrganizations]
  )

  const completeColumns = useExtendedColumns({
    initialColumns: columns,
    ...columnsExtander
  })

  return useTable({
    data: users,
    columns: completeColumns,
    getRowId: (row) => row.id,
    ...other
  })
}
