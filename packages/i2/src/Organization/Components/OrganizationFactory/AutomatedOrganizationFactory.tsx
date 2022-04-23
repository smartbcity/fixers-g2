import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'
import React, { useCallback } from 'react'
import { UseMutationResult, UseQueryResult } from 'react-query'
import { request } from 'utils'
import { Organization } from '../../Domain'
import {
  OrganizationFactory,
  OrganizationFactoryProps,
  ReadonlyFields
} from './OrganizationFactory'

export type ReadonlyOrgFieldsPerState = {
  create?: ReadonlyFields
  /**
   * @default {siret: true, roles: true}
   */
  update?: ReadonlyFields
}

export interface AutomatedOrganizationFactoryBasicProps extends BasicProps {
  /**
   * The result of the hook `useGetOrganization`
   */
  getOrganization: UseQueryResult<
    | {
        organization: Organization
      }
    | undefined,
    unknown
  >
  /**
   * The result of the hook `useUpdateOrganization`
   */
  updateOrganization: UseMutationResult<
    | {
        id: string
      }
    | undefined,
    unknown,
    Organization,
    unknown
  >
  /**
   * The result of the hook `useCreateOrganization`
   */
  createOrganization: UseMutationResult<
    | {
        id: string
      }
    | undefined,
    unknown,
    Organization,
    unknown
  >
  /**
   * The Api url where to make the locals Api calls
   */
  apiUrl: string
  /**
   * The token to authorize the Api calls
   */
  jwt?: string
  /**
   * Define whether the object is updated or created
   * @default false
   */
  update?: boolean
  /**
   * The fields readonly attributes for the current state
   */
  readonlyFieldsPerState?: ReadonlyOrgFieldsPerState
}

export type AutomatedOrganizationFactoryProps = MergeMuiElementProps<
  OrganizationFactoryProps,
  AutomatedOrganizationFactoryBasicProps
>

export const AutomatedOrganizationFactory = (
  props: AutomatedOrganizationFactoryProps
) => {
  const {
    createOrganization,
    getOrganization,
    updateOrganization,
    update = false,
    readonlyFieldsPerState,
    apiUrl,
    jwt,
    ...other
  } = props

  const getInseeOrganization = useCallback(
    async (siret: string) => {
      const res = await request<{ organization?: Organization }[]>({
        url: `${apiUrl}/getInseeOrganization`,
        method: 'POST',
        body: JSON.stringify({
          siret: siret
        }),
        jwt: jwt
      })
      if (res) {
        return res[0].organization
      } else {
        return undefined
      }
    },
    [apiUrl, jwt]
  )

  const updateOrganizationMemoized = useCallback(
    async (organization: Organization) => {
      const res = await updateOrganization.mutateAsync(organization)
      if (res) {
        return true
      } else {
        return false
      }
    },
    [updateOrganization.mutateAsync]
  )

  const createOrganizationMemoized = useCallback(
    async (organization: Organization) => {
      const res = await createOrganization.mutateAsync(organization)
      if (res) {
        return true
      } else {
        return false
      }
    },
    [createOrganization.mutateAsync]
  )

  if (update && !getOrganization.isSuccess) return <></>
  return (
    <OrganizationFactory
      organization={getOrganization.data?.organization}
      getInseeOrganization={getInseeOrganization}
      onSubmit={
        update ? updateOrganizationMemoized : createOrganizationMemoized
      }
      submitButtonLabel={update ? 'Mettre à jour' : 'Créer'}
      readonlyFields={
        update
          ? { siret: true, roles: true, ...readonlyFieldsPerState?.update }
          : readonlyFieldsPerState?.create
      }
      {...other}
    />
  )
}
