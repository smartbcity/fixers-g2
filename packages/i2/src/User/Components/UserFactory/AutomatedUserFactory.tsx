import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'
import React, { useCallback, useMemo } from 'react'
import { OrganizationId } from '../../../Organization'
import { User } from '../../Domain'
import {
  ReadonlyFields,
  UserFactory,
  UserFactoryProps,
  UserFactoryStrings
} from './UserFactory'
import {
  CreateUserOptions,
  GetUserOptions,
  UpdateUserOptions,
  useCreateUser,
  useGetUser,
  useUpdateUser
} from '../../Api'
import { i2Config, useAuth } from '@smartb/g2-providers'
import { useQueryClient } from 'react-query'

export type ReadonlyUserFieldsPerState = {
  create?: ReadonlyFields
  /**
   * @default {memberOf: true, email: true, roles:true }
   */
  update?: ReadonlyFields
}

export interface AutomatedUserFactoryStrings extends UserFactoryStrings {
  /**
   * @default "Mettre à jour"
   */
  updateButtonLabel?: string
  /**
   * @default "Créer"
   */
  createButtonLabel?: string
}

export interface AutomatedUserFactoryBasicProps extends BasicProps {
  /**
   * The getUser hook options
   */
  getUserOptions?: GetUserOptions
  /**
   * The updateUser hook options
   */
  updateUserOptions?: UpdateUserOptions
  /**
   * The createUser hook options
   */
  createUserOptions?: CreateUserOptions
  /**
   * Define whether the object is updated or created
   * @default false
   */
  update?: boolean
  /**
   * The organizationId of the user.⚠️ You have to provide it if `update` is false and the organization module is activated
   */
  organizationId?: OrganizationId
  /**
   * The user id to provide if it's an updation
   */
  userId?: string
  /**
   * The fields readonly attributes for the current state
   */
  readonlyFieldsPerState?: ReadonlyUserFieldsPerState
  /**
   * The prop to use to add custom translation to the component
   */
  strings?: AutomatedUserFactoryStrings
}

export type AutomatedUserFactoryProps = MergeMuiElementProps<
  UserFactoryProps,
  AutomatedUserFactoryBasicProps
>

export const AutomatedUserFactory = (props: AutomatedUserFactoryProps) => {
  const {
    userId,
    update = false,
    organizationId,
    readonlyFieldsPerState,
    getUserOptions,
    updateUserOptions,
    createUserOptions,
    ...other
  } = props

  const { keycloak } = useAuth()
  const queryClient = useQueryClient()

  const getUser = useGetUser({
    apiUrl: i2Config().userUrl,
    jwt: keycloak.token,
    userId: userId,
    options: getUserOptions
  })

  const updateUserOptionsMemo = useMemo(
    () => ({
      ...updateUserOptions,
      onSuccess: (data, variables, context) => {
        getUser.refetch()
        queryClient.invalidateQueries('users')
        updateUserOptions?.onSuccess &&
          updateUserOptions.onSuccess(data, variables, context)
      }
    }),
    [updateUserOptions, getUser, queryClient.invalidateQueries]
  )

  const createUserOptionsMemo = useMemo(
    () => ({
      ...createUserOptions,
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries('users')
        createUserOptions?.onSuccess &&
          createUserOptions.onSuccess(data, variables, context)
      }
    }),
    [createUserOptions, queryClient.invalidateQueries]
  )

  const updateUser = useUpdateUser({
    apiUrl: i2Config().userUrl,
    jwt: keycloak.token,
    options: updateUserOptionsMemo
  })

  const createUser = useCreateUser({
    apiUrl: i2Config().userUrl,
    jwt: keycloak.token,
    options: createUserOptionsMemo,
    organizationId: organizationId
  })

  const updateUserMemoized = useCallback(
    async (user: User) => {
      const res = await updateUser.mutateAsync(user)
      if (res) {
        return true
      } else {
        return false
      }
    },
    [updateUser.mutateAsync]
  )

  const createUserMemoized = useCallback(
    async (user: User) => {
      console.log(user)
      const res = await createUser.mutateAsync(user)
      if (res) {
        return true
      } else {
        return false
      }
    },
    [createUser.mutateAsync]
  )

  return (
    <UserFactory
      user={getUser.data}
      onSubmit={update ? updateUserMemoized : createUserMemoized}
      isUpdate={update}
      isLoading={getUser.isLoading}
      organizationId={organizationId}
      readonlyFields={
        update
          ? {
              memberOf: true,
              email: true,
              roles: true,
              ...readonlyFieldsPerState?.update
            }
          : readonlyFieldsPerState?.create
      }
      {...other}
    />
  )
}
