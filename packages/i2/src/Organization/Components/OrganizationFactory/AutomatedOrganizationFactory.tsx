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
import { useAuth, i2Config } from '@smartb/g2-providers'

export type ReadonlyOrgFieldsPerState = {
  create?: ReadonlyFields
  /**
   * @default {siret: true, roles: true}
   */
  update?: ReadonlyFields
}

export interface AutomatedOrganizationFactoryBasicProps extends BasicProps {
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
    getOrganizationOptions,
    updateOrganizationOptions,
    createOrganizationOptions,
    ...other
  } = props

  const { keycloak } = useAuth()

  const getInseeOrganizationMemoized = useCallback(
    async (siret: string) => {
      return getInseeOrganization(siret, i2Config().orgUrl, keycloak.token)
    },
    [keycloak.token]
  )

  const getOrganization = useGetOrganization({
    apiUrl: i2Config().orgUrl,
    organizationId: organizationId,
    jwt: keycloak.token,
    options: getOrganizationOptions
  })

  const updateOrganization = useUpdateOrganization({
    apiUrl: i2Config().orgUrl,
    jwt: keycloak.token,
    options: updateOrganizationOptions
  })

  const createOrganization = useCreateOrganization({
    apiUrl: i2Config().orgUrl,
    jwt: keycloak.token,
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

  if (getOrganization.isLoading) {
    return <></>
  }

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
      isLoading={getOrganization.isLoading}
      {...other}
    />
  )
}
