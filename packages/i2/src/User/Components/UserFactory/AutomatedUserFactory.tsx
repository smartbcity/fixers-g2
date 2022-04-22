import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'
import React, { useCallback } from 'react'
import { UseMutationResult, UseQueryResult } from 'react-query'
import { ReadonlyOrgFieldsPerState } from '../../../Organization/Components/OrganizationFactory'
import { User } from '../../Domain'
import { ReadonlyFields, UserFactory, UserFactoryProps } from './UserFactory'

export type ReadonlyUserFieldsPerState = {
  create?: ReadonlyFields
  /**
   * @default {memberOf: true, email: true, roles:true }
   */
  update?: ReadonlyFields
}

export interface AutomatedUserFactoryBasicProps extends BasicProps {
  /**
   * The result of the hook `useGetUser`
   */
  getUser: UseQueryResult<User, unknown>
  /**
   * The result of the hook `useUpdateUser`
   */
  updateUser: UseMutationResult<
    {
      id: string
    },
    unknown,
    User,
    unknown
  >
  /**
   * The result of the hook `useCreateUser`
   */
  createUser: UseMutationResult<
    {
      id: string
    },
    unknown,
    User,
    unknown
  >
  /**
   * Define whether the object is updated or created
   * @default false
   */
  update?: boolean
  /**
   * The organizationId of the user.⚠️ You have to provide it if `update` is false and the organization module is activated
   */
  organizationId?: string
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
    createUser,
    getUser,
    updateUser,
    update = false,
    organizationId,
    readonlyFieldsPerState,
    ...other
  } = props

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
