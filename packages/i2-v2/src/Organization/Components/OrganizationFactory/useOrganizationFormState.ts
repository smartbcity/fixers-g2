import { Option } from '@smartb/g2-forms'
import { i2Config, useAuth } from '@smartb/g2-providers'
import { useCallback, useMemo } from 'react'
import {
  FlatOrganization,
  flatOrganizationToOrganization,
  Organization,
  organizationToFlatOrganization
} from '../../Domain'
import { useQueryClient } from 'react-query'
import {
  CreateOrganizationOptions,
  GetOrganizationOptions,
  UpdateOrganizationOptions,
  useCreateOrganization,
  useGetOrganization,
  useUpdateOrganization
} from '../../Api'
import { useFormComposable } from '@smartb/g2-composable'

export interface useOrganizationFormStateProps {
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
   * The initial organization
   */
  organization?: Partial<Organization>
  /**
   * The roles options used to attributs the default roles
   */
  rolesOptions?: Option[]
  /**
   * Allow the organization to have multipe roles
   *
   * @default true
   */
  multipleRoles?: boolean
}

export const useOrganizationFormState = (
  params?: useOrganizationFormStateProps
) => {
  const {
    organization,
    createOrganizationOptions,
    getOrganizationOptions,
    organizationId,
    update,
    updateOrganizationOptions,
    rolesOptions,
    multipleRoles = true
  } = params ?? {}

  const { keycloak } = useAuth()
  const queryClient = useQueryClient()

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

  const onSubmitMemoized = useCallback(
    async (values: FlatOrganization) => {
      const onSubmit = update
        ? updateOrganizationMemoized
        : createOrganizationMemoized
      onSubmit({
        ...values,
        ...flatOrganizationToOrganization(values, multipleRoles),
        id: organization?.id ?? ''
      })
    },
    [
      organization,
      multipleRoles,
      update,
      updateOrganizationMemoized,
      createOrganizationMemoized
    ]
  )

  const defaultRoles = useMemo(() => {
    const givenRoles = rolesOptions?.map((it) => it.key)
    const roles = organization?.roles?.filter((it) => givenRoles?.includes(it))
    return multipleRoles ? roles : roles?.[0]
  }, [rolesOptions, organization?.roles, multipleRoles])

  const initialValues = useMemo(
    () => ({
      //@ts-ignore
      ...(organization
        ? organizationToFlatOrganization(organization)
        : undefined),
      //@ts-ignore
      roles: defaultRoles
    }),
    [defaultRoles]
  )

  const formState = useFormComposable({
    //@ts-ignore
    onSubmit: onSubmitMemoized,
    formikConfig: {
      initialValues: initialValues
    }
  })

  return {
    formState,
    organization: getOrganization.data?.item,
    isLoading: getOrganization.isLoading
  }
}
