import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'
import React, { useCallback } from 'react'
import { Organization } from '../../Domain'
import {
  OrganizationFactory,
  OrganizationFactoryProps,
  ReadonlyFields
} from './OrganizationFactory'
import {
  CreateOrganizationOptions,
  getInseeOrganization,
  GetOrganizationOptions,
  UpdateOrganizationOptions,
  useCreateOrganization,
  useGetOrganization,
  useUpdateOrganization
} from '../../Api'

export type ReadonlyOrgFieldsPerState = {
  create?: ReadonlyFields
  /**
   * @default {siret: true, roles: true}
   */
  update?: ReadonlyFields
}

export interface AutomatedOrganizationFactoryBasicProps extends BasicProps {
  /**
   * The Api url where to make the locals Api calls
   */
  apiUrl: string
  /**
   * The token to authorize the Api calls
   */
  jwt?: string
  /**
   * The organization id to provide if it's an updation
   */
  organizationId?: string
  /**
   * The getOrganization hook options
   */
  getOrganizationOptions?: GetOrganizationOptions
  /**
   * The updateOrganization hook options
   */
  updateOrganizationOptions?: UpdateOrganizationOptions
  /**
   * The createOrganization hook options
   */
  createOrganizationOptions?: CreateOrganizationOptions
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
    organizationId,
    update = false,
    readonlyFieldsPerState,
    apiUrl,
    jwt,
    getOrganizationOptions,
    updateOrganizationOptions,
    createOrganizationOptions,
    ...other
  } = props

  const getInseeOrganizationMemoized = useCallback(
    async (siret: string) => {
      return getInseeOrganization(siret, apiUrl, jwt)
    },
    [apiUrl, jwt]
  )

  const getOrganization = useGetOrganization({
    apiUrl: apiUrl,
    organizationId: organizationId,
    jwt: jwt,
    options: getOrganizationOptions
  })

  const updateOrganization = useUpdateOrganization({
    apiUrl: apiUrl,
    jwt: jwt,
    options: updateOrganizationOptions
  })

  const createOrganization = useCreateOrganization({
    apiUrl: apiUrl,
    jwt: jwt,
    options: createOrganizationOptions
  })

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
      getInseeOrganization={getInseeOrganizationMemoized}
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
