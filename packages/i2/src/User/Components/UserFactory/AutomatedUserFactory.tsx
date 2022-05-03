import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'
import React, { useCallback } from 'react'
import {
  OrganizationId,
  ReadonlyOrgFieldsPerState
} from '../../../Organization'
import { User } from '../../Domain'
import { ReadonlyFields, UserFactory, UserFactoryProps } from './UserFactory'
import {
  CreateUserOptions,
  GetUserOptions,
  UpdateUserOptions,
  useCreateUser,
  useGetUser,
  useUpdateUser
} from '../../Api'

export type ReadonlyUserFieldsPerState = {
  create?: ReadonlyFields
  /**
   * @default {memberOf: true, email: true, roles:true }
   */
  update?: ReadonlyFields
}

export interface AutomatedUserFactoryBasicProps extends BasicProps {
  /**
   * The Api url where to make the locals Api calls
   */
  apiUrl: string
  /**
   * The token to authorize the Api calls
   */
  jwt?: string
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
  readonlyFieldsPerState?: ReadonlyOrgFieldsPerState
}

export type AutomatedUserFactoryProps = MergeMuiElementProps<
  UserFactoryProps,
  AutomatedUserFactoryBasicProps
>

export const AutomatedUserFactory = (props: AutomatedUserFactoryProps) => {
  const {
    apiUrl,
    jwt,
    userId,
    update = false,
    organizationId,
    readonlyFieldsPerState,
    getUserOptions,
    updateUserOptions,
    createUserOptions,
    ...other
  } = props

  const getUser = useGetUser({
    apiUrl: apiUrl,
    jwt: jwt,
    userId: userId,
    options: getUserOptions
  })

  const updateUser = useUpdateUser({
    apiUrl: apiUrl,
    jwt: jwt,
    options: updateUserOptions
  })

  const createUser = useCreateUser({
    apiUrl: apiUrl,
    jwt: jwt,
    options: createUserOptions
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
      const res = await createUser.mutateAsync(user)
      if (res) {
        return true
      } else {
        return false
      }
    },
    [createUser.mutateAsync]
  )

  if (update && !getUser.isSuccess) return <></>
  return (
    <UserFactory
      user={getUser.data}
      onSubmit={update ? updateUserMemoized : createUserMemoized}
      submitButtonLabel={update ? 'Mettre à jour' : 'Créer'}
      isUpdate={update}
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
