import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'
import React, { useCallback, useMemo } from 'react'
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
import { useQueryClient } from 'react-query'

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
  /**
   * The attributes to add in the user object on submission
   */
  attributes?: any
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
    attributes,
    ...other
  } = props

  const { keycloak } = useAuth()
  const queryClient = useQueryClient()

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

  const updateOrganizationOptionsMemo = useMemo(
    () => ({
      ...updateOrganizationOptions,
      onSuccess: (data, variables, context) => {
        getOrganization.refetch()
        queryClient.invalidateQueries('organizationRefs')
        queryClient.invalidateQueries('organizations')
        updateOrganizationOptions?.onSuccess &&
          updateOrganizationOptions.onSuccess(data, variables, context)
      }
    }),
    [updateOrganizationOptions, getOrganization, queryClient.invalidateQueries]
  )

  const createOrganizationOptionsMemo = useMemo(
    () => ({
      ...createOrganizationOptions,
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries('organizationRefs')
        queryClient.invalidateQueries('organizations')
        createOrganizationOptions?.onSuccess &&
          createOrganizationOptions.onSuccess(data, variables, context)
      }
    }),
    [createOrganizationOptions, queryClient.invalidateQueries]
  )

  const updateOrganization = useUpdateOrganization({
    apiUrl: i2Config().orgUrl,
    jwt: keycloak.token,
    options: updateOrganizationOptionsMemo
  })

  const createOrganization = useCreateOrganization({
    apiUrl: i2Config().orgUrl,
    jwt: keycloak.token,
    options: createOrganizationOptionsMemo
  })

  const updateOrganizationMemoized = useCallback(
    async (organization: Organization) => {
      const res = await updateOrganization.mutateAsync({
        ...organization,
        ...attributes
      })
      if (res) {
        return true
      } else {
        return false
      }
    },
    [updateOrganization.mutateAsync, attributes]
  )

  const createOrganizationMemoized = useCallback(
    async (organization: Organization) => {
      const res = await createOrganization.mutateAsync({
        ...organization,
        ...attributes
      })
      if (res) {
        return true
      } else {
        return false
      }
    },
    [createOrganization.mutateAsync, attributes]
  )

  return (
    <OrganizationFactory
      organization={getOrganization.data?.item}
      getInseeOrganization={getInseeOrganizationMemoized}
      onSubmit={
        update ? updateOrganizationMemoized : createOrganizationMemoized
      }
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
