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
  OrganizationUploadLogoOptions,
  UpdateOrganizationOptions,
  useCreateOrganization,
  useGetOrganization,
  useOrganizationUploadLogo,
  useUpdateOrganization
} from '../../Api'
import { useFormComposable } from '@smartb/g2-composable'

export interface useOrganizationFormStateProps<
  T extends Organization = Organization
> {
  /**
   * The organization id to provide if it's an updation
   */
  organizationId?: string
  /**
   * The getOrganization hook options
   */
  getOrganizationOptions?: GetOrganizationOptions<T>
  /**
   * The updateOrganization hook options
   */
  updateOrganizationOptions?: UpdateOrganizationOptions<T>
  /**
   * The uploadLogo hook options
   */
  uploadLogoOptions?: OrganizationUploadLogoOptions
  /**
   * The createOrganization hook options
   */
  createOrganizationOptions?: CreateOrganizationOptions<T>
  /**
   * Define whether the object is updated or created
   * @default false
   */
  update?: boolean
  /**
   * The roles used to attributs the default roles
   */
  defaultRoles?: string[]
  /**
   * to use the current user organization
   * @default  false
   */
  myOrganization?: boolean
  /**
   * Allow the organization to have multipe roles
   *
   * @default true
   */
  multipleRoles?: boolean
}

export const useOrganizationFormState = <T extends Organization = Organization>(
  params?: useOrganizationFormStateProps<T>
) => {
  const {
    createOrganizationOptions,
    getOrganizationOptions,
    organizationId,
    update,
    updateOrganizationOptions,
    defaultRoles,
    multipleRoles = true,
    myOrganization = false,
    uploadLogoOptions
  } = params ?? {}

  const { keycloak, service } = useAuth()
  const queryClient = useQueryClient()

  const user = useMemo(() => {
    return service.getUser()
  }, [service.getUser])

  const getOrganization = useGetOrganization<T>({
    apiUrl: i2Config().orgUrl,
    organizationId: myOrganization ? user?.memberOf : organizationId,
    jwt: keycloak.token,
    options: getOrganizationOptions
  })

  const organization = useMemo(
    () => getOrganization.data?.item,
    [getOrganization.data?.item]
  )

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

  const uploadLogo = useOrganizationUploadLogo({
    apiUrl: i2Config().orgUrl,
    jwt: keycloak.token,
    options: uploadLogoOptions
  })

  const createOrganization = useCreateOrganization({
    apiUrl: i2Config().orgUrl,
    jwt: keycloak.token,
    options: createOrganizationOptionsMemo
  })

  const updateOrganizationMemoized = useCallback(
    async (organization: Organization) => {
      //@ts-ignore
      organization.logo &&
        (await uploadLogo.mutateAsync({
          file: organization.logo,
          id: organization.id
        }))
      delete organization.logo
      await updateOrganization.mutateAsync(organization)
    },
    [updateOrganization.mutateAsync, uploadLogo.mutateAsync]
  )

  const createOrganizationMemoized = useCallback(
    async (organization: Organization) => {
      await createOrganization.mutateAsync(organization)
    },
    [createOrganization.mutateAsync]
  )

  const onSubmitMemoized = useCallback(
    async (values: FlatOrganization) => {
      const onSubmit = update
        ? updateOrganizationMemoized
        : createOrganizationMemoized
      await onSubmit({
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

  const initialRoles = useMemo(() => {
    const roles = organization?.roles ?? defaultRoles
    return multipleRoles ? roles : roles?.[0]
  }, [defaultRoles, organization?.roles, multipleRoles])

  const initialValues = useMemo(
    () => ({
      ...(!!organization
        ? //@ts-ignore
          organizationToFlatOrganization(organization)
        : undefined),
      //@ts-ignore
      roles: initialRoles
    }),
    [initialRoles, organization]
  )

  const formState = useFormComposable({
    //@ts-ignore
    onSubmit: onSubmitMemoized,
    formikConfig: {
      initialValues: initialValues,
      enableReinitialize: true
    }
  })

  return {
    formState,
    organization: organization,
    isLoading: getOrganization.isLoading,
    getOrganization: getOrganization
  }
}
